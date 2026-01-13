"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Simple text-based logos since we don't have actual company logos
const companies = [
  "TechCorp",
  "StartupXYZ",
  "AgencyPro",
  "DataFlow",
  "CloudBase",
  "DevTools",
];

export function LogoCloud() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 bg-gradient-coral relative overflow-hidden">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-dots-light opacity-20" />

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-white/80 text-sm font-medium mb-8">
            Trusted by teams at companies like
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {companies.map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-white/90 text-lg md:text-xl font-semibold"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
