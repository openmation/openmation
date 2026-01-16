// Recorder - Captures ALL interactions exactly as they happen
// Now with AI-powered screenshot capture and rich context for improved replay accuracy
import type {
  RecordedEvent,
  MousePosition,
  AIDescribeActionResponse,
  AIGuidance,
} from "@/lib/types";
import { generateId, getUniqueSelector } from "@/lib/utils";
import { incrementEventCount } from "./panel";
import {
  captureScreenshot,
  captureVisualContext,
  compressImage,
  cropImage,
} from "@/lib/screenshot";
import {
  captureInteractionContext,
  describeInteractionContext,
} from "@/lib/widgetDetection";

let isRecording = false;
let isPaused = false;
let recordedEvents: RecordedEvent[] = [];
let mouseMovements: MousePosition[] = [];
let currentMousePath: MousePosition[] = [];
let startTime = 0;
let sessionId = "";
let aiEnabled = false;

// Check if AI is enabled on startup
async function checkAIEnabled(): Promise<void> {
  try {
    const response = await chrome.runtime.sendMessage({
      type: "GET_AI_STATUS",
    });
    aiEnabled = response?.enabled ?? false;
  } catch {
    aiEnabled = false;
  }
}

// Initialize AI status check
checkAIEnabled();

// Throttle for mouse movement only (capture every N ms)
const MOUSE_MOVE_THROTTLE = 50; // 20fps for mouse moves
let lastMouseMoveTime = 0;

// Get multiple selectors for redundancy
function getElementSelectors(element: Element): {
  primary: string;
  fallbacks: string[];
  textContent?: string;
  attributes: Record<string, string>;
} {
  const primary = getUniqueSelector(element);
  const fallbacks: string[] = [];
  const attributes: Record<string, string> = {};

  if (element.id) {
    fallbacks.push(`#${CSS.escape(element.id)}`);
    attributes["id"] = element.id;
  }

  if (element.className && typeof element.className === "string") {
    const classes = element.className
      .trim()
      .split(/\s+/)
      .filter((c) => c && !c.startsWith("sa-"));
    if (classes.length > 0) {
      fallbacks.push(
        `${element.tagName.toLowerCase()}.${classes
          .map((c) => CSS.escape(c))
          .join(".")}`
      );
    }
  }

  const el = element as HTMLElement;
  if (el.getAttribute) {
    [
      "name",
      "data-testid",
      "data-id",
      "aria-label",
      "placeholder",
      "type",
      "role",
    ].forEach((attr) => {
      const val = el.getAttribute(attr);
      if (val) {
        fallbacks.push(
          `${element.tagName.toLowerCase()}[${attr}="${CSS.escape(val)}"]`
        );
        attributes[attr] = val;
      }
    });
  }

  let textContent: string | undefined;
  if (
    element instanceof HTMLElement &&
    (element.tagName === "BUTTON" || element.tagName === "A")
  ) {
    const text = element.innerText?.trim().slice(0, 50);
    if (text) textContent = text;
  }

  return { primary, fallbacks, textContent, attributes };
}

function getElementPosition(element: Element) {
  const rect = element.getBoundingClientRect();
  return {
    viewportX: rect.left + rect.width / 2,
    viewportY: rect.top + rect.height / 2,
    pageX: rect.left + window.scrollX + rect.width / 2,
    pageY: rect.top + window.scrollY + rect.height / 2,
    rect: {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    },
  };
}

function createEvent(
  type: RecordedEvent["type"],
  element: Element | null,
  extra: Partial<RecordedEvent> = {}
): RecordedEvent {
  const event: RecordedEvent = {
    id: generateId(),
    type,
    timestamp: Date.now() - startTime,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    ...extra,
  };

  if (element) {
    const selectors = getElementSelectors(element);
    event.selector = selectors.primary;
    event.selectorFallbacks = selectors.fallbacks;
    event.elementText = selectors.textContent;
    event.elementAttributes = selectors.attributes;
    event.tagName = element.tagName.toLowerCase();

    const pos = getElementPosition(element);
    event.elementRect = pos.rect;
    event.pageX = pos.pageX;
    event.pageY = pos.pageY;

    if (element instanceof HTMLElement && element.innerText) {
      event.innerText = element.innerText.slice(0, 100);
    }
  }

  if (currentMousePath.length > 0) {
    event.mousePath = [...currentMousePath];
    currentMousePath = [];
  }

  return event;
}

