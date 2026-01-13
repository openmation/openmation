import { getAutomations, getAutomation } from '@/lib/storage';
import type { Automation } from '@/lib/types';

const ALARM_PREFIX = 'automation_';

// Parse cron expression and get next run time
function getNextRunTime(cron: string): Date | null {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return null;
  
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  const now = new Date();
  const next = new Date(now);
  
  // Handle minute
  if (minute === '*') {
    next.setMinutes(next.getMinutes() + 1);
    next.setSeconds(0);
    next.setMilliseconds(0);
  } else if (minute.startsWith('*/')) {
    const interval = parseInt(minute.slice(2), 10);
    const currentMinute = now.getMinutes();
    const nextMinute = Math.ceil((currentMinute + 1) / interval) * interval;
    if (nextMinute >= 60) {
      next.setHours(next.getHours() + 1);
      next.setMinutes(nextMinute % 60);
    } else {
      next.setMinutes(nextMinute);
    }
    next.setSeconds(0);
    next.setMilliseconds(0);
  } else {
    const targetMinute = parseInt(minute, 10);
    next.setMinutes(targetMinute);
    next.setSeconds(0);
    next.setMilliseconds(0);
  }
  
  // Handle hour
  if (hour !== '*' && !hour.startsWith('*/')) {
    const targetHour = parseInt(hour, 10);
    if (next.getHours() > targetHour || (next.getHours() === targetHour && now.getMinutes() >= parseInt(minute, 10))) {
      next.setDate(next.getDate() + 1);
    }
    next.setHours(targetHour);
  } else if (hour.startsWith('*/')) {
    const interval = parseInt(hour.slice(2), 10);
    const currentHour = now.getHours();
    const nextHour = Math.ceil((currentHour + 1) / interval) * interval;
    if (nextHour >= 24) {
      next.setDate(next.getDate() + 1);
      next.setHours(nextHour % 24);
    } else {
      next.setHours(nextHour);
    }
  }
  
  // Handle day of week
  if (dayOfWeek !== '*') {
    const targetDay = parseInt(dayOfWeek, 10);
    const currentDay = next.getDay();
    let daysToAdd = targetDay - currentDay;
    if (daysToAdd < 0 || (daysToAdd === 0 && next <= now)) {
      daysToAdd += 7;
    }
    next.setDate(next.getDate() + daysToAdd);
  }
  
  // Handle day of month
  if (dayOfMonth !== '*') {
    const targetDayOfMonth = parseInt(dayOfMonth, 10);
    next.setDate(targetDayOfMonth);
    if (next <= now) {
      next.setMonth(next.getMonth() + 1);
    }
  }
  
  // Handle month
  if (month !== '*') {
    const targetMonth = parseInt(month, 10) - 1;
    next.setMonth(targetMonth);
    if (next <= now) {
      next.setFullYear(next.getFullYear() + 1);
    }
  }
  
  if (next <= now) {
    return null;
  }
  
  return next;
}

export async function scheduleAutomation(automation: Automation): Promise<void> {
  if (!automation.cron || !automation.isEnabled) {
    await chrome.alarms.clear(`${ALARM_PREFIX}${automation.id}`);
    return;
  }
  
  const nextRun = getNextRunTime(automation.cron);
  if (!nextRun) {
    console.warn(`Invalid cron expression for automation ${automation.id}: ${automation.cron}`);
    return;
  }
  
  const delayInMinutes = Math.max(1, (nextRun.getTime() - Date.now()) / 60000);
  
  await chrome.alarms.create(`${ALARM_PREFIX}${automation.id}`, {
    delayInMinutes,
  });
  
  console.log(`Scheduled automation ${automation.name} to run at ${nextRun.toLocaleString()}`);
}

export async function initializeScheduler(): Promise<void> {
  const automations = await getAutomations();
  
  for (const automation of automations) {
    if (automation.cron && automation.isEnabled) {
      await scheduleAutomation(automation);
    }
  }
  
  console.log('[Openmation] Scheduler initialized');
}

export async function handleAlarm(alarm: chrome.alarms.Alarm): Promise<void> {
  if (!alarm.name.startsWith(ALARM_PREFIX)) return;
  
  const automationId = alarm.name.slice(ALARM_PREFIX.length);
  const automation = await getAutomation(automationId);
  
  if (!automation) {
    console.warn(`Automation ${automationId} not found`);
    return;
  }
  
  if (!automation.isEnabled) {
    console.log(`Automation ${automation.name} is disabled, skipping`);
    return;
  }
  
  console.log(`Running scheduled automation: ${automation.name}`);
  
  await runScheduledAutomation(automation);
  await scheduleAutomation(automation);
}

async function runScheduledAutomation(automation: Automation): Promise<void> {
  try {
    const startUrl = automation.startUrl || 'about:blank';
    const tab = await chrome.tabs.create({ url: startUrl, active: false });
    
    if (!tab.id) {
      throw new Error('Failed to create tab');
    }
    
    await new Promise<void>((resolve) => {
      const listener = (tabId: number, changeInfo: { status?: string }) => {
        if (tabId === tab.id && changeInfo.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      };
      chrome.tabs.onUpdated.addListener(listener);
    });
    
    // Inject content script
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['src/content/index.ts'],
    }).catch(() => {});
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await chrome.tabs.sendMessage(tab.id, {
      type: 'RUN_AUTOMATION',
      automation,
    });
    
  } catch (error) {
    console.error(`Failed to run scheduled automation ${automation.name}:`, error);
  }
}

export async function cancelScheduledAutomation(automationId: string): Promise<void> {
  await chrome.alarms.clear(`${ALARM_PREFIX}${automationId}`);
}

export async function getScheduledTime(automationId: string): Promise<Date | null> {
  const alarm = await chrome.alarms.get(`${ALARM_PREFIX}${automationId}`);
  return alarm ? new Date(alarm.scheduledTime) : null;
}
