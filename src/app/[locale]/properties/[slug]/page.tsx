import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getPropertyBySlug, getSimilarProperties } from "@/lib/properties/queries";
import { getLocalizedText } from "@/lib/properties/locale";
import { formatUsd, parseNumeric } from "@/lib/properties/format";
import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { ShareButton } from "@/components/properties/ShareButton";
import { WHATSAPP_WA_ME_NUMBER } from "@/lib/site";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) {
    return { title: "Casa Concierge PDC" };
  }
  const name = getLocalizedText(property.nickname, locale, "Property");
  const loc = getLocalizedText(property.location_display, locale, "");
  const t = await getTranslations({ locale, namespace: "properties" });
  const desc = `${property.property_type} in ${loc}. ${property.bedrooms} bedrooms, ${property.bathrooms} bathrooms.`;
  const night = parseNumeric(property.price_nightly_usd);
  const priceBit =
    night != null ? `From ${formatUsd(night)}/night.` : "";
  const image = property.photos?.[0];
  return {
    title: `${name} — ${loc} | Casa Concierge PDC`,
    description: `${desc} ${priceBit} ${t("managed_by")}`,
    openGraph: image
      ? {
          images: [{ url: image, width: 1200, height: 630, alt: name }],
        }
      : undefined,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const t = await getTranslations({ locale, namespace: "properties" });
  const name = getLocalizedText(property.nickname, locale, "Property");
  const description = getLocalizedText(property.description, locale, "");
  const locationLabel = getLocalizedText(property.location_display, locale, "");
  const similar = await getSimilarProperties(property, 3);

  const night = parseNumeric(property.price_nightly_usd);
  const month = parseNumeric(property.price_monthly_usd);
  const sale = parseNumeric(property.price_sale_usd);

  const planLabel = t(`plan_${property.plan}` as "plan_vitrina");

  const paragraphs = description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/properties"
            className="text-sm font-semibold text-primary-800 hover:text-primary-900"
          >
            ← {t("back_to_list")}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <PropertyGallery photos={property.photos ?? []} title={name} />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                {planLabel}
              </span>
              <h1 className="text-3xl font-bold text-slate-900">{name}</h1>
            </div>
            <p className="mt-2 text-slate-600">📍 {locationLabel}</p>

            <div className="mt-6 space-y-4 text-slate-700">
              {paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <h2 className="mt-12 text-xl font-bold text-slate-900">{t("amenities_title")}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {(property.amenities ?? []).map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="text-primary-600">✓</span>
                  {a
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </li>
              ))}
            </ul>

            {property.google_maps_embed && (
              <>
                <h2 className="mt-12 text-xl font-bold text-slate-900">{t("location_title")}</h2>
                <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
                  {property.google_maps_embed.trim().startsWith("<") ? (
                    <div
                      className="h-full w-full [&_iframe]:h-full [&_iframe]:min-h-[240px] [&_iframe]:w-full"
                      dangerouslySetInnerHTML={{ __html: property.google_maps_embed }}
                    />
                  ) : (
                    <iframe
                      title={t("location_title")}
                      src={property.google_maps_embed}
                      className="h-full min-h-[240px] w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  )}
                </div>
              </>
            )}

            <h2 className="mt-12 text-xl font-bold text-slate-900">{t("availability_title")}</h2>
            <p className="mt-2 text-sm text-slate-600">
              {property.ical_url ? t("availability_ical") : t("availability_contact")}
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900">{t("contact_card_title")}</h2>
              <div className="space-y-1 text-sm font-semibold text-primary-900">
                {night != null && <p>{t("from_night", { price: formatUsd(night).replace(/^\$/, "") })}</p>}
                {month != null && <p>{t("from_month", { price: formatUsd(month).replace(/^\$/, "") })}</p>}
                {sale != null && <p>{t("from_sale", { price: formatUsd(sale).replace(/^\$/, "") })}</p>}
              </div>
              <Link
                href={{
                  pathname: "/",
                  query: { topic: "rental_search", propertyName: name },
                  hash: "contact",
                }}
                className="block w-full rounded-full bg-primary-700 py-3 text-center text-sm font-semibold text-white hover:bg-primary-800"
              >
                {t("consult_cta")}
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_WA_ME_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full border border-slate-200 bg-white py-3 text-center text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                WhatsApp
              </a>
              <ShareButton property={property} variant="text" />
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-20 border-t border-slate-200 pt-16">
            <h2 className="text-2xl font-bold text-slate-900">{t("similar_title")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
