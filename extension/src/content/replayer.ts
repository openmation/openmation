// Replayer - Replays recordings with AI-first element finding
// Uses AI vision to locate elements, falling back to selectors when needed
// Enhanced with rich interaction context for complex UI widgets
import type {
  RecordedEvent,
  Automation,
  AIFindElementResponse,
  ScrollContainer,
  WidgetContext,
} from "@/lib/types";
import {
  createReplayCursor,
  moveReplayCursor,
  clickReplayCursor,
  removeReplayCursor,
} from "./panel";
import { captureScreenshot, compressImage } from "@/lib/screenshot";

let isPlaying = false;
let shouldStop = false;
let aiEnabled = false;

const CONFIG = {
  INITIAL_DELAY: 2000,
  ELEMENT_WAIT_TIMEOUT: 10000,
  SCROLL_SETTLE_TIME: 200,
  CLICK_SETTLE_TIME: 100,
  KEY_DELAY: 30, // Delay between keystrokes
  MIN_EVENT_GAP: 20,
  AI_CONFIDENCE_THRESHOLD: 0.6, // Minimum confidence to use AI result
};

// Smart delays for UI-changing actions
const UI_SETTLE_DELAYS = {
  DROPDOWN_SELECTION: 500, // After clicking dropdown item
  DATE_SELECTION: 400, // After selecting a date
  PANEL_TRIGGER: 300, // After opening a panel/modal
  DEFAULT: 100,
};

// ============ TEXT VERIFICATION ============

