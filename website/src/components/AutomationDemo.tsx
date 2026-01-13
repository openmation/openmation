"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Circle,
  Play,
  Share2,
  Clock,
  Check,
  Zap,
  MoreHorizontal,
  Pause,
  Square,
  MousePointer2,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type DemoPhase = 
  | "idle" 
  | "recording" 
  | "saving" 
  | "saved" 
  | "sharing" 
  | "shared" 
  | "scheduling" 
  | "scheduled"
  | "running"
  | "complete";

interface RecordedStep {
  action: string;
  element: string;
  value?: string;
}

const demoSteps: RecordedStep[] = [
  { action: "click", element: "Email input" },
  { action: "type", element: "Email", value: "john@company.com" },
  { action: "click", element: "Password input" },
  { action: "type", element: "Password", value: "••••••••" },
  { action: "click", element: "Sign Up button" },
];

export function AutomationDemo() {
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [recordedSteps, setRecordedSteps] = useState<RecordedStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursorClick, setShowCursorClick] = useState(false);
  const [automationName, setAutomationName] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [isRunningOnRight, setIsRunningOnRight] = useState(false);
  const [rightSideStep, setRightSideStep] = useState(0);
  const [rightCursorPosition, setRightCursorPosition] = useState({ x: 0, y: 0 });
  const [showRightCursorClick, setShowRightCursorClick] = useState(false);
  const [rightFormState, setRightFormState] = useState({ email: "", password: "" });

  // Form field positions (relative to browser content area)
  const formPositions = {
    email: { x: 160, y: 220 },
    password: { x: 160, y: 300 },
    button: { x: 160, y: 380 },
  };

  // Run the demo automatically
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === "idle") {
        startRecording();
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [phase]);

  const startRecording = useCallback(() => {
    setPhase("recording");
    setRecordedSteps([]);
    setCurrentStep(0);
  }, []);

  // Recording animation
  useEffect(() => {
    if (phase !== "recording") return;
    if (currentStep >= demoSteps.length) {
      setTimeout(() => setPhase("saving"), 800);
      return;
    }

    const step = demoSteps[currentStep];
    let position = formPositions.email;
    
    if (step.element.includes("Password")) {
      position = formPositions.password;
    } else if (step.element.includes("Sign Up")) {
      position = formPositions.button;
    }

    // Move cursor
    setCursorPosition(position);

    const clickDelay = setTimeout(() => {
      setShowCursorClick(true);
      setTimeout(() => setShowCursorClick(false), 200);
      
      // Add step to recorded list
      setTimeout(() => {
        setRecordedSteps(prev => [...prev, step]);
        setCurrentStep(prev => prev + 1);
      }, 300);
    }, 600);

    return () => clearTimeout(clickDelay);
  }, [phase, currentStep]);

  // Saving animation
  useEffect(() => {
    if (phase !== "saving") return;
    
    // Animate name typing
    const name = "User Signup Flow";
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i <= name.length) {
        setAutomationName(name.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setPhase("saved"), 500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [phase]);

  // Saved -> Sharing transition
  useEffect(() => {
    if (phase !== "saved") return;
    const timer = setTimeout(() => setPhase("sharing"), 1200);
    return () => clearTimeout(timer);
  }, [phase]);

  // Sharing animation
  useEffect(() => {
    if (phase !== "sharing") return;
    
    const timer = setTimeout(() => {
      setShareUrl("openmation.com/run/xK9mL2");
      setPhase("shared");
    }, 1000);

    return () => clearTimeout(timer);
  }, [phase]);

  // Shared -> Scheduling transition  
  useEffect(() => {
    if (phase !== "shared") return;
    const timer = setTimeout(() => setPhase("scheduling"), 1500);
    return () => clearTimeout(timer);
  }, [phase]);

  // Scheduling animation
  useEffect(() => {
    if (phase !== "scheduling") return;
    const timer = setTimeout(() => setPhase("scheduled"), 1200);
    return () => clearTimeout(timer);
  }, [phase]);

  // Scheduled -> Running on right side
  useEffect(() => {
    if (phase !== "scheduled") return;
    const timer = setTimeout(() => {
      setPhase("running");
      setIsRunningOnRight(true);
      setRightSideStep(0);
      setRightFormState({ email: "", password: "" });
    }, 1500);
    return () => clearTimeout(timer);
  }, [phase]);

  // Right side automation running
  useEffect(() => {
    if (phase !== "running" || !isRunningOnRight) return;
    if (rightSideStep >= demoSteps.length) {
      setTimeout(() => {
        setPhase("complete");
        setIsRunningOnRight(false);
      }, 800);
      return;
    }

    const step = demoSteps[rightSideStep];
    let position = formPositions.email;
    
    if (step.element.includes("Password")) {
      position = formPositions.password;
    } else if (step.element.includes("Sign Up")) {
      position = formPositions.button;
    }

    // Move cursor
    setRightCursorPosition(position);

    const clickDelay = setTimeout(() => {
      setShowRightCursorClick(true);
      setTimeout(() => setShowRightCursorClick(false), 200);
      
      // Update form state
      setTimeout(() => {
        if (step.element === "Email" && step.value) {
          setRightFormState(prev => ({ ...prev, email: step.value! }));
        } else if (step.element === "Password" && step.value) {
          setRightFormState(prev => ({ ...prev, password: step.value! }));
        }
        setRightSideStep(prev => prev + 1);
      }, 300);
    }, 500);

    return () => clearTimeout(clickDelay);
  }, [phase, rightSideStep, isRunningOnRight]);

  // Complete -> Reset cycle
  useEffect(() => {
    if (phase !== "complete") return;
    const timer = setTimeout(() => {
      // Reset everything
      setPhase("idle");
      setRecordedSteps([]);
      setCurrentStep(0);
      setAutomationName("");
      setShareUrl("");
      setRightSideStep(0);
      setRightFormState({ email: "", password: "" });
    }, 3000);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="card-dark overflow-hidden">
      {/* Header with phase indicators */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          {["Record", "Share", "Schedule", "Auto-Run"].map((label, i) => (
            <div
              key={label}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300",
                (i === 0 && ["recording", "saving", "saved"].includes(phase)) ||
                (i === 1 && ["sharing", "shared"].includes(phase)) ||
                (i === 2 && ["scheduling", "scheduled"].includes(phase)) ||
                (i === 3 && ["running", "complete"].includes(phase))
                  ? "bg-white text-black"
                  : "text-white/60"
              )}
            >
              {i === 0 && <Circle className="w-3 h-3" />}
              {i === 1 && <Share2 className="w-3 h-3" />}
              {i === 2 && <Clock className="w-3 h-3" />}
              {i === 3 && <Play className="w-3 h-3" />}
              {label}
            </div>
          ))}
        </div>
        <div className="text-xs text-white/50">
          {phase === "idle" && "Starting demo..."}
          {phase === "recording" && "Recording actions..."}
          {phase === "saving" && "Saving automation..."}
          {phase === "saved" && "Automation saved!"}
          {phase === "sharing" && "Generating link..."}
          {phase === "shared" && "Link copied!"}
          {phase === "scheduling" && "Setting schedule..."}
          {phase === "scheduled" && "Scheduled daily!"}
          {phase === "running" && "Running automation..."}
          {phase === "complete" && "Complete! ✨"}
        </div>
      </div>

      {/* Fixed height container to prevent layout shift */}
      <div className="flex h-[520px]">
        {/* Left side - Website with recording */}
        <div className="flex-1 p-6 relative">
          <div className="text-xs font-medium text-white/60 mb-3 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">1</span>
            </div>
            Recording Session
          </div>
          
          {/* Browser mockup */}
          <div className="extension-frame overflow-hidden bg-white">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1.5 rounded-full bg-gray-100 text-[11px] text-gray-500 font-mono">
                  app.example.com/signup
                </div>
              </div>
            </div>

            {/* Website content - Signup form */}
            <div className="p-6 bg-white relative min-h-[380px]">
              <SignupForm 
                email={currentStep > 1 ? "john@company.com" : ""} 
                password={currentStep > 3 ? "••••••••" : ""}
                activeField={
                  currentStep === 0 || currentStep === 1 ? "email" :
                  currentStep === 2 || currentStep === 3 ? "password" :
                  currentStep === 4 ? "button" : null
                }
              />

              {/* Animated cursor */}
              <AnimatePresence>
                {phase === "recording" && currentStep < demoSteps.length && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: 1, 
                      scale: showCursorClick ? 0.8 : 1,
                      x: cursorPosition.x,
                      y: cursorPosition.y,
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute pointer-events-none z-20"
                    style={{ top: 0, left: 0 }}
                  >
                    <MousePointer2 
                      className={cn(
                        "w-5 h-5 drop-shadow-lg transition-transform",
                        showCursorClick && "scale-90"
                      )} 
                      fill="#3B82F6"
                      stroke="#3B82F6"
                    />
                    {showCursorClick && (
                      <motion.div
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500/40"
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Floating Recording Panel - White theme */}
          <AnimatePresence>
            {(phase === "recording" || phase === "saving" || phase === "saved") && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute top-10 right-10 z-30"
              >
                <RecordingPanel 
                  phase={phase}
                  steps={recordedSteps}
                  name={automationName}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side - Extension popup with automation - fixed layout */}
        <div className="w-[380px] border-l border-white/[0.06] flex flex-col overflow-hidden">
          <ExtensionPopup 
            phase={phase}
            shareUrl={shareUrl}
            isRunning={isRunningOnRight}
            runningStep={rightSideStep}
            totalSteps={demoSteps.length}
            rightFormState={rightFormState}
            rightCursorPosition={rightCursorPosition}
          />
        </div>
      </div>
    </div>
  );
}

// Signup Form Component
function SignupForm({ email, password, activeField }: { 
  email: string; 
  password: string; 
  activeField: "email" | "password" | "button" | null;
}) {
  return (
    <div className="max-w-[280px] mx-auto space-y-5">
      <div className="text-center mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-3">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-base font-semibold text-gray-900">Create Account</h3>
        <p className="text-xs text-gray-500 mt-1">Start your free trial today</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium mb-1.5 block text-gray-500">Email</label>
          <div className={cn(
            "px-3 py-2.5 rounded-lg border bg-white text-sm transition-all text-gray-900",
            activeField === "email" 
              ? "border-blue-500 ring-2 ring-blue-500/20" 
              : "border-gray-200"
          )}>
            {email || <span className="text-gray-400">john@company.com</span>}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium mb-1.5 block text-gray-500">Password</label>
          <div className={cn(
            "px-3 py-2.5 rounded-lg border bg-white text-sm transition-all text-gray-900",
            activeField === "password" 
              ? "border-blue-500 ring-2 ring-blue-500/20" 
              : "border-gray-200"
          )}>
            {password || <span className="text-gray-400">••••••••</span>}
          </div>
        </div>

        <button className={cn(
          "w-full py-2.5 rounded-lg font-medium text-sm text-white transition-all",
          activeField === "button"
            ? "bg-blue-600 ring-2 ring-blue-500/30"
            : "bg-gray-900"
        )}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

// Mini Signup Form for right side
function SignupFormMini({ email, password }: { email: string; password: string }) {
  return (
    <div className="max-w-[160px] mx-auto space-y-2">
      <div className="text-center mb-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-1">
          <Zap className="w-3 h-3 text-white" />
        </div>
        <p className="text-[10px] font-medium text-gray-900">Create Account</p>
      </div>
      <div className="px-2 py-1.5 rounded border border-gray-200 bg-white text-[10px] text-gray-900">
        {email || <span className="text-gray-400">Email</span>}
      </div>
      <div className="px-2 py-1.5 rounded border border-gray-200 bg-white text-[10px] text-gray-900">
        {password || <span className="text-gray-400">Password</span>}
      </div>
      <button className="w-full py-1.5 rounded bg-gray-900 text-white text-[10px] font-medium">
        Sign Up
      </button>
    </div>
  );
}

// Recording Panel Component - White theme like extension
function RecordingPanel({ phase, steps, name }: { 
  phase: DemoPhase;
  steps: RecordedStep[];
  name: string;
}) {
  return (
    <div className="extension-frame w-[260px] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Image
            src="/openmation.png"
            alt="Openmation"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="text-[13px] font-semibold text-gray-900">Openmation</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {phase === "saving" || phase === "saved" ? (
          // Save view
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-xs text-gray-500">
                {steps.length} actions · 00:12
              </div>
            </div>
            <input
              type="text"
              value={name}
              readOnly
              placeholder="Name your automation..."
              className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-gray-900 text-[13px] outline-none"
            />
            <div className="flex gap-2">
              <button className="flex-1 h-9 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium">
                Discard
              </button>
              <button className={cn(
                "flex-1 h-9 rounded-lg text-white text-xs font-medium transition-colors",
                phase === "saved" ? "bg-emerald-500" : "bg-gray-900"
              )}>
                {phase === "saved" ? "Saved ✓" : "Save"}
              </button>
            </div>
          </motion.div>
        ) : (
          // Recording view
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 recording-pulse" />
                <span className="text-xs font-medium text-gray-900">Recording</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span>{steps.length} actions</span>
                <span className="text-gray-300">·</span>
                <span className="font-mono">00:{String(steps.length * 2).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Recorded steps */}
            <div className="space-y-1.5 max-h-[120px] overflow-y-auto demo-scrollbar">
              <AnimatePresence>
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100"
                  >
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-[11px] text-emerald-700">
                      {step.action === "click" ? `Click ${step.element}` : `Type "${step.value}"`}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <button className="w-10 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600">
                <Pause className="w-3 h-3" />
              </button>
              <button className="flex-1 h-9 rounded-lg bg-gray-900 text-white text-xs font-medium flex items-center justify-center gap-1.5">
                <Square className="w-3 h-3" fill="currentColor" />
                Finish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Extension Popup Component - White theme with integrated auto-run section
function ExtensionPopup({ phase, shareUrl, isRunning, runningStep, totalSteps, rightFormState, rightCursorPosition }: {
  phase: DemoPhase;
  shareUrl: string;
  isRunning: boolean;
  runningStep: number;
  totalSteps: number;
  rightFormState: { email: string; password: string };
  rightCursorPosition: { x: number; y: number };
}) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      {/* Header - Openmation branding */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <Image
            src="/openmation.png"
            alt="Openmation"
            width={44}
            height={44}
            className="w-11 h-11 object-contain"
          />
          <div>
            <h1 className="text-[16px] font-semibold tracking-tight logo-gradient-text">Openmation</h1>
            <p className="text-[11px] text-gray-500 font-medium">Browser Automation</p>
          </div>
        </div>
      </div>

      {/* Recording Button */}
      <div className="p-5 border-b border-gray-100 shrink-0">
        <button className="w-full h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center gap-3 text-sm font-medium text-gray-900 transition-colors">
          <Circle className="w-4 h-4 fill-red-500 text-red-500" />
          Start New Recording
        </button>
        <p className="mt-3 text-xs text-center text-gray-500">
          Opens a recording panel on the current page
        </p>
      </div>

      {/* Tabs */}
      <div className="px-4 py-3 border-b border-gray-100 shrink-0">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button className="flex-1 px-4 py-2 rounded-md text-sm font-medium bg-white shadow-sm text-gray-900">
            Automations
          </button>
          <button className="flex-1 px-4 py-2 rounded-md text-sm font-medium text-gray-500">
            History
          </button>
        </div>
      </div>

      {/* Automation List - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          {phase === "idle" || phase === "recording" ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-[15px] font-semibold tracking-tight text-gray-900 mb-1.5">No automations yet</h3>
              <p className="text-[13px] text-gray-500 max-w-[200px]">
                Start by recording your first automation
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="automation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {/* Automation Card */}
              <div className={cn(
                "group rounded-xl border bg-white p-4 transition-all duration-200",
                isRunning ? "border-blue-200 shadow-md shadow-blue-500/5" : "border-gray-100 hover:shadow-md hover:border-gray-200"
              )}>
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200",
                    isRunning ? "bg-blue-50" : "bg-gray-100"
                  )}>
                    {isRunning ? (
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-medium text-gray-900 truncate leading-tight">
                      User Signup Flow
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">5 events</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">12s</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">Just now</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 rounded-lg hover:bg-blue-50 flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 rounded-lg hover:bg-blue-50 flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Running indicator */}
                {isRunning && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Running...</span>
                      <span className="text-blue-500 font-medium">{runningStep}/{totalSteps}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(runningStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}

                {/* Share success */}
                <AnimatePresence>
                  {(phase === "sharing" || phase === "shared") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-gray-100"
                    >
                      <div className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg text-xs",
                        phase === "shared" 
                          ? "bg-emerald-50 border border-emerald-100" 
                          : "bg-blue-50 border border-blue-100"
                      )}>
                        {phase === "shared" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-700 font-medium">Link copied!</span>
                            <span className="text-emerald-600/70 font-mono ml-auto text-[10px]">{shareUrl}</span>
                          </>
                        ) : (
                          <>
                            <Loader2 className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                            <span className="text-blue-700">Generating share link...</span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Schedule section */}
                <AnimatePresence>
                  {(phase === "scheduling" || phase === "scheduled" || phase === "running" || phase === "complete") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Scheduled: Daily at 9:00 AM</span>
                        </div>
                        <div className={cn(
                          "w-8 h-5 rounded-full transition-colors relative",
                          phase === "scheduling" ? "bg-gray-200" : "bg-blue-500"
                        )}>
                          <motion.div
                            className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow"
                            animate={{ left: phase === "scheduling" ? 2 : 14 }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Auto-run preview - always visible placeholder that fills with content */}
              <div className={cn(
                "rounded-xl border p-3 transition-all duration-300",
                isRunning 
                  ? "border-emerald-200 bg-emerald-50/50" 
                  : "border-transparent"
              )}>
                <AnimatePresence mode="wait">
                  {isRunning ? (
                    <motion.div
                      key="running"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="text-xs font-medium text-emerald-700 mb-2 flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <Play className="w-2.5 h-2.5 text-emerald-600" />
                        </div>
                        Auto-running on recipient&apos;s browser
                      </div>
                      <div className="rounded-lg overflow-hidden bg-white border border-emerald-100">
                        <div className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 border-b border-gray-100">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          </div>
                        </div>
                        <div className="p-2 relative min-h-[100px]">
                          <SignupFormMini 
                            email={rightFormState.email}
                            password={rightFormState.password}
                          />
                          {/* Right side cursor */}
                          {runningStep < totalSteps && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ 
                                opacity: 1,
                                x: rightCursorPosition.x * 0.35,
                                y: rightCursorPosition.y * 0.25,
                              }}
                              className="absolute pointer-events-none z-20"
                              style={{ top: 0, left: 0 }}
                            >
                              <MousePointer2 
                                className="w-3 h-3 drop-shadow-lg" 
                                fill="#10B981"
                                stroke="#10B981"
                              />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="h-[140px]"
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
