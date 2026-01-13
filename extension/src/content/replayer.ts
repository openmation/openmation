// Enhanced Replayer - Precise timing replay with visual cursor
import type { RecordedEvent, MousePosition, Automation } from '@/lib/types';
import { 
  createReplayCursor, 
  moveReplayCursor, 
  clickReplayCursor, 
  removeReplayCursor 
} from './panel';

let isPlaying = false;
let shouldStop = false;

const ELEMENT_WAIT_TIMEOUT = 10000;

// Wait for element to appear with exponential backoff
async function waitForElement(selector: string, timeout = ELEMENT_WAIT_TIMEOUT): Promise<Element | null> {
  const startTime = Date.now();
  let delay = 50;
  
  while (Date.now() - startTime < timeout) {
    try {
      const element = document.querySelector(selector);
      if (element) return element;
    } catch {
      // Invalid selector
      return null;
    }
    await sleep(delay);
    delay = Math.min(delay * 1.5, 500);
  }
  
  return null;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Animate cursor along a path with EXACT timing
async function animateMousePath(path: MousePosition[], baseTime: number): Promise<void> {
  if (!path || path.length === 0) return;
  
  for (let i = 0; i < path.length && !shouldStop; i++) {
    const point = path[i];
    
    // Calculate exact time this point should be reached
    const targetTime = baseTime + point.timestamp;
    const now = Date.now();
    const waitTime = targetTime - now;
    
    if (waitTime > 0) {
      await sleep(Math.min(waitTime, 50)); // Cap individual waits for smoothness
    }
    
    moveReplayCursor(point.x, point.y);
  }
}

// Execute a single event
async function executeEvent(event: RecordedEvent, _baseTime: number): Promise<void> {
  if (shouldStop) return;
  
  // Move cursor to event position
  if (event.x !== undefined && event.y !== undefined) {
    moveReplayCursor(event.x, event.y);
  }
  
  switch (event.type) {
    case 'click':
      await executeClick(event);
      break;
    case 'dblclick':
      await executeDblClick(event);
      break;
    case 'input':
      await executeInput(event);
      break;
    case 'change':
      await executeChange(event);
      break;
    case 'scroll':
      await executeScroll(event);
      break;
    case 'keydown':
    case 'keyup':
      await executeKey(event);
      break;
    case 'focus':
      await executeFocus(event);
      break;
    case 'submit':
      await executeSubmit(event);
      break;
    case 'navigate':
      await executeNavigate(event);
      break;
    case 'mousedown':
    case 'mouseup':
    case 'mousemove':
      // Visual only - handled by cursor
      break;
  }
}

async function executeClick(event: RecordedEvent): Promise<void> {
  console.log('[Simplest Replayer] Executing click:', event.selector, 'at', event.x, event.y);
  clickReplayCursor();
  
  if (!event.selector) {
    console.warn('[Simplest Replayer] No selector for click event');
    return;
  }
  
  const element = await waitForElement(event.selector);
  if (!element) {
    console.warn(`[Simplest Replayer] Element not found: ${event.selector}`);
    return;
  }
  console.log('[Simplest Replayer] Found element:', element);
  
  // Scroll into view smoothly
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  await sleep(150);
  
  // Get element's actual position
  const rect = element.getBoundingClientRect();
  const clickX = event.x ?? rect.left + rect.width / 2;
  const clickY = event.y ?? rect.top + rect.height / 2;
  
  // Dispatch mouse events in correct order
  const mouseEventInit = {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: clickX,
    clientY: clickY,
  };
  
  element.dispatchEvent(new MouseEvent('mousedown', mouseEventInit));
  await sleep(50);
  element.dispatchEvent(new MouseEvent('mouseup', mouseEventInit));
  element.dispatchEvent(new MouseEvent('click', mouseEventInit));
  
  // Also trigger native click for links/buttons
  if (element instanceof HTMLElement) {
    element.click();
  }
}

async function executeDblClick(event: RecordedEvent): Promise<void> {
  clickReplayCursor();
  await sleep(80);
  clickReplayCursor();
  
  if (!event.selector) return;
  
  const element = await waitForElement(event.selector);
  if (!element) return;
  
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  await sleep(150);
  
  const rect = element.getBoundingClientRect();
  const dblClickEvent = new MouseEvent('dblclick', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: event.x ?? rect.left + rect.width / 2,
    clientY: event.y ?? rect.top + rect.height / 2,
  });
  
  element.dispatchEvent(dblClickEvent);
}

