// Replayer - Replays recordings with AI-first element finding
// Uses AI vision to locate elements, falling back to selectors when needed
import type { RecordedEvent, Automation, AIFindElementResponse } from '@/lib/types';
import { 
  createReplayCursor, 
  moveReplayCursor, 
  clickReplayCursor, 
  removeReplayCursor 
} from './panel';
import { captureScreenshot, compressImage } from '@/lib/screenshot';

let isPlaying = false;
let shouldStop = false;
let aiEnabled = false;

const CONFIG = {
  INITIAL_DELAY: 2000,
  ELEMENT_WAIT_TIMEOUT: 10000,
  SCROLL_SETTLE_TIME: 200,
  CLICK_SETTLE_TIME: 100,
  KEY_DELAY: 30,  // Delay between keystrokes
  MIN_EVENT_GAP: 20,
  AI_CONFIDENCE_THRESHOLD: 0.6, // Minimum confidence to use AI result
};

// Check if AI is enabled
async function checkAIEnabled(): Promise<boolean> {
  try {
    const response = await chrome.runtime.sendMessage({ type: 'GET_AI_STATUS' });
    return response?.enabled ?? false;
  } catch {
    return false;
  }
}

// Find element using AI-first approach, with selector fallback
async function findElement(event: RecordedEvent): Promise<Element | null> {
  // Try AI-first if enabled and we have AI context
  if (aiEnabled && (event.screenshot || event.aiDescription)) {
    console.log('[Replayer] Trying AI-first element finding');
    const aiResult = await findElementWithAI(event);
    if (aiResult) {
      console.log('[Replayer] AI found element with confidence:', aiResult.confidence);
      if (aiResult.confidence >= CONFIG.AI_CONFIDENCE_THRESHOLD) {
        // Find the element at the AI-predicted coordinates
        const element = document.elementFromPoint(aiResult.x, aiResult.y);
        if (element && isElementVisible(element)) {
          return element;
        }
      }
    }
  }

  // Fall back to selector-based strategies
  console.log('[Replayer] Falling back to selector-based finding');
  return findElementWithSelectors(event);
}