// ============ EVENT HANDLERS ============

function handleClick(e: MouseEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;

  const element = e.target as Element;
  const event = createEvent("click", element, {
    x: e.clientX,
    y: e.clientY,
    pageX: e.pageX,
    pageY: e.pageY,
  });

  recordEvent(event, element);
  showClickFeedback(e.clientX, e.clientY);
}

function handleDblClick(e: MouseEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;

  const element = e.target as Element;
  const event = createEvent("dblclick", element, {
    x: e.clientX,
    y: e.clientY,
    pageX: e.pageX,
    pageY: e.pageY,
  });

  recordEvent(event, element);
}

function handleMouseDown(e: MouseEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;

  const element = e.target as Element;
  const event = createEvent("mousedown", element, {
    x: e.clientX,
    y: e.clientY,
  });

  recordEvent(event, element);
}

function handleMouseUp(e: MouseEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;

  const element = e.target as Element;
  const event = createEvent("mouseup", element, {
    x: e.clientX,
    y: e.clientY,
  });

  recordEvent(event, element);
}

function handleMouseMove(e: MouseEvent): void {
  if (!isRecording || isPaused) return;

  const now = Date.now();
  if (now - lastMouseMoveTime < MOUSE_MOVE_THROTTLE) return;
  lastMouseMoveTime = now;

  const position: MousePosition = {
    x: e.clientX,
    y: e.clientY,
    timestamp: now - startTime,
  };

  mouseMovements.push(position);
  currentMousePath.push(position);

  if (currentMousePath.length > 30) {
    currentMousePath.shift();
  }
}

/**
 * KEY CHANGE: Record EVERY keydown event with the key pressed
 * This allows us to replay the exact sequence of keystrokes
 */
function handleKeyDown(e: KeyboardEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;

  const target = e.target as Element;
  const isFormField =
    target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;

  // Record ALL keys for form fields (this captures typing)
  // For non-form fields, only record special keys
  const specialKeys = [
    "Enter",
    "Tab",
    "Escape",
    "Backspace",
    "Delete",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "End",
    "PageUp",
    "PageDown",
  ];

  const shouldRecord =
    isFormField ||
    specialKeys.includes(e.key) ||
    e.ctrlKey ||
    e.metaKey ||
    e.altKey;

  if (shouldRecord) {
    const event = createEvent("keydown", target, {
      key: e.key,
      keyCode: e.keyCode,
      // Store current value at this moment for debugging
      value: isFormField ? (target as HTMLInputElement).value : undefined,
    });

    // Keydown events don't need AI screenshot (too frequent)
    recordEvent(event);
  }
}

function handleKeyUp(e: KeyboardEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;

  // Only record keyup for special keys (Enter, Tab, Escape)
  // We don't need keyup for every character
  const specialKeys = ["Enter", "Tab", "Escape"];

  if (specialKeys.includes(e.key)) {
    const event = createEvent("keyup", e.target as Element, {
      key: e.key,
      keyCode: e.keyCode,
    });

    recordEvent(event);
  }
}

/**
 * We still record input events but ONLY for the final value
 * This is used as a fallback/verification
 */
function handleInput(e: Event): void {
  if (!isRecording || isPaused) return;

  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  if (!target || isOurElement(target)) return;

  // Don't record input events - we rely on keydown events instead
  // This comment left intentionally to explain why we skip this

  // Actually, let's record input events but mark them differently
  // They serve as checkpoints to verify the value
  const event = createEvent("input", target, {
    value: target.value,
  });

  // Mark this as a value checkpoint (not for replay, just verification)
  event.isCheckpoint = true;

  recordEvent(event);
}

