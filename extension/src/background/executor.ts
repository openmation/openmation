import { addRunHistory, updateRunHistory } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import type { Automation, RunHistory } from '@/lib/types';

export async function executeAutomation(
  automation: Automation,
  tabId?: number
): Promise<{ runId: string; success: boolean }> {
  const runId = generateId();
  
  // Create run history entry
  const runHistory: RunHistory = {
    id: runId,
    automationId: automation.id,
    automationName: automation.name,
    startedAt: Date.now(),
    status: 'running',
    eventsCompleted: 0,
    totalEvents: automation.events?.length || 0,
  };
  
  await addRunHistory(runHistory);
  
  try {
    let targetTabId = tabId;
    
    // If no tab ID provided, create a new tab or use active
    if (!targetTabId) {
      if (automation.startUrl) {
        const tab = await chrome.tabs.create({ url: automation.startUrl, active: true });
        targetTabId = tab.id;
        
        // Wait for page to load
        await new Promise<void>((resolve) => {
          const listener = (id: number, changeInfo: { status?: string }) => {
            if (id === targetTabId && changeInfo.status === 'complete') {
              chrome.tabs.onUpdated.removeListener(listener);
              resolve();
            }
          };
          chrome.tabs.onUpdated.addListener(listener);
        });
        
        // Extra delay for content script to be ready
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        targetTabId = activeTab?.id;
      }
    }
    
    if (!targetTabId) {
      throw new Error('No active tab found');
    }
    
    // Small delay to ensure content script is loaded
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Send automation to content script for replay
    await chrome.tabs.sendMessage(targetTabId, {
      type: 'RUN_AUTOMATION',
      automation: { ...automation, id: runId },
    });
    
    return { runId, success: true };
    
  } catch (error) {
    await updateRunHistory(runId, {
      status: 'failed',
      completedAt: Date.now(),
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    return { runId, success: false };
  }
}

export async function handleAutomationProgress(
  runId: string,
  eventsCompleted: number,
  status: RunHistory['status'],
  error?: string
): Promise<void> {
  await updateRunHistory(runId, {
    eventsCompleted,
    status,
    ...(error && { error }),
    ...(status !== 'running' && { completedAt: Date.now() }),
  });
}

export async function handleAutomationComplete(
  runId: string,
  status: RunHistory['status'],
  error?: string
): Promise<void> {
  await updateRunHistory(runId, {
    status,
    completedAt: Date.now(),
    ...(error && { error }),
  });
}
