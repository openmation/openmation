// Floating Recording Panel - Premium PostHog/Linear inspired design
// Beautiful, minimal, functional

const PANEL_ID = 'simplest-automation-panel';
const CURSOR_ID = 'simplest-automation-cursor';

type PanelMode = 'ready' | 'recording' | 'paused' | 'saving';

interface PanelState {
  mode: PanelMode;
  eventCount: number;
  duration: number;
  startTime: number;
}

let panelState: PanelState = {
  mode: 'ready',
  eventCount: 0,
  duration: 0,
  startTime: 0,
};

let durationInterval: ReturnType<typeof setInterval> | null = null;

// ============================================
// Panel Creation & Management
// ============================================

export function createPanel(): HTMLElement {
  removePanel();

  const panel = document.createElement('div');
  panel.id = PANEL_ID;
  panel.innerHTML = getPanelHTML();
  
  const style = document.createElement('style');
  style.id = `${PANEL_ID}-styles`;
  style.textContent = getPanelStyles();
  document.head.appendChild(style);
  
  document.body.appendChild(panel);
  
  setupPanelListeners(panel);
  makeDraggable(panel);
  
  return panel;
}

export function removePanel(): void {
  const existingPanel = document.getElementById(PANEL_ID);
  if (existingPanel) {
    existingPanel.remove();
  }
  
  const existingStyles = document.getElementById(`${PANEL_ID}-styles`);
  if (existingStyles) {
    existingStyles.remove();
  }
  
  stopDurationTimer();
}

export function updatePanelState(newState: Partial<PanelState>): void {
  panelState = { ...panelState, ...newState };
  
  // Handle mode transitions
  if (newState.mode === 'recording' && !durationInterval) {
    startDurationTimer();
  } else if (newState.mode === 'paused') {
    stopDurationTimer();
  } else if (newState.mode === 'ready' || newState.mode === 'saving') {
    stopDurationTimer();
  }
  
  updatePanelUI();
}

// Restore panel state after navigation
export function restorePanelState(eventCount: number, duration: number, isPaused: boolean): void {
  panelState = {
    mode: isPaused ? 'paused' : 'recording',
    eventCount,
    duration,
    startTime: Date.now() - duration,
  };
  
  if (!isPaused) {
    startDurationTimer();
  }
  
  updatePanelUI();
  showRecordingControls();
}

function startDurationTimer(): void {
  stopDurationTimer();
  panelState.startTime = Date.now() - panelState.duration;
  
  durationInterval = setInterval(() => {
    if (panelState.mode === 'recording') {
      panelState.duration = Date.now() - panelState.startTime;
      updateDurationDisplay();
    }
  }, 100);
}

function stopDurationTimer(): void {
  if (durationInterval) {
    clearInterval(durationInterval);
    durationInterval = null;
  }
}

function updateDurationDisplay(): void {
  const durationEl = document.querySelector('.sa-duration') as HTMLElement;
  if (durationEl) {
    durationEl.textContent = formatDuration(panelState.duration);
  }
}

function updatePanelUI(): void {
  const panel = document.getElementById(PANEL_ID);
  if (!panel) return;
  
  // Update status indicator
  const statusDot = panel.querySelector('.sa-status-dot') as HTMLElement;
  const statusText = panel.querySelector('.sa-status-text') as HTMLElement;
  
  if (statusDot && statusText) {
    statusDot.className = 'sa-status-dot';
    
    switch (panelState.mode) {
      case 'recording':
        statusDot.classList.add('sa-recording');
        statusText.textContent = 'Recording';
        break;
      case 'paused':
        statusDot.classList.add('sa-paused');
        statusText.textContent = 'Paused';
        break;
      case 'saving':
        statusText.textContent = 'Save Recording';
        break;
      default:
        statusText.textContent = 'Ready';
    }
  }
  
  // Update stats
  const eventCountEl = panel.querySelector('.sa-event-count') as HTMLElement;
  const durationEl = panel.querySelector('.sa-duration') as HTMLElement;
  
  if (eventCountEl) {
    eventCountEl.textContent = `${panelState.eventCount} action${panelState.eventCount !== 1 ? 's' : ''}`;
  }
  
  if (durationEl) {
    durationEl.textContent = formatDuration(panelState.duration);
  }
  
  // Update pause button icon
  const pauseIcon = panel.querySelector('.sa-pause-icon') as HTMLElement;
  if (pauseIcon) {
    pauseIcon.innerHTML = panelState.mode === 'paused' ? getPlayIconSVG() : getPauseIconSVG();
  }
}

