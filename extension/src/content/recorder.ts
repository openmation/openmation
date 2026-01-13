// Enhanced Recorder - Captures all interactions including mouse movements
import type { RecordedEvent, MousePosition } from '@/lib/types';
import { generateId, getUniqueSelector } from '@/lib/utils';
import { incrementEventCount } from './panel';

let isRecording = false;
let isPaused = false;
let recordedEvents: RecordedEvent[] = [];
let mouseMovements: MousePosition[] = [];
let currentMousePath: MousePosition[] = [];
let startTime = 0;
let sessionId = '';

// Throttle for mouse movement (capture every N ms)
const MOUSE_MOVE_THROTTLE = 16; // ~60fps
let lastMouseMoveTime = 0;

// Create an event
function createEvent(
  type: RecordedEvent['type'],
  element: Element | null,
  extra: Partial<RecordedEvent> = {}
): RecordedEvent {
  const event: RecordedEvent = {
    id: generateId(),
    type,
    timestamp: Date.now() - startTime,
    ...extra,
  };
  
  if (element) {
    event.selector = getUniqueSelector(element);
    event.tagName = element.tagName.toLowerCase();
    if (element instanceof HTMLElement && element.innerText) {
      event.innerText = element.innerText.slice(0, 100);
    }
  }
  
  // Attach current mouse path for smooth replay
  if (currentMousePath.length > 0) {
    event.mousePath = [...currentMousePath];
    currentMousePath = [];
  }
  
  return event;
}

// Event Handlers
function handleClick(e: MouseEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;
  
  const event = createEvent('click', e.target as Element, {
    x: e.clientX,
    y: e.clientY,
  });
  
  recordEvent(event);
  showClickFeedback(e.clientX, e.clientY);
}

function handleDblClick(e: MouseEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;
  
  const event = createEvent('dblclick', e.target as Element, {
    x: e.clientX,
    y: e.clientY,
  });
  
  recordEvent(event);
}

function handleMouseDown(e: MouseEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;
  
  const event = createEvent('mousedown', e.target as Element, {
    x: e.clientX,
    y: e.clientY,
  });
  
  recordEvent(event);
}

function handleMouseUp(e: MouseEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;
  
  const event = createEvent('mouseup', e.target as Element, {
    x: e.clientX,
    y: e.clientY,
  });
  
  recordEvent(event);
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
  
  // Keep path manageable (last 50 points)
  if (currentMousePath.length > 50) {
    currentMousePath.shift();
  }
}

function handleInput(e: Event): void {
  if (!isRecording || isPaused) return;
  
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  if (!target || isOurElement(target)) return;
  
  // Debounce - update last input event if same element
  const lastEvent = recordedEvents[recordedEvents.length - 1];
  if (lastEvent?.type === 'input' && lastEvent.selector === getUniqueSelector(target)) {
    lastEvent.value = target.value;
    lastEvent.timestamp = Date.now() - startTime;
    return;
  }
  
  const event = createEvent('input', target, {
    value: target.value,
  });
  
  recordEvent(event);
}

function handleChange(e: Event): void {
  if (!isRecording || isPaused) return;
  
  const target = e.target as HTMLInputElement | HTMLSelectElement;
  if (!target || isOurElement(target)) return;
  
  const event = createEvent('change', target, {
    value: target.value,
  });
  
  recordEvent(event);
}

function handleKeyDown(e: KeyboardEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;
  
  // Only record special keys or keys in non-input elements
  const isInput = e.target instanceof HTMLInputElement || 
                  e.target instanceof HTMLTextAreaElement;
  
  const specialKeys = ['Enter', 'Tab', 'Escape', 'Backspace', 'Delete', 
                       'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
                       'Home', 'End', 'PageUp', 'PageDown'];
  
  if (!isInput || specialKeys.includes(e.key) || e.ctrlKey || e.metaKey || e.altKey) {
    const event = createEvent('keydown', e.target as Element, {
      key: e.key,
      keyCode: e.keyCode,
    });
    
    recordEvent(event);
  }
}

function handleKeyUp(e: KeyboardEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;
  
  // Only record for special keys
  const specialKeys = ['Enter', 'Tab', 'Escape'];
  
  if (specialKeys.includes(e.key)) {
    const event = createEvent('keyup', e.target as Element, {
      key: e.key,
      keyCode: e.keyCode,
    });
    
    recordEvent(event);
  }
}

function handleScroll(): void {
  if (!isRecording || isPaused) return;
  
  // Debounce scroll events
  const lastEvent = recordedEvents[recordedEvents.length - 1];
  const now = Date.now() - startTime;
  
  if (lastEvent?.type === 'scroll' && now - lastEvent.timestamp < 100) {
    lastEvent.scrollX = window.scrollX;
    lastEvent.scrollY = window.scrollY;
    lastEvent.timestamp = now;
    return;
  }
  
  const event = createEvent('scroll', null, {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  });
  
  recordEvent(event);
}

