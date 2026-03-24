"use server";

import { updateTag } from "next/cache";
import { requireAdminUser } from "@/lib/auth/admin";
import { PROPERTY_CACHE_TAG } from "@/lib/properties/queries";
import { getSupabaseService } from "@/lib/supabase/service";
import { LOCATION_AREAS } from "@/lib/properties/types";

const DB_LOCATIONS = LOCATION_AREAS.filter((a) => a !== "all");

const STATUSES = ["draft", "active", "inactive"] as const;
const PLANS = ["vitrina", "esencial", "gestor", "premium"] as const;
const TYPES = ["apartment", "condo", "house", "villa"] as const;
const RENTAL = ["short_term", "long_term", "for_sale"] as const;

const LOCALES = ["es", "en", "fr", "ru", "pt", "de"] as const;

export type AdminPropertyState = {
  ok?: boolean;
  error?: string;
  slug?: string;
};

function localeObject(
  formData: FormData,
  prefix: string
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of LOCALES) {
    const v = String(formData.get(`${prefix}_${l}`) ?? "").trim();
    if (v) out[l] = v;
  }
  return out;
}

function parseLinesOrComma(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseOptionalNum(formData: FormData, key: string): number | null {
  const v = String(formData.get(key) ?? "").trim();
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function parseRequiredInt(formData: FormData, key: string, label: string): number | { error: string } {
  const v = String(formData.get(key) ?? "").trim();
  const n = parseInt(v, 10);
  if (!Number.isFinite(n) || n < 0) return { error: `${label} must be a non-negative integer.` };
  return n;
}

export async function upsertProperty(
  _prev: AdminPropertyState,
  formData: FormData
): Promise<AdminPropertyState> {
  const admin = await requireAdminUser();
  if ("error" in admin) {
    return { error: admin.error };
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return {
      error:
        "Missing Supabase service role. Add SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL to .env.",
    };
  }

  const slugRaw = String(formData.get("slug") ?? "").trim().toLowerCase();
  if (!slugRaw || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slugRaw)) {
    return {
      error:
        "Slug is required: lowercase letters, numbers, and single hyphens only (e.g. playa-studio-101).",
    };
  }

  const status = String(formData.get("status") ?? "");
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) {
    return { error: "Invalid status." };
  }

  const plan = String(formData.get("plan") ?? "");
  if (!PLANS.includes(plan as (typeof PLANS)[number])) {
    return { error: "Invalid plan." };
  }

  const location_area = String(formData.get("location_area") ?? "");
  if (!DB_LOCATIONS.includes(location_area as (typeof DB_LOCATIONS)[number])) {
    return { error: "Invalid location area." };
  }

  const property_type = String(formData.get("property_type") ?? "");
  if (!TYPES.includes(property_type as (typeof TYPES)[number])) {
    return { error: "Invalid property type." };
  }

  const nickname = localeObject(formData, "nickname");
  if (!nickname.es?.trim() && !nickname.en?.trim()) {
    return { error: "Fill at least nickname (ES) or nickname (EN)." };
  }

  const description = localeObject(formData, "description");
  if (!Object.keys(description).length) {
    return { error: "Add description for at least one language." };
  }

  const location_display = localeObject(formData, "location_display");
  if (!Object.keys(location_display).length) {
    return { error: "Add location display for at least one language." };
  }

  const beds = parseRequiredInt(formData, "bedrooms", "Bedrooms");
  if (typeof beds === "object") return beds;
  const baths = parseRequiredInt(formData, "bathrooms", "Bathrooms");
  if (typeof baths === "object") return baths;
  const guests = parseRequiredInt(formData, "max_guests", "Max guests");
  if (typeof guests === "object") return guests;

  const rentalRaw = formData.getAll("rental_type").map(String);
  const rental_type = rentalRaw.filter((r) =>
    RENTAL.includes(r as (typeof RENTAL)[number])
  ) as ("short_term" | "long_term" | "for_sale")[];
  if (!rental_type.length) {
    return { error: "Select at least one rental type." };
  }

  const amenities = parseLinesOrComma(String(formData.get("amenities") ?? ""));
  const photos = parseLinesOrComma(String(formData.get("photos") ?? ""));
  if (!photos.length) {
    return { error: "Add at least one photo URL (public HTTPS, e.g. Supabase Storage)." };
  }

  const ical_url = String(formData.get("ical_url") ?? "").trim() || null;
  const google_maps_embed = String(formData.get("google_maps_embed") ?? "").trim() || null;

  const row = {
    slug: slugRaw,
    status,
    plan,
    nickname,
    description,
    location_area,
    location_display,
    property_type,
    bedrooms: beds,
    bathrooms: baths,
    max_guests: guests,
    amenities: amenities.length ? amenities : [],
    price_nightly_usd: parseOptionalNum(formData, "price_nightly_usd"),
    price_monthly_usd: parseOptionalNum(formData, "price_monthly_usd"),
    price_sale_usd: parseOptionalNum(formData, "price_sale_usd"),
    rental_type,
    photos,
    ical_url,
    google_maps_embed,
    hubspot_contact_id: String(formData.get("hubspot_contact_id") ?? "").trim() || null,
    hubspot_deal_id: String(formData.get("hubspot_deal_id") ?? "").trim() || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("properties").upsert(row, { onConflict: "slug" });

  if (error) {
    return { error: error.message };
  }

  updateTag(PROPERTY_CACHE_TAG);
  return { ok: true, slug: slugRaw };
}
