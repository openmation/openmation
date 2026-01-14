import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openmation.dev"),
  title: "Openmation - Browser Automation Made Beautiful",
  description: "Record, replay, and share browser automations with pixel-perfect accuracy. The most elegant way to automate your repetitive browser tasks.",
  keywords: ["browser automation", "chrome extension", "workflow automation", "web automation", "task automation", "openmation"],
  authors: [{ name: "Openmation Team" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Openmation - Browser Automation Made Beautiful",
    description: "Record, replay, and share browser automations with pixel-perfect accuracy.",
    type: "website",
    locale: "en_US",
    siteName: "Openmation",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Openmation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Openmation - Browser Automation Made Beautiful",
    description: "Record, replay, and share browser automations with pixel-perfect accuracy.",
    images: ["/twitter-image"],
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