async function executeInput(event: RecordedEvent): Promise<void> {
  if (!event.selector || event.value === undefined) return;
  
  const element = await waitForElement(event.selector) as HTMLInputElement | HTMLTextAreaElement;
  if (!element) return;
  
  element.focus();
  await sleep(30);
  
  // Clear existing value
  element.value = '';
  element.dispatchEvent(new Event('input', { bubbles: true }));
  
  // Type character by character with realistic timing
  const chars = event.value.split('');
  for (let i = 0; i < chars.length && !shouldStop; i++) {
    const char = chars[i];
    
    element.value += char;
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new KeyboardEvent('keydown', { key: char, bubbles: true }));
    element.dispatchEvent(new KeyboardEvent('keyup', { key: char, bubbles: true }));
    
    // Variable typing speed (30-70ms per character)
    await sleep(30 + Math.random() * 40);
  }
  
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

async function executeChange(event: RecordedEvent): Promise<void> {
  if (!event.selector) return;
  
  const element = await waitForElement(event.selector) as HTMLInputElement | HTMLSelectElement;
  if (!element) return;
  
  if (event.value !== undefined) {
    element.value = event.value;
  }
  
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

async function executeScroll(event: RecordedEvent): Promise<void> {
  window.scrollTo({
    left: event.scrollX ?? 0,
    top: event.scrollY ?? 0,
    behavior: 'smooth',
  });
  
  await sleep(200);
}

async function executeKey(event: RecordedEvent): Promise<void> {
  if (!event.key) return;
  
  const target = event.selector ? 
    await waitForElement(event.selector) : 
    document.activeElement || document.body;
  
  if (!target) return;
  
  const keyEvent = new KeyboardEvent(event.type, {
    key: event.key,
    keyCode: event.keyCode,
    bubbles: true,
    cancelable: true,
  });
  
  target.dispatchEvent(keyEvent);
  
  // Handle Enter for form submission
  if (event.key === 'Enter' && event.type === 'keydown') {
    const form = (target as Element).closest('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
  }
}

async function executeFocus(event: RecordedEvent): Promise<void> {
  if (!event.selector) return;
  
  const element = await waitForElement(event.selector) as HTMLElement;
  if (element?.focus) {
    element.focus();
  }
}

async function executeSubmit(event: RecordedEvent): Promise<void> {
  if (!event.selector) return;
  
  const element = await waitForElement(event.selector) as HTMLFormElement;
  if (element) {
    element.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }
}

async function executeNavigate(event: RecordedEvent): Promise<void> {
  if (event.url && event.url !== window.location.href) {
    window.location.href = event.url;
    await sleep(1000);
  }
}

// Main replay function with PRECISE TIMING
export async function replayAutomation(
  automation: Automation,
  onProgress?: (completed: number, total: number) => void
): Promise<{ success: boolean; error?: string; eventsCompleted: number }> {
  console.log('[Simplest Replayer] Starting replay:', automation.name);
  
  isPlaying = true;
  shouldStop = false;
  
  // Create visual cursor
  console.log('[Simplest Replayer] Creating cursor...');
  createReplayCursor();
  
  const events = automation.events;
  console.log('[Simplest Replayer] Total events:', events?.length);
  
  if (!events || events.length === 0) {
    console.error('[Simplest Replayer] No events to replay!');
    return { success: false, error: 'No events to replay', eventsCompleted: 0 };
  }
  
  let eventsCompleted = 0;
  
  // Base time for calculating exact delays
  const replayStartTime = Date.now();
  
  try {
    for (let i = 0; i < events.length; i++) {
      if (shouldStop) {
        return { success: false, error: 'Stopped by user', eventsCompleted };
      }
      
      const event = events[i];
      
      // Wait until the EXACT time this event should occur
      // event.timestamp is relative to recording start
      const targetTime = replayStartTime + event.timestamp;
      const now = Date.now();
      const waitTime = targetTime - now;
      
      if (waitTime > 0) {
        // For long waits, cap at 3 seconds to keep replay responsive
        // but maintain relative timing for shorter intervals
        await sleep(Math.min(waitTime, 3000));
      }
      
      // Animate mouse path leading up to this event
      if (event.mousePath && event.mousePath.length > 0) {
        await animateMousePath(event.mousePath, replayStartTime);
      }
      
      await executeEvent(event, replayStartTime);
      
      eventsCompleted = i + 1;
      onProgress?.(eventsCompleted, events.length);
    }
    
    // Success!
    await sleep(400);
    removeReplayCursor();
    isPlaying = false;
    
    return { success: true, eventsCompleted };
    
  } catch (error) {
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
