import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const vt323 = await readFile(
    path.join(process.cwd(), "node_modules/@fontsource/vt323/files/vt323-latin-400-normal.woff"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#12100B",
          color: "#F3EBDD",
          fontFamily: "VT323",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, color: "#FFB000" }}>C:\&gt;</div>
        <div style={{ display: "flex", fontSize: 168, lineHeight: 1, marginTop: 24 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 64, color: "#FFB000", marginTop: 32 }}>
          {profile.role}
        </div>
        <div style={{ display: "flex", fontSize: 96, color: "#FFB000", marginTop: 48 }}>&gt;_</div>
      </div>
    ),
    { ...size, fonts: [{ name: "VT323", data: vt323, style: "normal", weight: 400 }] },
  );
}
