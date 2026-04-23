import { ImageResponse } from "next/og"

export const alt = "BountyStash — Güvenlik Zafiyetleri Dokümantasyonu"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(124,58,237,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(168,85,247,0.2) 0%, transparent 55%), #09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(124,58,237,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(124,58,237,0.4)",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: "#7C3AED",
              }}
            />
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: -0.5 }}>
            BountyStash
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 960,
          }}
        >
          <span>Zafiyetleri</span>
          <span style={{ color: "#A78BFA" }}>Anlayın</span>
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 30,
            color: "#a1a1aa",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Web, API ve AI güvenlik zafiyetleri için Türkçe dokümantasyon.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 80,
            display: "flex",
            gap: 12,
            fontSize: 22,
            color: "#71717a",
            fontFamily: "monospace",
          }}
        >
          bountystash
        </div>
      </div>
    ),
    { ...size }
  )
}
