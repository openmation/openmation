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
  getAISettings,
  getActiveAIApiKey,
  getAuthState,
} from "@/lib/storage";
import { API_BASE_URL, fetchAccount } from "@/lib/api";
import { generateId } from "@/lib/utils";
import { getAIProvider } from "@/lib/ai/provider";
import type {
  MessageType,
  RecordedEvent,
  MousePosition,
  Automation,
  RecordingState,
  AIFindElementRequest,
  AIDescribeActionRequest,
  AIFindElementResponse,
  AIDescribeActionResponse,
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
          error:
            "Cannot record on this page. Please navigate to a regular website.",
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
        // The content script has the authoritative events with AI context (screenshots, descriptions)
        const response = (await chrome.tabs.sendMessage(tabId, {
          type: "STOP_RECORDING",
        })) as {
          success: boolean;
          events: RecordedEvent[];
          mouseMovements: MousePosition[];
          startUrl: string;
          duration: number;
        };

        // Use ONLY content script events - they have the AI context (screenshots, descriptions)
        // Don't merge with background events to avoid duplication
        recordingData = {
          events: response.events || [],
          mouseMovements: response.mouseMovements || [],
          startUrl: activeRecordingSession.startUrl,
          duration: Date.now() - activeRecordingSession.startTime,
        };

        console.log(
          "[Openmation] Recording stopped with",
          recordingData.events.length,
          "events"
        );
        console.log(
          "[Openmation] Events with AI context:",
          recordingData.events.filter((e) => e.aiDescription).length
        );
      } catch {
        // Content script might be gone - use what we have from background
        // Note: These won't have AI context (screenshots/descriptions)
        recordingData = {
          events: activeRecordingSession.events,
          mouseMovements: activeRecordingSession.mouseMovements,
          startUrl: activeRecordingSession.startUrl,
          duration: Date.now() - activeRecordingSession.startTime,
        };
        console.log(
          "[Openmation] Using background events (no AI context):",
          recordingData.events.length
        );
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ automation }),
        });

        const shareData = await shareResponse.json();
        if (shareData.success && shareData.shareUrl) {
          shareUrl = shareData.shareUrl;
        }
      } catch (error) {
        console.error("[Openmation] Failed to auto-share automation:", error);
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

    // Screenshot capture for AI-powered recording
    case "CAPTURE_SCREENSHOT": {
      try {
        const windowId = sender.tab?.windowId;
        if (!windowId) {
          return { error: "No window ID available" };
        }

        // Capture visible tab as PNG
        const dataUrl = await chrome.tabs.captureVisibleTab(windowId, {
          format: "png",
        });

        // Return compressed image (compression happens in content script)
        return { screenshot: dataUrl };
      } catch (error) {
        console.error("[Openmation] Screenshot capture failed:", error);
        return { error: "Failed to capture screenshot" };
      }
    }

    case "CAPTURE_ELEMENT_CROP": {
      try {
        const windowId = sender.tab?.windowId;
        if (!windowId) {
          return { error: "No window ID available" };
        }

        const { crop, viewport } = message as {
          crop: { x: number; y: number; width: number; height: number };
          viewport: { width: number; height: number };
        };

        // Capture full visible tab
        const dataUrl = await chrome.tabs.captureVisibleTab(windowId, {
          format: "png",
        });

        // Return with crop parameters - cropping will happen in content script
        return { screenshot: dataUrl, crop, viewport };
      } catch (error) {
        console.error("[Openmation] Element crop capture failed:", error);
        return { error: "Failed to capture element crop" };
      }
    }

    // AI API calls - these run from background to avoid CORS
    case "AI_FIND_ELEMENT": {
      try {
        const settings = await getAISettings();
        const apiKey = await getActiveAIApiKey();

        if (!settings.enabled) {
          return { error: "AI is not enabled" };
        }

        const request = (message as { request: AIFindElementRequest }).request;

        // Log what we're sending to AI
        console.log("[Openmation] 🤖 AI_FIND_ELEMENT Request:", {
          description: request.description,
          hasCurrentScreenshot: !!request.currentScreenshot,
          currentScreenshotSize: request.currentScreenshot?.length || 0,
          hasReferenceScreenshot: !!request.referenceScreenshot,
          referenceScreenshotSize: request.referenceScreenshot?.length || 0,
          hasElementCrop: !!request.elementCrop,
          elementCropSize: request.elementCrop?.length || 0,
          elementRect: request.elementRect,
        });

        let result: AIFindElementResponse;

        if (apiKey) {
          const provider = getAIProvider(settings.provider, apiKey);
          result = await provider.findElement(request);
        } else {
          const auth = await getAuthState();
          if (!auth?.token) {
            return { error: "AI proxy requires authentication" };
          }
          const account = await fetchAccount();
          if (!account.success || !account.plan?.limits?.includesAIProxy) {
            return { error: "AI proxy not available on this plan" };
          }
          const response = await fetch(`${API_BASE_URL}/api/ai/find-element`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify({
              provider: settings.provider,
              request,
            }),
          });
          const data = await response.json();
          if (!response.ok || !data.success) {
            return { error: data.error || "AI request failed" };
          }
          result = data.result;
        }

        // Log what AI returned
        console.log("[Openmation] 🤖 AI_FIND_ELEMENT Response:", {
          x: result.x,
          y: result.y,
          confidence: result.confidence,
          reasoning: result.reasoning,
        });

        return { success: true, result };
      } catch (error) {
        console.error("[Openmation] AI find element failed:", error);
        return {
          error: error instanceof Error ? error.message : "AI request failed",
        };
      }
    }

    case "AI_DESCRIBE_ACTION": {
      try {
        const settings = await getAISettings();
        const apiKey = await getActiveAIApiKey();

        if (!settings.enabled) {
          return { error: "AI is not enabled" };
        }

        const request = (message as { request: AIDescribeActionRequest })
          .request;

        // Log what we're sending to AI
        console.log("[Openmation] 🤖 AI_DESCRIBE_ACTION Request:", {
          actionType: request.actionType,
          coordinates: request.coordinates,
          value: request.value
            ? `"${request.value.substring(0, 20)}..."`
            : undefined,
          hasScreenshot: !!request.screenshot,
          screenshotSize: request.screenshot?.length || 0,
          hasElementCrop: !!request.elementCrop,
          elementCropSize: request.elementCrop?.length || 0,
        });

        let result: AIDescribeActionResponse;

        if (apiKey) {
          const provider = getAIProvider(settings.provider, apiKey);
          result = await provider.describeAction(request);
        } else {
          const auth = await getAuthState();
          if (!auth?.token) {
            return { error: "AI proxy requires authentication" };
          }
          const account = await fetchAccount();
          if (!account.success || !account.plan?.limits?.includesAIProxy) {
            return { error: "AI proxy not available on this plan" };
          }
          const response = await fetch(
            `${API_BASE_URL}/api/ai/describe-action`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
              },
              body: JSON.stringify({
                provider: settings.provider,
                request,
              }),
            }
          );
          const data = await response.json();
          if (!response.ok || !data.success) {
            return { error: data.error || "AI request failed" };
          }
          result = data.result;
        }

        // Log what AI returned
        console.log("[Openmation] 🤖 AI_DESCRIBE_ACTION Response:", {
          description: result.description,
          elementType: result.elementType,
          elementLabel: result.elementLabel,
        });

        return { success: true, result };
      } catch (error) {
        console.error("[Openmation] AI describe action failed:", error);
        return {
          error: error instanceof Error ? error.message : "AI request failed",
        };
      }
    }

    case "AI_TEST_CONNECTION": {
      try {
        const settings = await getAISettings();
        console.log("[Openmation] AI settings:", {
          provider: settings.provider,
          enabled: settings.enabled,
          hasOpenAIKey: !!settings.openaiApiKey,
          hasAnthropicKey: !!settings.anthropicApiKey,
        });

        const apiKey = await getActiveAIApiKey();
        console.log(
          "[Openmation] Active API key:",
          apiKey ? apiKey.substring(0, 10) + "..." : "none"
        );

        if (!apiKey) {
          const auth = await getAuthState();
          if (!auth?.token) {
            return { success: false, error: "API key is not set" };
          }
          const response = await fetch(`${API_BASE_URL}/api/ai/status`, {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          const data = await response.json();
          if (!response.ok || !data.success || !data.includesAIProxy) {
            return {
              success: false,
              error: "AI proxy not available on this plan",
            };
          }
          return { success: true };
        }

        const provider = getAIProvider(settings.provider, apiKey);
        console.log(
          "[Openmation] Testing connection with provider:",
          settings.provider
        );

        const isConnected = await provider.testConnection();
        console.log("[Openmation] Connection test result:", isConnected);

        return {
          success: isConnected,
          error: isConnected ? undefined : "Connection test failed",
        };
      } catch (error) {
        console.error("[Openmation] AI connection test failed:", error);
        return {
          success: false,
          error:
            error instanceof Error ? error.message : "Connection test failed",
        };
      }
    }

    case "GET_AI_STATUS": {
      try {
        const settings = await getAISettings();
        const apiKey = await getActiveAIApiKey();
        const enabled = settings.enabled && !!apiKey;
        return { enabled, provider: settings.provider };
      } catch {
        return { enabled: false };
      }
    }

    default:
      return { success: false, error: "Unknown message type" };
  }
}

// Export for scheduler
export { scheduleAutomation };
