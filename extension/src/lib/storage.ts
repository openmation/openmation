import type { Automation, RunHistory, RecordingState, AISettings, AIProviderType } from './types';

const STORAGE_KEYS = {
  AUTOMATIONS: 'automations',
  RUN_HISTORY: 'runHistory',
  RECORDING_STATE: 'recordingState',
  THEME: 'theme',
  AI_SETTINGS: 'aiSettings',
} as const;

// Default AI settings
const DEFAULT_AI_SETTINGS: AISettings = {
  provider: 'openai',
  enabled: false,
};

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

// Clean up stale "running" entries (older than 5 minutes)
export async function cleanupStaleRuns(): Promise<void> {
  const history = await getFromStorage<RunHistory[]>(STORAGE_KEYS.RUN_HISTORY, []);
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  let hasChanges = false;
  
  const cleaned = history.map(run => {
    // If status is "running" and started more than 5 minutes ago, mark as failed
    if (run.status === 'running' && run.startedAt < fiveMinutesAgo) {
      hasChanges = true;
      return {
        ...run,
        status: 'failed' as const,
        completedAt: run.startedAt + 60000, // Assume it failed after 1 minute
        error: 'Automation timed out or was interrupted',
      };
    }
    return run;
  });
  
  if (hasChanges) {
    await setToStorage(STORAGE_KEYS.RUN_HISTORY, cleaned);
  }
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

// AI Settings
export async function getAISettings(): Promise<AISettings> {
  return getFromStorage<AISettings>(STORAGE_KEYS.AI_SETTINGS, DEFAULT_AI_SETTINGS);
}

export async function setAISettings(settings: AISettings): Promise<void> {
  await setToStorage(STORAGE_KEYS.AI_SETTINGS, settings);
}

export async function updateAISettings(updates: Partial<AISettings>): Promise<void> {
  const current = await getAISettings();
  await setAISettings({ ...current, ...updates });
}

export async function setAIProvider(provider: AIProviderType): Promise<void> {
  await updateAISettings({ provider });
}

export async function setAIApiKey(provider: AIProviderType, apiKey: string): Promise<void> {
  if (provider === 'openai') {
    await updateAISettings({ openaiApiKey: apiKey });
  } else if (provider === 'anthropic') {
    await updateAISettings({ anthropicApiKey: apiKey });
  }
}

export async function getActiveAIApiKey(): Promise<string | undefined> {
  const settings = await getAISettings();
  if (settings.provider === 'openai') {
    return settings.openaiApiKey;
  } else if (settings.provider === 'anthropic') {
    return settings.anthropicApiKey;
  }
  return undefined;
}

export async function isAIEnabled(): Promise<boolean> {
  const settings = await getAISettings();
  const apiKey = settings.provider === 'openai' ? settings.openaiApiKey : settings.anthropicApiKey;
  return settings.enabled && !!apiKey;
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
