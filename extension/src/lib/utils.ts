import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
  
  return formatDate(timestamp);
}

export function getUniqueSelector(element: Element): string {
  // Try ID first
  if (element.id) {
    return `#${CSS.escape(element.id)}`;
  }

  // Try data-testid or data-cy
  const testId = element.getAttribute('data-testid') || element.getAttribute('data-cy');
  if (testId) {
    return `[data-testid="${CSS.escape(testId)}"]`;
  }

  // Build path from element
  const path: string[] = [];
  let current: Element | null = element;

  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase();

    if (current.id) {
      selector = `#${CSS.escape(current.id)}`;
      path.unshift(selector);
      break;
    }

    // Add classes (limit to 2 most specific)
    const classes = Array.from(current.classList)
      .filter(c => !c.startsWith('hover:') && !c.startsWith('focus:') && c.length < 30)
      .slice(0, 2);
    
    if (classes.length > 0) {
      selector += `.${classes.map(c => CSS.escape(c)).join('.')}`;
    }

    // Add nth-child if needed for uniqueness
    const parent = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        child => child.tagName === current!.tagName
      );
      if (siblings.length > 1) {
        const index = siblings.indexOf(current) + 1;
        selector += `:nth-child(${index})`;
      }
    }

    path.unshift(selector);
    current = current.parentElement;
  }

  return path.join(' > ');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length - 3) + '...';
}

export function parseCronExpression(cron: string): { isValid: boolean; nextRun?: Date; description?: string } {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) {
    return { isValid: false };
  }

  // Basic validation - could be expanded
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;
  
  const isValidPart = (part: string, min: number, max: number): boolean => {
    if (part === '*') return true;
    if (part.startsWith('*/')) {
      const step = parseInt(part.slice(2), 10);
      return !isNaN(step) && step >= 1 && step <= max;
    }
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= min && num <= max;
  };

  const isValid = 
    isValidPart(minute, 0, 59) &&
    isValidPart(hour, 0, 23) &&
    isValidPart(dayOfMonth, 1, 31) &&
    isValidPart(month, 1, 12) &&
    isValidPart(dayOfWeek, 0, 6);

  if (!isValid) {
    return { isValid: false };
  }

  // Calculate next run (simplified)
  const now = new Date();
  const nextRun = new Date(now);
  
  // Set minute
  if (minute !== '*' && !minute.startsWith('*/')) {
    nextRun.setMinutes(parseInt(minute, 10));
    if (nextRun <= now) {
      nextRun.setHours(nextRun.getHours() + 1);
    }
  }
  
  // Set hour
  if (hour !== '*' && !hour.startsWith('*/')) {
    nextRun.setHours(parseInt(hour, 10));
    if (nextRun <= now) {
      nextRun.setDate(nextRun.getDate() + 1);
    }
  }

  return { isValid: true, nextRun };
}
