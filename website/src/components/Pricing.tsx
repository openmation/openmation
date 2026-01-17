"use client";

import Link from "next/link";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Best for trying Openmation",
    features: [
      "100 shares per month",
      "10 shared-link views per month",
      "30 scheduled runs per month",
      "Bring your own AI key",
    ],
    cta: "Get started",
    href: "/account",
  },
  {
    name: "Starter",
    price: "$5/mo",
    description: "For individual power users",
    features: [
      "1000 shares per month",
      "500 shared-link views per month",
      "500 scheduled runs per month",
      "Annual plan includes AI usage",
    ],
    cta: "Upgrade to Starter",
    href: "/account",
    highlight: true,
  },
  {
    name: "Pro",
    price: "$10/mo",
    description: "Unlimited automations and sharing",
    features: [
      "Unlimited shares",
      "Unlimited shared-link views",
      "Unlimited scheduled runs",
      "Annual plan includes AI usage",
    ],
    cta: "Upgrade to Pro",
    href: "/account",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6">
            Simple, transparent
            <br />
            <span className="logo-gradient-text">pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Openmation is free to start. Upgrade when you need more sharing,
            scheduling, or AI usage included.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border border-border/50 bg-card p-6 transition-all ${
                tier.highlight ? "shadow-lg border-border" : "hover:shadow-md"
              }`}
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
                <p className="text-3xl font-semibold">{tier.price}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`w-full inline-flex items-center justify-center h-11 rounded-xl text-sm font-medium ${
                  tier.highlight
                    ? "bg-foreground text-white hover:bg-foreground/90"
                    : "bg-secondary/70 hover:bg-secondary text-foreground"
                } transition-colors`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
