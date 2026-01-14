import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";

function Logo() {
  return (
    <svg width="200" height="200" viewBox="0 0 128 128" fill="none">
      <defs>
        <linearGradient id="g" x1="16" y1="16" x2="112" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" />
          <stop offset="0.5" stopColor="#3B82F6" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <path
        d="M64 10C91 10 112 31 112 58C112 85 91 106 64 106C37 106 16 85 16 58C16 36 32 20 49 17"
        stroke="url(#g)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M64 28C80 28 92 40 92 56C92 72 80 84 64 84C48 84 36 72 36 56C36 45 44 37 54 35"
        stroke="url(#g)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M64 44C72 44 78 50 78 58C78 66 72 72 64 72C56 72 50 66 50 58C50 54 53 50 58 49"
        stroke="url(#g)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="64" cy="58" r="9" fill="url(#g)" />
    </svg>
  );
}

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "64px 84px",
          background: "linear-gradient(135deg, rgba(6,182,212,0.10), rgba(59,130,246,0.08), rgba(37,99,235,0.10))",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 66, fontWeight: 750, letterSpacing: "-0.03em", color: "#0b0b0f", lineHeight: 1 }}>
            Openmation
          </div>
          <div style={{ marginTop: 18, fontSize: 28, color: "rgba(11,11,15,0.70)", lineHeight: 1.25, maxWidth: 700 }}>
            Browser automation made beautiful.
          </div>
          <div style={{ marginTop: 22, fontSize: 22, color: "rgba(11,11,15,0.55)" }}>openmation.dev</div>
        </div>

        <div
          style={{
            width: "220px",
            height: "220px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.75)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: "28px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.10)",
            backdropFilter: "blur(18px)",
          }}
        >
          <Logo />
        </div>
      </div>
    ),
    size
  );
}

