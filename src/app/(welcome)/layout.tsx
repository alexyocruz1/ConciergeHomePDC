import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "../globals.css";
import { BRAND_NAME, CANONICAL_SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "cyrillic", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const DEFAULT_OG_IMAGE = "/og-image-default.jpg";

async function getSiteUrl(): Promise<string> {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return CANONICAL_SITE_URL;
  return `${proto}://${host}`;
}

const baseMetadata: Metadata = {
  title: `${BRAND_NAME} — Property Management, Riviera Maya`,
  description:
    "We manage your vacation property in the Riviera Maya. Local bilingual team. Only charge on rental income. Available in 6 languages.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon-180x180.png" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  openGraph: {
    title: `${BRAND_NAME} — Property Management, Riviera Maya`,
    description:
      "We manage your vacation property in the Riviera Maya. Local bilingual team. Only charge on rental income. Available in 6 languages.",
    url: "/",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} — Vacation Property Management in Playa del Carmen`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} — Property Management, Riviera Maya`,
    description:
      "We manage your vacation property in the Riviera Maya. Local bilingual team. Only charge on rental income. Available in 6 languages.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = await getSiteUrl();
  return {
    metadataBase: new URL(siteUrl),
    ...baseMetadata,
  };
}

export default function WelcomeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
