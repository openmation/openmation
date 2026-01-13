"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Chrome } from "lucide-react";
import Link from "next/link";
import { AutomationDemo } from "./AutomationDemo";

const rotatingWords = [
  "Signups",
  "Form Filling",
  "Data Entry",
  "Testing",
  "Reporting",
];

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="container-custom relative z-10 pt-28 md:pt-32 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs font-medium text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Record · Replay · Share · Schedule
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
            Automate your{" "}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="logo-gradient-text"
                >
                  {rotatingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Turn repetitive browser tasks into one-click automations.
            Record once, replay forever, share with anyone.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link href="#get-started" className="btn-primary text-base px-8 py-3.5">
              <Chrome className="w-5 h-5" />
              <span>Add to Chrome — Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#how-it-works" className="btn-secondary text-base px-8 py-3.5">
              See how it works
            </Link>
          </div>

          {/* Word indicators */}
          <div className="flex items-center justify-center gap-1.5 mb-12">
            {rotatingWords.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentWordIndex(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentWordIndex
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Automation Demo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <AutomationDemo />
        </motion.div>
      </div>
    </section>
  );
}