// AI-powered element finding
async function findElementWithAI(event: RecordedEvent): Promise<AIFindElementResponse | null> {
  try {
    // Capture current screenshot
    const currentScreenshot = await captureScreenshot();
    const compressedScreenshot = await compressImage(currentScreenshot, 1280, 0.7);

    // Build description from available context
    let description = event.aiDescription || '';
    if (!description) {
      // Construct a description from available data
      const parts: string[] = [];
      if (event.tagName) parts.push(event.tagName);
      if (event.elementText) parts.push(`with text "${event.elementText}"`);
      if (event.elementAttributes?.placeholder) parts.push(`placeholder "${event.elementAttributes.placeholder}"`);
      if (event.elementAttributes?.['aria-label']) parts.push(`labeled "${event.elementAttributes['aria-label']}"`);
      if (event.visualContext?.relativePosition) parts.push(`at ${event.visualContext.relativePosition} of page`);
      description = parts.join(' ') || `Element at position (${event.x}, ${event.y})`;
    }

    // Request AI to find element
    const response = await new Promise<{ success: boolean; result?: AIFindElementResponse; error?: string }>((resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          type: 'AI_FIND_ELEMENT',
          request: {
            currentScreenshot: compressedScreenshot,
            referenceScreenshot: event.screenshot,
            elementCrop: event.elementCrop,
            description,
            elementRect: event.elementRect,
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
      return response.result;
    }

    return null;
  } catch (error) {
    console.warn('[Replayer] AI element finding failed:', error);
    return null;
  }
}

// Selector-based element finding (original logic)
async function findElementWithSelectors(event: RecordedEvent): Promise<Element | null> {
  const strategies: (() => Element | null)[] = [];
  
  if (event.selector) {
    strategies.push(() => {
      try { return document.querySelector(event.selector!); } catch { return null; }
    });
  }
  
  if (event.selectorFallbacks) {
    for (const fallback of event.selectorFallbacks) {
      strategies.push(() => {
        try { return document.querySelector(fallback); } catch { return null; }
      });
    }
  }
  
  if (event.elementText && event.tagName) {
    strategies.push(() => {
      const elements = document.querySelectorAll(event.tagName!);
      for (const el of elements) {
        if (el instanceof HTMLElement && el.innerText?.trim().includes(event.elementText!)) {
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
        } catch { continue; }
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
  if (style.display === 'none' || style.visibility === 'hidden') return false;
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

async function scrollToElement(element: Element): Promise<void> {
  const rect = element.getBoundingClientRect();
  if (rect.top < 0 || rect.bottom > window.innerHeight) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await sleep(CONFIG.SCROLL_SETTLE_TIME);
  }
}

async function scrollToPosition(scrollX: number, scrollY: number): Promise<void> {
  if (Math.abs(window.scrollX - scrollX) > 5 || Math.abs(window.scrollY - scrollY) > 5) {
    window.scrollTo({ left: scrollX, top: scrollY, behavior: 'smooth' });
    await sleep(CONFIG.SCROLL_SETTLE_TIME);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============ EVENT EXECUTORS ============

async function executeClick(event: RecordedEvent): Promise<void> {
  console.log('[Replayer] Click:', event.selector);
  
  if (event.scrollY !== undefined) {
    await scrollToPosition(event.scrollX ?? 0, event.scrollY);
  }
  
  const element = await findElement(event);
  if (!element) {
    console.warn('[Replayer] Element not found:', event.selector);
    return;
  }
  
  await scrollToElement(element);
  
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
  
  element.dispatchEvent(new MouseEvent('mousedown', eventInit));
  await sleep(20);
  element.dispatchEvent(new MouseEvent('mouseup', eventInit));
  element.dispatchEvent(new MouseEvent('click', eventInit));
  
  if (element instanceof HTMLElement) {
    element.click();
  }
  
  await sleep(CONFIG.CLICK_SETTLE_TIME);
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
  
  element.dispatchEvent(new MouseEvent('dblclick', {
    bubbles: true, cancelable: true, view: window, clientX: x, clientY: y,
  }));
  
  await sleep(CONFIG.CLICK_SETTLE_TIME);
}

/**
 * Execute a SINGLE keydown event - this is the key to accurate replay
 * Each keystroke is replayed individually, exactly as recorded
 */
async function executeKeyDown(event: RecordedEvent): Promise<void> {
  if (!event.key) return;
  
  console.log('[Replayer] KeyDown:', event.key);
  
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
    console.warn('[Replayer] No target for keydown, trying to find input');
    // Try to find any focused input
    target = document.querySelector('input:focus, textarea:focus') || 
             document.activeElement;
  }
  
  if (!target) {
    console.warn('[Replayer] No target element for key:', event.key);
    return;
  }
  
  // Create and dispatch the keydown event
  const keyboardEvent = new KeyboardEvent('keydown', {
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
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    if (event.key.length === 1) {
      // Single character - append it
      const start = target.selectionStart ?? target.value.length;
      const end = target.selectionEnd ?? target.value.length;
      const before = target.value.substring(0, start);
      const after = target.value.substring(end);
      
      target.value = before + event.key + after;
      target.selectionStart = target.selectionEnd = start + 1;
      
      // Dispatch input event
      target.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        inputType: 'insertText',
        data: event.key,
      }));
    } else if (event.key === 'Backspace') {
      // Handle backspace
      const start = target.selectionStart ?? target.value.length;
      const end = target.selectionEnd ?? target.value.length;
      
      if (start === end && start > 0) {
        target.value = target.value.substring(0, start - 1) + target.value.substring(end);
        target.selectionStart = target.selectionEnd = start - 1;
      } else if (start !== end) {
        target.value = target.value.substring(0, start) + target.value.substring(end);
        target.selectionStart = target.selectionEnd = start;
      }
      
      target.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        inputType: 'deleteContentBackward',
      }));
    } else if (event.key === 'Delete') {
      // Handle delete
      const start = target.selectionStart ?? 0;
      const end = target.selectionEnd ?? 0;
      
      if (start === end && start < target.value.length) {
        target.value = target.value.substring(0, start) + target.value.substring(end + 1);
      } else if (start !== end) {
        target.value = target.value.substring(0, start) + target.value.substring(end);
      }
      target.selectionStart = target.selectionEnd = start;
      
      target.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        cancelable: true,
        inputType: 'deleteContentForward',
      }));
    }
  }
  
  // Handle Enter for form submission
  if (event.key === 'Enter' && target) {
    const form = (target as Element).closest('form');
    if (form) {
      await sleep(50);
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn instanceof HTMLElement) {
        submitBtn.click();
      } else {
        form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
    }
  }
  
  await sleep(CONFIG.KEY_DELAY);
}

async function executeKeyUp(event: RecordedEvent): Promise<void> {
  if (!event.key) return;
  
  const target = document.activeElement || document.body;
  
  target.dispatchEvent(new KeyboardEvent('keyup', {
    key: event.key,
    code: getKeyCode(event.key),
    keyCode: event.keyCode,
    bubbles: true,
    cancelable: true,
  }));
  
  await sleep(10);
}

async function executeFocus(event: RecordedEvent): Promise<void> {
  console.log('[Replayer] Focus:', event.selector);
  
  const element = await findElement(event) as HTMLElement;
  if (!element) {
    console.warn('[Replayer] Element not found for focus');
    return;
  }
  
  await scrollToElement(element);
  
  const rect = element.getBoundingClientRect();
  moveReplayCursor(rect.left + rect.width / 2, rect.top + rect.height / 2);
  clickReplayCursor();
  
  // Simulate click into field
  element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  
  element.focus();
  element.dispatchEvent(new FocusEvent('focus', { bubbles: false }));
  element.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
  
  // Select all text if it's an input
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    element.select();
  }
  
  await sleep(50);
}

async function executeBlur(event: RecordedEvent): Promise<void> {
  console.log('[Replayer] Blur:', event.selector);
  
  const element = event.selector ? await findElement(event) : document.activeElement;
  
  if (element instanceof HTMLElement) {
    element.dispatchEvent(new FocusEvent('blur', { bubbles: false }));
    element.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    element.blur();
  }
  
  await sleep(30);
}

