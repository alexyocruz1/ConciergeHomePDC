"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { PropertyRow } from "@/lib/properties/types";
import { getLocalizedText } from "@/lib/properties/locale";
import { formatUsd, parseNumeric } from "@/lib/properties/format";
import { ShareButton } from "./ShareButton";

const planBadgeClass: Record<string, string> = {
  vitrina: "border border-slate-300 bg-white/95 text-slate-600",
  esencial: "border border-slate-200 bg-white/95 text-slate-700",
  gestor: "border border-[#b49b5a] bg-[#b49b5a] text-white",
  premium: "border border-slate-900 bg-slate-900 text-[#b49b5a]",
};

type Props = {
  property: PropertyRow;
};

export function PropertyCard({ property }: Props) {
  const locale = useLocale();
  const t = useTranslations("properties");
  const name = getLocalizedText(property.nickname, locale, "—");
  const locationLabel = getLocalizedText(
    property.location_display,
    locale,
    property.location_area
  );
  const plan = property.plan;
  const badgeClass = planBadgeClass[plan] ?? planBadgeClass.vitrina;
  const planLabel = t(`plan_${plan}` as Parameters<typeof t>[0]) as string;

  const photo = property.photos?.[0] ?? "/og-image-en.jpg";
  const night = parseNumeric(property.price_nightly_usd);
  const month = parseNumeric(property.price_monthly_usd);

  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[16/9] w-full bg-slate-100">
        <Image
          src={photo}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${badgeClass}`}
        >
          {planLabel}
        </span>
        <div className="absolute bottom-3 right-3">
          <ShareButton property={property} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-sm text-slate-500">📍 {locationLabel}</p>
        <h3 className="text-lg font-bold text-slate-900">
          <Link
            href={{ pathname: "/properties/[slug]", params: { slug: property.slug } }}
            className="hover:text-primary-700"
          >
            {name}
          </Link>
        </h3>

        <p className="text-sm text-slate-600">
          🛏 {property.bedrooms} &nbsp; 🚿 {property.bathrooms} &nbsp; 👥 {property.max_guests}
        </p>

        <div className="text-sm font-semibold text-primary-800">
          {night != null && <p>{t("from_night", { price: formatUsd(night).replace(/^\$/, "") })}</p>}
          {night != null && month != null && <p className="text-xs font-normal text-slate-500">{t("price_or")}</p>}
          {month != null && <p>{t("from_month", { price: formatUsd(month).replace(/^\$/, "") })}</p>}
          {night == null && month == null && <p className="text-slate-500">—</p>}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <Link
            href={{
              pathname: "/",
              query: { topic: "rental_search", propertyName: name },
              hash: "contact",
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-primary-800"
          >
            {t("consult_cta")} →
          </Link>
        </div>
      </div>
    </article>
  );
}
