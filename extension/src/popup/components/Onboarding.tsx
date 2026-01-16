import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  MousePointerClick,
  Share2,
  Play,
  Sparkles,
  ArrowRight,
  Check,
  Bot,
  Key,
} from "lucide-react";
import { setAISettings, getAISettings } from "@/lib/storage";
import type { AIProviderType } from "@/lib/types";

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    id: "record",
    icon: MousePointerClick,
    title: "Record Your Actions",
    description:
      "Click “Start Recording” and perform any actions on a webpage. We capture clicks, typing, scrolling, and navigation.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "replay",
    icon: Play,
    title: "Replay with Confidence",
    description:
      "Run your saved automations in one click. Watch them execute with a visual cursor for each step.",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "share",
    icon: Share2,
    title: "Share Instantly",
    description:
      "Generate a shareable link for any automation. Anyone with the link can run it instantly.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "ai",
    icon: Bot,
    title: "Enable AI Recording",
    description:
      "Add your OpenAI or Claude key to unlock AI-driven recording that adapts to layout changes.",
    color: "from-purple-500 to-indigo-600",
    isInputStep: true,
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [apiKey, setApiKey] = useState("");
  const [provider, setProvider] = useState<AIProviderType>("openai");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Pre-load existing settings if any
    getAISettings().then((settings) => {
      if (settings.openaiApiKey) {
        setApiKey(settings.openaiApiKey);
        setProvider("openai");
      } else if (settings.anthropicApiKey) {
        setApiKey(settings.anthropicApiKey);
        setProvider("anthropic");
      }
    });
  }, []);

  const handleNext = async () => {
    const step = steps[currentStep];

    // If on AI step and key is provided, save it
    if (step.id === "ai" && apiKey.trim()) {
      setIsSaving(true);
      try {
        await setAISettings({
          provider,
          openaiApiKey: provider === "openai" ? apiKey.trim() : undefined,
          anthropicApiKey: provider === "anthropic" ? apiKey.trim() : undefined,
          enabled: true,
        });
      } finally {
        setIsSaving(false);
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = steps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === steps.length - 1;
  const isAIStep = step.id === "ai";

  return (
    <div className="flex flex-col h-[520px] bg-background overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border/40 bg-background/50 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src="/icons/icon128.png"
              alt="Openmation"
              className="w-8 h-8 rounded-lg relative shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold tracking-tight text-foreground/90">
              Openmation
            </h1>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-transparent px-2"
        >
          Skip Intro
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center px-8 py-2 relative overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

        {/* Animated Icon Container */}
        {!isAIStep && (
          <div className="relative mb-8 group perspective-1000">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-primary/10 transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-3`}
            >
              <Icon
                className="w-10 h-10 text-white drop-shadow-md"
                strokeWidth={1.5}
              />
            </div>
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-20 -z-10`}
            />
          </div>
        )}

        {/* Text Content */}
        <div className="text-center space-y-3 max-w-[300px] z-10">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {step.title}
          </h2>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </div>

        {/* AI Input Section */}
        {isAIStep && (
          <div className="w-full max-w-[280px] mt-6 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-1.5">
              <Label
                htmlFor="provider"
                className="text-xs font-medium text-muted-foreground ml-1"
              >
                AI Provider
              </Label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-secondary/50 rounded-lg border border-border/50">
                <button
                  onClick={() => setProvider("openai")}
                  className={`text-xs font-medium py-1.5 rounded-md transition-all ${
                    provider === "openai"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  OpenAI
                </button>
                <button
                  onClick={() => setProvider("anthropic")}
                  className={`text-xs font-medium py-1.5 rounded-md transition-all ${
                    provider === "anthropic"
                      ? "bg-background shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Anthropic
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="apiKey"
                className="text-xs font-medium text-muted-foreground ml-1"
              >
                {provider === "openai" ? "OpenAI API Key" : "Anthropic API Key"}
              </Label>
              <div className="relative">
                <Key className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  id="apiKey"
                  type="password"
                  placeholder={provider === "openai" ? "sk-..." : "sk-ant-..."}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pl-8 h-9 text-xs bg-background/50 border-border/60 focus:bg-background transition-colors"
                />
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-muted-foreground text-center">
              Your key is stored locally. When provided, AI-driven recording is
              enabled by default and can be changed anytime in the AI tab.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-6 border-t border-border/40 bg-background/50 backdrop-blur-sm">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => !isSaving && setCurrentStep(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? `bg-foreground w-6 shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,0.2)]`
                  : index < currentStep
                  ? "bg-foreground/30 w-1.5 hover:bg-foreground/50"
                  : "bg-muted w-1.5"
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <Button
          onClick={handleNext}
          disabled={isSaving}
          className={`w-full h-11 rounded-xl shadow-lg shadow-primary/5 transition-all duration-300 ${
            isAIStep && apiKey
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : ""
          }`}
        >
          {isAIStep ? (
            <span className="flex items-center gap-2">
              {apiKey ? (
                <>
                  Enable AI & Finish <Sparkles className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  Finish Without AI <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </span>
          ) : isLastStep ? (
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              Get Started
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Continue
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
