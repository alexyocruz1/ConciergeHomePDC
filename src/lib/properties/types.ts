export type LocaleCode = "es" | "en" | "fr" | "ru" | "pt" | "de";

export type PropertyPlan = "vitrina" | "esencial" | "gestor" | "premium";

export type PropertyStatus = "draft" | "active" | "inactive";

export type PropertyType = "apartment" | "condo" | "house" | "villa";

export type RentalTypeKey = "short_term" | "long_term" | "for_sale";

export type LocaleJson = Partial<Record<LocaleCode, string>>;

export type PropertyRow = {
  id: string;
  slug: string;
  status: PropertyStatus;
  plan: PropertyPlan;
  nickname: LocaleJson;
  description: LocaleJson;
  location_area: string;
  location_display: LocaleJson;
  property_type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  amenities: string[] | null;
  price_nightly_usd: number | null;
  price_monthly_usd: number | null;
  price_sale_usd: number | null;
  rental_type: RentalTypeKey[];
  photos: string[] | null;
  ical_url: string | null;
  google_maps_embed: string | null;
  hubspot_contact_id: string | null;
  hubspot_deal_id: string | null;
  created_at: string;
  updated_at: string;
};

/** Location filter values — must match `location_area` in DB */
export const LOCATION_AREAS = [
  "all",
  "playa-centro",
  "playa-playacar",
  "playa-colosio",
  "mayakoba",
  "puerto-morelos",
  "tulum",
  "akumal",
  "other",
] as const;

export type LocationArea = (typeof LOCATION_AREAS)[number];
