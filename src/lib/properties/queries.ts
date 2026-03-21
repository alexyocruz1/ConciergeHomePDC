import { unstable_cache } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { PropertyRow } from "./types";

async function fetchActiveProperties(): Promise<PropertyRow[]> {
  const supabase = getSupabaseServer();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[properties] fetchActiveProperties", error.message);
    return [];
  }

  return (data ?? []) as PropertyRow[];
}

export const getCachedActiveProperties = unstable_cache(
  fetchActiveProperties,
  ["properties-active-list"],
  { revalidate: 60 }
);

async function countActive(): Promise<number> {
  const supabase = getSupabaseServer();
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  if (error) {
    console.error("[properties] countActive", error.message);
    return 0;
  }

  return count ?? 0;
}

export const getCachedActivePropertyCount = unstable_cache(
  countActive,
  ["properties-active-count"],
  { revalidate: 60 }
);

export async function getPropertyBySlug(slug: string): Promise<PropertyRow | null> {
  const supabase = getSupabaseServer();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    console.error("[properties] getPropertyBySlug", error.message);
    return null;
  }

  return (data as PropertyRow) ?? null;
}

export async function getSimilarProperties(
  current: PropertyRow,
  limit = 3
): Promise<PropertyRow[]> {
  const all = await getCachedActiveProperties();
  const others = all.filter((p) => p.id !== current.id);
  const score = (p: PropertyRow) =>
    (p.location_area === current.location_area ? 2 : 0) +
    (p.property_type === current.property_type ? 1 : 0);
  return [...others].sort((a, b) => score(b) - score(a)).slice(0, limit);
}
