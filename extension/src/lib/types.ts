// Mouse position for tracking movements
export interface MousePosition {
  x: number;
  y: number;
  timestamp: number;
}

// Visual context captured during recording for AI-powered replay
export interface VisualContext {
  elementColor?: string;           // Dominant color of the element
  elementSize?: { width: number; height: number };
  surroundingText?: string;        // Text near the element
  relativePosition?: string;       // e.g., "top-right of form", "below header"
  pageTitle?: string;              // Document title at time of action
  pageUrl?: string;                // URL at time of action
}

// Individual recorded event
export interface RecordedEvent {
  id: string;
  type: 'click' | 'dblclick' | 'input' | 'change' | 'scroll' | 'keydown' | 'keyup' | 'mousedown' | 'mouseup' | 'mousemove' | 'focus' | 'blur' | 'submit' | 'navigate';
  timestamp: number;
  // Position data (viewport coordinates)
  x?: number;
  y?: number;
  // Page coordinates (absolute, including scroll)
  pageX?: number;
  pageY?: number;
  // Element data
  selector?: string;
  selectorFallbacks?: string[];  // Alternative selectors for robustness
  tagName?: string;
  innerText?: string;
  elementText?: string;  // Text content for button/link matching
  elementAttributes?: Record<string, string>;  // Key attributes for fallback matching
  elementRect?: { top: number; left: number; width: number; height: number };  // Element position at record time
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
  // Checkpoint flag - input events marked as checkpoints are for verification only
  isCheckpoint?: boolean;
  
  // AI-powered recording fields
  screenshot?: string;             // Base64 WebP of viewport at action time
  elementCrop?: string;            // Base64 crop of the target element
  aiDescription?: string;          // AI-generated description: "Click the blue Submit button"
  visualContext?: VisualContext;   // Additional visual context for AI matching
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
  | { type: 'RECORDING_SESSION_ACTIVE'; isActive: boolean; state?: RecordingState }
  // AI-related messages
  | { type: 'CAPTURE_SCREENSHOT' }
  | { type: 'CAPTURE_ELEMENT_CROP'; crop: { x: number; y: number; width: number; height: number }; viewport: { width: number; height: number } }
  | { type: 'AI_FIND_ELEMENT'; request: AIFindElementRequest }
  | { type: 'AI_DESCRIBE_ACTION'; request: AIDescribeActionRequest }
  | { type: 'AI_TEST_CONNECTION' }
  | { type: 'GET_AI_STATUS' };

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

// AI Provider types
export type AIProviderType = 'openai' | 'anthropic';

export interface AISettings {
  provider: AIProviderType;
  openaiApiKey?: string;
  anthropicApiKey?: string;
  enabled: boolean;
}

export interface AIFindElementRequest {
  currentScreenshot: string;       // Base64 of current viewport
  referenceScreenshot?: string;    // Base64 of viewport when action was recorded
  elementCrop?: string;            // Base64 crop of the target element
  description: string;             // AI description or fallback text description
  elementRect?: { top: number; left: number; width: number; height: number };
}

export interface AIFindElementResponse {
  x: number;
  y: number;
  confidence: number;              // 0-1, how confident the AI is
  reasoning?: string;              // Why the AI chose this location
}

export interface AIDescribeActionRequest {
  screenshot: string;              // Base64 of viewport
  elementCrop: string;             // Base64 crop of the element
  actionType: string;              // click, input, etc.
  coordinates: { x: number; y: number };
  value?: string;                  // For input actions
}

export interface AIDescribeActionResponse {
  description: string;             // Human-readable description
  elementType?: string;            // button, input, link, etc.
  elementLabel?: string;           // Text or aria-label of element
}
