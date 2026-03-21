import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCachedActiveProperties } from "@/lib/properties/queries";
import { PropertyCard } from "@/components/properties/PropertyCard";

type Props = {
  locale: string;
};

export async function ListingsTeaser({ locale }: Props) {
  const properties = await getCachedActiveProperties();
  if (properties.length === 0) return null;

  const t = await getTranslations({ locale, namespace: "properties" });
  const slice = properties.slice(0, 3);

  return (
    <section className="border-y border-slate-200 bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t("teaser_title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-600">{t("teaser_subtitle")}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {slice.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-base font-semibold text-primary-800 hover:text-primary-900"
          >
            {t("teaser_cta")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
