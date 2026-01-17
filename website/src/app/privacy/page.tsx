import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Openmation",
  description: "Privacy Policy for Openmation browser automation extension",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-black/[0.06]">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link 
            href="/" 
            className="text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent"
          >
            Openmation
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-foreground/60 mb-12">Last updated: January 17, 2026</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Overview</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Openmation (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how our browser extension collects, uses, and protects your information.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Openmation is an open-source, AI-driven browser automation tool. We believe in transparency and minimal data collection.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-foreground mb-3">Automation Data</h3>
            <p className="text-foreground/70 leading-relaxed mb-4">
              When you record an automation, the extension captures:
            </p>
            <ul className="list-disc pl-6 text-foreground/70 space-y-2 mb-6">
              <li>Click positions and element selectors</li>
              <li>Text input values (which may include form data you enter)</li>
              <li>Page URLs where actions are recorded</li>
              <li>Scroll positions and navigation events</li>
              <li>Screenshots of the page (to support AI-driven replay, if enabled)</li>
            </ul>
            <p className="text-foreground/70 leading-relaxed mb-4">
              <strong>This data is stored locally on your device</strong> in the browser&apos;s storage. 
              It is not automatically sent to our servers.
            </p>

            <h3 className="text-xl font-medium text-foreground mb-3">Shared Automations</h3>
            <p className="text-foreground/70 leading-relaxed mb-4">
              When you choose to share an automation, the automation data is uploaded to our servers to generate 
              a shareable link. This includes:
            </p>
            <ul className="list-disc pl-6 text-foreground/70 space-y-2 mb-6">
              <li>The automation name</li>
              <li>Recorded events and their data</li>
              <li>The starting URL</li>
            </ul>
            <p className="text-foreground/70 leading-relaxed">
              Shared automations are automatically deleted after 30 days.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Do NOT Collect</h2>
            <ul className="list-disc pl-6 text-foreground/70 space-y-2">
              <li>Personal identification information (name, email, etc.)</li>
              <li>Passwords or sensitive credentials</li>
              <li>Browsing history outside of recorded automations</li>
              <li>Analytics or tracking data</li>
              <li>Cookies from websites you visit</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              We use the information we collect solely to:
            </p>
            <ul className="list-disc pl-6 text-foreground/70 space-y-2">
              <li>Enable automation recording and playback functionality</li>
              <li>Generate shareable links for automations you choose to share</li>
              <li>Allow others to run automations you&apos;ve shared with them</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Storage and Security</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              <strong>Local Storage:</strong> Your automations are stored locally in Chrome&apos;s extension storage. 
              This data never leaves your device unless you explicitly share an automation.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-4">
              <strong>Server Storage:</strong> Shared automations are stored on our secure servers. 
              We use industry-standard security measures to protect this data.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              <strong>Data Retention:</strong> Shared automations are automatically deleted after 30 days. 
              Local automations remain on your device until you delete them.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">AI Services</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              If you enable AI mode and provide an API key, Openmation may send a limited set of data to your chosen
              AI provider (OpenAI or Anthropic) to identify elements on the page and improve replay accuracy. This can include
              screenshots and the text descriptions of recorded actions.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              Your API key is stored locally in your browser. You can disable AI mode or remove your key at any time in settings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
            <p className="text-foreground/70 leading-relaxed">
              Openmation does not integrate with any third-party analytics, advertising, or tracking services. 
              We do not sell, trade, or transfer your information to third parties. If you enable AI mode, data is sent
              only to your selected AI provider to fulfill the request.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-foreground/70 space-y-2">
              <li>Delete your local automations at any time through the extension</li>
              <li>Choose not to share automations (keeping them entirely local)</li>
              <li>Request deletion of shared automations by contacting us</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Open Source</h2>
            <p className="text-foreground/70 leading-relaxed">
              Openmation is open source. You can review our code on{" "}
              <a 
                href="https://github.com/openmation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>{" "}
              to verify exactly how we handle your data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-foreground/70 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify users of any material 
              changes by updating the &quot;Last updated&quot; date at the top of this page.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-foreground/70 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:{" "}
              <a 
                href="mailto:privacy@openmation.dev" 
                className="text-blue-600 hover:underline"
              >
                privacy@openmation.dev
              </a>
            </p>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-black/[0.06] py-8">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-sm text-foreground/50">
          <p>© 2026 Openmation. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground/70">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground/70">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
