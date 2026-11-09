import type { Metadata } from "next";
import { IBM_Plex_Mono, VT323 } from "next/font/google";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const display = VT323({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const mono = IBM_Plex_Mono({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Muhammad Moiz: Frontend Engineer (React, TypeScript)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