// Extract expected text/keywords from AI description
function extractExpectedText(description: string): string[] {
  const keywords: string[] = [];

  // Extract text in single quotes: 'Alanya, Antalya'
  const singleQuoteMatches = description.match(/'([^']+)'/g);
  if (singleQuoteMatches) {
    for (const match of singleQuoteMatches) {
      const text = match.slice(1, -1); // Remove quotes
      keywords.push(text);
      // Also add individual parts if comma-separated
      if (text.includes(",")) {
        keywords.push(...text.split(",").map((s) => s.trim()));
      }
    }
  }

  // Extract text in double quotes: "Submit"
  const doubleQuoteMatches = description.match(/"([^"]+)"/g);
  if (doubleQuoteMatches) {
    for (const match of doubleQuoteMatches) {
      keywords.push(match.slice(1, -1));
    }
  }

  // Extract labeled elements: labeled 'X', labeled "X"
  const labeledMatch = description.match(/label(?:ed|)\s+['"]?([^'"]+)['"]?/gi);
  if (labeledMatch) {
    for (const match of labeledMatch) {
      const label = match
        .replace(/label(?:ed|)\s+['"]?/i, "")
        .replace(/['"]$/, "");
      if (label) keywords.push(label);
    }
  }

  // Extract date numbers for calendar: date '16', '17', etc.
  const dateMatch = description.match(/date\s+['"]?(\d{1,2})['"]?/gi);
  if (dateMatch) {
    for (const match of dateMatch) {
      const num = match.match(/\d+/);
      if (num) keywords.push(num[0]);
    }
  }

  // Extract button labeled: button labeled '17'
  const buttonLabelMatch = description.match(
    /button\s+labeled\s+['"]?(\d+)['"]?/gi
  );
  if (buttonLabelMatch) {
    for (const match of buttonLabelMatch) {
      const num = match.match(/\d+/);
      if (num) keywords.push(num[0]);
    }
  }

  return [...new Set(keywords)]; // Remove duplicates
}

// Verify element contains expected text from description
function verifyElementMatchesDescription(
  element: Element,
  description?: string
): boolean {
  if (!description) return true; // No description to verify against

  const expectedTexts = extractExpectedText(description);
  if (expectedTexts.length === 0) return true; // No specific text to match

  // Get element's text content
  const elementText = element.textContent?.trim().toLowerCase() || "";
  const elementValue = (element as HTMLInputElement).value?.toLowerCase() || "";
  const ariaLabel = element.getAttribute("aria-label")?.toLowerCase() || "";
  const placeholder = element.getAttribute("placeholder")?.toLowerCase() || "";

  // Check if any expected text matches
  for (const expected of expectedTexts) {
    const lowerExpected = expected.toLowerCase();
    if (
      elementText.includes(lowerExpected) ||
      elementValue.includes(lowerExpected) ||
      ariaLabel.includes(lowerExpected) ||
      placeholder.includes(lowerExpected)
    ) {
      console.log("[Replayer] ✓ Text verification passed:", expected);
      return true;
    }
  }

  console.log(
    "[Replayer] ⚠️ Text verification failed. Expected:",
    expectedTexts,
    "Got:",
    elementText.substring(0, 50)
  );
  return false;
}

// Find nearby elements that match the expected text
function findNearbyMatchingElement(
  x: number,
  y: number,
  description?: string
): Element | null {
  if (!description) return null;

  const expectedTexts = extractExpectedText(description);
  if (expectedTexts.length === 0) return null;

  // Search in expanding radius around the AI coordinates
  const searchRadii = [20, 40, 60, 80, 100];
  const offsets = [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];

  for (const radius of searchRadii) {
    for (const [dx, dy] of offsets) {
      const testX = x + dx * radius;
      const testY = y + dy * radius;

      const element = document.elementFromPoint(testX, testY);
      if (element && isElementVisible(element)) {
        const elementText = element.textContent?.toLowerCase() || "";

        for (const expected of expectedTexts) {
          if (elementText.includes(expected.toLowerCase())) {
            console.log(
              "[Replayer] 🎯 Found matching element at offset (",
              dx * radius,
              ",",
              dy * radius,
              "):",
              expected
            );
            // Return the interactive element at this position
            return findInteractiveElementAtPoint(testX, testY) || element;
          }
        }
      }
    }
  }

  // Also search all visible elements matching the expected text
  console.log(
    "[Replayer] 🔍 Searching all visible elements for:",
    expectedTexts
  );
  for (const expected of expectedTexts) {
    // Try to find elements containing this text
    const allElements = document.querySelectorAll("*");
    for (const el of allElements) {
      if (!isElementVisible(el)) continue;

      const text = el.textContent?.trim() || "";
      const ariaLabel = el.getAttribute("aria-label") || "";

      // Check for exact or contained match
      if (
        text.toLowerCase() === expected.toLowerCase() ||
        ariaLabel.toLowerCase().includes(expected.toLowerCase())
      ) {
        // Check if this element is close to the original coordinates
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(elCenterX - x, 2) + Math.pow(elCenterY - y, 2)
        );

        if (distance < 200) {
          // Within reasonable distance
          console.log(
            "[Replayer] 🎯 Found matching element by text search:",
            expected,
            "distance:",
            Math.round(distance)
          );
          return findInteractiveElementAtPoint(elCenterX, elCenterY) || el;
        }
      }
    }
  }

  return null;
}

// Determine the type of action for smart delays
// Now uses interaction context for more accurate detection
function getActionType(
  event: RecordedEvent
): "dropdown" | "date" | "panel" | "default" {
  // First check widget context from recording
  const widgetType =
    event.interactionContext?.widgetContext?.type ||
    event.aiGuidance?.widgetType;

  if (widgetType) {
    // Map widget types to action types
    if (
      [
        "dropdown",
        "select",
        "combobox",
        "autocomplete",
        "menu",
        "list",
      ].includes(widgetType)
    ) {
      return "dropdown";
    }
    if (["datepicker", "calendar", "timepicker"].includes(widgetType)) {
      return "date";
    }
    if (
      ["modal", "dialog", "popover", "stepper", "accordion"].includes(
        widgetType
      )
    ) {
      return "panel";
    }
  }

  // Fall back to text-based detection
  const description = event.aiDescription?.toLowerCase() || "";
  const selector = event.selector?.toLowerCase() || "";

  // Check for dropdown/list selection
  if (
    description.includes("list item") ||
    description.includes("option") ||
    description.includes("dropdown") ||
    description.includes("suggestion") ||
    selector.includes("suggestion") ||
    selector.includes("option") ||
    selector.includes("listbox")
  ) {
    return "dropdown";
  }

  // Check for date picker
  if (
    description.includes("date") ||
    description.includes("calendar") ||
    selector.includes("calendar") ||
    selector.includes("datepicker")
  ) {
    return "date";
  }

  // Check for panel/modal triggers
  if (
    description.includes("misafir") ||
    description.includes("guest") ||
    description.includes("panel") ||
    description.includes("ekleyin") ||
    selector.includes("stepper")
  ) {
    return "panel";
  }

  return "default";
}

// Get the appropriate delay for an action type
function getSettleDelay(
  actionType: "dropdown" | "date" | "panel" | "default"
): number {
  switch (actionType) {
    case "dropdown":
      return UI_SETTLE_DELAYS.DROPDOWN_SELECTION;
    case "date":
      return UI_SETTLE_DELAYS.DATE_SELECTION;
    case "panel":
      return UI_SETTLE_DELAYS.PANEL_TRIGGER;
    default:
      return UI_SETTLE_DELAYS.DEFAULT;
  }
}

// ============ PREPARATION STEPS EXECUTION ============

/**
 * Execute preparation steps before attempting to find the main element
 * This handles things like opening widgets, scrolling containers, etc.
 */
async function executePreparationSteps(event: RecordedEvent): Promise<void> {
  // Get preparation steps from interaction context or AI guidance
  const steps =
    event.interactionContext?.preparationSteps ||
    event.aiGuidance?.preparationSteps ||
    [];

  if (steps.length === 0) return;

  console.log("[Replayer] 📋 Executing", steps.length, "preparation steps");

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    console.log("[Replayer] 📋 Step", i + 1, ":", step);

    try {
      // Parse and execute each step
      if (step.toLowerCase().includes("scroll")) {
        await executeScrollPreparationStep(step, event);
      } else if (
        step.toLowerCase().includes("open") ||
        step.toLowerCase().includes("click")
      ) {
        await executeOpenPreparationStep(step, event);
      } else if (
        step.toLowerCase().includes("wait") ||
        step.toLowerCase().includes("ensure")
      ) {
        await executeWaitPreparationStep(step, event);
      }

      // Wait for UI to settle after each step
      await sleep(200);
      await waitForUIStability(300, 80);
    } catch (error) {
      console.warn("[Replayer] 📋 Preparation step failed:", step, error);
      // Continue with other steps
    }
  }
}

/**
 * Execute a scroll preparation step
 */
async function executeScrollPreparationStep(
  step: string,
  event: RecordedEvent
): Promise<void> {
  // Check if we have scroll container info in the interaction context
  const scrollContainers = event.interactionContext?.scrollContainers || [];

  for (const container of scrollContainers) {
    if (!container.isElementVisible && container.scrollToReveal) {
      await scrollToContainerPosition(container);
    }
  }

  // If no specific containers, try to parse the step text for scroll instructions
  const scrollMatch = step.match(
    /scroll\s+(vertical|horizontal|down|up|left|right)/i
  );
  if (scrollMatch) {
    const direction = scrollMatch[1].toLowerCase();

    // Find any visible scrollable containers
    const scrollableContainers = document.querySelectorAll(
      '[style*="overflow"], [class*="scroll"]'
    );
    for (const el of scrollableContainers) {
      if (isScrollable(el)) {
        const htmlEl = el as HTMLElement;
        const scrollAmount = htmlEl.clientHeight * 0.5;

        if (direction === "down" || direction === "vertical") {
          htmlEl.scrollTop += scrollAmount;
        } else if (direction === "up") {
          htmlEl.scrollTop -= scrollAmount;
        }

        await sleep(150);
        break;
      }
    }
  }
}

/**
 * Scroll a container to the position needed to reveal the target element
 */
async function scrollToContainerPosition(
  container: ScrollContainer
): Promise<void> {
  const el = document.querySelector(container.selector);
  if (!(el instanceof HTMLElement)) {
    console.warn(
      "[Replayer] Could not find scroll container:",
      container.selector
    );
    return;
  }

  if (container.scrollToReveal) {
    console.log("[Replayer] 📜 Scrolling container to reveal element:", {
      container: container.selector.slice(0, 50),
      targetScroll: container.scrollToReveal,
    });

    el.scrollTo({
      left: container.scrollToReveal.x,
      top: container.scrollToReveal.y,
      behavior: "smooth",
    });

    await sleep(200);
    await waitForUIStability(200, 50);
  }
}

/**
 * Execute an open/click preparation step to open a widget
 */
async function executeOpenPreparationStep(
  step: string,
  event: RecordedEvent
): Promise<void> {
  const widgetContext = event.interactionContext?.widgetContext;

  // If we have a trigger selector from the widget context, use it
  if (widgetContext?.triggerSelector) {
    const trigger = document.querySelector(widgetContext.triggerSelector);
    if (trigger instanceof HTMLElement) {
      console.log(
        "[Replayer] 🔓 Opening widget via trigger:",
        widgetContext.triggerSelector.slice(0, 50)
      );
      trigger.click();
      await sleep(300);
      await waitForUIStability(400, 100);
      return;
    }
  }

  // Try to find trigger from the step description
  const selectorMatch = step.match(/click(?:ing)?:?\s*([^,\n]+)/i);
  if (selectorMatch) {
    const selectorHint = selectorMatch[1].trim();
    const trigger = document.querySelector(selectorHint);
    if (trigger instanceof HTMLElement) {
      console.log(
        "[Replayer] 🔓 Opening via parsed selector:",
        selectorHint.slice(0, 50)
      );
      trigger.click();
      await sleep(300);
      await waitForUIStability(400, 100);
    }
  }
}

/**
 * Execute a wait/ensure preparation step
 */
async function executeWaitPreparationStep(
  step: string,
  _event: RecordedEvent
): Promise<void> {
  // General wait for UI stability
  console.log("[Replayer] ⏳ Waiting for UI stability:", step.slice(0, 50));
  await waitForUIStability(500, 100);
}

/**
 * Ensure a widget is in the expected state before interacting
 */
async function ensureWidgetState(widgetContext: WidgetContext): Promise<void> {
  // If widget should be open but isn't, try to open it
  if (widgetContext.state === "open" || widgetContext.state === "expanded") {
    const container = document.querySelector(widgetContext.containerSelector);

    if (!container || !isElementVisible(container)) {
      console.log(
        "[Replayer] 🔓 Widget not visible, attempting to open via trigger"
      );

      if (widgetContext.triggerSelector) {
        const trigger = document.querySelector(widgetContext.triggerSelector);
        if (trigger instanceof HTMLElement) {
          trigger.click();
          await sleep(300);
          await waitForUIStability(400, 100);
        }
      }
    }
  }
}

/**
 * Handle scroll containers from interaction context
 */
async function handleScrollContainers(
  scrollContainers: ScrollContainer[]
): Promise<void> {
  for (const container of scrollContainers) {
    if (!container.isElementVisible && container.scrollToReveal) {
      await scrollToContainerPosition(container);
    }
  }
}

// ============ DROPDOWN SCROLLING ============

// Scroll within dropdown containers to find hidden elements
async function scrollDropdownToFindElement(
  event: RecordedEvent
): Promise<Element | null> {
  const expectedTexts = extractExpectedText(event.aiDescription || "");
  if (expectedTexts.length === 0) return null;

  console.log("[Replayer] 🔍 Looking for dropdown with text:", expectedTexts);

  // Find potential dropdown/list containers
  const dropdownSelectors = [
    '[role="listbox"]',
    '[role="menu"]',
    '[role="list"]',
    '[data-testid*="suggestion"]',
    '[class*="dropdown"]',
    '[class*="suggestion"]',
    '[class*="autocomplete"]',
    '[class*="listbox"]',
    '[class*="options"]',
    // Airbnb specific
    '[id*="location-suggestion"]',
    ".dir-ltr [data-testid]",
  ];

  // Find scrollable containers
  const allContainers = document.querySelectorAll(dropdownSelectors.join(", "));
  const scrollableContainers: Element[] = [];

  for (const container of allContainers) {
    if (isScrollable(container)) {
      scrollableContainers.push(container);
    }
  }

  // Also check for any element that's scrollable and contains list items
  const allScrollable = document.querySelectorAll("*");
  for (const el of allScrollable) {
    if (
      isScrollable(el) &&
      el.querySelectorAll('[role="option"], li, [data-testid*="suggestion"]')
        .length > 2
    ) {
      if (!scrollableContainers.includes(el)) {
        scrollableContainers.push(el);
      }
    }
  }

  console.log(
    "[Replayer] Found",
    scrollableContainers.length,
    "scrollable containers"
  );

  for (const container of scrollableContainers) {
    const result = await scrollContainerToFindText(container, expectedTexts);
    if (result) {
      return result;
    }
  }

  // If no scrollable container found, search the entire page for matching text
  return searchPageForMatchingElement(expectedTexts);
}

// Check if element is scrollable
function isScrollable(element: Element): boolean {
  if (!(element instanceof HTMLElement)) return false;

  const style = window.getComputedStyle(element);
  const overflowY = style.overflowY;
  const overflowX = style.overflowX;

  const isScrollableY =
    (overflowY === "scroll" || overflowY === "auto") &&
    element.scrollHeight > element.clientHeight;
  const isScrollableX =
    (overflowX === "scroll" || overflowX === "auto") &&
    element.scrollWidth > element.clientWidth;

  return isScrollableY || isScrollableX;
}

// Scroll within a container to find text
async function scrollContainerToFindText(
  container: Element,
  expectedTexts: string[]
): Promise<Element | null> {
  if (!(container instanceof HTMLElement)) return null;

  const originalScrollTop = container.scrollTop;
  const maxScrollAttempts = 10;
  const scrollStep = container.clientHeight * 0.7;

  console.log("[Replayer] 🔄 Scrolling container to find:", expectedTexts[0]);

  // First, check if element is already visible
  let found = findTextInContainer(container, expectedTexts);
  if (found) return found;

  // Scroll down to find element
  for (let i = 0; i < maxScrollAttempts; i++) {
    container.scrollTop += scrollStep;
    await sleep(100);

    found = findTextInContainer(container, expectedTexts);
    if (found) {
      console.log(
        "[Replayer] ✓ Found element after scrolling down",
        i + 1,
        "times"
      );
      return found;
    }

    // Check if we've reached the bottom
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 10
    ) {
      break;
    }
  }

  // Reset and try scrolling from top
  container.scrollTop = 0;
  await sleep(100);

  found = findTextInContainer(container, expectedTexts);
  if (found) return found;

  // Restore original position
  container.scrollTop = originalScrollTop;

  return null;
}

// Find element with matching text in container
function findTextInContainer(
  container: Element,
  expectedTexts: string[]
): Element | null {
  const items = container.querySelectorAll(
    '[role="option"], li, [data-testid*="suggestion"], div[class*="option"]'
  );

  for (const item of items) {
    const text = item.textContent?.toLowerCase() || "";

    for (const expected of expectedTexts) {
      if (text.includes(expected.toLowerCase())) {
        // Make sure element is visible
        const rect = item.getBoundingClientRect();
        if (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.top >= 0 &&
          rect.bottom <= window.innerHeight
        ) {
          console.log("[Replayer] 🎯 Found matching item:", expected);
          return item;
        }
      }
    }
  }

  return null;
}

// Search entire page for matching element
function searchPageForMatchingElement(expectedTexts: string[]): Element | null {
  console.log("[Replayer] 🔍 Searching entire page for:", expectedTexts);

  // Look for elements containing the expected text
  for (const expected of expectedTexts) {
    const lowerExpected = expected.toLowerCase();

    // Try common interactive elements first
    const interactiveElements = document.querySelectorAll(
      'button, a, [role="option"], [role="button"], li, [data-testid]'
    );

    for (const el of interactiveElements) {
      const text = el.textContent?.trim().toLowerCase() || "";
      const ariaLabel = el.getAttribute("aria-label")?.toLowerCase() || "";

      if (text.includes(lowerExpected) || ariaLabel.includes(lowerExpected)) {
        if (isElementVisible(el)) {
          console.log(
            "[Replayer] 🎯 Found matching element on page:",
            expected
          );
          return el;
        }
      }
    }
  }

  return null;
}

// ============ UI STABILITY DETECTION ============

// Wait for UI to stabilize (no DOM mutations for a period)
async function waitForUIStability(
  maxWait = 500,
  stableTime = 100
): Promise<void> {
  return new Promise((resolve) => {
    let lastMutationTime = Date.now();
    let resolved = false;

    const observer = new MutationObserver(() => {
      lastMutationTime = Date.now();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    const checkStability = () => {
      if (resolved) return;

      const timeSinceLastMutation = Date.now() - lastMutationTime;
      const totalWaitTime = Date.now() - startTime;

      if (timeSinceLastMutation >= stableTime || totalWaitTime >= maxWait) {
        resolved = true;
        observer.disconnect();
        resolve();
      } else {
        setTimeout(checkStability, 20);
      }
    };

    const startTime = Date.now();
    setTimeout(checkStability, stableTime);
  });
}

// Wait for element to be ready for interaction
async function waitForElementReady(
  element: Element,
  maxWait = 300
): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < maxWait) {
    const rect = element.getBoundingClientRect();

    // Element should have dimensions and be in viewport
    if (rect.width > 0 && rect.height > 0) {
      // Check if element is not animating (position is stable)
      await sleep(50);
      const newRect = element.getBoundingClientRect();

      if (
        Math.abs(rect.left - newRect.left) < 2 &&
        Math.abs(rect.top - newRect.top) < 2 &&
        Math.abs(rect.width - newRect.width) < 2 &&
        Math.abs(rect.height - newRect.height) < 2
      ) {
        return; // Element is stable
      }
    }

    await sleep(50);
  }
}

// Check if AI is enabled
async function checkAIEnabled(): Promise<boolean> {
  try {
    const response = await chrome.runtime.sendMessage({
      type: "GET_AI_STATUS",
    });
    return response?.enabled ?? false;
  } catch {
    return false;
  }
}

// Find element using AI-first approach, with selector fallback
async function findElement(event: RecordedEvent): Promise<Element | null> {
  // Try AI-first if enabled and we have AI context
  if (aiEnabled && (event.screenshot || event.aiDescription)) {
    console.log("[Replayer] Trying AI-first element finding");
    const aiResult = await findElementWithAI(event);
    if (aiResult) {
      console.log(
        "[Replayer] AI found element with confidence:",
        aiResult.confidence
      );
      if (aiResult.confidence >= CONFIG.AI_CONFIDENCE_THRESHOLD) {
        // Find the actual interactive element at the AI-predicted coordinates
        const element = findInteractiveElementAtPoint(
          aiResult.x,
          aiResult.y,
          event.tagName
        );
        if (element && isElementVisible(element)) {
          console.log(
            "[Replayer] ✓ AI coordinates matched element:",
            element.tagName,
            element.id || element.className?.toString().substring(0, 50)
          );

          // Verify element text matches description
          if (verifyElementMatchesDescription(element, event.aiDescription)) {
            return element;
          } else {
            // Text doesn't match - try to find a nearby element that matches
            console.log(
              "[Replayer] 🔍 Text mismatch, searching nearby elements..."
            );
            const betterMatch = findNearbyMatchingElement(
              aiResult.x,
              aiResult.y,
              event.aiDescription
            );
            if (betterMatch) {
              console.log("[Replayer] ✓ Found better matching element nearby");
              return betterMatch;
            }
            // If no better match, still use the element but log warning
            console.log("[Replayer] ⚠️ Using element despite text mismatch");
            return element;
          }
        } else {
          console.log(
            "[Replayer] ⚠️ AI coordinates (",
            aiResult.x,
            ",",
            aiResult.y,
            ") did not match a visible element"
          );
          const rawElement = document.elementFromPoint(aiResult.x, aiResult.y);
          console.log(
            "[Replayer] Raw element at point:",
            rawElement?.tagName || "none"
          );
        }
      } else {
        console.log(
          "[Replayer] ⚠️ AI confidence too low:",
          aiResult.confidence,
          "< threshold",
          CONFIG.AI_CONFIDENCE_THRESHOLD
        );

        // Try scrolling within dropdown/list containers to find hidden elements
        const actionType = getActionType(event);
        if (actionType === "dropdown") {
          console.log(
            "[Replayer] 🔄 Attempting to scroll dropdown to find element..."
          );
          const foundByScroll = await scrollDropdownToFindElement(event);
          if (foundByScroll) {
            console.log("[Replayer] ✓ Found element after scrolling dropdown");
            return foundByScroll;
          }
        }

        // For date picker, wait and retry - calendar may still be loading
        if (actionType === "date") {
          console.log("[Replayer] 🔄 Waiting for calendar to appear...");
          await waitForUIStability(500, 100);

          // Retry AI search after waiting
          const retryResult = await findElementWithAI(event);
          if (
            retryResult &&
            retryResult.confidence >= CONFIG.AI_CONFIDENCE_THRESHOLD
          ) {
            const element = findInteractiveElementAtPoint(
              retryResult.x,
              retryResult.y,
              event.tagName
            );
            if (element && isElementVisible(element)) {
              console.log(
                "[Replayer] ✓ Found element on retry:",
                element.tagName
              );
              return element;
            }
          }

          // Try searching for the date number in the page
          const expectedTexts = extractExpectedText(event.aiDescription || "");
          if (expectedTexts.length > 0) {
            const dateButton = searchPageForMatchingElement(expectedTexts);
            if (dateButton) {
              return dateButton;
            }
          }
        }
      }
    }
  }

  // Fall back to selector-based strategies
  console.log("[Replayer] Falling back to selector-based finding");
  return findElementWithSelectors(event);
}

// Find the actual interactive element at coordinates, not just any element
function findInteractiveElementAtPoint(
  x: number,
  y: number,
  expectedTagName?: string
): Element | null {
  const element = document.elementFromPoint(x, y);
  if (!element) return null;

  // If the element itself is interactive, return it
  if (isInteractiveElement(element)) {
    return element;
  }

  // Check if we clicked on an element inside an interactive parent
  // (e.g., clicked on SVG icon inside a button)
  let parent: Element | null = element;
  let depth = 0;
  while (parent && depth < 5) {
    if (isInteractiveElement(parent)) {
      console.log("[Replayer] Found interactive parent:", parent.tagName);
      return parent;
    }
    parent = parent.parentElement;
    depth++;
  }

  // Check children at this point - maybe we hit a container but the button is inside
  const children = element.querySelectorAll(
    'button, a, input, [role="button"], [role="option"], [role="menuitem"]'
  );
  for (const child of children) {
    const rect = child.getBoundingClientRect();
    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      console.log("[Replayer] Found interactive child:", child.tagName);
      return child;
    }
  }

  // If expected tag matches, use it
  if (
    expectedTagName &&
    element.tagName.toLowerCase() === expectedTagName.toLowerCase()
  ) {
    return element;
  }

  // Last resort: return the original element
  console.log(
    "[Replayer] No interactive element found, using raw element:",
    element.tagName
  );
  return element;
}

function isInteractiveElement(element: Element): boolean {
  const interactiveTags = [
    "BUTTON",
    "A",
    "INPUT",
    "SELECT",
    "TEXTAREA",
    "LABEL",
  ];
  const interactiveRoles = [
    "button",
    "link",
    "checkbox",
    "radio",
    "menuitem",
    "option",
    "tab",
    "listbox",
  ];

  if (interactiveTags.includes(element.tagName)) {
    return true;
  }

  const role = element.getAttribute("role");
  if (role && interactiveRoles.includes(role)) {
    return true;
  }

  // Check for click handlers (elements with onclick or cursor pointer)
  if (element instanceof HTMLElement) {
    const style = window.getComputedStyle(element);
    if (style.cursor === "pointer") {
      return true;
    }
  }

  return false;
}

// AI-powered element finding
// Enhanced to pass rich context for better accuracy
async function findElementWithAI(
  event: RecordedEvent
): Promise<AIFindElementResponse | null> {
  try {
    console.log("[Replayer] 🤖 AI element finding started");

    // Capture current screenshot
    console.log("[Replayer] 📸 Capturing current screenshot...");
    const currentScreenshot = await captureScreenshot();
    const compressedScreenshot = await compressImage(
      currentScreenshot,
      1280,
      0.7
    );
    console.log(
      "[Replayer] 📸 Screenshot size:",
      Math.round(compressedScreenshot.length / 1024),
      "KB"
    );

    // Build description from available context
    // Prefer AI guidance element identification, then AI description
    let description =
      event.aiGuidance?.elementIdentification ||
      event.aiGuidance?.description ||
      event.aiDescription ||
      "";

    if (description) {
      console.log(
        "[Replayer] 🤖 Using description:",
        description.slice(0, 100)
      );
    } else {
      // Construct a description from available data as fallback
      const parts: string[] = [];
      if (event.tagName) parts.push(event.tagName);
      if (event.elementText) parts.push(`with text "${event.elementText}"`);
      if (event.elementAttributes?.placeholder)
        parts.push(`placeholder "${event.elementAttributes.placeholder}"`);
      if (event.elementAttributes?.["aria-label"])
        parts.push(`labeled "${event.elementAttributes["aria-label"]}"`);
      if (event.visualContext?.relativePosition)
        parts.push(`at ${event.visualContext.relativePosition} of page`);
      if (event.interactionContext?.widgetContext) {
        parts.push(`inside a ${event.interactionContext.widgetContext.type}`);
      }
      description =
        parts.join(" ") || `Element at position (${event.x}, ${event.y})`;
      console.log(
        "[Replayer] ⚠️ No AI description, using fallback:",
        description
      );
    }

    // Build AI guidance from recorded data
    const aiGuidance = event.aiGuidance
      ? {
          elementIdentification: event.aiGuidance.elementIdentification,
          widgetType: event.aiGuidance.widgetType,
          widgetContainer: event.aiGuidance.widgetContainer,
          preparationSteps: event.aiGuidance.preparationSteps,
        }
      : undefined;

    console.log("[Replayer] 🤖 Sending to AI:", {
      description: description.slice(0, 80),
      hasReferenceScreenshot: !!event.screenshot,
      hasElementCrop: !!event.elementCrop,
      originalRect: event.elementRect,
      hasAIGuidance: !!aiGuidance,
      hasInteractionContext: !!event.interactionContext,
      widgetType: event.interactionContext?.widgetContext?.type,
    });

    // Request AI to find element with enhanced context
    const response = await new Promise<{
      success: boolean;
      result?: AIFindElementResponse;
      error?: string;
    }>((resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          type: "AI_FIND_ELEMENT",
          request: {
            currentScreenshot: compressedScreenshot,
            referenceScreenshot: event.screenshot,
            elementCrop: event.elementCrop,
            description,
            elementRect: event.elementRect,
            // Enhanced context
            aiGuidance,
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
      console.log("[Replayer] 🤖 AI Response:", {
        x: response.result.x,
        y: response.result.y,
        confidence: response.result.confidence,
        reasoning: response.result.reasoning?.slice(0, 100),
        preparationNeeded: response.result.preparationNeeded,
      });

      // If AI says preparation is needed, handle it
      if (
        response.result.preparationNeeded &&
        response.result.confidence < CONFIG.AI_CONFIDENCE_THRESHOLD
      ) {
        console.log(
          "[Replayer] 🤖 AI suggests preparation:",
          response.result.preparationNeeded
        );
        // Try to execute the suggested preparation
        await executeSuggestedPreparation(
          response.result.preparationNeeded,
          event
        );

        // Retry finding the element
        console.log("[Replayer] 🤖 Retrying after preparation...");
        const retryScreenshot = await captureScreenshot();
        const retryCompressed = await compressImage(retryScreenshot, 1280, 0.7);

        const retryResponse = await new Promise<{
          success: boolean;
          result?: AIFindElementResponse;
          error?: string;
        }>((resolve, reject) => {
          chrome.runtime.sendMessage(
            {
              type: "AI_FIND_ELEMENT",
              request: {
                currentScreenshot: retryCompressed,
                referenceScreenshot: event.screenshot,
                elementCrop: event.elementCrop,
                description,
                elementRect: event.elementRect,
                aiGuidance,
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

        if (retryResponse.success && retryResponse.result) {
          console.log("[Replayer] 🤖 Retry AI Response:", {
            x: retryResponse.result.x,
            y: retryResponse.result.y,
            confidence: retryResponse.result.confidence,
          });
          return retryResponse.result;
        }
      }

      return response.result;
    }

    console.warn("[Replayer] 🤖 AI returned no result:", response.error);
    return null;
  } catch (error) {
    console.warn("[Replayer] 🤖 AI element finding failed:", error);
    return null;
  }
}

/**
 * Execute preparation suggested by AI when element wasn't found
 */
async function executeSuggestedPreparation(
  suggestion: string,
  event: RecordedEvent
): Promise<void> {
  console.log(
    "[Replayer] 🔧 Executing AI-suggested preparation:",
    suggestion.slice(0, 100)
  );

  const lowerSuggestion = suggestion.toLowerCase();

  // Handle common preparation scenarios
  if (
    lowerSuggestion.includes("date picker") ||
    lowerSuggestion.includes("calendar")
  ) {
    // Try to find and click the date picker trigger
    const triggers = document.querySelectorAll(
      'input[type="date"], input[placeholder*="date"], [class*="datepicker"], [data-testid*="date"]'
    );
    for (const trigger of triggers) {
      if (trigger instanceof HTMLElement && isElementVisible(trigger)) {
        console.log("[Replayer] 🔧 Clicking potential date picker trigger");
        trigger.click();
        await sleep(400);
        await waitForUIStability(400, 100);
        return;
      }
    }
  }

  if (
    lowerSuggestion.includes("dropdown") ||
    lowerSuggestion.includes("open")
  ) {
    // Try to find and click dropdown trigger from widget context
    if (event.interactionContext?.widgetContext?.triggerSelector) {
      const trigger = document.querySelector(
        event.interactionContext.widgetContext.triggerSelector
      );
      if (trigger instanceof HTMLElement) {
        console.log("[Replayer] 🔧 Clicking dropdown trigger");
        trigger.click();
        await sleep(300);
        await waitForUIStability(300, 100);
        return;
      }
    }
  }

  if (lowerSuggestion.includes("scroll")) {
    // Handle scroll suggestions
    if (event.interactionContext?.scrollContainers) {
      for (const container of event.interactionContext.scrollContainers) {
        if (!container.isElementVisible) {
          await scrollToContainerPosition(container);
        }
      }
    }
  }

  // General wait for UI
  await waitForUIStability(400, 100);
}

// Selector-based element finding (original logic)
async function findElementWithSelectors(
  event: RecordedEvent
): Promise<Element | null> {
  const strategies: (() => Element | null)[] = [];

  if (event.selector) {
    strategies.push(() => {
      try {
        return document.querySelector(event.selector!);
      } catch {
        return null;
      }
    });
  }

  if (event.selectorFallbacks) {
    for (const fallback of event.selectorFallbacks) {
      strategies.push(() => {
        try {
          return document.querySelector(fallback);
        } catch {
          return null;
        }
      });
    }
  }

  if (event.elementText && event.tagName) {
    strategies.push(() => {
      const elements = document.querySelectorAll(event.tagName!);
      for (const el of elements) {
        if (
          el instanceof HTMLElement &&
          el.innerText?.trim().includes(event.elementText!)
        ) {
          return el;
        }
      }
      return null;
    });
  }

  if (event.elementAttributes) {
    strategies.push(() => {
      const attrs = event.elementAttributes!;
      for (const [key, value] of Object.entries(attrs)) {
        try {
          const el = document.querySelector(`[${key}="${CSS.escape(value)}"]`);
          if (el) return el;
        } catch {
          continue;
        }
      }
      return null;
    });
  }

  const startTime = Date.now();
  let delay = 50;

  while (Date.now() - startTime < CONFIG.ELEMENT_WAIT_TIMEOUT) {
    for (const strategy of strategies) {
      const element = strategy();
      if (element && isElementVisible(element)) {
        return element;
      }
    }
    await sleep(delay);
    delay = Math.min(delay * 1.3, 300);
  }

  for (const strategy of strategies) {
    const element = strategy();
    if (element) return element;
  }

  return null;
}

function isElementVisible(element: Element): boolean {
  if (!(element instanceof HTMLElement)) return true;
  const style = window.getComputedStyle(element);
  if (style.display === "none" || style.visibility === "hidden") return false;
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

async function scrollToElement(element: Element): Promise<void> {
  const rect = element.getBoundingClientRect();
  if (rect.top < 0 || rect.bottom > window.innerHeight) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    await sleep(CONFIG.SCROLL_SETTLE_TIME);
  }
}

async function scrollToPosition(
  scrollX: number,
  scrollY: number
): Promise<void> {
  if (
    Math.abs(window.scrollX - scrollX) > 5 ||
    Math.abs(window.scrollY - scrollY) > 5
  ) {
    window.scrollTo({ left: scrollX, top: scrollY, behavior: "smooth" });
    await sleep(CONFIG.SCROLL_SETTLE_TIME);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============ EVENT EXECUTORS ============

async function executeClick(event: RecordedEvent): Promise<void> {
  console.log("[Replayer] Click:", event.selector);

  if (event.scrollY !== undefined) {
    await scrollToPosition(event.scrollX ?? 0, event.scrollY);
  }

  // Determine action type for smart delays
  const actionType = getActionType(event);
  console.log("[Replayer] Action type:", actionType);

  // Log interaction context if available
  if (event.interactionContext) {
    console.log("[Replayer] 🧩 Interaction context:", {
      widgetType: event.interactionContext.widgetContext?.type,
      widgetState: event.interactionContext.widgetContext?.state,
      scrollContainers: event.interactionContext.scrollContainers.length,
      prepSteps: event.interactionContext.preparationSteps.length,
      domPath: event.interactionContext.domPath.join(" > "),
    });
  }

  // Execute preparation steps FIRST (open widgets, scroll containers, etc.)
  await executePreparationSteps(event);

  // Handle scroll containers from interaction context
  if (event.interactionContext?.scrollContainers) {
    await handleScrollContainers(event.interactionContext.scrollContainers);
  }

  // Ensure widget is in correct state
  if (event.interactionContext?.widgetContext) {
    await ensureWidgetState(event.interactionContext.widgetContext);
  }

  // Wait for UI to stabilize before finding element
  await waitForUIStability(300, 80);

  const element = await findElement(event);
  if (!element) {
    console.warn("[Replayer] Element not found:", event.selector);
    return;
  }

  await scrollToElement(element);

  // Wait for element to be ready (not animating)
  await waitForElementReady(element, 200);

  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  moveReplayCursor(x, y);
  await sleep(30);
  clickReplayCursor();

  const eventInit: MouseEventInit = {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: x,
    clientY: y,
    button: 0,
  };

  element.dispatchEvent(new MouseEvent("mousedown", eventInit));
  await sleep(20);
  element.dispatchEvent(new MouseEvent("mouseup", eventInit));
  element.dispatchEvent(new MouseEvent("click", eventInit));

  if (element instanceof HTMLElement) {
    element.click();
  }

  // Use smart delay based on action type
  const settleDelay = getSettleDelay(actionType);
  console.log("[Replayer] Waiting", settleDelay, "ms for UI to settle");
  await sleep(settleDelay);

  // Wait for any UI changes triggered by the click
  await waitForUIStability(settleDelay, 80);
}

async function executeDblClick(event: RecordedEvent): Promise<void> {
  const element = await findElement(event);
  if (!element) return;

  await scrollToElement(element);

  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  moveReplayCursor(x, y);
  clickReplayCursor();
  await sleep(50);
  clickReplayCursor();

  element.dispatchEvent(
    new MouseEvent("dblclick", {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: x,
      clientY: y,
    })
  );

  await sleep(CONFIG.CLICK_SETTLE_TIME);
}

/**
 * Execute a SINGLE keydown event - this is the key to accurate replay
 * Each keystroke is replayed individually, exactly as recorded
 */
async function executeKeyDown(event: RecordedEvent): Promise<void> {
  if (!event.key) return;

  console.log("[Replayer] KeyDown:", event.key);

  // Find the target element (usually the focused input)
  let target: Element | null = null;

  if (event.selector) {
    target = await findElement(event);
  }

  // Fall back to currently focused element or find by selector
  if (!target) {
    target = document.activeElement;
  }

  if (!target || target === document.body) {
    console.warn("[Replayer] No target for keydown, trying to find input");
    // Try to find any focused input
    target =
      document.querySelector("input:focus, textarea:focus") ||
      document.activeElement;
  }

  if (!target) {
    console.warn("[Replayer] No target element for key:", event.key);
    return;
  }

  // Create and dispatch the keydown event
  const keyboardEvent = new KeyboardEvent("keydown", {
    key: event.key,
    code: getKeyCode(event.key),
    keyCode: event.keyCode || getKeyCodeNumber(event.key),
    which: event.keyCode || getKeyCodeNumber(event.key),
    bubbles: true,
    cancelable: true,
    composed: true,
  });

  target.dispatchEvent(keyboardEvent);

  // For printable characters, also update the input value and dispatch input event
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement
  ) {
    if (event.key.length === 1) {
      // Single character - append it
      const start = target.selectionStart ?? target.value.length;
      const end = target.selectionEnd ?? target.value.length;
      const before = target.value.substring(0, start);
      const after = target.value.substring(end);

      target.value = before + event.key + after;
      target.selectionStart = target.selectionEnd = start + 1;

      // Dispatch input event
      target.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          cancelable: true,
          inputType: "insertText",
          data: event.key,
        })
      );
    } else if (event.key === "Backspace") {
      // Handle backspace
      const start = target.selectionStart ?? target.value.length;
      const end = target.selectionEnd ?? target.value.length;

      if (start === end && start > 0) {
        target.value =
          target.value.substring(0, start - 1) + target.value.substring(end);
        target.selectionStart = target.selectionEnd = start - 1;
      } else if (start !== end) {
        target.value =
          target.value.substring(0, start) + target.value.substring(end);
        target.selectionStart = target.selectionEnd = start;
      }

      target.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          cancelable: true,
          inputType: "deleteContentBackward",
        })
      );
    } else if (event.key === "Delete") {
      // Handle delete
      const start = target.selectionStart ?? 0;
      const end = target.selectionEnd ?? 0;

      if (start === end && start < target.value.length) {
        target.value =
          target.value.substring(0, start) + target.value.substring(end + 1);
      } else if (start !== end) {
        target.value =
          target.value.substring(0, start) + target.value.substring(end);
      }
      target.selectionStart = target.selectionEnd = start;

      target.dispatchEvent(
        new InputEvent("input", {
          bubbles: true,
          cancelable: true,
          inputType: "deleteContentForward",
        })
      );
    }
  }

  // Handle Enter for form submission
  if (event.key === "Enter" && target) {
    const form = (target as Element).closest("form");
    if (form) {
      await sleep(50);
      const submitBtn = form.querySelector(
        'button[type="submit"], input[type="submit"]'
      );
      if (submitBtn instanceof HTMLElement) {
        submitBtn.click();
      } else {
        form.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true })
        );
      }
    }
  }

  await sleep(CONFIG.KEY_DELAY);
}

async function executeKeyUp(event: RecordedEvent): Promise<void> {
  if (!event.key) return;

  const target = document.activeElement || document.body;

  target.dispatchEvent(
    new KeyboardEvent("keyup", {
      key: event.key,
      code: getKeyCode(event.key),
      keyCode: event.keyCode,
      bubbles: true,
      cancelable: true,
    })
  );

  await sleep(10);
}

async function executeFocus(event: RecordedEvent): Promise<void> {
  console.log("[Replayer] Focus:", event.selector);

  // Wait for UI stability before finding element
  await waitForUIStability(200, 60);

  const element = (await findElement(event)) as HTMLElement;
  if (!element) {
    console.warn("[Replayer] Element not found for focus");
    return;
  }

  await scrollToElement(element);
  await waitForElementReady(element, 150);

  const rect = element.getBoundingClientRect();
  moveReplayCursor(rect.left + rect.width / 2, rect.top + rect.height / 2);
  clickReplayCursor();

  // Simulate click into field
  element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
  element.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
  element.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  element.focus();
  element.dispatchEvent(new FocusEvent("focus", { bubbles: false }));
  element.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));

  // Select all text if it's an input
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  ) {
    element.select();
  }

  await sleep(100);
  await waitForUIStability(200, 60);
}

