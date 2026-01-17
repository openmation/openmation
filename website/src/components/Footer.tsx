"use client";

import { Github, Twitter, Mail, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links = {
  product: [
    { name: "Overview", href: "#top" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "Pricing", href: "#pricing" },
  ],
  resources: [
    { name: "Get Started", href: "#get-started" },
    { name: "Download", href: "#get-started" },
    { name: "Open Source", href: "https://github.com/openmation" },
  ],
  company: [
    { name: "Account", href: "/account" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
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
    href: "https://github.com/openmation",
  },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/openmation" },
  { name: "Email", icon: Mail, href: "mailto:hello@openmation.com" },
];

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      {/* Main footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo & description */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src="/openmation.png"
                alt="Openmation"
                width={44}
                height={44}
                className="w-11 h-11 object-contain"
              />
              <span className="text-lg font-semibold">Openmation</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              AI-driven browser automation. Record once, replay reliably, and
              share workflows instantly.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
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
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
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
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
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
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
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
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Openmation. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="#features" className="hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="hover:text-foreground transition-colors">
                How it Works
              </Link>
              <Link href="#use-cases" className="hover:text-foreground transition-colors">
                Use Cases
              </Link>
              <Link href="#pricing" className="hover:text-foreground transition-colors">
                Pricing
              </Link>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              Open source with{" "}
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
