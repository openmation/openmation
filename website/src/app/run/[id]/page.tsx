import { Play } from "lucide-react";
import RunClient from "./RunClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

type Automation = {
  id: string;
  name: string;
  startUrl: string;
  events?: unknown[];
};

async function fetchAutomation(id: string): Promise<Automation | null> {
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
    "https://api.openmation.dev";

  const res = await fetch(`${apiBase}/api/automations/${id}`, {
    // Share links should reflect the latest data; also avoids long caching if the
    // user just created the automation.
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { success?: boolean; automation?: Automation };
  if (!data?.success || !data.automation) return null;
  return data.automation;
}

export default async function RunPage({ params }: PageProps) {
  const { id } = await params;
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
    "https://api.openmation.dev";

  const automation = await fetchAutomation(id);

  const eventCount =
    automation && Array.isArray(automation.events) ? automation.events.length : 0;

  return (
    <main className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card-elevated-lg p-8 sm:p-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl logo-gradient">
            <Play className="h-7 w-7 text-white" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            {automation ? automation.name : "Automation not found"}
          </h1>
          <div className="mt-2 text-sm text-muted-foreground">
            {automation ? `${eventCount} actions • Shared automation` : "This link may be invalid or expired."}
          </div>

          <div className="mt-6 rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-left">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {automation ? "Starts at" : "Tried API"}
            </div>
            <div className="mt-1 break-all text-sm text-foreground/80">
              {automation ? automation.startUrl : `${apiBase}/api/automations/${id}`}
            </div>
          </div>

          {automation ? (
            <RunClient id={id} startUrl={automation.startUrl} />
          ) : (
            <div className="mt-8 flex flex-col gap-3">
              <a className="btn-primary w-full" href="/">
                Go to openmation.dev
              </a>
              <a
                className="btn-secondary w-full"
                href={`${apiBase}/api/automations/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                Open API response
              </a>
              <div className="text-xs text-muted-foreground">
                If the API link 404s, the automation isn’t in the backend DB.
                If it errors, the website’s API env (`NEXT_PUBLIC_API_URL`) may be wrong.
              </div>
            </div>
          )}

          <div className="mt-8 text-xs text-muted-foreground">
            Powered by{" "}
            <a className="logo-gradient-text font-medium" href="/">
              Openmation
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

