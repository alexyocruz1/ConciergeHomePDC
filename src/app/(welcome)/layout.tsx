import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://casaconciergepdc.com";
const DEFAULT_OG_IMAGE = "/og-image-es.jpg";

export const metadata: Metadata = {
  title: "Casa Concierge PDC",
  description:
    "Professional vacation property management in Playa del Carmen and the Riviera Maya.",
  openGraph: {
    title: "Casa Concierge PDC",
    description:
      "Professional vacation property management in Playa del Carmen and the Riviera Maya.",
    url: `${SITE_URL}/es`,
    type: "website",
    images: [
      {
        url: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: "Casa Concierge PDC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Concierge PDC",
    description:
      "Professional vacation property management in Playa del Carmen and the Riviera Maya.",
    images: [`${SITE_URL}${DEFAULT_OG_IMAGE}`],
  },
};

export default function WelcomeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
