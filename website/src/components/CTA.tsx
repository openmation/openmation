"use client";

import { Chrome, Star, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "4.9", label: "Chrome Rating", icon: Star },
  { value: "100%", label: "Open Source" },
  { value: "<1min", label: "Setup Time" },
];

export function CTA() {
  return (
    <section id="get-started" className="section-padding bg-background relative">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo with spinning animation */}
          <div className="inline-block mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1], // Ease in-out with acceleration/deceleration
              }}
            >
              <Image
                src="/openmation-transparent.png"
                alt="Openmation"
                width={96}
                height={96}
                className="w-24 h-24 object-contain"
              />
            </motion.div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            Ready to automate?
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands of users who have simplified their browser workflows.
            Free and open source forever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="https://chrome.google.com/webstore"
              target="_blank"
              className="btn-primary text-base px-8 py-4"
            >
              <Chrome className="w-5 h-5" />
              <span>Download for Chrome</span>
            </Link>
            <Link
              href="https://github.com/openmation"
              target="_blank"
              className="btn-secondary text-base px-8 py-4"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-secondary/50 border border-border/50"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <p className="text-2xl font-semibold logo-gradient-text">
                    {stat.value}
                  </p>
                  {stat.icon && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
