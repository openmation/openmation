"use client";

import { ArrowRight, Chrome, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "4.9", label: "Chrome Rating", icon: Star },
  { value: "100%", label: "Free Forever" },
  { value: "<1min", label: "Setup Time" },
];

export function CTA() {
  return (
    <section id="get-started" className="section-padding bg-background relative">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo - bigger with transparent background */}
          <div className="inline-block mb-6">
            <Image
              src="/transparent.png"
              alt="Simplest"
              width={96}
              height={96}
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Ready to automate?
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who have simplified their browser workflows.
            Free forever for personal use.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              href="https://chrome.google.com/webstore"
              target="_blank"
              className="btn-primary text-base px-8 py-3.5"
            >
              <Chrome className="w-5 h-5" />
              <span>Add to Chrome — Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-card border border-border/50"
              >
                <div className="flex items-center justify-center gap-1">
                  <p className="text-xl font-bold logo-gradient-text">
                    {stat.value}
                  </p>
                  {stat.icon && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                </div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
