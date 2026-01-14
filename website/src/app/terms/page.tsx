import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service - Openmation",
  description: "Terms of Service for Openmation browser automation extension",
};

export default function TermsOfService() {
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
        <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
        <p className="text-foreground/60 mb-12">Last updated: January 14, 2026</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-foreground/70 leading-relaxed">
              By installing and using the Openmation browser extension (&quot;Service&quot;), you agree to be bound 
              by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Openmation is a browser automation tool that allows you to:
            </p>
            <ul className="list-disc pl-6 text-foreground/70 space-y-2">
              <li>Record browser interactions</li>
              <li>Replay recorded automations</li>
              <li>Schedule automated tasks</li>
              <li>Share automations with others via unique links</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Acceptable Use</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              You agree to use Openmation only for lawful purposes. You may NOT use the Service to:
            </p>
            <ul className="list-disc pl-6 text-foreground/70 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Automate actions on websites that prohibit automated access in their terms of service</li>
              <li>Engage in scraping, data harvesting, or other activities without proper authorization</li>
              <li>Perform denial-of-service attacks or overload websites</li>
              <li>Access accounts or data without authorization</li>
              <li>Distribute malware or malicious content</li>
              <li>Bypass security measures or CAPTCHAs</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. User Responsibilities</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-foreground/70 space-y-2">
              <li>Ensuring your use of automations complies with the terms of service of websites you interact with</li>
              <li>Any data you include in your automations (including sensitive information)</li>
              <li>Any automations you share and their potential misuse by recipients</li>
              <li>Maintaining the security of your browser and device</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Shared Automations</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              When you share an automation:
            </p>
            <ul className="list-disc pl-6 text-foreground/70 space-y-2">
              <li>Anyone with the link can view and run the automation</li>
              <li>Shared automations are stored on our servers for up to 30 days</li>
              <li>You are responsible for not sharing automations containing sensitive data</li>
              <li>We reserve the right to remove shared automations that violate these terms</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Intellectual Property</h2>
            <p className="text-foreground/70 leading-relaxed">
              Openmation is open-source software. The source code is available under its respective license 
              on GitHub. You retain all rights to the automations you create.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-foreground/70 leading-relaxed">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, 
              EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, 
              ERROR-FREE, OR SECURE. WEBSITES MAY CHANGE THEIR STRUCTURE AT ANY TIME, WHICH MAY 
              CAUSE AUTOMATIONS TO FAIL.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
            <p className="text-foreground/70 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO 
              LOSS OF DATA, PROFITS, OR BUSINESS OPPORTUNITIES, ARISING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Termination</h2>
            <p className="text-foreground/70 leading-relaxed">
              We reserve the right to terminate or suspend access to the Service at any time, 
              without prior notice, for conduct that we believe violates these Terms or is 
              harmful to other users, us, or third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
            <p className="text-foreground/70 leading-relaxed">
              We may modify these Terms at any time. Continued use of the Service after changes 
              constitutes acceptance of the new Terms. We will update the &quot;Last updated&quot; date 
              when changes are made.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact</h2>
            <p className="text-foreground/70 leading-relaxed">
              For questions about these Terms, please contact us at:{" "}
              <a 
                href="mailto:legal@openmation.dev" 
                className="text-blue-600 hover:underline"
              >
                legal@openmation.dev
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
