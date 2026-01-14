/**
 * Public URLs used in responses (share links, etc).
 *
 * Why: In production (e.g. Railway), `PORT` might be 8080 and the service is
 * behind a proxy, so `http://localhost:${PORT}` is NOT a valid public URL.
 */
export function getShareBaseUrl(): string {
  const configured =
    process.env.SHARE_BASE_URL ||
    process.env.PUBLIC_APP_URL ||
    process.env.BASE_URL;

  if (configured && configured.trim().length > 0) {
    return configured.replace(/\/+$/, "");
  }

  // Sensible defaults if not explicitly configured.
  if (process.env.NODE_ENV === "production") {
    return "https://openmation.dev";
  }

  // Local website dev server (Next.js default).
  return "http://localhost:3000";
}