async function executeBlur(event: RecordedEvent): Promise<void> {
  console.log("[Replayer] Blur:", event.selector);

  const element = event.selector
    ? await findElement(event)
    : document.activeElement;

  if (element instanceof HTMLElement) {
    element.dispatchEvent(new FocusEvent("blur", { bubbles: false }));
    element.dispatchEvent(new FocusEvent("focusout", { bubbles: true }));
    element.blur();
  }

  await sleep(30);
}

async function executeChange(event: RecordedEvent): Promise<void> {
  console.log("[Replayer] Change:", event.selector);

  const element = (await findElement(event)) as
    | HTMLInputElement
    | HTMLSelectElement;
  if (!element) return;

  if (event.value !== undefined) {
    element.value = event.value;
  }

  element.dispatchEvent(new Event("change", { bubbles: true }));
  await sleep(30);
}

async function executeScroll(event: RecordedEvent): Promise<void> {
  await scrollToPosition(event.scrollX ?? 0, event.scrollY ?? 0);
}

async function executeSubmit(event: RecordedEvent): Promise<void> {
  console.log("[Replayer] Submit:", event.selector);

  const element = (await findElement(event)) as HTMLFormElement;
  if (!element) return;

  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
    await sleep(50);
  }

  const submitBtn = element.querySelector(
    'button[type="submit"], input[type="submit"], button:not([type])'
  );
  if (submitBtn instanceof HTMLElement) {
    submitBtn.click();
  } else {
    element.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
  }

  await sleep(CONFIG.CLICK_SETTLE_TIME);
}

