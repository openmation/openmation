"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Chrome } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Use Cases", href: "#use-cases" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass shadow-sm" : "bg-transparent"
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo - bigger with transparent background */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/transparent.png"
                alt="Simplest"
                width={72}
                height={72}
                className="w-[72px] h-[72px] object-contain group-hover:scale-105 transition-transform"
              />
              <div>
                <span className="text-lg font-semibold tracking-tight logo-gradient-text">
                  Simplest
                </span>
                <p className="text-[11px] text-muted-foreground font-medium -mt-0.5">
                  Automation
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="#get-started"
                className="btn-primary text-sm px-5 py-2.5"
              >
                <Chrome className="w-4 h-4" />
                <span>Add to Chrome</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden glass border-b border-border"
          >
            <div className="container-custom py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-border">
                <Link
                  href="#get-started"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary w-full justify-center text-base py-3.5"
                >
                  <Chrome className="w-5 h-5" />
                  <span>Add to Chrome — Free</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
