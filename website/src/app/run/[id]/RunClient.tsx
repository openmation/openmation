"use client";

import { useMemo, useState } from "react";

type Props = {
  id: string;
  startUrl: string;
};

export default function RunClient({ id, startUrl }: Props) {
  const [starting, setStarting] = useState(false);

  const targetUrl = useMemo(() => {
    try {
      const url = new URL(startUrl);
      url.hash = `openmation_run=${id}`;
      return url.toString();
    } catch {
      return startUrl;
    }
  }, [id, startUrl]);

  return (
    <div className="mt-8 flex flex-col gap-3">
      <a
        className={`btn-primary w-full ${starting ? "opacity-80 pointer-events-none" : ""}`}
        href={targetUrl}
        onClick={() => setStarting(true)}
      >
        {starting ? "Starting…" : "Run automation"}
      </a>

      <div className="text-xs text-muted-foreground">
        Make sure the Openmation extension is installed on the target page.
      </div>
    </div>
  );
}

