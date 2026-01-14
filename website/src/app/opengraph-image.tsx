import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function Logo() {
  return (
    <svg width="220" height="220" viewBox="0 0 128 128" fill="none">
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

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, rgba(6,182,212,0.10), rgba(59,130,246,0.08), rgba(37,99,235,0.10))",
          position: "relative",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 100%)",
            opacity: 0.8,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            padding: "64px 72px",
            borderRadius: "32px",
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.10)",
            backdropFilter: "blur(18px)",
          }}
        >
          <div
            style={{
              width: "220px",
              height: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Logo />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.03em", color: "#0b0b0f", lineHeight: 1 }}>
              Openmation
            </div>
            <div style={{ marginTop: 18, fontSize: 30, color: "rgba(11,11,15,0.70)", lineHeight: 1.25, maxWidth: 640 }}>
              Record, replay, and share browser automations with pixel-perfect accuracy.
            </div>
            <div
              style={{
                marginTop: 26,
                display: "flex",
                gap: 10,
                alignItems: "center",
                fontSize: 22,
                color: "rgba(11,11,15,0.55)",
              }}
            >
              <span>openmation.dev</span>
              <span style={{ opacity: 0.25 }}>•</span>
              <span>100% open source</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

