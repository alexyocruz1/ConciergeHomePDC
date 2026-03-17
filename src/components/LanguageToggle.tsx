"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";

const languageLabels: Record<string, { flag: string; label: string }> = {
  es: { flag: "🇲🇽", label: "ES" },
  en: { flag: "🇺🇸", label: "EN" },
  fr: { flag: "🇫🇷", label: "FR" },
  ru: { flag: "🇷🇺", label: "RU" },
  pt: { flag: "🇧🇷", label: "PT" },
  de: { flag: "🇩🇪", label: "DE" },
};

export function LanguageToggle({ scrolled }: { scrolled: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale as (typeof routing.locales)[number] });
    setOpen(false);
  }

  const current = languageLabels[locale];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          scrolled
            ? "text-slate-600 hover:bg-slate-100"
            : "text-white/90 hover:bg-white/10"
        }`}
      >
        <span className="text-base">{current?.flag}</span>
        <span>{current?.label}</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg">
          {routing.locales.map((l) => {
            const lang = languageLabels[l];
            return (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                  l === locale
                    ? "bg-primary-50 font-semibold text-primary-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="text-base">{lang?.flag}</span>
                <span>{lang?.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