async function executeNavigate(event: RecordedEvent): Promise<void> {
  if (event.url && event.url !== window.location.href) {
    console.log("[Replayer] Navigate:", event.url);
    window.location.href = event.url;
    await sleep(1000);
  }
}

// Helper functions
function getKeyCode(key: string): string {
  const map: Record<string, string> = {
    Enter: "Enter",
    Tab: "Tab",
    Escape: "Escape",
    Backspace: "Backspace",
    Delete: "Delete",
    ArrowUp: "ArrowUp",
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowRight: "ArrowRight",
    " ": "Space",
  };
  if (map[key]) return map[key];
  if (key.length === 1) {
    if (key >= "a" && key <= "z") return `Key${key.toUpperCase()}`;
    if (key >= "A" && key <= "Z") return `Key${key}`;
    if (key >= "0" && key <= "9") return `Digit${key}`;
  }
  return key;
}

function getKeyCodeNumber(key: string): number {
  if (key.length === 1) {
    const code = key.toUpperCase().charCodeAt(0);
    if (code >= 65 && code <= 90) return code; // A-Z
    if (code >= 48 && code <= 57) return code; // 0-9
  }
  const specialCodes: Record<string, number> = {
    Enter: 13,
    Tab: 9,
    Escape: 27,
    Backspace: 8,
    Delete: 46,
    ArrowUp: 38,
    ArrowDown: 40,
    ArrowLeft: 37,
    ArrowRight: 39,
    " ": 32,
  };
  return specialCodes[key] || 0;
}

