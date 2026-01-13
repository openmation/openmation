import type { Automation, RunHistory, RecordingState } from './types';

const STORAGE_KEYS = {
  AUTOMATIONS: 'automations',
  RUN_HISTORY: 'runHistory',
  RECORDING_STATE: 'recordingState',
  THEME: 'theme',
} as const;

// Helper to work with Chrome storage
async function getFromStorage<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const result = await chrome.storage.local.get(key);
    return (result[key] as T) ?? defaultValue;
  } catch {
    console.error(`Error reading ${key} from storage`);
    return defaultValue;
  }
}

async function setToStorage<T>(key: string, value: T): Promise<void> {
  try {
    await chrome.storage.local.set({ [key]: value });
  } catch {
    console.error(`Error writing ${key} to storage`);
  }
}

// Automations
export async function getAutomations(): Promise<Automation[]> {
  return getFromStorage<Automation[]>(STORAGE_KEYS.AUTOMATIONS, []);
}

export async function saveAutomation(automation: Automation): Promise<void> {
  const automations = await getAutomations();
  const index = automations.findIndex(a => a.id === automation.id);
  
  if (index >= 0) {
    automations[index] = { ...automation, updatedAt: Date.now() };
  } else {
    automations.unshift(automation); // Add to beginning
  }
  
  await setToStorage(STORAGE_KEYS.AUTOMATIONS, automations);
}

export async function deleteAutomation(id: string): Promise<void> {
  const automations = await getAutomations();
  const filtered = automations.filter(a => a.id !== id);
  await setToStorage(STORAGE_KEYS.AUTOMATIONS, filtered);
}

export async function getAutomation(id: string): Promise<Automation | undefined> {
  const automations = await getAutomations();
  return automations.find(a => a.id === id);
}

// Run History
export async function getRunHistory(limit = 50): Promise<RunHistory[]> {
  const history = await getFromStorage<RunHistory[]>(STORAGE_KEYS.RUN_HISTORY, []);
  return history.slice(0, limit);
}

export async function addRunHistory(run: RunHistory): Promise<void> {
  const history = await getRunHistory(100);
  history.unshift(run);
  await setToStorage(STORAGE_KEYS.RUN_HISTORY, history.slice(0, 100));
}

export async function updateRunHistory(runId: string, updates: Partial<RunHistory>): Promise<void> {
  const history = await getRunHistory(100);
  const index = history.findIndex(r => r.id === runId);
  
  if (index >= 0) {
    history[index] = { ...history[index], ...updates };
    await setToStorage(STORAGE_KEYS.RUN_HISTORY, history);
  }
}

export async function getRunHistoryForAutomation(automationId: string, limit = 10): Promise<RunHistory[]> {
  const history = await getRunHistory(100);
  return history.filter(r => r.automationId === automationId).slice(0, limit);
}

// Recording State
export async function getRecordingState(): Promise<RecordingState> {
  return getFromStorage<RecordingState>(STORAGE_KEYS.RECORDING_STATE, {
    isRecording: false,
    isPaused: false,
    events: [],
    mouseMovements: [],
    startUrl: '',
    startTime: 0,
    sessionId: '',
  });
}

export async function setRecordingState(state: RecordingState): Promise<void> {
  await setToStorage(STORAGE_KEYS.RECORDING_STATE, state);
}

export async function clearRecordingState(): Promise<void> {
  await setToStorage(STORAGE_KEYS.RECORDING_STATE, {
    isRecording: false,
    isPaused: false,
    events: [],
    mouseMovements: [],
    startUrl: '',
    startTime: 0,
    sessionId: '',
  });
}

// Theme
export type Theme = 'light' | 'dark' | 'system';

export async function getTheme(): Promise<Theme> {
  return getFromStorage<Theme>(STORAGE_KEYS.THEME, 'system');
}

export async function setTheme(theme: Theme): Promise<void> {
  await setToStorage(STORAGE_KEYS.THEME, theme);
}

// Listen for storage changes
export function onStorageChange(callback: (changes: { [key: string]: chrome.storage.StorageChange }) => void): () => void {
  const listener = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
    if (areaName === 'local') {
      callback(changes);
    }
  };
  
  chrome.storage.onChanged.addListener(listener);
  return () => chrome.storage.onChanged.removeListener(listener);
}
