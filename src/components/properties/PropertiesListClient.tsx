"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PropertyRow } from "@/lib/properties/types";
import { LOCATION_AREAS } from "@/lib/properties/types";
import { parseNumeric } from "@/lib/properties/format";
import { PropertyCard } from "./PropertyCard";

type RentalFilter = "all" | "short_term" | "long_term" | "for_sale";
type BedFilter = "any" | "studio" | "1" | "2" | "3" | "4";
type TypeFilter = "all" | "apartment" | "condo" | "house" | "villa";

function matchesBeds(property: PropertyRow, beds: BedFilter): boolean {
  if (beds === "any") return true;
  if (beds === "studio") return property.bedrooms === 0;
  if (beds === "1") return property.bedrooms === 1;
  if (beds === "2") return property.bedrooms === 2;
  if (beds === "3") return property.bedrooms === 3;
  if (beds === "4") return property.bedrooms >= 4;
  return true;
}

function matchesRental(property: PropertyRow, rental: RentalFilter): boolean {
  if (rental === "all") return true;
  return property.rental_type?.includes(rental) ?? false;
}

function matchesPrice(
  property: PropertyRow,
  rental: RentalFilter,
  maxPrice: number
): boolean {
  if (rental === "all") return true;
  if (rental === "short_term") {
    const n = parseNumeric(property.price_nightly_usd);
    if (n == null) return true;
    return n <= maxPrice;
  }
  if (rental === "long_term") {
    const n = parseNumeric(property.price_monthly_usd);
    if (n == null) return true;
    return n <= maxPrice;
  }
  if (rental === "for_sale") {
    const n = parseNumeric(property.price_sale_usd);
    if (n == null) return true;
    return n <= maxPrice;
  }
  return true;
}

type Props = {
  initial: PropertyRow[];
};

export function PropertiesListClient({ initial }: Props) {
  const t = useTranslations("properties");
  const [location, setLocation] = useState<string>("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [beds, setBeds] = useState<BedFilter>("any");
  const [rental, setRental] = useState<RentalFilter>("all");
  const [priceMax, setPriceMax] = useState(500);

  const sliderMax = useMemo(() => {
    if (rental === "short_term") return 500;
    if (rental === "long_term") return 5000;
    if (rental === "for_sale") return 1_000_000;
    return 5000;
  }, [rental]);

  useEffect(() => {
    setPriceMax((prev) => Math.min(prev, sliderMax));
  }, [sliderMax]);

  const priceHint =
    rental === "short_term"
      ? t("price_hint_short")
      : rental === "long_term"
        ? t("price_hint_long")
        : rental === "for_sale"
          ? t("price_hint_sale")
          : t("price_hint_all");

  const filtered = useMemo(() => {
    return initial.filter((p) => {
      if (location !== "all" && p.location_area !== location) return false;
      if (type !== "all" && p.property_type !== type) return false;
      if (!matchesBeds(p, beds)) return false;
      if (!matchesRental(p, rental)) return false;
      if (!matchesPrice(p, rental, priceMax)) return false;
      return true;
    });
  }, [initial, location, type, beds, rental, priceMax]);

  function clearFilters() {
    setLocation("all");
    setType("all");
    setBeds("any");
    setRental("all");
    setPriceMax(500);
  }

  const showEmptyDb = initial.length === 0;
  const showNoResults = initial.length > 0 && filtered.length === 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("page_title")}
          </h1>
          <p className="mt-2 text-lg text-slate-600">{t("page_subtitle")}</p>
        </div>
      </div>

      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 py-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end gap-3 px-4 sm:px-6 lg:px-8">
          <label className="flex flex-col text-xs font-medium text-slate-600">
            {t("filter_location")}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 min-w-[180px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            >
              {LOCATION_AREAS.map((loc) => {
                const key = `loc_${loc.replace(/-/g, "_")}`;
                return (
                  <option key={loc} value={loc}>
                    {t(key as "loc_all")}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="flex flex-col text-xs font-medium text-slate-600">
            {t("filter_type")}
            <select
              value={type}
              onChange={(e) => setType(e.target.value as TypeFilter)}
              className="mt-1 min-w-[140px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            >
              {(["all", "apartment", "condo", "house", "villa"] as const).map((k) => (
                <option key={k} value={k}>
                  {t(`type_${k}` as "type_all")}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-xs font-medium text-slate-600">
            {t("filter_beds")}
            <select
              value={beds}
              onChange={(e) => setBeds(e.target.value as BedFilter)}
              className="mt-1 min-w-[140px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            >
              {(["any", "studio", "1", "2", "3", "4"] as const).map((k) => (
                <option key={k} value={k}>
                  {t(`beds_${k}` as "beds_any")}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-xs font-medium text-slate-600">
            {t("filter_rental")}
            <select
              value={rental}
              onChange={(e) => {
                const r = e.target.value as RentalFilter;
                setRental(r);
                if (r === "short_term") setPriceMax(500);
                else if (r === "long_term") setPriceMax(5000);
                else if (r === "for_sale") setPriceMax(1_000_000);
                else setPriceMax(5000);
              }}
              className="mt-1 min-w-[200px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            >
              {(
                [
                  ["all", "rental_all"],
                  ["short_term", "rental_short"],
                  ["long_term", "rental_long"],
                  ["for_sale", "rental_sale"],
                ] as const
              ).map(([value, msg]) => (
                <option key={value} value={value}>
                  {t(msg)}
                </option>
              ))}
            </select>
          </label>

          <label
            className={`flex min-w-[200px] flex-col text-xs font-medium text-slate-600 ${rental === "all" ? "opacity-50" : ""}`}
          >
            {t("filter_price")} ({priceHint})
            <input
              type="range"
              min={0}
              max={sliderMax}
              step={rental === "for_sale" ? 10000 : rental === "long_term" ? 100 : 5}
              value={priceMax}
              disabled={rental === "all"}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="mt-2 w-full accent-primary-700"
            />
            <span className="text-xs text-slate-500">
              {rental === "for_sale" ? `$${priceMax.toLocaleString()}` : `$${priceMax}`}
            </span>
          </label>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {t("clear_filters")}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {showEmptyDb && (
          <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
            <div className="text-4xl" aria-hidden>
              🏡
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">{t("empty_title")}</h2>
            <p className="mt-2 text-slate-600">{t("empty_body")}</p>
            <Link
              href={{ pathname: "/", query: { topic: "vitrina_free_listing" }, hash: "contact" }}
              className="mt-6 inline-flex rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800"
            >
              {t("empty_cta")} →
            </Link>
          </div>
        )}

        {showNoResults && (
          <div className="mx-auto max-w-lg rounded-2xl border border-amber-200 bg-amber-50 px-6 py-8 text-center">
            <p className="font-medium text-slate-800">{t("no_results")}</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 text-sm font-semibold text-primary-800 underline"
            >
              {t("clear_filters")}
            </button>
          </div>
        )}

        {!showEmptyDb && filtered.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
