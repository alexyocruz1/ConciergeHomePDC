import { routing } from "@/i18n/routing";

/** Localized path for a property detail, e.g. /es/propiedades/my-slug */
export function getPropertyPublicPath(locale: string, slug: string): string {
  const pathnames = routing.pathnames as Record<string, Record<string, string> | string>;
  const tmpl = pathnames["/properties/[slug]"] as Record<string, string>;
  const localized = tmpl[locale] ?? tmpl.en;
  const path = localized.replace("[slug]", slug);
  return `/${locale}${path}`;
}
