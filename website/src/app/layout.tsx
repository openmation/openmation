import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Openmation - Browser Automation Made Beautiful",
  description: "Record, replay, and share browser automations with pixel-perfect accuracy. The most elegant way to automate your repetitive browser tasks.",
  keywords: ["browser automation", "chrome extension", "workflow automation", "web automation", "task automation", "openmation"],
  authors: [{ name: "Openmation Team" }],
  openGraph: {
    title: "Openmation - Browser Automation Made Beautiful",
    description: "Record, replay, and share browser automations with pixel-perfect accuracy.",
    type: "website",
    locale: "en_US",
    siteName: "Openmation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Openmation - Browser Automation Made Beautiful",
    description: "Record, replay, and share browser automations with pixel-perfect accuracy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
