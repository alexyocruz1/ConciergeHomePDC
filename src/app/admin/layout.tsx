import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/**
 * Admin is outside `[locale]` and `(welcome)`, which normally provide `globals.css` and a document
 * shell. This layout supplies the same so Tailwind and fonts apply on `/admin/*`.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased">
        <div className="min-h-screen bg-slate-100">
          <header className="border-b border-slate-200 bg-white px-4 py-3">
            <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-slate-800">Casa Concierge — Admin</span>
                <Link href="/admin/properties" className="text-sm text-slate-600 hover:text-slate-900">
                  Properties
                </Link>
                <Link href="/admin/login" className="text-sm text-slate-600 hover:text-slate-900">
                  Sign in
                </Link>
              </div>
              <Link href="/" className="text-sm text-primary-700 hover:underline">
                ← Site home
              </Link>
            </div>
          </header>
          <div className="mx-auto max-w-4xl px-4 py-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