function handleChange(e: Event): void {
  if (!isRecording || isPaused) return;

  const target = e.target as HTMLInputElement | HTMLSelectElement;
  if (!target || isOurElement(target)) return;

  const event = createEvent("change", target, {
    value: target.value,
  });

  // Change events are important - capture AI context
  recordEvent(event, target);
}

function handleScroll(): void {
  if (!isRecording || isPaused) return;

  // Debounce scroll events (they can fire very frequently)
  const lastEvent = recordedEvents[recordedEvents.length - 1];
  const now = Date.now() - startTime;

  if (lastEvent?.type === "scroll" && now - lastEvent.timestamp < 100) {
    lastEvent.scrollX = window.scrollX;
    lastEvent.scrollY = window.scrollY;
    lastEvent.timestamp = now;
    return;
  }

  const event = createEvent("scroll", null, {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  });

  recordEvent(event);
}

function handleFocus(e: FocusEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;

  const target = e.target as Element;
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  ) {
    const event = createEvent("focus", target);
    // Focus events are important for form interactions - capture AI context
    recordEvent(event, target);
  }
}

function handleBlur(e: FocusEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;

  const target = e.target as Element;
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  ) {
    const event = createEvent("blur", target, {
      value: (target as HTMLInputElement).value,
    });
    // Blur events don't need AI screenshot
    recordEvent(event);
  }
}

function handleSubmit(e: Event): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;

  const target = e.target as Element;
  const event = createEvent("submit", target);
  // Submit events are critical - capture AI context
  recordEvent(event, target);
}

function handleBeforeUnload(): void {
  if (!isRecording) return;

  const event = createEvent("navigate", null, {
    url: window.location.href,
  });

  // Navigate events don't need AI context
  recordEvent(event);
  saveRecordingState();
}

// ============ HELPERS ============

function isOurElement(element: Element | null): boolean {
  if (!element) return false;
  return !!(
    element.closest("#openmation-panel") ||
    element.closest("#openmation-cursor")
  );
}

async function recordEvent(
  event: RecordedEvent,
  element?: Element | null
): Promise<void> {
  // Capture AI-powered context for significant events
  const shouldCaptureAI =
    aiEnabled &&
    ["click", "dblclick", "focus", "change", "submit"].includes(event.type);

  if (shouldCaptureAI && element) {
    console.log("[Openmation] 📸 Capturing AI context for:", event.type);
    try {
      // Capture rich interaction context FIRST (synchronous, fast)
      event.interactionContext = captureInteractionContext(element);
      const contextDescription = describeInteractionContext(
        event.interactionContext
      );
      console.log("[Openmation] 🧩 Interaction context:", contextDescription);

      // Log widget detection results
      if (event.interactionContext.widgetContext) {
        console.log("[Openmation] 🎯 Widget detected:", {
          type: event.interactionContext.widgetContext.type,
          state: event.interactionContext.widgetContext.state,
          container:
            event.interactionContext.widgetContext.containerSelector?.slice(
              0,
              50
            ),
        });
      }

      // Log scroll containers if any
      if (event.interactionContext.scrollContainers.length > 0) {
        console.log(
          "[Openmation] 📜 Scroll containers:",
          event.interactionContext.scrollContainers.map((c) => ({
            direction: c.scrollDirection,
            visible: c.isElementVisible,
            needsScroll: !!c.scrollToReveal,
          }))
        );
      }

      // Log preparation steps
      if (event.interactionContext.preparationSteps.length > 0) {
        console.log(
          "[Openmation] 📋 Preparation steps:",
          event.interactionContext.preparationSteps
        );
      }

      // Capture screenshot and element crop in parallel
      const [screenshotResult, elementCropResult] = await Promise.allSettled([
        captureAndCompressScreenshot(),
        captureAndCompressElementCrop(element),
      ]);

      if (screenshotResult.status === "fulfilled") {
        event.screenshot = screenshotResult.value;
        console.log(
          "[Openmation] 📸 Screenshot captured:",
          Math.round(event.screenshot.length / 1024),
          "KB"
        );
      } else {
        console.warn(
          "[Openmation] 📸 Screenshot failed:",
          screenshotResult.reason
        );
      }

      if (elementCropResult.status === "fulfilled") {
        event.elementCrop = elementCropResult.value;
        console.log(
          "[Openmation] 📸 Element crop captured:",
          Math.round(event.elementCrop.length / 1024),
          "KB"
        );
      } else {
        console.warn(
          "[Openmation] 📸 Element crop failed:",
          elementCropResult.reason
        );
      }

      // Capture visual context (synchronous)
      event.visualContext = captureVisualContext(element);
      console.log("[Openmation] 📸 Visual context:", event.visualContext);

      // Request AI description from background (async, don't block)
      // Now includes the rich interaction context for better descriptions
      if (event.screenshot && event.elementCrop) {
        console.log(
          "[Openmation] 🤖 Requesting AI description with rich context..."
        );
        requestAIDescription(event).catch((err) => {
          console.warn("[Openmation] 🤖 AI description failed:", err);
        });
      }
    } catch (error) {
      console.warn("[Openmation] Failed to capture AI context:", error);
      // Continue recording without AI context
    }
  }

  recordedEvents.push(event);

  // Only increment counter for non-checkpoint events
  if (!event.isCheckpoint) {
    incrementEventCount();
  }

  chrome.runtime.sendMessage({ type: "EVENT_RECORDED", event }).catch(() => {});
}

