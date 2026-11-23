/**
 * Generates a PNG at build time with JSX + CSS.
 * Next.js adds <meta property="og:image"> to this route's <head> automatically.
 */
import { ImageResponse } from "next/og";

export const alt = "Next.js Lessons: Metadata";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 80,
          background: "linear-gradient(135deg, #1e3a8a, #7c3aed)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 40, opacity: 0.8 }}>📚 Next.js Lessons</div>
        <div style={{ fontSize: 96, fontWeight: 700 }}>Metadata & SEO</div>
      </div>
    ),
    size
  );
}
