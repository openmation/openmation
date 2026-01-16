import { useState, useEffect, useCallback } from "react";
import { Circle, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { getAISettings, updateAISettings } from "@/lib/storage";

interface RecordingPanelProps {
  onRecordingChange: (isRecording: boolean) => void;
  onOpenAISettings?: () => void;
}

export function RecordingPanel({
  onRecordingChange,
  onOpenAISettings,
}: RecordingPanelProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiProvider, setAiProvider] = useState<
    "openai" | "anthropic" | undefined
  >();
  const [hasApiKey, setHasApiKey] = useState(false);

  // Check recording state
  const checkRecordingState = useCallback(async () => {
    try {
      const response = (await chrome.runtime.sendMessage({
        type: "GET_RECORDING_STATE",
      })) as {
        success: boolean;
        state: { isRecording: boolean };
      };

      if (response.success && response.state.isRecording) {
        setIsRecording(true);
        onRecordingChange(true);
      }
    } catch (error) {
      console.error("Failed to check recording state:", error);
    }
  }, [onRecordingChange]);

  useEffect(() => {
    checkRecordingState();
  }, [checkRecordingState]);

  const checkAIStatus = useCallback(async () => {
    try {
      const settings = await getAISettings();
      const key =
        settings.provider === "openai"
          ? settings.openaiApiKey
          : settings.anthropicApiKey;
      setHasApiKey(!!key);
      setAiProvider(settings.provider);
      setAiEnabled(!!settings.enabled && !!key);
    } catch {
      setAiEnabled(false);
      setAiProvider(undefined);
      setHasApiKey(false);
    }
  }, []);

  useEffect(() => {
    checkAIStatus();
  }, [checkAIStatus]);

  const handleAIModeToggle = async (nextEnabled: boolean) => {
    if (nextEnabled && !hasApiKey) {
      onOpenAISettings?.();
      return;
    }

    try {
      await updateAISettings({ enabled: nextEnabled });
      setAiEnabled(nextEnabled);
    } catch (error) {
      console.error("Failed to update AI settings:", error);
    }
  };

  const startRecording = async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (!tab?.id) {
        console.error("No active tab found");
        return;
      }

      // Check if it's a chrome:// page
      if (tab.url?.startsWith("chrome://")) {
        alert(
          "Cannot record on Chrome internal pages. Please navigate to a regular website."
        );
        return;
      }

      const response = (await chrome.runtime.sendMessage({
        type: "START_RECORDING",
        tabId: tab.id,
      })) as { success: boolean; error?: string };

      if (response.success) {
        setIsRecording(true);
        onRecordingChange(true);

        // Close popup so user can interact with the page
        window.close();
      } else {
        alert(response.error || "Failed to start recording");
      }
    } catch (error) {
      console.error("Failed to start recording:", error);
      alert(
        "Failed to start recording. Make sure you're on a regular webpage and try refreshing."
      );
    }
  };

  // If recording, show status
  if (isRecording) {
    return (
      <div className="p-5 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Circle className="w-3 h-3 fill-red-500 text-red-500 animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Recording in progress
              </p>
              <p className="text-xs text-muted-foreground">
                Use the panel on the webpage
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.close()}
            className="gap-1.5 rounded-full"
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
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <p className="text-sm font-medium text-foreground">AI Mode</p>
          <p className="text-xs text-muted-foreground">
            {aiEnabled
              ? `Enabled (${aiProvider === "anthropic" ? "Claude" : "OpenAI"})`
              : "Off"}
          </p>
        </div>
        <Switch checked={aiEnabled} onCheckedChange={handleAIModeToggle} />
      </div>
      <Button
        onClick={startRecording}
        className="w-full h-12 gap-3 text-sm font-medium rounded-xl border border-border bg-background hover:bg-secondary text-foreground"
        variant="outline"
      >
        <Circle className="w-4 h-4 fill-red-500 text-red-500" />
        Start Recording
      </Button>
    </div>
  );
}
