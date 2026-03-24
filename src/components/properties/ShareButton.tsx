"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PropertyRow } from "@/lib/properties/types";
import { getLocalizedText } from "@/lib/properties/locale";
import { formatUsd, parseNumeric } from "@/lib/properties/format";
import { getPropertyPublicPath } from "@/lib/properties/urls";
import { WHATSAPP_WA_ME_NUMBER } from "@/lib/site";

type Props = {
  property: PropertyRow;
  variant?: "icon" | "text";
  className?: string;
};

export function ShareButton({ property, variant = "icon", className = "" }: Props) {
  const locale = useLocale();
  const t = useTranslations("properties");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const buildShareText = useCallback(
    (absoluteUrl: string) => {
      const name = getLocalizedText(property.nickname, locale, "Property");
      const loc = getLocalizedText(property.location_display, locale, "");
      const beds = property.bedrooms;
      const baths = property.bathrooms;
      const guests = property.max_guests;
      const night = parseNumeric(property.price_nightly_usd);
      const month = parseNumeric(property.price_monthly_usd);
      const nightStr = night != null ? formatUsd(night).replace(/^\$/, "") : "—";
      const monthStr = month != null ? formatUsd(month).replace(/^\$/, "") : "—";

      const lines = [
        `🏡 ${name}`,
        `📍 ${loc}`,
        t("share_line_specs", { beds, baths, guests }),
        t("share_line_prices", { night: nightStr, month: monthStr }),
        "",
        t("managed_by"),
        `🔗 ${absoluteUrl}`,
      ];
      return lines.join("\n");
    },
    [locale, property, t]
  );

  const share = useCallback(async () => {
    if (typeof window === "undefined") return;
    const path = getPropertyPublicPath(locale, property.slug);
    const url = `${window.location.origin}${path}`;
    const text = buildShareText(url);
    const title = getLocalizedText(property.nickname, locale, "Property");

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        setOpen(false);
      } catch {
        /* dismissed */
      }
      return;
    }
    setOpen((o) => !o);
  }, [buildShareText, locale, property.slug, property.nickname]);

  const copyLink = useCallback(async () => {
    if (typeof window === "undefined") return;
    const path = getPropertyPublicPath(locale, property.slug);
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [locale, property.slug]);

  const waShare = useCallback(() => {
    if (typeof window === "undefined") return;
    const path = getPropertyPublicPath(locale, property.slug);
    const url = `${window.location.origin}${path}`;
    const text = buildShareText(url);
    window.open(
      `https://wa.me/${WHATSAPP_WA_ME_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setOpen(false);
  }, [buildShareText, locale, property.slug]);

  const tgShare = useCallback(() => {
    if (typeof window === "undefined") return;
    const path = getPropertyPublicPath(locale, property.slug);
    const url = `${window.location.origin}${path}`;
    const text = buildShareText(url);
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setOpen(false);
  }, [buildShareText, locale, property.slug]);

  const emailShare = useCallback(() => {
    if (typeof window === "undefined") return;
    const path = getPropertyPublicPath(locale, property.slug);
    const url = `${window.location.origin}${path}`;
    const text = buildShareText(url);
    const subject = encodeURIComponent(
      getLocalizedText(property.nickname, locale, "Property")
    );
    window.location.href = `mailto:?subject=${subject}&body=${encodeURIComponent(text)}`;
    setOpen(false);
  }, [buildShareText, locale, property.slug, property.nickname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={`relative ${className}`} ref={rootRef}>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={share}
          title={t("share_tooltip")}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-800"
          aria-label={t("share_tooltip")}
        >
          <span className="text-lg" aria-hidden>
            🔗
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={share}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
        >
          <span aria-hidden>🔗</span>
          {t("share_property")}
        </button>
      )}

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
          <button
            type="button"
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            onClick={waShare}
          >
            🟢 {t("share_whatsapp")}
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            onClick={tgShare}
          >
            ✈️ {t("share_telegram")}
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            onClick={copyLink}
          >
            🔗 {copied ? t("copied") : t("share_copy")}
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
            onClick={emailShare}
          >
            📧 {t("share_email")}
          </button>
        </div>
      )}
    </div>
  );
}