// Execute a single event
async function executeEvent(event: RecordedEvent): Promise<void> {
  if (shouldStop) return;

  if (event.x !== undefined && event.y !== undefined) {
    moveReplayCursor(event.x, event.y);
  }

  switch (event.type) {
    case "click":
      await executeClick(event);
      break;
    case "dblclick":
      await executeDblClick(event);
      break;
    case "keydown":
      await executeKeyDown(event);
      break;
    case "keyup":
      await executeKeyUp(event);
      break;
    case "focus":
      await executeFocus(event);
      break;
    case "blur":
      await executeBlur(event);
      break;
    case "change":
      await executeChange(event);
      break;
    case "scroll":
      await executeScroll(event);
      break;
    case "submit":
      await executeSubmit(event);
      break;
    case "navigate":
      await executeNavigate(event);
      break;
    case "input":
      // Input events are handled via keydown - skip
      break;
    case "mousedown":
    case "mouseup":
    case "mousemove":
      // Visual only
      break;
  }
}

// Main replay function
export async function replayAutomation(
  automation: Automation,
  onProgress?: (completed: number, total: number) => void
): Promise<{ success: boolean; error?: string; eventsCompleted: number }> {
  console.log("[Replayer] Starting:", automation.name);
  console.log("[Replayer] Events:", automation.events?.length);

  isPlaying = true;
  shouldStop = false;

  // Check if AI is enabled for this replay
  aiEnabled = await checkAIEnabled();
  console.log("[Replayer] AI enabled:", aiEnabled);

  const events = automation.events;
  if (!events || events.length === 0) {
    return { success: false, error: "No events to replay", eventsCompleted: 0 };
  }

  createReplayCursor();

  console.log(`[Replayer] Waiting ${CONFIG.INITIAL_DELAY}ms...`);
  await sleep(CONFIG.INITIAL_DELAY);

  let eventsCompleted = 0;

  try {
    for (let i = 0; i < events.length; i++) {
      if (shouldStop) {
        return { success: false, error: "Stopped by user", eventsCompleted };
      }

      const event = events[i];
      const prevEvent = events[i - 1];

      // Use recorded timing
      if (prevEvent) {
        const gap = event.timestamp - prevEvent.timestamp;
        const waitTime = Math.min(Math.max(gap, CONFIG.MIN_EVENT_GAP), 3000);
        await sleep(waitTime);
      }

      console.log(
        `[Replayer] ${i + 1}/${events.length}: ${event.type}${
          event.key ? ` (${event.key})` : ""
        }`
      );
      await executeEvent(event);

      eventsCompleted = i + 1;
      onProgress?.(eventsCompleted, events.length);
    }

    console.log("[Replayer] Complete!");
    await sleep(300);
    removeReplayCursor();
    isPlaying = false;

    return { success: true, eventsCompleted };
  } catch (error) {
    console.error("[Replayer] Error:", error);
    removeReplayCursor();
    isPlaying = false;

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      eventsCompleted,
    };
  }
}

export function stopReplay(): void {
  shouldStop = true;
  isPlaying = false;
  removeReplayCursor();
}

export function isReplaying(): boolean {
  return isPlaying;
}