function showRecordingControls(): void {
  const panel = document.getElementById(PANEL_ID);
  if (!panel) return;
  
  const startView = panel.querySelector('.sa-start-view') as HTMLElement;
  const recordingView = panel.querySelector('.sa-recording-view') as HTMLElement;
  const saveView = panel.querySelector('.sa-save-view') as HTMLElement;
  
  if (startView) startView.style.display = 'none';
  if (recordingView) recordingView.style.display = 'block';
  if (saveView) saveView.style.display = 'none';
}

function showSaveView(): void {
  const panel = document.getElementById(PANEL_ID);
  if (!panel) return;
  
  const startView = panel.querySelector('.sa-start-view') as HTMLElement;
  const recordingView = panel.querySelector('.sa-recording-view') as HTMLElement;
  const saveView = panel.querySelector('.sa-save-view') as HTMLElement;
  
  if (startView) startView.style.display = 'none';
  if (recordingView) recordingView.style.display = 'none';
  if (saveView) saveView.style.display = 'block';
  
  // Focus the input
  const input = panel.querySelector('.sa-name-input') as HTMLInputElement;
  if (input) {
    setTimeout(() => input.focus(), 100);
  }
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// ============================================
// Event Handlers
// ============================================

function setupPanelListeners(panel: HTMLElement): void {
  // Start button
  panel.querySelector('.sa-start-btn')?.addEventListener('click', handleStart);
  
  // Recording controls
  panel.querySelector('.sa-pause-btn')?.addEventListener('click', handlePauseResume);
  panel.querySelector('.sa-stop-btn')?.addEventListener('click', handleStop);
  
  // Save view controls
  panel.querySelector('.sa-save-btn')?.addEventListener('click', handleSave);
  panel.querySelector('.sa-discard-btn')?.addEventListener('click', handleDiscard);
  
  // Close button
  panel.querySelector('.sa-close-btn')?.addEventListener('click', handleClose);
  
  // Enter key in name input
  panel.querySelector('.sa-name-input')?.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter') {
      handleSave();
    }
  });
}

async function handleStart(): Promise<void> {
  chrome.runtime.sendMessage({ type: 'START_RECORDING_FROM_PANEL' });
  
  panelState.mode = 'recording';
  panelState.eventCount = 0;
  panelState.duration = 0;
  
  startDurationTimer();
  updatePanelUI();
  showRecordingControls();
}

async function handlePauseResume(): Promise<void> {
  if (panelState.mode === 'paused') {
    chrome.runtime.sendMessage({ type: 'RESUME_RECORDING' });
    panelState.mode = 'recording';
    startDurationTimer();
  } else {
    chrome.runtime.sendMessage({ type: 'PAUSE_RECORDING' });
    panelState.mode = 'paused';
    stopDurationTimer();
  }
  updatePanelUI();
}

async function handleStop(): Promise<void> {
  stopDurationTimer();
  panelState.mode = 'saving';
  updatePanelUI();
  showSaveView();
}

async function handleSave(): Promise<void> {
  const panel = document.getElementById(PANEL_ID);
  const input = panel?.querySelector('.sa-name-input') as HTMLInputElement;
  const name = input?.value.trim() || `Recording ${new Date().toLocaleString()}`;
  
  // Disable button while saving
  const saveBtn = panel?.querySelector('.sa-save-btn') as HTMLButtonElement;
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';
  }
  
  // Send stop with name
  chrome.runtime.sendMessage({ 
    type: 'STOP_RECORDING_WITH_NAME',
    name,
  });
  
  // Small delay for visual feedback then remove
  setTimeout(() => {
    removePanel();
  }, 300);
}

function handleDiscard(): void {
  chrome.runtime.sendMessage({ type: 'STOP_RECORDING' });
  removePanel();
}

function handleClose(): void {
  if (panelState.mode === 'recording' || panelState.mode === 'paused') {
    // Show confirmation
    if (!confirm('Stop recording and discard?')) return;
    chrome.runtime.sendMessage({ type: 'STOP_RECORDING' });
  }
  removePanel();
}

function makeDraggable(panel: HTMLElement): void {
  const header = panel.querySelector('.sa-panel-header') as HTMLElement;
  if (!header) return;
  
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let initialX = 0;
  let initialY = 0;
  
  header.addEventListener('mousedown', (e) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if ((e.target as HTMLElement).closest('input')) return;
    
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    
    const rect = panel.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    
    header.style.cursor = 'grabbing';
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    let newX = initialX + deltaX;
    let newY = initialY + deltaY;
    
    // Keep panel within viewport
    const maxX = window.innerWidth - panel.offsetWidth - 10;
    const maxY = window.innerHeight - panel.offsetHeight - 10;
    
    newX = Math.max(10, Math.min(newX, maxX));
    newY = Math.max(10, Math.min(newY, maxY));
    
    panel.style.left = `${newX}px`;
    panel.style.top = `${newY}px`;
    panel.style.right = 'auto';
  });
  
  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      header.style.cursor = 'grab';
    }
  });
}

