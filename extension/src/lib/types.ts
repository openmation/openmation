// Mouse position for tracking movements
export interface MousePosition {
  x: number;
  y: number;
  timestamp: number;
}

// Individual recorded event
export interface RecordedEvent {
  id: string;
  type: 'click' | 'dblclick' | 'input' | 'change' | 'scroll' | 'keydown' | 'keyup' | 'mousedown' | 'mouseup' | 'mousemove' | 'focus' | 'blur' | 'submit' | 'navigate';
  timestamp: number;
  // Position data
  x?: number;
  y?: number;
  // Element data
  selector?: string;
  tagName?: string;
  innerText?: string;
  // Input data
  value?: string;
  key?: string;
  keyCode?: number;
  // Scroll data
  scrollX?: number;
  scrollY?: number;
  scrollTargetSelector?: string;
  // Navigation data
  url?: string;
  // Mouse path leading up to this event (for smooth replay)
  mousePath?: MousePosition[];
}

// Complete automation with all recorded data
export interface Automation {
  id: string;
  name: string;
  description?: string;
  events: RecordedEvent[];
  createdAt: number;
  updatedAt: number;
  cron?: string;
  isEnabled: boolean;
  startUrl: string;
  // Mouse movement sampling (for replay visualization)
  mouseMovements?: MousePosition[];
  duration: number; // Total recording duration in ms
}

// Legacy support - map steps to events
export interface AutomationStep {
  id: string;
  type: 'click' | 'input' | 'scroll' | 'navigate' | 'wait' | 'keypress';
  selector: string;
  value?: string;
  url?: string;
  key?: string;
  scrollX?: number;
  scrollY?: number;
  timestamp: number;
}

export interface RunHistory {
  id: string;
  automationId: string;
  automationName: string;
  startedAt: number;
  completedAt?: number;
  status: 'running' | 'success' | 'failed' | 'paused';
  error?: string;
  eventsCompleted: number;
  totalEvents: number;
}

export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  events: RecordedEvent[];
  mouseMovements: MousePosition[];
  startUrl: string;
  startTime: number;
  tabId?: number;
  sessionId: string; // Unique ID to track recording across pages
}

// Messages between components
export type MessageType =
  | { type: 'START_RECORDING'; tabId: number }
  | { type: 'PAUSE_RECORDING' }
  | { type: 'RESUME_RECORDING' }
  | { type: 'STOP_RECORDING' }
  | { type: 'RECORDING_STARTED'; sessionId: string }
  | { type: 'RECORDING_PAUSED' }
  | { type: 'RECORDING_RESUMED' }
  | { type: 'RECORDING_STOPPED'; events: RecordedEvent[]; mouseMovements: MousePosition[]; startUrl: string; duration: number }
  | { type: 'EVENT_RECORDED'; event: RecordedEvent }
  | { type: 'MOUSE_MOVE'; position: MousePosition }
  | { type: 'RUN_AUTOMATION'; automation: Automation }
  | { type: 'STOP_AUTOMATION' }
  | { type: 'AUTOMATION_PROGRESS'; runId: string; eventsCompleted: number; status: RunHistory['status']; error?: string }
  | { type: 'AUTOMATION_COMPLETE'; runId: string; status: RunHistory['status']; error?: string }
  | { type: 'GET_RECORDING_STATE' }
  | { type: 'RECORDING_STATE'; state: RecordingState }
  | { type: 'INJECT_PANEL' }
  | { type: 'REMOVE_PANEL' }
  | { type: 'OPEN_POPUP' }
  | { type: 'CHECK_RECORDING_SESSION'; sessionId: string }
  | { type: 'RECORDING_SESSION_ACTIVE'; isActive: boolean; state?: RecordingState };

export interface CronPreset {
  label: string;
  value: string;
  description: string;
}

export const CRON_PRESETS: CronPreset[] = [
  { label: 'Every hour', value: '0 * * * *', description: 'At minute 0' },
  { label: 'Every 6 hours', value: '0 */6 * * *', description: 'At minute 0 past every 6th hour' },
  { label: 'Daily at 9 AM', value: '0 9 * * *', description: 'Every day at 9:00 AM' },
  { label: 'Daily at 6 PM', value: '0 18 * * *', description: 'Every day at 6:00 PM' },
  { label: 'Weekly on Monday', value: '0 9 * * 1', description: 'Every Monday at 9:00 AM' },
  { label: 'Weekly on Friday', value: '0 17 * * 5', description: 'Every Friday at 5:00 PM' },
];
