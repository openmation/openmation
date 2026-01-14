// Content Script Entry Point
import {
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  getRecordingState,
  initRecorder,
} from "./recorder";
import { replayAutomation, stopReplay } from "./replayer";
import {
  createPanel,
  removePanel,
  updatePanelState,
  restorePanelState,
} from "./panel";
import type { MessageType, Automation } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";

console.log(
  "[Openmation] Content script loaded on:",
  window.location.href
);

// Initialize - check for existing recording session
initRecorder();

// Check if we're on a shared automation run page
checkForSharedAutomation();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(
  (
    message: MessageType | { type: string; [key: string]: unknown },
    _sender,
    sendResponse
  ) => {
    console.log("[Openmation] Content received:", message.type);

    handleMessage(message)
      .then(sendResponse)
      .catch((error) => {
        console.error("[Openmation] Error:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true; // Keep channel open for async response
  }
);

// Listen for messages from the page (run page communication)
window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (!event.data || !event.data.type) return;

  switch (event.data.type) {
    case "OPENMATION_START_RECORDING":
      chrome.runtime.sendMessage({ type: "START_RECORDING_FROM_PANEL" });
      break;

    case "OPENMATION_CHECK_EXTENSION":
      // Respond immediately to extension check from run page
      console.log("[Openmation] Extension check received, responding...");
      window.postMessage({ type: "OPENMATION_EXTENSION_READY" }, "*");
      break;

    case "OPENMATION_RUN_SHARED":
      // Run a shared automation
      console.log(
        "[Openmation] Received SIMPLEST_RUN_SHARED:",
        event.data.automationId
      );
      if (event.data.automationId) {
        runSharedAutomation(event.data.automationId);
      }
      break;
  }
});

// Immediately announce presence on the page (for run pages that loaded before us)
setTimeout(() => {
  window.postMessage({ type: "OPENMATION_EXTENSION_READY" }, "*");
}, 100);

async function handleMessage(
  message: MessageType | { type: string; [key: string]: unknown }
): Promise<unknown> {
  switch (message.type) {
    // Ping to check if content script is loaded
    case "PING": {
      return { success: true, loaded: true };
    }

    case "INJECT_PANEL": {
      console.log("[Openmation] Creating panel...");
      createPanel();
      return { success: true };
    }

    case "REMOVE_PANEL": {
      removePanel();
      return { success: true };
    }

    case "START_RECORDING": {
      const sessionId =
        (message as { sessionId?: string }).sessionId || crypto.randomUUID();
      startRecording(sessionId);
      updatePanelState({
        mode: "recording",
        eventCount: 0,
        duration: 0,
        startTime: Date.now(),
      });

      // Show recording controls, hide start button
      const panel = document.getElementById("openmation-panel");
      if (panel) {
        const startView = panel.querySelector(".sa-start-view") as HTMLElement;
        const recordingView = panel.querySelector(
          ".sa-recording-view"
        ) as HTMLElement;
        if (startView) startView.style.display = "none";
        if (recordingView) recordingView.style.display = "block";
      }
      return { success: true, sessionId };
    }

    case "RESTORE_RECORDING_STATE": {
      // Called after page navigation to restore panel state
      const { sessionId, eventCount, duration, isPaused } =
        message as unknown as {
          sessionId: string;
          eventCount: number;
          duration: number;
          isPaused: boolean;
        };

      // Resume recording in the recorder
      startRecording(sessionId);

      // Restore panel visual state
      restorePanelState(eventCount, duration, isPaused);

      return { success: true };
    }

    case "PAUSE_RECORDING": {
      pauseRecording();
      updatePanelState({ mode: "paused" });
      return { success: true };
    }

    case "RESUME_RECORDING": {
      resumeRecording();
      updatePanelState({ mode: "recording" });
      return { success: true };
    }

    case "STOP_RECORDING": {
      const result = stopRecording();
      return { success: true, ...result };
    }

    case "GET_RECORDING_STATE": {
      const state = getRecordingState();
      return { success: true, state };
    }

    case "RUN_AUTOMATION": {
      const automation = (message as { automation: unknown }).automation;
      if (!automation) {
        return { success: false, error: "No automation provided" };
      }

      // Run async - don't await
      replayAutomation(
        automation as Parameters<typeof replayAutomation>[0],
        (completed, total) => {
          chrome.runtime
            .sendMessage({
              type: "AUTOMATION_PROGRESS",
              runId: (automation as { id: string }).id,
              eventsCompleted: completed,
              totalEvents: total,
              status: "running",
            })
            .catch(() => {});
        }
      ).then((result) => {
        chrome.runtime
          .sendMessage({
            type: "AUTOMATION_COMPLETE",
            runId: (automation as { id: string }).id,
            status: result.success ? "success" : "failed",
            error: result.error,
            eventsCompleted: result.eventsCompleted,
          })
          .catch(() => {});
      });

      return { success: true, message: "Replay started" };
    }

    case "STOP_AUTOMATION": {
      stopReplay();
      return { success: true };
    }

    default:
      return { success: false, error: "Unknown message type" };
  }
}

// Check if we're on a shared automation page and handle accordingly
function checkForSharedAutomation(): void {
  const url = window.location.href;

  // Check for run page pattern: /run/:id
  const runPageMatch = url.match(/\/run\/([a-zA-Z0-9_-]+)$/);

  if (runPageMatch) {
    const automationId = runPageMatch[1];
    console.log("[Openmation] Detected shared automation page:", automationId);

    // Signal to the page that extension is ready
    setTimeout(() => {
      window.postMessage({ type: "OPENMATION_EXTENSION_READY" }, "*");
    }, 100);
  }
}

// Fetch and run a shared automation
async function runSharedAutomation(automationId: string): Promise<void> {
  console.log("[Openmation] Running shared automation:", automationId);

  try {
    // Fetch automation from API
    console.log(
      "[Openmation] Fetching from:",
      `${API_BASE_URL}/api/automations/${automationId}`
    );
    const response = await fetch(
      `${API_BASE_URL}/api/automations/${automationId}`
    );
    const data = await response.json();

    console.log("[Openmation] API response:", data);

    if (!response.ok || !data.success) {
      console.error("[Openmation] Failed to fetch automation:", data.error);
      alert("Failed to load automation: " + (data.error || "Unknown error"));
      return;
    }

    const automation = data.automation as Automation;
    console.log(
      "[Openmation] Automation loaded:",
      automation.name,
      "startUrl:",
      automation.startUrl
    );

    // Redirect to start URL and run there
    if (
      automation.startUrl &&
      !window.location.href.startsWith(automation.startUrl.split("?")[0])
    ) {
      // Store automation in session storage to run after redirect
      console.log(
        "[Openmation] Storing automation and redirecting to:",
        automation.startUrl
      );
      sessionStorage.setItem(
        "openmation_pending_automation",
        JSON.stringify(automation)
      );
      window.location.href = automation.startUrl;
    } else {
      // Already on the right page, run immediately
      console.log("[Openmation] Already on target page, running immediately");
      executeAutomation(automation);
    }
  } catch (error) {
    console.error("[Openmation] Error running shared automation:", error);
    alert("Failed to run automation. Please try again.");
  }
}

// Execute an automation
function executeAutomation(automation: Automation): void {
  console.log("[Openmation] Executing automation:", automation.name);
  console.log("[Openmation] Events count:", automation.events?.length);
  console.log("[Openmation] First event:", automation.events?.[0]);

  if (!automation.events || automation.events.length === 0) {
    console.error("[Openmation] No events in automation!");
    return;
  }

  replayAutomation(automation, (completed, total) => {
    console.log(`[Openmation] Progress: ${completed}/${total}`);
  })
    .then((result) => {
      if (result.success) {
        console.log("[Openmation] Automation completed successfully");
      } else {
        console.error("[Openmation] Automation failed:", result.error);
      }
    })
    .catch((error) => {
      console.error("[Openmation] Replay error:", error);
    });
}

// Check for pending automation to run (after redirect from share page)
async function checkPendingAutomation(): Promise<void> {
  // Don't run on the share page itself (openmation.dev/run/:id)
  const hostname = window.location.hostname;
  const isShareHost =
    hostname === "openmation.dev" ||
    hostname === "www.openmation.dev" ||
    hostname === "api.openmation.dev";

  if (isShareHost && window.location.pathname.startsWith("/run/")) {
    console.log("[Openmation] On run page, skipping pending check");
    return;
  }

  // Check for automation ID in URL hash (from share page redirect)
  const hash = window.location.hash;
  const match = hash.match(/openmation_run=([a-zA-Z0-9_-]+)/);

  if (match) {
    const automationId = match[1];
    console.log("[Openmation] Found automation ID in URL:", automationId);

    // Clean the hash from URL without triggering reload
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );

    // Fetch and run
    try {
      console.log("[Openmation] Fetching automation from API...");
      const response = await fetch(
        `${API_BASE_URL}/api/automations/${automationId}`
      );
      const data = await response.json();

      if (data.success && data.automation) {
        console.log(
          "[Openmation] Fetched automation, executing:",
          data.automation.name
        );
        setTimeout(() => {
          executeAutomation(data.automation as Automation);
        }, 1500);
      } else {
        console.error("[Openmation] Failed to fetch automation:", data.error);
        alert("Failed to load automation. It may have expired.");
      }
    } catch (error) {
      console.error("[Openmation] Error fetching automation:", error);
      alert("Failed to connect to automation server.");
    }
    return;
  }
}

// Run pending automation check after page loads
setTimeout(checkPendingAutomation, 500);
