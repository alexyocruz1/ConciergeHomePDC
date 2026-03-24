"use client";

import { useActionState } from "react";
import Link from "next/link";
import { upsertProperty, type AdminPropertyState } from "./actions";
import { LOCATION_AREAS } from "@/lib/properties/types";

const dbLocations = LOCATION_AREAS.filter((a) => a !== "all");
const locales = ["es", "en", "fr", "ru", "pt", "de"] as const;

const initialState: AdminPropertyState = {};

export default function AdminPropertiesPage() {
  const [state, formAction, pending] = useActionState(upsertProperty, initialState);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Add or update property</h1>
      <p className="mt-2 text-sm text-slate-600">
        Inserts a new row or updates by <strong>slug</strong>. You must be signed in; the server uses{" "}
        <code className="rounded bg-slate-200 px-1">SUPABASE_SERVICE_ROLE_KEY</code> to write rows.
      </p>

      {state?.error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.error}
        </div>
      )}

      {state?.ok && state.slug && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <p className="font-medium">Saved.</p>
          <p className="mt-1">
            <Link
              href={`/es/properties/${state.slug}`}
              className="text-primary-800 underline hover:text-primary-950"
            >
              View listing (ES)
            </Link>
            {" · "}
            <Link
              href={`/en/properties/${state.slug}`}
              className="text-primary-800 underline hover:text-primary-950"
            >
              EN
            </Link>
          </p>
        </div>
      )}

      <form action={formAction} className="mt-8 space-y-10">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Core</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-slate-700">Slug (URL)</span>
              <input
                name="slug"
                required
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="playa-condo-ejemplo"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Status</span>
              <select
                name="status"
                defaultValue="draft"
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="draft">draft</option>
                <option value="active">active (visible on site)</option>
                <option value="inactive">inactive</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Plan</span>
              <select
                name="plan"
                defaultValue="vitrina"
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="vitrina">vitrina</option>
                <option value="esencial">esencial</option>
                <option value="gestor">gestor</option>
                <option value="premium">premium</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Location area</span>
              <select
                name="location_area"
                required
                defaultValue="playa-centro"
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                {dbLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Property type</span>
              <select
                name="property_type"
                required
                defaultValue="condo"
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="apartment">apartment</option>
                <option value="condo">condo</option>
                <option value="house">house</option>
                <option value="villa">villa</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Bedrooms</span>
              <input
                type="number"
                name="bedrooms"
                min={0}
                defaultValue={2}
                required
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Bathrooms</span>
              <input
                type="number"
                name="bathrooms"
                min={0}
                defaultValue={2}
                required
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Max guests</span>
              <input
                type="number"
                name="max_guests"
                min={1}
                defaultValue={4}
                required
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Rental &amp; prices</h2>
          <fieldset className="mt-4">
            <legend className="text-sm font-medium text-slate-700">Rental types (at least one)</legend>
            <div className="mt-2 flex flex-wrap gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="rental_type" value="short_term" defaultChecked />
                short_term
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="rental_type" value="long_term" defaultChecked />
                long_term
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="rental_type" value="for_sale" />
                for_sale
              </label>
            </div>
          </fieldset>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Nightly USD</span>
              <input
                type="number"
                name="price_nightly_usd"
                min={0}
                step="0.01"
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="150"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Monthly USD</span>
              <input
                type="number"
                name="price_monthly_usd"
                min={0}
                step="0.01"
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="2800"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Sale USD</span>
              <input
                type="number"
                name="price_sale_usd"
                min={0}
                step="1"
                className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                placeholder="optional"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Titles (nickname)</h2>
          <p className="mt-1 text-xs text-slate-500">At least ES or EN required.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {locales.map((loc) => (
              <label key={loc} className="block">
                <span className="text-sm font-medium text-slate-700">{loc.toUpperCase()}</span>
                <input
                  name={`nickname_${loc}`}
                  className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Description</h2>
          <p className="mt-1 text-xs text-slate-500">At least one language. Blank lines become paragraphs.</p>
          <div className="mt-4 grid gap-4">
            {locales.map((loc) => (
              <label key={loc} className="block">
                <span className="text-sm font-medium text-slate-700">{loc.toUpperCase()}</span>
                <textarea
                  name={`description_${loc}`}
                  rows={3}
                  className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Location line (display)</h2>
          <p className="mt-1 text-xs text-slate-500">Shown under the title (e.g. &quot;Playa del Carmen — Centro&quot;).</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {locales.map((loc) => (
              <label key={loc} className="block">
                <span className="text-sm font-medium text-slate-700">{loc.toUpperCase()}</span>
                <input
                  name={`location_display_${loc}`}
                  className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Media &amp; extras</h2>
          <label className="mt-4 block">
            <span className="text-sm font-medium text-slate-700">Photo URLs (one per line)</span>
            <textarea
              name="photos"
              required
              rows={4}
              className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs"
              placeholder="https://xxx.supabase.co/storage/v1/object/public/..."
            />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium text-slate-700">Amenities (comma or line, snake_case)</span>
            <textarea
              name="amenities"
              rows={2}
              className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs"
              placeholder="wifi, pool, kitchen, ac"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium text-slate-700">iCal URL (optional)</span>
            <input
              name="ical_url"
              className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            />
          </label>
          <label className="mt-4 block">
            <span className="text-sm font-medium text-slate-700">Google Maps embed URL or iframe HTML (optional)</span>
            <textarea
              name="google_maps_embed"
              rows={2}
              className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 font-mono text-xs"
            />
          </label>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">HubSpot contact ID (optional)</span>
              <input name="hubspot_contact_id" className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">HubSpot deal ID (optional)</span>
              <input name="hubspot_deal_id" className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </label>
          </div>
        </section>

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-primary-700 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-800 disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save property"}
        </button>
      </form>
    </div>
  );
}
