import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import {
  getAISettings,
  setAISettings,
  getAuthState,
  setAuthState,
  clearAuthState,
} from "@/lib/storage";
import { API_BASE_URL } from "@/lib/api";
import type { AISettings as AISettingsType, AIProviderType } from "@/lib/types";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

export function AISettings() {
  const [settings, setSettings] = useState<AISettingsType>({
    provider: "openai",
    enabled: false,
  });
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(
    null
  );
  const [saving, setSaving] = useState(false);

  // Load settings on mount
  useEffect(() => {
    getAISettings().then(setSettings);
    getAuthState().then((state) => {
      if (state?.token) {
        setAuthToken(state.token);
        setAuthEmail(state.email || "");
      }
    });
  }, []);

  // Get the current API key based on provider
  const currentApiKey =
    settings.provider === "openai"
      ? settings.openaiApiKey || ""
      : settings.anthropicApiKey || "";

  const handleProviderChange = (provider: AIProviderType) => {
    setSettings((prev) => ({ ...prev, provider }));
    setTestResult(null);
  };

  const handleApiKeyChange = (apiKey: string) => {
    if (settings.provider === "openai") {
      setSettings((prev) => ({ ...prev, openaiApiKey: apiKey }));
    } else {
      setSettings((prev) => ({ ...prev, anthropicApiKey: apiKey }));
    }
    setTestResult(null);
  };

  const handleEnabledChange = (enabled: boolean) => {
    setSettings((prev) => ({ ...prev, enabled }));
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      // Save current settings first
      await setAISettings(settings);

      // Test connection via background
      const response = await chrome.runtime.sendMessage({
        type: "AI_TEST_CONNECTION",
      });
      setTestResult(response.success ? "success" : "error");
    } catch (error) {
      console.error("Connection test failed:", error);
      setTestResult("error");
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setAISettings(settings);
      // Show brief success feedback
      setTimeout(() => setSaving(false), 500);
    } catch (error) {
      console.error("Failed to save settings:", error);
      setSaving(false);
    }
  };

  const hasApiKey = !!currentApiKey;

  const handleLogin = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: authEmail, password: authPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        setAuthError(data.error || "Login failed");
        return;
      }
      await setAuthState({
        token: data.token,
        userId: data.user?.id,
        email: data.user?.email,
      });
      setAuthToken(data.token);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!authToken) return;
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).catch(() => undefined);
    await clearAuthState();
    setAuthToken(null);
    setAuthPassword("");
  };

  return (
    <div className="p-3 pb-6 space-y-3">
      <Card>
        <CardHeader className="pb-2 pt-3 px-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Account</CardTitle>
            {authToken && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-7 text-xs"
              >
                Log out
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-3 pb-3">
          {authToken ? (
            <p className="text-xs text-muted-foreground">
              Signed in as <span className="text-foreground">{authEmail}</span>
            </p>
          ) : (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="auth-email" className="text-xs">
                  Email
                </Label>
                <Input
                  id="auth-email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="h-9"
                  placeholder="you@company.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="auth-password" className="text-xs">
                  Password
                </Label>
                <Input
                  id="auth-password"
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="h-9"
                  placeholder="••••••••"
                />
              </div>
              {authError && <p className="text-xs text-red-500">{authError}</p>}
              <Button
                size="sm"
                onClick={handleLogin}
                disabled={authLoading}
                className="h-8 text-xs"
              >
                {authLoading ? "Signing in..." : "Sign in"}
              </Button>
              <p className="text-[11px] text-muted-foreground">
                New here? Create an account on openmation.dev/account.
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2 pt-3 px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <CardTitle className="text-sm">AI-Powered Automation</CardTitle>
            </div>
            <Switch
              id="ai-enabled"
              checked={settings.enabled}
              onCheckedChange={handleEnabledChange}
              disabled={!hasApiKey}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-3 pb-3">
          {/* Provider Selection */}
          <div className="space-y-1.5">
            <Label className="text-xs">AI Provider</Label>
            <Select
              value={settings.provider}
              onValueChange={(v) => handleProviderChange(v as AIProviderType)}
            >
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">
                  <div className="flex items-center gap-2">
                    <span>OpenAI</span>
                    <Badge variant="secondary" className="text-[10px]">
                      GPT-4o
                    </Badge>
                  </div>
                </SelectItem>
                <SelectItem value="anthropic">
                  <div className="flex items-center gap-2">
                    <span>Anthropic</span>
                    <Badge variant="secondary" className="text-[10px]">
                      Claude
                    </Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* API Key Input */}
          <div className="space-y-1.5">
            <Label htmlFor="api-key" className="text-xs">
              {settings.provider === "openai" ? "OpenAI" : "Anthropic"} API Key
            </Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                placeholder={
                  settings.provider === "openai" ? "sk-..." : "sk-ant-..."
                }
                value={currentApiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                className="pr-10 h-9"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showApiKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Test Connection & Save */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestConnection}
              disabled={!hasApiKey || testing}
              className="h-8 text-xs"
            >
              {testing ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                  Testing...
                </>
              ) : testResult === "success" ? (
                <>
                  <CheckCircle2 className="w-3 h-3 mr-1.5 text-green-500" />
                  Connected
                </>
              ) : testResult === "error" ? (
                <>
                  <XCircle className="w-3 h-3 mr-1.5 text-red-500" />
                  Failed
                </>
              ) : (
                "Test Connection"
              )}
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving}
              className="h-8 text-xs"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Settings"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Card - Collapsible or smaller */}
      <Card>
        <CardContent className="py-3 px-3">
          <p className="text-[11px] text-muted-foreground">
            <span className="font-medium text-foreground">How it works:</span>{" "}
            AI captures screenshots during recording and uses vision to find
            elements during replay, even when layouts change.
            <span className="text-amber-600 dark:text-amber-400">
              {" "}
              API costs ~$0.01-0.02/action.
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
