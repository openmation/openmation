import { useState, useEffect, useCallback } from 'react';
import { Circle, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

interface RecordingPanelProps {
  onRecordingChange: (isRecording: boolean) => void;
}

export function RecordingPanel({ onRecordingChange }: RecordingPanelProps) {
  const [isRecording, setIsRecording] = useState(false);

  // Check recording state
  const checkRecordingState = useCallback(async () => {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_RECORDING_STATE' }) as {
        success: boolean;
        state: { isRecording: boolean };
      };
      
      if (response.success && response.state.isRecording) {
        setIsRecording(true);
        onRecordingChange(true);
      }
    } catch (error) {
      console.error('Failed to check recording state:', error);
    }
  }, [onRecordingChange]);

  useEffect(() => {
    checkRecordingState();
  }, [checkRecordingState]);

  const startRecording = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) {
        console.error('No active tab found');
        return;
      }
      
      // Check if it's a chrome:// page
      if (tab.url?.startsWith('chrome://')) {
        alert('Cannot record on Chrome internal pages. Please navigate to a regular website.');
        return;
      }

      const response = await chrome.runtime.sendMessage({
        type: 'START_RECORDING',
        tabId: tab.id,
      }) as { success: boolean; error?: string };

      if (response.success) {
        setIsRecording(true);
        onRecordingChange(true);
        
        // Close popup so user can interact with the page
        window.close();
      } else {
        alert(response.error || 'Failed to start recording');
      }
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Failed to start recording. Make sure you\'re on a regular webpage and try refreshing.');
    }
  };

  // If recording, show status
  if (isRecording) {
    return (
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Circle className="w-3 h-3 fill-destructive text-destructive animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-destructive/30 animate-ping" />
            </div>
            <div>
              <p className="text-sm font-medium">Recording in progress</p>
              <p className="text-xs text-muted-foreground">Use the panel on the webpage</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.close()}
            className="gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Go to page
          </Button>
        </div>
      </div>
    );
  }

  // Default: Show start recording button
  return (
    <div className="p-5 border-b border-border/50">
      <Button
        onClick={startRecording}
        className="w-full h-12 gap-3 text-sm font-medium"
        variant="outline"
      >
        <div className="relative">
          <Circle className="w-4 h-4 fill-destructive text-destructive" />
        </div>
        Start New Recording
      </Button>
      <p className="mt-3 text-xs text-center text-muted-foreground">
        Opens a recording panel on the current page
      </p>
    </div>
  );
}
