import { ImageResponse } from "next/og";

export const alt = "Sazzad Hossain Adib — AI Engineer & Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#f4f4f1",
        color: "#121214",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 6, color: "#12121488" }}>
        <span>PORTFOLIO — 2026</span>
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 12, height: 12, borderRadius: 12, background: "#10b981" }} />
          AVAILABLE FOR OPPORTUNITIES
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 132, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>FULL–STACK</span>
        <span
          style={{
            fontSize: 104,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1,
            color: "#12121466",
          }}
        >
          AI DEVELOPER<span style={{ color: "#047857" }}>.</span>
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30, color: "#121214aa" }}>
        <span>Sazzad Hossain Adib — AI engineer &amp; full-stack developer, Dhaka.</span>
      </div>
    </div>,
    size,
  );
}
