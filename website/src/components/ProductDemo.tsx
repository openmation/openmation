"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Circle,
  Play,
  Share2,
  Clock,
  Check,
  FileText,
  MousePointerClick,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "record", label: "Record", icon: Circle },
  { id: "replay", label: "Replay", icon: Play },
  { id: "share", label: "Share", icon: Share2 },
  { id: "schedule", label: "Schedule", icon: Clock },
];

const automationItems = [
  { name: "Fill_Login_Form.auto", status: "Ready", events: 12 },
  { name: "Submit_Weekly_Report.auto", status: "Thinking", events: 24 },
  { name: "Export_Analytics.auto", status: "Thinking", events: 8 },
  { name: "Update_CRM_Records.auto", status: "Ready", events: 32 },
  { name: "Generate_Invoice.auto", status: "Thinking", events: 15 },
];

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-0.5 text-primary">
      <span className="text-xs">Thinking</span>
      <span className="flex gap-0.5 ml-1">
        <span className="thinking-dot" />
        <span className="thinking-dot" />
        <span className="thinking-dot" />
      </span>
    </span>
  );
}

export function ProductDemo() {
  const [activeTab, setActiveTab] = useState("record");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSteps, setRecordedSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Simulate recording steps
  useEffect(() => {
    if (isRecording && currentStep < 5) {
      const steps = [
        "Click email input",
        "Type: user@company.com",
        "Click password field",
        "Type: ••••••••",
        "Click Sign In button",
      ];
      const timer = setTimeout(() => {
        setRecordedSteps((prev) => [...prev, steps[currentStep]]);
        setCurrentStep((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else if (currentStep >= 5) {
      setTimeout(() => {
        setIsRecording(false);
        setCurrentStep(0);
        setRecordedSteps([]);
      }, 2000);
    }
  }, [isRecording, currentStep]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordedSteps([]);
    setCurrentStep(0);
  };

  return (
    <div className="card-elevated-lg overflow-hidden">
      {/* Tab navigation */}
      <div className="flex items-center gap-1 px-4 py-3 border-b border-border bg-secondary/30">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeTab === tab.id
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/50"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex min-h-[500px]">
        {/* Left side - Website mockup */}
        <div className="flex-1 p-8 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
          {/* Browser chrome */}
          <div className="card-elevated overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-white">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1.5 rounded-lg bg-secondary text-xs text-muted-foreground font-mono">
                  app.example.com/login
                </div>
              </div>
            </div>

            {/* Website content */}
            <div className="p-8 bg-white">
              <div className="max-w-xs mx-auto space-y-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-coral flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Welcome back</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign in to continue
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Email
                    </label>
                    <div
                      className={cn(
                        "px-4 py-3 rounded-xl border bg-white text-sm transition-all",
                        isRecording && (currentStep === 0 || currentStep === 1)
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border"
                      )}
                    >
                      {currentStep >= 2 ? (
                        <span>user@company.com</span>
                      ) : (
                        <span className="text-muted-foreground">
                          Enter your email
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Password
                    </label>
                    <div
                      className={cn(
                        "px-4 py-3 rounded-xl border bg-white text-sm transition-all",
                        isRecording && (currentStep === 2 || currentStep === 3)
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border"
                      )}
                    >
                      {currentStep >= 4 ? (
                        <span>••••••••</span>
                      ) : (
                        <span className="text-muted-foreground">
                          Enter your password
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    className={cn(
                      "w-full py-3 rounded-xl font-medium text-sm text-white transition-all",
                      isRecording && currentStep === 4
                        ? "bg-primary ring-2 ring-primary/30"
                        : "bg-foreground"
                    )}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Animated cursor */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x:
                    currentStep === 0 || currentStep === 1
                      ? 100
                      : currentStep === 2 || currentStep === 3
                      ? 100
                      : 150,
                  y:
                    currentStep === 0 || currentStep === 1
                      ? 180
                      : currentStep === 2 || currentStep === 3
                      ? 260
                      : 340,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute pointer-events-none z-10"
              >
                <MousePointerClick className="w-6 h-6 text-primary drop-shadow-lg" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side - Extension panel */}
        <div className="w-[340px] border-l border-border bg-white flex flex-col">
          {/* Extension header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/simplest.png"
                alt="Simplest"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Simplest</h4>
              <p className="text-xs text-muted-foreground">Automation</p>
            </div>
          </div>

          {/* Recording section */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border/50">
              {isRecording ? (
                <>
                  <button
                    onClick={() => setIsRecording(false)}
                    className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-500 pulse-glow"
                  >
                    <div className="w-3.5 h-3.5 rounded-sm bg-red-500" />
                  </button>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Recording...</p>
                    <p className="text-xs text-muted-foreground">
                      {recordedSteps.length} events captured
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={startRecording}
                    className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  >
                    <Circle className="w-5 h-5 fill-current" />
                  </button>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Start Recording</p>
                    <p className="text-xs text-muted-foreground">
                      Capture your actions
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Recording steps */}
            <AnimatePresence>
              {isRecording && recordedSteps.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 space-y-1.5 overflow-hidden"
                >
                  {recordedSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-100 text-xs"
                    >
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-800">{step}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Automations list */}
          <div className="flex-1 overflow-auto p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Automations
              </h5>
              <span className="text-xs text-muted-foreground">
                {automationItems.length} items
              </span>
            </div>

            <div className="space-y-2">
              {automationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-white hover:border-border hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <div className="flex items-center gap-2">
                      {item.status === "Thinking" ? (
                        <ThinkingDots />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {item.events} events
                        </span>
                      )}
                    </div>
                  </div>
                  <Play className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
