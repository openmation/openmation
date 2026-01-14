// Background Service Worker
import {
  initializeScheduler,
  handleAlarm,
  scheduleAutomation,
} from "./scheduler";
import {
  executeAutomation,
  handleAutomationProgress,
  handleAutomationComplete,
} from "./executor";
import {
  getRecordingState,
  setRecordingState,
  clearRecordingState,
  saveAutomation,
} from "@/lib/storage";
import { API_BASE_URL } from "@/lib/api";
import { generateId } from "@/lib/utils";
import type {
  MessageType,
  RecordedEvent,
  MousePosition,
  Automation,
  RecordingState,
} from "@/lib/types";

// Current recording session
let activeRecordingSession: {
  sessionId: string;
  tabId: number;
  events: RecordedEvent[];
  mouseMovements: MousePosition[];
  startUrl: string;
  startTime: number;
  isPaused: boolean;
} | null = null;

// Initialize on extension install/update
chrome.runtime.onInstalled.addListener(async () => {
  console.log("[Openmation] Extension installed/updated");
  await initializeScheduler();
});

// Initialize on browser startup
chrome.runtime.onStartup.addListener(async () => {
  console.log("[Openmation] Browser started");
  await initializeScheduler();
});

// Handle alarms for scheduled automations
chrome.alarms.onAlarm.addListener(handleAlarm);

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener(
  (
    message: MessageType | { type: string; [key: string]: unknown },
    sender,
    sendResponse
  ) => {
    console.log("[Openmation] Background received:", message.type);

    handleMessage(message, sender)
      .then(sendResponse)
      .catch((error: Error) => {
        console.error("[Openmation] Error handling message:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true;
  }
);

// Handle tab navigation - restore panel state if recording
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, _tab) => {
  if (
    changeInfo.status === "complete" &&
    activeRecordingSession?.tabId === tabId
  ) {
    console.log("[Openmation] Tab updated during recording, restoring panel");

    try {
      // Wait for content script to be ready
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Re-inject panel
      await chrome.tabs.sendMessage(tabId, { type: "INJECT_PANEL" });

      // Small delay for panel to render
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Restore panel state with current duration and event count
      const duration = Date.now() - activeRecordingSession.startTime;
      await chrome.tabs.sendMessage(tabId, {
        type: "RESTORE_RECORDING_STATE",
        sessionId: activeRecordingSession.sessionId,
        eventCount: activeRecordingSession.events.length,
        duration,
        isPaused: activeRecordingSession.isPaused,
      });
    } catch (error) {
      console.error(
        "[Openmation] Failed to restore panel after navigation:",
        error
      );
    }
  }
});

async function handleMessage(
  message: MessageType | { type: string; [key: string]: unknown },
  sender: chrome.runtime.MessageSender
): Promise<unknown> {
  switch (message.type) {
    // Called from popup to start recording
    case "START_RECORDING": {
      const tabId = (message as { tabId: number }).tabId;
      const sessionId = generateId();

      // Get current URL
      const tab = await chrome.tabs.get(tabId);

      // Check if URL is valid for recording
      if (
        !tab.url ||
        tab.url.startsWith("chrome://") ||
        tab.url.startsWith("chrome-extension://") ||
        tab.url.startsWith("about:")
      ) {
        return {
          success: false,
          error: "Cannot record on this page. Please navigate to a regular website.",
        };
      }

      // Start recording session
      activeRecordingSession = {
        sessionId,
        tabId,
        events: [],
        mouseMovements: [],
        startUrl: tab.url || "",
        startTime: Date.now(),
        isPaused: false,
      };

      // Update storage
      await setRecordingState({
        isRecording: true,
        isPaused: false,
        events: [],
        mouseMovements: [],
        startUrl: tab.url || "",
        startTime: Date.now(),
        tabId,
        sessionId,
      });

      try {
        // First, try to ping the content script to see if it's loaded
        let contentScriptReady = false;
        try {
          await chrome.tabs.sendMessage(tabId, { type: "PING" });
          contentScriptReady = true;
        } catch {
          // Content script not ready, need to inject it
          contentScriptReady = false;
        }

        // If content script is not ready, inject it programmatically
        if (!contentScriptReady) {
          console.log("[Openmation] Content script not ready, injecting...");
          try {
            // Get the content script files from manifest
            const manifest = chrome.runtime.getManifest();
            const contentScripts = manifest.content_scripts?.[0]?.js || [];

            if (contentScripts.length > 0) {
              await chrome.scripting.executeScript({
                target: { tabId },
                files: contentScripts,
              });
            }
            // Wait for content script to initialize
            await new Promise((resolve) => setTimeout(resolve, 500));
          } catch (injectError) {
            console.error(
              "[Openmation] Failed to inject content script:",
              injectError
            );
            throw new Error(
              "Failed to inject content script. Make sure you're on a regular webpage."
            );
          }
        }

        // Send message to content script to create panel and start recording
        await chrome.tabs.sendMessage(tabId, { type: "INJECT_PANEL" });

        // Small delay to ensure panel is rendered
        await new Promise((resolve) => setTimeout(resolve, 150));

        await chrome.tabs.sendMessage(tabId, {
          type: "START_RECORDING",
          sessionId,
        });

        return { success: true, sessionId };
      } catch (error) {
        console.error("[Openmation] Failed to start recording:", error);
        activeRecordingSession = null;
        await clearRecordingState();
        return {
          success: false,
          error: "Failed to start recording. Try refreshing the page.",
        };
      }
    }

    // Called from panel on the page
    case "START_RECORDING_FROM_PANEL": {
      const tabId = sender.tab?.id;
      if (!tabId) return { success: false, error: "No tab ID" };

      const sessionId = generateId();
      const tab = await chrome.tabs.get(tabId);

      activeRecordingSession = {
        sessionId,
        tabId,
        events: [],
        mouseMovements: [],
        startUrl: tab.url || "",
        startTime: Date.now(),
        isPaused: false,
      };

      await setRecordingState({
        isRecording: true,
        isPaused: false,
        events: [],
        mouseMovements: [],
        startUrl: tab.url || "",
        startTime: Date.now(),
        tabId,
        sessionId,
      });

      await chrome.tabs.sendMessage(tabId, {
        type: "START_RECORDING",
        sessionId,
      });

      return { success: true, sessionId };
    }

    case "PAUSE_RECORDING": {
      if (activeRecordingSession) {
        activeRecordingSession.isPaused = true;
        const tabId = activeRecordingSession.tabId;
        await chrome.tabs.sendMessage(tabId, { type: "PAUSE_RECORDING" });
      }
      return { success: true };
    }

    case "RESUME_RECORDING": {
      if (activeRecordingSession) {
        activeRecordingSession.isPaused = false;
        const tabId = activeRecordingSession.tabId;
        await chrome.tabs.sendMessage(tabId, { type: "RESUME_RECORDING" });
      }
      return { success: true };
    }

    // Stop without saving (discard)
    case "STOP_RECORDING": {
      if (!activeRecordingSession) {
        return { success: false, error: "No active recording" };
      }

      const tabId = activeRecordingSession.tabId;

      try {
        await chrome.tabs.sendMessage(tabId, { type: "STOP_RECORDING" });
      } catch {
        // Ignore errors
      }

      activeRecordingSession = null;
      await clearRecordingState();

      return { success: true };
    }

    // Stop and save with name (from panel)
    case "STOP_RECORDING_WITH_NAME": {
      if (!activeRecordingSession) {
        return { success: false, error: "No active recording" };
      }

      const name =
        (message as unknown as { name: string }).name ||
        `Recording ${new Date().toLocaleString()}`;
      const tabId = activeRecordingSession.tabId;

      let recordingData: {
        events: RecordedEvent[];
        mouseMovements: MousePosition[];
        startUrl: string;
        duration: number;
      };

      try {
        // Get final recording data from content script
        const response = (await chrome.tabs.sendMessage(tabId, {
          type: "STOP_RECORDING",
        })) as {
          success: boolean;
          events: RecordedEvent[];
          mouseMovements: MousePosition[];
          startUrl: string;
          duration: number;
        };

        // Merge events from background (navigation events) and content script
        recordingData = {
          events: [
            ...activeRecordingSession.events,
            ...(response.events || []),
          ],
          mouseMovements: [
            ...activeRecordingSession.mouseMovements,
            ...(response.mouseMovements || []),
          ],
          startUrl: activeRecordingSession.startUrl,
          duration: Date.now() - activeRecordingSession.startTime,
        };
      } catch {
        // Content script might be gone - use what we have
        recordingData = {
          events: activeRecordingSession.events,
          mouseMovements: activeRecordingSession.mouseMovements,
          startUrl: activeRecordingSession.startUrl,
          duration: Date.now() - activeRecordingSession.startTime,
        };
      }

      // Create and save automation
      const automation: Automation = {
        id: generateId(),
        name,
        events: recordingData.events,
        mouseMovements: recordingData.mouseMovements,
        startUrl: recordingData.startUrl,
        duration: recordingData.duration,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isEnabled: true,
      };

      await saveAutomation(automation);

      // Clear session
      activeRecordingSession = null;
      await clearRecordingState();

      // Automatically share the automation and get the URL
      let shareUrl: string | undefined;
      try {
        const shareResponse = await fetch(`${API_BASE_URL}/api/automations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ automation }),
        });
        
        const shareData = await shareResponse.json();
        if (shareData.success && shareData.shareUrl) {
          shareUrl = shareData.shareUrl;
        }
      } catch (error) {
        console.error('[Openmation] Failed to auto-share automation:', error);
      }

      return { success: true, automation, shareUrl };
    }

    case "EVENT_RECORDED": {
      const event = (message as { event: RecordedEvent }).event;
      if (activeRecordingSession && event) {
        activeRecordingSession.events.push(event);
      }
      return { success: true };
    }

    case "RECORDING_RESUMED_ON_PAGE": {
      // Content script resumed recording after page navigation
      const resumeMsg = message as {
        type: string;
        sessionId?: string;
        eventCount?: number;
      };
      if (activeRecordingSession?.sessionId === resumeMsg.sessionId) {
        console.log("[Openmation] Recording resumed on new page");
      }
      return { success: true };
    }

    case "GET_RECORDING_STATE": {
      if (activeRecordingSession) {
        return {
          success: true,
          state: {
            isRecording: true,
            isPaused: activeRecordingSession.isPaused,
            events: activeRecordingSession.events,
            mouseMovements: activeRecordingSession.mouseMovements,
            startUrl: activeRecordingSession.startUrl,
            startTime: activeRecordingSession.startTime,
            tabId: activeRecordingSession.tabId,
            sessionId: activeRecordingSession.sessionId,
          } as RecordingState,
        };
      }

      const state = await getRecordingState();
      return { success: true, state };
    }

    case "GET_PENDING_RECORDING": {
      // No longer used - save happens in panel now
      return { success: true, recording: null };
    }

    case "CLEAR_PENDING_RECORDING": {
      return { success: true };
    }

    case "RUN_AUTOMATION": {
      const automation = (message as { automation: Automation }).automation;
      const result = await executeAutomation(automation);
      return result;
    }

    case "AUTOMATION_PROGRESS": {
      const { runId, eventsCompleted, status, error } = message as {
        runId: string;
        eventsCompleted: number;
        status: "running" | "success" | "failed";
        error?: string;
      };
      await handleAutomationProgress(runId, eventsCompleted, status, error);
      return { success: true };
    }

    case "AUTOMATION_COMPLETE": {
      const { runId, status, error } = message as {
        runId: string;
        status: "running" | "success" | "failed";
        error?: string;
      };
      await handleAutomationComplete(runId, status, error);
      return { success: true };
    }

    default:
      return { success: false, error: "Unknown message type" };
  }
}

// Export for scheduler
export { scheduleAutomation };
