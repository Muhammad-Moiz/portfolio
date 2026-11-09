import type { Metadata } from "next";
import { IBM_Plex_Mono, VT323 } from "next/font/google";
import { profile, site } from "@/lib/content";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const display = VT323({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const mono = IBM_Plex_Mono({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Frontend Engineer",
  url: site.url,
  sameAs: profile.actions
    .filter(({ label }) => label === "LinkedIn" || label === "GitHub")
    .map(({ href }) => href),
  alumniOf: { "@type": "CollegeOrUniversity", name: "FAST-NUCES" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* metadata.alternates drops the root's trailing slash, which would not match the sitemap-listed canonical form */}
        <link rel="canonical" href={`${site.url}/`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