export function incrementEventCount(): void {
  panelState.eventCount++;
  
  const eventCountEl = document.querySelector('.sa-event-count') as HTMLElement;
  if (eventCountEl) {
    eventCountEl.textContent = `${panelState.eventCount} action${panelState.eventCount !== 1 ? 's' : ''}`;
    
    // Subtle pulse animation
    eventCountEl.style.transform = 'scale(1.05)';
    setTimeout(() => {
      eventCountEl.style.transform = 'scale(1)';
    }, 100);
  }
}

// ============================================
// Replay Cursor
// ============================================

export function createReplayCursor(): HTMLElement {
  const existing = document.getElementById(CURSOR_ID);
  if (existing) existing.remove();
  
  const cursor = document.createElement('div');
  cursor.id = CURSOR_ID;
  cursor.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5.5 3.5L20 11.5L12 14L9 21L5.5 3.5Z" fill="#5E5CE6" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
    </svg>
    <div class="sa-cursor-ripple"></div>
  `;
  
  const style = document.createElement('style');
  style.id = `${CURSOR_ID}-styles`;
  style.textContent = `
    #${CURSOR_ID} {
      position: fixed;
      pointer-events: none;
      z-index: 2147483646;
      transform: translate(-3px, -3px);
      transition: left 16ms linear, top 16ms linear;
      filter: drop-shadow(0 2px 8px rgba(94, 92, 230, 0.3));
    }
    .sa-cursor-ripple {
      position: absolute;
      top: 10px;
      left: 10px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(94, 92, 230, 0.4);
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    .sa-cursor-ripple.active {
      animation: sa-ripple 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes sa-ripple {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(cursor);
  
  return cursor;
}

export function moveReplayCursor(x: number, y: number): void {
  const cursor = document.getElementById(CURSOR_ID);
  if (cursor) {
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
  }
}

export function clickReplayCursor(): void {
  const ripple = document.querySelector(`#${CURSOR_ID} .sa-cursor-ripple`) as HTMLElement;
  if (ripple) {
    ripple.classList.remove('active');
    void ripple.offsetWidth;
    ripple.classList.add('active');
  }
}

export function removeReplayCursor(): void {
  document.getElementById(CURSOR_ID)?.remove();
  document.getElementById(`${CURSOR_ID}-styles`)?.remove();
}

// ============================================
// SVG Icons
// ============================================

function getPlayIconSVG(): string {
  return `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>`;
}

function getPauseIconSVG(): string {
  return `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" rx="1"/><rect x="14" y="4" width="5" height="16" rx="1"/></svg>`;
}

// ============================================
// Panel HTML & Styles
// ============================================

function getPanelHTML(): string {
  return `
    <div class="sa-panel-inner">
      <div class="sa-panel-header">
        <div class="sa-brand">
          <div class="sa-logo">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <span class="sa-title">Simplest</span>
        </div>
        <button class="sa-close-btn" title="Close">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      
      <div class="sa-panel-body">
        <!-- Ready State -->
        <div class="sa-start-view">
          <button class="sa-start-btn">
            <div class="sa-start-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="8"/>
              </svg>
            </div>
            <span>Start Recording</span>
          </button>
          <p class="sa-hint">Click to begin capturing your actions</p>
        </div>
        
        <!-- Recording State -->
        <div class="sa-recording-view" style="display: none;">
          <div class="sa-status-bar">
            <div class="sa-status">
              <div class="sa-status-dot sa-recording"></div>
              <span class="sa-status-text">Recording</span>
            </div>
            <div class="sa-stats">
              <span class="sa-event-count">0 actions</span>
              <span class="sa-divider">·</span>
              <span class="sa-duration">00:00</span>
            </div>
          </div>
          
          <div class="sa-controls">
            <button class="sa-pause-btn" title="Pause">
              <span class="sa-pause-icon">${getPauseIconSVG()}</span>
            </button>
            <button class="sa-stop-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12" rx="2"/>
              </svg>
              <span>Finish</span>
            </button>
          </div>
        </div>
        
        <!-- Save State -->
        <div class="sa-save-view" style="display: none;">
          <div class="sa-save-header">
            <div class="sa-save-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <div class="sa-save-info">
              <span class="sa-event-count-final">${panelState.eventCount} actions</span>
              <span class="sa-divider">·</span>
              <span class="sa-duration-final">${formatDuration(panelState.duration)}</span>
            </div>
          </div>
          
          <input type="text" class="sa-name-input" placeholder="Name your automation..." autocomplete="off" spellcheck="false"/>
          
          <div class="sa-save-actions">
            <button class="sa-discard-btn">Discard</button>
            <button class="sa-save-btn">Save</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getPanelStyles(): string {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    
    #${PANEL_ID} {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 2147483647;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      font-size: 13px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      animation: sa-panel-enter 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    @keyframes sa-panel-enter {
      from {
        opacity: 0;
        transform: translateY(-8px) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    .sa-panel-inner {
      background: rgba(30, 30, 32, 0.95);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      box-shadow: 
        0 0 0 1px rgba(0, 0, 0, 0.3),
        0 8px 40px rgba(0, 0, 0, 0.35),
        0 2px 8px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      min-width: 240px;
      color: #fff;
    }
    
    /* Header */
    .sa-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      cursor: grab;
      user-select: none;
    }
    
    .sa-brand {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .sa-logo {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: linear-gradient(135deg, #5E5CE6 0%, #BF5AF2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    
    .sa-title {
      font-weight: 600;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);
      letter-spacing: -0.01em;
    }
    
    .sa-close-btn {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    
    .sa-close-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.8);
    }
    
    /* Panel Body */
    .sa-panel-body {
      padding: 12px;
    }
    
    /* Start View */
    .sa-start-view {
      text-align: center;
    }
    
    .sa-start-btn {
      width: 100%;
      height: 44px;
      border-radius: 10px;
      border: 1.5px dashed rgba(255, 255, 255, 0.15);
      background: transparent;
      color: rgba(255, 255, 255, 0.9);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.2s ease;
    }
    
    .sa-start-btn:hover {
      border-color: rgba(94, 92, 230, 0.5);
      background: rgba(94, 92, 230, 0.08);
    }
    
    .sa-start-icon {
      color: #FF3B30;
    }
    
    .sa-hint {
      margin: 10px 0 0 0;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.35);
    }
    
    /* Recording View */
    .sa-status-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }
    
    .sa-status {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .sa-status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
    }
    
    .sa-status-dot.sa-recording {
      background: #FF3B30;
      animation: sa-pulse 1.2s ease-in-out infinite;
    }
    
    .sa-status-dot.sa-paused {
      background: #FFD60A;
    }
    
    @keyframes sa-pulse {
      0%, 100% { 
        opacity: 1;
        box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.4);
      }
      50% { 
        opacity: 0.8;
        box-shadow: 0 0 0 5px rgba(255, 59, 48, 0);
      }
    }
    
    .sa-status-text {
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
    }
    
    .sa-stats {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
      font-variant-numeric: tabular-nums;
    }
    
    .sa-divider {
      color: rgba(255, 255, 255, 0.2);
    }
    
    .sa-event-count {
      transition: transform 0.1s ease;
    }
    
    /* Controls */
    .sa-controls {
      display: flex;
      gap: 8px;
    }
    
    .sa-pause-btn {
      width: 40px;
      height: 36px;
      border-radius: 8px;
      border: none;
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.8);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
    }
    
    .sa-pause-btn:hover {
      background: rgba(255, 255, 255, 0.12);
    }
    
    .sa-stop-btn {
      flex: 1;
      height: 36px;
      border-radius: 8px;
      border: none;
      background: #5E5CE6;
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
    }
    
    .sa-stop-btn:hover {
      background: #6B69E8;
    }
    
    /* Save View */
    .sa-save-view {
      animation: sa-fade-in 0.2s ease;
    }
    
    @keyframes sa-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .sa-save-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    
    .sa-save-icon {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(48, 209, 88, 0.15);
      color: #30D158;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .sa-save-info {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
    }
    
    .sa-name-input {
      width: 100%;
      height: 40px;
      padding: 0 12px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 13px;
      font-family: inherit;
      outline: none;
      transition: all 0.15s ease;
      box-sizing: border-box;
    }
    
    .sa-name-input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
    
    .sa-name-input:focus {
      border-color: rgba(94, 92, 230, 0.5);
      background: rgba(94, 92, 230, 0.08);
    }
    
    .sa-save-actions {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }
    
    .sa-discard-btn {
      flex: 1;
      height: 36px;
      border-radius: 8px;
      border: none;
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    
    .sa-discard-btn:hover {
      background: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.9);
    }
    
    .sa-save-btn {
      flex: 1;
      height: 36px;
      border-radius: 8px;
      border: none;
      background: #5E5CE6;
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    
    .sa-save-btn:hover {
      background: #6B69E8;
    }
    
    .sa-save-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;
}
