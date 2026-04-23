import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt = "BountyStash — Güvenlik Zafiyetleri Dokümantasyonu"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const BRAND = "#4f8fee"
const BG = "#0f0e12"
const CARD = "#17151d"
const BORDER = "#26232e"
const MUTED = "#8b8792"
const FG = "#f2f1f4"

export default async function Image() {
  const iconSvg = await readFile(join(process.cwd(), "public/icon.svg"), "utf8")
  const iconDataUri = `data:image/svg+xml;base64,${Buffer.from(iconSvg).toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: BG,
          color: FG,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 700px 500px at 20% 15%, rgba(79,143,238,0.22) 0%, transparent 60%), radial-gradient(ellipse 600px 500px at 85% 90%, rgba(79,143,238,0.12) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            zIndex: 1,
          }}
        >
          <img src={iconDataUri} width={64} height={64} alt="" />
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: -0.5,
              color: FG,
            }}
          >
            BountyStash
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(79,143,238,0.12)",
              border: `1px solid ${BRAND}40`,
              color: BRAND,
              fontSize: 20,
              fontWeight: 500,
              alignSelf: "flex-start",
              marginBottom: 28,
            }}
          >
            Güvenlik Zafiyetleri Dokümantasyonu
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 1000,
            }}
          >
            <span>Zafiyetleri</span>
            <span style={{ color: BRAND }}>Anlayın</span>
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: MUTED,
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Web, API ve AI sistemlerindeki zafiyetler için Türkçe payload ve bypass dokümantasyonu.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              fontSize: 20,
              fontFamily: "monospace",
              color: MUTED,
            }}
          >
            {["XSS", "SQLi", "SSRF", "IDOR", "Prompt Injection"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "6px 14px",
                  borderRadius: 8,
                  background: CARD,
                  border: `1px solid ${BORDER}`,
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontFamily: "monospace",
              color: MUTED,
            }}
          >
            bountystash.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