function handleFocus(e: FocusEvent): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;
  
  const event = createEvent('focus', e.target as Element);
  recordEvent(event);
}

function handleSubmit(e: Event): void {
  if (!isRecording || isPaused) return;
  if (isOurElement(e.target as Element)) return;
  
  const event = createEvent('submit', e.target as Element);
  recordEvent(event);
}

function handleBeforeUnload(): void {
  if (!isRecording) return;
  
  // Record navigation event
  const event = createEvent('navigate', null, {
    url: window.location.href,
  });
  
  recordEvent(event);
  
  // Save state to storage for cross-page persistence
  saveRecordingState();
}

// Helper functions
function isOurElement(element: Element | null): boolean {
  if (!element) return false;
  return !!(element.closest('#simplest-automation-panel') || 
            element.closest('#simplest-automation-cursor'));
}

function recordEvent(event: RecordedEvent): void {
  recordedEvents.push(event);
  incrementEventCount();
  
  // Send to background
  chrome.runtime.sendMessage({ type: 'EVENT_RECORDED', event }).catch(() => {
    // Ignore errors (e.g., when background is reloading)
  });
}

function showClickFeedback(x: number, y: number): void {
  const ripple = document.createElement('div');
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
  
  const style = document.createElement('style');
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
  
  // Use synchronous localStorage for beforeunload
  try {
    localStorage.setItem('simplest_recording_state', JSON.stringify(state));
  } catch {
    // Ignore quota errors
  }
}

function loadRecordingState(): boolean {
  try {
    const stored = localStorage.getItem('simplest_recording_state');
    if (!stored) return false;
    
    const state = JSON.parse(stored);
    
    // Check if this is a continuation of the same session
    if (state.sessionId && state.isRecording) {
      recordedEvents = state.events || [];
      mouseMovements = state.mouseMovements || [];
      startTime = state.startTime;
      sessionId = state.sessionId;
      isRecording = true;
      isPaused = state.isPaused;
      
      // Clear the stored state
      localStorage.removeItem('simplest_recording_state');
      
      return true;
    }
  } catch {
    // Ignore parse errors
  }
  
  return false;
}

// Public API
export function startRecording(newSessionId: string): void {
  // Check for existing session first
  if (loadRecordingState()) {
    console.log('[Simplest] Resumed recording from previous page');
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
  
  console.log('[Simplest] Recording started');
}

export function pauseRecording(): void {
  isPaused = true;
  console.log('[Simplest] Recording paused');
}

export function resumeRecording(): void {
  isPaused = false;
  console.log('[Simplest] Recording resumed');
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
  
  // Clear any saved state
  localStorage.removeItem('simplest_recording_state');
  
  const result = {
    events: [...recordedEvents],
    mouseMovements: [...mouseMovements],
    startUrl: window.location.href,
    duration: Date.now() - startTime,
  };
  
  recordedEvents = [];
  mouseMovements = [];
  
  console.log('[Simplest] Recording stopped:', result.events.length, 'events');
  
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
  document.addEventListener('click', handleClick, true);
  document.addEventListener('dblclick', handleDblClick, true);
  document.addEventListener('mousedown', handleMouseDown, true);
  document.addEventListener('mouseup', handleMouseUp, true);
  document.addEventListener('mousemove', handleMouseMove, true);
  document.addEventListener('input', handleInput, true);
  document.addEventListener('change', handleChange, true);
  document.addEventListener('keydown', handleKeyDown, true);
  document.addEventListener('keyup', handleKeyUp, true);
  document.addEventListener('focus', handleFocus, true);
  document.addEventListener('submit', handleSubmit, true);
  window.addEventListener('scroll', handleScroll, true);
  window.addEventListener('beforeunload', handleBeforeUnload);
}

function detachListeners(): void {
  document.removeEventListener('click', handleClick, true);
  document.removeEventListener('dblclick', handleDblClick, true);
  document.removeEventListener('mousedown', handleMouseDown, true);
  document.removeEventListener('mouseup', handleMouseUp, true);
  document.removeEventListener('mousemove', handleMouseMove, true);
  document.removeEventListener('input', handleInput, true);
  document.removeEventListener('change', handleChange, true);
  document.removeEventListener('keydown', handleKeyDown, true);
  document.removeEventListener('keyup', handleKeyUp, true);
  document.removeEventListener('focus', handleFocus, true);
  document.removeEventListener('submit', handleSubmit, true);
  window.removeEventListener('scroll', handleScroll, true);
  window.removeEventListener('beforeunload', handleBeforeUnload);
}

// Initialize - check if we should resume recording
export function initRecorder(): void {
  if (loadRecordingState()) {
    attachListeners();
    // Notify background that we've resumed
    chrome.runtime.sendMessage({ 
      type: 'RECORDING_RESUMED_ON_PAGE', 
      sessionId,
      eventCount: recordedEvents.length,
    }).catch(() => {});
  }
}
