"use client";

import {
  FileSpreadsheet,
  Users,
  TestTube2,
  BarChart3,
  Database,
  FormInput,
} from "lucide-react";

const useCases = [
  {
    icon: FormInput,
    title: "Form Automation",
    description:
      "Fill out repetitive forms with a single click. Perfect for registrations, applications, and data entry.",
    example: "Auto-fill signup forms for new accounts",
  },
  {
    icon: Users,
    title: "User Onboarding",
    description:
      "Guide new team members through complex workflows. Share automations that run their first setup.",
    example: "Onboard new hires to internal tools",
  },
  {
    icon: TestTube2,
    title: "Testing & QA",
    description:
      "Record user flows once and replay them to catch regressions. No coding required.",
    example: "Test checkout flow after each deploy",
  },
  {
    icon: BarChart3,
    title: "Reporting",
    description:
      "Schedule automations to pull reports from dashboards. Get data delivered automatically.",
    example: "Export weekly analytics every Monday",
  },
  {
    icon: Database,
    title: "Data Collection",
    description:
      "Automate repetitive data gathering from web applications. No more copy-pasting.",
    example: "Collect competitor pricing daily",
  },
  {
    icon: FileSpreadsheet,
    title: "Spreadsheet Sync",
    description:
      "Keep web apps and spreadsheets in sync. Automate data transfers between systems.",
    example: "Update CRM from Google Sheets",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="section-padding bg-background relative">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Built for
            <br />
            <span className="logo-gradient-text">real workflows</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From solo users to enterprise teams, Simplest adapts to how you
            work. Here are some popular use cases.
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <div
                key={useCase.title}
                className="group p-5 rounded-xl border border-border/50 bg-card hover:shadow-lg hover:border-border transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-base font-semibold mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {useCase.description}
                </p>

                <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                    Example
                  </span>
                  <span className="text-xs text-foreground/70">
                    {useCase.example}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
