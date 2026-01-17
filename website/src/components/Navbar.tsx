"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Chrome } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { name: "Overview", href: "#top" },
  { name: "Features", href: "#features" },
  { name: "How it Works", href: "#how-it-works" },
  { name: "Use Cases", href: "#use-cases" },
  { name: "Pricing", href: "#pricing" },
  { name: "Get Started", href: "#get-started" },
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
          isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.04]" : "bg-transparent"
        )}
      >
        <nav className="container-custom">
          <div className="flex items-center justify-center h-16 md:h-[72px] relative">
            {/* Centered Navigation Container */}
            <div className={cn(
              "flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-300",
              isScrolled 
                ? "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-black/[0.04]" 
                : "bg-white/60 backdrop-blur-md border border-black/[0.04]"
            )}>
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 pl-2 pr-3">
                <Image
                  src="/openmation.png"
                  alt="Openmation"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-base font-semibold tracking-tight text-foreground hidden sm:block">
                  Openmation
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-black/[0.03]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="hidden md:flex items-center gap-1.5 pl-2">
                <Link
                  href="/account"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-black/[0.03]"
                >
                  Account
                </Link>
                <Link
                  href="#get-started"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-foreground hover:bg-foreground/90 transition-colors rounded-full"
                >
                  <Chrome className="w-4 h-4" />
                  <span>Download</span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button - Absolute positioned */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden absolute right-4 p-2 rounded-full hover:bg-black/[0.05] transition-colors"
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
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-white/95 backdrop-blur-xl border-b border-black/[0.06]"
          >
            <div className="container-custom py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-black/[0.03] rounded-xl transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-black/[0.06] space-y-2">
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-center text-base font-medium text-muted-foreground hover:text-foreground hover:bg-black/[0.03] rounded-xl transition-colors"
                >
                  Account
                </Link>
                <Link
                  href="#get-started"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 text-base font-medium text-white bg-foreground hover:bg-foreground/90 rounded-xl transition-colors"
                >
                  <Chrome className="w-5 h-5" />
                  <span>Download for Chrome</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
