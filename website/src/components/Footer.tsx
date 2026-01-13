"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Mail, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links = {
  product: [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Use Cases", href: "#use-cases" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "API Reference", href: "/api" },
    { name: "Support", href: "/support" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};

const socials = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/yourusername/simplest-automation",
  },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/simplestapp" },
  { name: "Email", icon: Mail, href: "mailto:hello@simplest.app" },
];

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      {/* Main footer */}
      <div className="container-custom py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo & description */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/transparent.png"
                alt="Simplest"
                width={52}
                height={52}
                className="w-13 h-13 object-contain"
              />
              <div>
                <span className="text-base font-semibold logo-gradient-text">Simplest</span>
                <p className="text-[10px] text-muted-foreground -mt-0.5">Automation</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-5 max-w-xs">
              Browser automation made beautiful. Record, replay, and share with
              pixel-perfect accuracy.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container-custom py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Simplest. All rights reserved.
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              Built with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" />
              </motion.span>{" "}
              by the Simplest team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