async function executeChange(event: RecordedEvent): Promise<void> {
  console.log('[Replayer] Change:', event.selector);
  
  const element = await findElement(event) as HTMLInputElement | HTMLSelectElement;
  if (!element) return;
  
  if (event.value !== undefined) {
    element.value = event.value;
  }
  
  element.dispatchEvent(new Event('change', { bubbles: true }));
  await sleep(30);
}

async function executeScroll(event: RecordedEvent): Promise<void> {
  await scrollToPosition(event.scrollX ?? 0, event.scrollY ?? 0);
}

async function executeSubmit(event: RecordedEvent): Promise<void> {
  console.log('[Replayer] Submit:', event.selector);
  
  const element = await findElement(event) as HTMLFormElement;
  if (!element) return;
  
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
    await sleep(50);
  }
  
  const submitBtn = element.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
  if (submitBtn instanceof HTMLElement) {
    submitBtn.click();
  } else {
    element.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }
  
  await sleep(CONFIG.CLICK_SETTLE_TIME);
}

async function executeNavigate(event: RecordedEvent): Promise<void> {
  if (event.url && event.url !== window.location.href) {
    console.log('[Replayer] Navigate:', event.url);
    window.location.href = event.url;
    await sleep(1000);
  }
}

// Helper functions
function getKeyCode(key: string): string {
  const map: Record<string, string> = {
    'Enter': 'Enter', 'Tab': 'Tab', 'Escape': 'Escape',
    'Backspace': 'Backspace', 'Delete': 'Delete',
    'ArrowUp': 'ArrowUp', 'ArrowDown': 'ArrowDown',
    'ArrowLeft': 'ArrowLeft', 'ArrowRight': 'ArrowRight',
    ' ': 'Space',
  };
  if (map[key]) return map[key];
  if (key.length === 1) {
    if (key >= 'a' && key <= 'z') return `Key${key.toUpperCase()}`;
    if (key >= 'A' && key <= 'Z') return `Key${key}`;
    if (key >= '0' && key <= '9') return `Digit${key}`;
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
    'Enter': 13, 'Tab': 9, 'Escape': 27, 'Backspace': 8, 'Delete': 46,
    'ArrowUp': 38, 'ArrowDown': 40, 'ArrowLeft': 37, 'ArrowRight': 39,
    ' ': 32,
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
    case 'click': await executeClick(event); break;
    case 'dblclick': await executeDblClick(event); break;
    case 'keydown': await executeKeyDown(event); break;
    case 'keyup': await executeKeyUp(event); break;
    case 'focus': await executeFocus(event); break;
    case 'blur': await executeBlur(event); break;
    case 'change': await executeChange(event); break;
    case 'scroll': await executeScroll(event); break;
    case 'submit': await executeSubmit(event); break;
    case 'navigate': await executeNavigate(event); break;
    case 'input':
      // Input events are handled via keydown - skip
      break;
    case 'mousedown':
    case 'mouseup':
    case 'mousemove':
      // Visual only
      break;
  }
}

// Main replay function
export async function replayAutomation(
  automation: Automation,
  onProgress?: (completed: number, total: number) => void
): Promise<{ success: boolean; error?: string; eventsCompleted: number }> {
  console.log('[Replayer] Starting:', automation.name);
  console.log('[Replayer] Events:', automation.events?.length);
  
  isPlaying = true;
  shouldStop = false;
  
  // Check if AI is enabled for this replay
  aiEnabled = await checkAIEnabled();
  console.log('[Replayer] AI enabled:', aiEnabled);
  
  const events = automation.events;
  if (!events || events.length === 0) {
    return { success: false, error: 'No events to replay', eventsCompleted: 0 };
  }
  
  createReplayCursor();
  
  console.log(`[Replayer] Waiting ${CONFIG.INITIAL_DELAY}ms...`);
  await sleep(CONFIG.INITIAL_DELAY);
  
  let eventsCompleted = 0;
  
  try {
    for (let i = 0; i < events.length; i++) {
      if (shouldStop) {
        return { success: false, error: 'Stopped by user', eventsCompleted };
      }
      
      const event = events[i];
      const prevEvent = events[i - 1];
      
      // Use recorded timing
      if (prevEvent) {
        const gap = event.timestamp - prevEvent.timestamp;
        const waitTime = Math.min(Math.max(gap, CONFIG.MIN_EVENT_GAP), 3000);
        await sleep(waitTime);
      }
      
      console.log(`[Replayer] ${i + 1}/${events.length}: ${event.type}${event.key ? ` (${event.key})` : ''}`);
      await executeEvent(event);
      
      eventsCompleted = i + 1;
      onProgress?.(eventsCompleted, events.length);
    }
    
    console.log('[Replayer] Complete!');
    await sleep(300);
    removeReplayCursor();
    isPlaying = false;
    
    return { success: true, eventsCompleted };
    
  } catch (error) {
    console.error('[Replayer] Error:', error);
    removeReplayCursor();
    isPlaying = false;
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
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