async function captureAndCompressScreenshot(): Promise<string> {
  const screenshot = await captureScreenshot();
  return compressImage(screenshot, 1280, 0.7);
}

async function captureAndCompressElementCrop(
  element: Element
): Promise<string> {
  const rect = element.getBoundingClientRect();
  const padding = 20;

  // Request full screenshot from background
  const response = await new Promise<{
    screenshot: string;
    crop: { x: number; y: number; width: number; height: number };
    viewport: { width: number; height: number };
  }>((resolve, reject) => {
    chrome.runtime.sendMessage(
      {
        type: "CAPTURE_ELEMENT_CROP",
        crop: {
          x: Math.max(0, rect.left - padding),
          y: Math.max(0, rect.top - padding),
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      },
      (resp) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else if (resp?.error) {
          reject(new Error(resp.error));
        } else {
          resolve(resp);
        }
      }
    );
  });

  // Crop the image
  return cropImage(response.screenshot, response.crop, response.viewport);
}

async function requestAIDescription(event: RecordedEvent): Promise<void> {
  if (!event.screenshot || !event.elementCrop) return;

  try {
    const response = await new Promise<{
      success: boolean;
      result?: AIDescribeActionResponse;
      error?: string;
    }>((resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          type: "AI_DESCRIBE_ACTION",
          request: {
            screenshot: event.screenshot,
            elementCrop: event.elementCrop,
            actionType: event.type,
            coordinates: { x: event.x ?? 0, y: event.y ?? 0 },
            value: event.value,
            // Include rich interaction context for enhanced descriptions
            interactionContext: event.interactionContext,
          },
        },
        (resp) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(resp);
          }
        }
      );
    });

    if (response.success && response.result) {
      // Find and update the event in recordedEvents
      const eventIndex = recordedEvents.findIndex((e) => e.id === event.id);
      if (eventIndex >= 0) {
        const targetEvent = recordedEvents[eventIndex];

        // Store the simple description
        targetEvent.aiDescription = response.result.description;

        // Build rich AI guidance from the response
        const aiGuidance: AIGuidance = {
          description: response.result.description,
          elementIdentification:
            response.result.elementIdentification ||
            buildFallbackIdentification(targetEvent),
          preparationSteps:
            response.result.preparationSteps ||
            targetEvent.interactionContext?.preparationSteps ||
            [],
          verificationSteps: response.result.verificationSteps || [],
          widgetType:
            response.result.widgetType ||
            targetEvent.interactionContext?.widgetContext?.type,
          widgetContainer:
            response.result.widgetContainer ||
            targetEvent.interactionContext?.widgetContext?.containerSelector,
        };

        targetEvent.aiGuidance = aiGuidance;

        console.log("[Openmation] 🤖 AI Guidance received:", {
          eventId: event.id,
          description: aiGuidance.description,
          elementIdentification: aiGuidance.elementIdentification?.slice(
            0,
            100
          ),
          widgetType: aiGuidance.widgetType,
          preparationSteps: aiGuidance.preparationSteps.length,
          verificationSteps: aiGuidance.verificationSteps.length,
        });
      }
    }
  } catch (error) {
    console.warn("[Openmation] Failed to get AI description:", error);
  }
}

