import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { getCachedActivePropertyCount } from "@/lib/properties/queries";
import { CANONICAL_SITE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "cyrillic", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const ogImages: Record<string, string> = {
  es: "/og-image-es.jpg",
  en: "/og-image-en.jpg",
  fr: "/og-image-fr.jpg",
  ru: "/og-image-ru.jpg",
  pt: "/og-image-pt.jpg",
  de: "/og-image-de.jpg",
};

async function getSiteUrl(): Promise<string> {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "https";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) return CANONICAL_SITE_URL;
  return `${proto}://${host}`;
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.meta as Record<string, string>;

  const imagePath = ogImages[locale] ?? ogImages.es;
  const siteUrl = await getSiteUrl();
  const imageUrl = new URL(imagePath, siteUrl).toString();
  const localeUrl = new URL(`/${locale}`, siteUrl).toString();

  return {
    metadataBase: new URL(siteUrl),
    title: meta?.title || "Casa Concierge PDC",
    description: meta?.description || "",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/favicon-180x180.png" }],
      other: [{ rel: "manifest", url: "/site.webmanifest" }],
    },
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`])
      ),
    },
    openGraph: {
      title: meta?.title || "Casa Concierge PDC",
      description: meta?.description || "",
      url: localeUrl,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: meta?.title || "Casa Concierge PDC",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.title || "Casa Concierge PDC",
      description: meta?.description || "",
      images: [imageUrl],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const activePropertyCount = await getCachedActivePropertyCount();

  return (
    <html lang={locale} className={inter.variable}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header showPropertiesLink={activePropertyCount > 0} />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
