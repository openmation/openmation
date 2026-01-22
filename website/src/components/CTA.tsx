"use client";

import { Chrome, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function CTA() {
  return (
    <section
      id="get-started"
      className="section-padding bg-background relative"
    >
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo with spinning animation */}
          <div className="inline-block mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 2,
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
              href="https://chromewebstore.google.com/detail/openmation/gmiikkpeciepbhjajboingdlhbbefhcn"
              target="_blank"
              rel="noopener noreferrer"
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

        </div>
      </div>
    </section>
  );
}
