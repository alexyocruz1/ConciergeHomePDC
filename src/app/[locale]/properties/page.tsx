import { setRequestLocale } from "next-intl/server";
import { PropertiesListClient } from "@/components/properties/PropertiesListClient";
import { getCachedActiveProperties } from "@/lib/properties/queries";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "properties" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function PropertiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const initial = await getCachedActiveProperties();

  return <PropertiesListClient initial={initial} />;
}
