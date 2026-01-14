// API configuration and helpers for sharing automations

// Backend URL - uses production URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' ? 'https://api.openmation.dev' : 'http://localhost:3002');

export interface ShareResponse {
  success: boolean;
  id?: string;
  shareUrl?: string;
  error?: string;
}

export interface FetchAutomationResponse {
  success: boolean;
  automation?: {
    id: string;
    name: string;
    events: unknown[];
    startUrl: string;
    duration: number;
    mouseMovements?: unknown[];
  };
  error?: string;
}

/**
 * Share an automation to the backend and get a shareable URL
 */
export async function shareAutomation(automation: unknown): Promise<ShareResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/automations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ automation }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Failed to share automation',
      };
    }

    return {
      success: true,
      id: data.id,
      shareUrl: data.shareUrl,
    };
  } catch (error) {
    console.error('Error sharing automation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Fetch a shared automation from the backend
 */
export async function fetchSharedAutomation(id: string): Promise<FetchAutomationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/automations/${id}`);
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Automation not found',
      };
    }

    return {
      success: true,
      automation: data.automation,
    };
  } catch (error) {
    console.error('Error fetching automation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Check if the backend is available
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}

export { API_BASE_URL };
