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
  { value: "100%", label: "Free forever" },
];

export function Features() {
  const [activeTab, setActiveTab] = useState("recording");

  const activeFeature = features.find((f) => f.id === activeTab)!;

  return (
    <section id="features" className="section-padding bg-background relative">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.01]" 
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Delegate repetitive work
            <br />
            <span className="logo-gradient-text">to automations</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Built with obsessive attention to detail. Every feature designed to
            make browser automation feel effortless.
          </p>
        </div>

        {/* Feature tabs */}
        <div className="card-elevated-lg overflow-hidden">
          {/* Tab navigation */}
          <div className="flex items-center gap-1 px-4 py-3 border-b border-border/50 bg-secondary/30 overflow-x-auto no-scrollbar">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    activeTab === feature.id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
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
            <div className="p-8 md:p-10 bg-card">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <activeFeature.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-xl font-bold mb-3">{activeFeature.title}</h3>
                <p className="text-muted-foreground mb-6">
                  {activeFeature.description}
                </p>

                <ul className="space-y-3">
                  {activeFeature.items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-success" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Right side - Visual demo */}
            <div className="p-8 md:p-10 bg-secondary/30 flex items-center justify-center">
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
              className="text-center p-5 rounded-xl bg-card border border-border/50"
            >
              <p className="text-2xl md:text-3xl font-bold logo-gradient-text mb-1">
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
      <div className="card-elevated p-4 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-destructive recording-pulse" />
          </div>
          <div>
            <p className="text-sm font-medium">Recording...</p>
            <p className="text-xs text-muted-foreground">5 events captured</p>
          </div>
        </div>
        {["Click email input", "Type: user@example.com", "Click submit"].map(
          (step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-success/5 border border-success/10 text-xs"
            >
              <Check className="w-3.5 h-3.5 text-success" />
              <span className="text-success">{step}</span>
            </motion.div>
          )
        )}
      </div>
    );
  }

  if (featureId === "replay") {
    return (
      <div className="card-elevated p-6 text-center">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Play className="w-7 h-7 text-primary fill-current" />
        </div>
        <p className="font-medium mb-3">Running automation...</p>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-full bg-primary rounded-full"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Step 3 of 4</p>
      </div>
    );
  }

  if (featureId === "sharing") {
    return (
      <div className="card-elevated p-5 space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-success/5 border border-success/10">
          <Check className="w-5 h-5 text-success" />
          <span className="text-sm font-medium text-success">
            Link copied to clipboard!
          </span>
        </div>
        <div className="px-4 py-3 rounded-lg bg-secondary border border-border font-mono text-xs text-muted-foreground break-all">
          simplest.app/run/xK9mL2pQ
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Anyone with this link can run your automation
        </p>
      </div>
    );
  }

  return (
    <div className="card-elevated p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium">Schedule</p>
        <div className="px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
          Active
        </div>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Frequency</span>
          <span className="font-medium">Every day</span>
        </div>
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Time</span>
          <span className="font-medium">9:00 AM</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-muted-foreground">Next run</span>
          <span className="font-medium">Tomorrow</span>
        </div>
      </div>
    </div>
  );
}
