"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MousePointerClick,
  Play,
  Share2,
  Clock,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "recording",
    icon: MousePointerClick,
    title: "Keystroke-level precision",
    description:
      "Every single click, keystroke, and scroll is captured with exact timing. Your automations replay exactly as you recorded them.",
    items: [
      "Capture every mouse click and keyboard input",
      "Record across multiple page navigations",
      "Real-time event counter shows what's being captured",
      "Beautiful floating panel stays out of your way",
    ],
  },
  {
    id: "replay",
    icon: Play,
    title: "Visual playback with cursor",
    description:
      "Watch your automations execute with an animated cursor showing exactly where each action is performed.",
    items: [
      "Animated cursor shows actions in real-time",
      "Multi-strategy element finding for reliability",
      "Smart timing respects original recording pace",
      "Form validation triggered correctly",
    ],
  },
  {
    id: "sharing",
    icon: Share2,
    title: "One-click shareable links",
    description:
      "Generate a unique URL for any automation. Anyone can run it instantly without installing anything.",
    items: [
      "Generate shareable links in one click",
      "Recipients run automations instantly",
      "No extension required for running",
      "Links copied to clipboard automatically",
    ],
  },
  {
    id: "scheduling",
    icon: Clock,
    title: "Set it and forget it",
    description:
      "Schedule automations to run hourly, daily, weekly, or with custom intervals. Perfect for recurring tasks.",
    items: [
      "Preset schedules for common intervals",
      "Custom cron expressions for flexibility",
      "Background execution without interaction",
      "Run history tracks all scheduled runs",
    ],
  },
];

const stats = [
  { value: "50%", label: "Time saved on repetitive tasks" },
  { value: "1-click", label: "To share any automation" },
  { value: "100%", label: "Free & Open Source" },
];

export function Features() {
  const [activeTab, setActiveTab] = useState("recording");

  const activeFeature = features.find((f) => f.id === activeTab)!;

  return (
    <section id="features" className="section-padding bg-background relative">
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            Delegate repetitive work
            <br />
            <span className="logo-gradient-text">to automations</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Built with obsessive attention to detail. Every feature designed to
            make browser automation feel effortless.
          </p>
        </div>

        {/* Feature tabs - Dark card like Antigravity */}
        <div className="card-dark overflow-hidden">
          {/* Tab navigation */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-white/[0.06] overflow-x-auto no-scrollbar">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    activeTab === feature.id
                      ? "bg-white text-black"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{feature.id.charAt(0).toUpperCase() + feature.id.slice(1)}</span>
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Description */}
            <div className="p-8 md:p-12">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <activeFeature.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">{activeFeature.title}</h3>
                <p className="text-white/60 mb-8 text-base leading-relaxed">
                  {activeFeature.description}
                </p>

                <ul className="space-y-4">
                  {activeFeature.items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-sm text-white/80">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right side - Visual demo */}
            <div className="p-8 md:p-12 bg-white/[0.02] flex items-center justify-center border-l border-white/[0.06]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-sm"
              >
                <FeatureVisual featureId={activeTab} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-secondary/50 border border-border/50"
            >
              <p className="text-3xl md:text-4xl font-semibold logo-gradient-text mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureVisual({ featureId }: { featureId: string }) {
  if (featureId === "recording") {
    return (
      <div className="extension-frame bg-white p-5 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-red-500 recording-pulse" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Recording...</p>
            <p className="text-xs text-gray-500">5 events captured</p>
          </div>
        </div>
        {["Click email input", "Type: user@example.com", "Click submit"].map(
          (step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs"
            >
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-700">{step}</span>
            </motion.div>
          )
        )}
      </div>
    );
  }

  if (featureId === "replay") {
    return (
      <div className="extension-frame bg-white p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center mx-auto mb-5">
          <Play className="w-8 h-8 text-blue-500 fill-current" />
        </div>
        <p className="font-medium text-gray-900 mb-4">Running automation...</p>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          />
        </div>
        <p className="text-xs text-gray-500 mt-3">Step 3 of 4</p>
      </div>
    );
  }

  if (featureId === "sharing") {
    return (
      <div className="extension-frame bg-white p-5 space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
          <Check className="w-5 h-5 text-emerald-500" />
          <span className="text-sm font-medium text-emerald-700">
            Link copied to clipboard!
          </span>
        </div>
        <div className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 font-mono text-xs text-gray-600 break-all">
          openmation.com/run/xK9mL2pQ
        </div>
        <p className="text-xs text-gray-500 text-center">
          Anyone with this link can run your automation
        </p>
      </div>
    );
  }

  return (
    <div className="extension-frame bg-white p-5">
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm font-medium text-gray-900">Schedule</p>
        <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
          Active
        </div>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-3 border-b border-gray-100">
          <span className="text-gray-500">Frequency</span>
          <span className="font-medium text-gray-900">Every day</span>
        </div>
        <div className="flex justify-between py-3 border-b border-gray-100">
          <span className="text-gray-500">Time</span>
          <span className="font-medium text-gray-900">9:00 AM</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-gray-500">Next run</span>
          <span className="font-medium text-gray-900">Tomorrow</span>
        </div>
      </div>
    </div>
  );
}
