"use client";

import { Circle, Play, Share2, Clock, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Circle,
    title: "Record",
    description:
      "Click Start and perform any actions. Every click, keystroke, and navigation is captured automatically.",
  },
  {
    number: "02",
    icon: Play,
    title: "Replay",
    description:
      "Run your automation with a single click. Watch it execute with a visual cursor showing each step.",
  },
  {
    number: "03",
    icon: Share2,
    title: "Share",
    description:
      "Generate a shareable link instantly. Anyone can run your automation without installing anything.",
  },
  {
    number: "04",
    icon: Clock,
    title: "Schedule",
    description:
      "Set automations to run on a schedule. Perfect for reports, backups, and recurring tasks.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-secondary/30 relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Four steps to
            <br />
            <span className="logo-gradient-text">automation bliss</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No code required. No complex setup. Just record, replay, and let
            automation handle the rest.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px z-0">
                    <div className="w-full h-px bg-border" />
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/30" />
                  </div>
                )}

                <div className="relative z-10 p-5 rounded-xl border border-border/50 bg-card hover:shadow-lg hover:border-border transition-all duration-300">
                  {/* Step number */}
                  <span className="text-xs font-bold text-muted-foreground/40 mb-3 block">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