/**
 * Build a fallback element identification string from available data
 */
function buildFallbackIdentification(event: RecordedEvent): string {
  const parts: string[] = [];

  // Add tag and role info
  if (event.tagName) {
    parts.push(`A ${event.tagName} element`);
  }

  // Add accessibility info
  const accessInfo = event.interactionContext?.accessibilityInfo;
  if (accessInfo?.role) {
    parts.push(`with role="${accessInfo.role}"`);
  }
  if (accessInfo?.label) {
    parts.push(`labeled "${accessInfo.label}"`);
  }

  // Add text content
  if (event.elementText) {
    parts.push(`with text "${event.elementText}"`);
  } else if (event.innerText) {
    parts.push(`containing text "${event.innerText.slice(0, 30)}"`);
  }

  // Add position info
  const visualContext = event.visualContext;
  if (visualContext?.relativePosition) {
    parts.push(`at ${visualContext.relativePosition} of the page`);
  }

  // Add widget context
  const widgetContext = event.interactionContext?.widgetContext;
  if (widgetContext) {
    parts.push(`inside a ${widgetContext.type} (${widgetContext.state})`);
  }

  // Add sibling reference
  const siblings = event.interactionContext?.siblingElements || [];
  if (siblings.length > 0) {
    const nearestSibling = siblings[0];
    parts.push(
      `${nearestSibling.position} the element with text "${nearestSibling.text}"`
    );
  }

  // Add DOM path
  const domPath = event.interactionContext?.domPath || [];
  if (domPath.length > 0) {
    parts.push(`in the path: ${domPath.join(" > ")}`);
  }

  return parts.join(", ") || `Element at position (${event.x}, ${event.y})`;
}

function showClickFeedback(x: number, y: number): void {
  const ripple = document.createElement("div");
  ripple.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(99, 102, 241, 0.3);
    transform: translate(-50%, -50%) scale(0);
    pointer-events: none;
    z-index: 2147483645;
    animation: sa-click-ripple 0.4s ease-out forwards;
  `;

  const style = document.createElement("style");
  style.textContent = `
    @keyframes sa-click-ripple {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
    style.remove();
  }, 400);
}

function saveRecordingState(): void {
  const state = {
    isRecording,
    isPaused,
    events: recordedEvents,
    mouseMovements,
    startUrl: window.location.href,
    startTime,
    sessionId,
  };

  try {
    localStorage.setItem("openmation_recording_state", JSON.stringify(state));
  } catch {
    // Ignore quota errors
  }
}

function loadRecordingState(): boolean {
  try {
    const stored = localStorage.getItem("openmation_recording_state");
    if (!stored) return false;

    const state = JSON.parse(stored);

    if (state.sessionId && state.isRecording) {
      recordedEvents = state.events || [];
      mouseMovements = state.mouseMovements || [];
      startTime = state.startTime;
      sessionId = state.sessionId;
      isRecording = true;
      isPaused = state.isPaused;

      localStorage.removeItem("openmation_recording_state");
      return true;
    }
  } catch {
    // Ignore
  }

  return false;
}

// ============ PUBLIC API ============

export async function startRecording(newSessionId: string): Promise<void> {
  // Always re-check AI status when starting a new recording
  await checkAIEnabled();
  console.log("[Openmation] AI enabled:", aiEnabled);

  if (loadRecordingState()) {
    console.log("[Openmation] Resumed recording from previous page");
    attachListeners();
    return;
  }

  isRecording = true;
  isPaused = false;
  recordedEvents = [];
  mouseMovements = [];
  currentMousePath = [];
  startTime = Date.now();
  sessionId = newSessionId;

  attachListeners();
  console.log("[Openmation] Recording started");
}

export function pauseRecording(): void {
  isPaused = true;
  console.log("[Openmation] Recording paused");
}

export function resumeRecording(): void {
  isPaused = false;
  console.log("[Openmation] Recording resumed");
}

export function stopRecording(): {
  events: RecordedEvent[];
  mouseMovements: MousePosition[];
  startUrl: string;
  duration: number;
} {
  isRecording = false;
  isPaused = false;

  detachListeners();
  localStorage.removeItem("openmation_recording_state");

  // Filter out checkpoint events for cleaner replay
  const eventsForReplay = recordedEvents.filter((e) => !e.isCheckpoint);

  const result = {
    events: eventsForReplay,
    mouseMovements: [...mouseMovements],
    startUrl: window.location.href,
    duration: Date.now() - startTime,
  };

  recordedEvents = [];
  mouseMovements = [];

  console.log(
    "[Openmation] Recording stopped:",
    result.events.length,
    "events"
  );

  return result;
}

export function getRecordingState() {
  return {
    isRecording,
    isPaused,
    events: recordedEvents,
    mouseMovements,
    startUrl: window.location.href,
    startTime,
    sessionId,
  };
}

function attachListeners(): void {
  document.addEventListener("click", handleClick, true);
  document.addEventListener("dblclick", handleDblClick, true);
  document.addEventListener("mousedown", handleMouseDown, true);
  document.addEventListener("mouseup", handleMouseUp, true);
  document.addEventListener("mousemove", handleMouseMove, true);
  document.addEventListener("input", handleInput, true);
  document.addEventListener("change", handleChange, true);
  document.addEventListener("keydown", handleKeyDown, true);
  document.addEventListener("keyup", handleKeyUp, true);
  document.addEventListener("focus", handleFocus, true);
  document.addEventListener("blur", handleBlur, true);
  document.addEventListener("submit", handleSubmit, true);
  window.addEventListener("scroll", handleScroll, true);
  window.addEventListener("beforeunload", handleBeforeUnload);
}

function detachListeners(): void {
  document.removeEventListener("click", handleClick, true);
  document.removeEventListener("dblclick", handleDblClick, true);
  document.removeEventListener("mousedown", handleMouseDown, true);
  document.removeEventListener("mouseup", handleMouseUp, true);
  document.removeEventListener("mousemove", handleMouseMove, true);
  document.removeEventListener("input", handleInput, true);
  document.removeEventListener("change", handleChange, true);
  document.removeEventListener("keydown", handleKeyDown, true);
  document.removeEventListener("keyup", handleKeyUp, true);
  document.removeEventListener("focus", handleFocus, true);
  document.removeEventListener("blur", handleBlur, true);
  document.removeEventListener("submit", handleSubmit, true);
  window.removeEventListener("scroll", handleScroll, true);
  window.removeEventListener("beforeunload", handleBeforeUnload);
}

export function initRecorder(): void {
  if (loadRecordingState()) {
    attachListeners();
    chrome.runtime
      .sendMessage({
        type: "RECORDING_RESUMED_ON_PAGE",
        sessionId,
        eventCount: recordedEvents.length,
      })
      .catch(() => {});
  }
}
