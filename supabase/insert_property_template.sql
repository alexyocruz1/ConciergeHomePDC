-- =============================================================================
-- Casa Concierge PDC — template: insert or update a property row
-- =============================================================================
-- Run in Supabase → SQL Editor (as a user that bypasses RLS, e.g. postgres).
--
-- Edit the VALUES block below, then run the whole statement.
-- Uses ON CONFLICT (slug): first run INSERTs; later runs UPDATE the same slug.
--
-- Valid values (must match app + migration CHECKs):
--   status:        'draft' | 'active' | 'inactive'   (only 'active' shows on site)
--   plan:          'vitrina' | 'esencial' | 'gestor' | 'premium'
--   location_area: 'playa-centro' | 'playa-playacar' | 'playa-colosio' |
--                  'mayakoba' | 'puerto-morelos' | 'tulum' | 'akumal' | 'other'
--   property_type: 'apartment' | 'condo' | 'house' | 'villa'
--   rental_type:   array of 'short_term', 'long_term', 'for_sale' (can combine)
--
-- JSONB fields (nickname, description, location_display):
--   Keys: 'es', 'en', 'fr', 'ru', 'pt', 'de' — include at least the locales you use.
--
-- photos: public HTTPS URLs (e.g. Supabase Storage public object URLs) or site paths.
--   Next.js is configured for *.supabase.co/storage/v1/object/public/...
--
-- amenities: text[] of slugs; the UI shows them title-cased (wifi → Wifi). You can
--   align with keys in messages/*.json under properties.amenity_* if you add labels later.
-- =============================================================================

INSERT INTO properties (
  slug,
  status,
  plan,
  nickname,
  description,
  location_area,
  location_display,
  property_type,
  bedrooms,
  bathrooms,
  max_guests,
  amenities,
  price_nightly_usd,
  price_monthly_usd,
  price_sale_usd,
  rental_type,
  photos,
  ical_url,
  google_maps_embed,
  hubspot_contact_id,
  hubspot_deal_id
) VALUES (
  -- Unique URL segment: /[locale]/properties/<slug>
  'example-playa-condo',

  -- Set to 'active' when ready to show on the website
  'active',

  'vitrina',

  -- Short title per locale
  jsonb_build_object(
    'es', 'Ejemplo — Condo cerca de la Quinta',
    'en', 'Example — Condo near Fifth Avenue',
    'fr', 'Exemple — Condo près de la Quinta',
    'ru', 'Пример — Кондо у Пятой авеню',
    'pt', 'Exemplo — Condo perto da Quinta',
    'de', 'Beispiel — Condo nahe Fifth Avenue'
  ),

  -- Long description (can use \n for line breaks; app splits on double newlines)
  jsonb_build_object(
    'es', E'Bright condo de ejemplo en Playa del Carmen.\n\nIdeal para estancias cortas o largas. Reemplaza este texto con la descripción real.',
    'en', E'Bright example condo in Playa del Carmen.\n\nGreat for short or long stays. Replace with your real copy.',
    'fr', E'Condo d''exemple lumineux à Playa del Carmen.\n\nRemplacez par votre texte.',
    'ru', E'Пример кондо в Плая-дель-Кармен.\n\nЗамените на реальное описание.',
    'pt', E'Condo de exemplo em Playa del Carmen.\n\nSubstitua pelo texto real.',
    'de', E'Beispiel-Condo in Playa del Carmen.\n\nText anpassen.'
  ),

  'playa-centro',

  jsonb_build_object(
    'es', 'Playa del Carmen — Centro',
    'en', 'Playa del Carmen — Downtown',
    'fr', 'Playa del Carmen — Centre',
    'ru', 'Плая-дель-Кармен — центр',
    'pt', 'Playa del Carmen — Centro',
    'de', 'Playa del Carmen — Zentrum'
  ),

  'condo',

  2,
  2,
  4,

  ARRAY['wifi', 'pool', 'kitchen', 'ac', 'washer']::text[],

  150.00,
  2800.00,
  NULL,

  ARRAY['short_term', 'long_term']::text[],

  -- Replace with your Supabase Storage public URLs or keep a local fallback path
  ARRAY[
    'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/YOUR_BUCKET/photo-1.jpg'
  ]::text[],

  NULL,
  NULL,
  NULL,
  NULL
)
ON CONFLICT (slug) DO UPDATE SET
  status                = EXCLUDED.status,
  plan                  = EXCLUDED.plan,
  nickname              = EXCLUDED.nickname,
  description           = EXCLUDED.description,
  location_area         = EXCLUDED.location_area,
  location_display      = EXCLUDED.location_display,
  property_type         = EXCLUDED.property_type,
  bedrooms              = EXCLUDED.bedrooms,
  bathrooms             = EXCLUDED.bathrooms,
  max_guests            = EXCLUDED.max_guests,
  amenities             = EXCLUDED.amenities,
  price_nightly_usd     = EXCLUDED.price_nightly_usd,
  price_monthly_usd     = EXCLUDED.price_monthly_usd,
  price_sale_usd        = EXCLUDED.price_sale_usd,
  rental_type           = EXCLUDED.rental_type,
  photos                = EXCLUDED.photos,
  ical_url              = EXCLUDED.ical_url,
  google_maps_embed     = EXCLUDED.google_maps_embed,
  hubspot_contact_id    = EXCLUDED.hubspot_contact_id,
  hubspot_deal_id       = EXCLUDED.hubspot_deal_id,
  updated_at            = NOW();

-- -----------------------------------------------------------------------------
-- Optional: second property — copy/paste the INSERT block and change slug + data
-- -----------------------------------------------------------------------------

/*
INSERT INTO properties (slug, status, plan, nickname, description, location_area, location_display, property_type, bedrooms, bathrooms, max_guests, amenities, price_nightly_usd, price_monthly_usd, price_sale_usd, rental_type, photos)
VALUES (
  'second-listing-slug',
  'draft',
  'vitrina',
  '{"es":"Otra propiedad","en":"Another listing"}'::jsonb,
  '{"es":"Descripción breve.","en":"Short description."}'::jsonb,
  'tulum',
  '{"es":"Tulum","en":"Tulum"}'::jsonb,
  'villa',
  3, 3, 8,
  ARRAY['wifi','pool','parking']::text[],
  400, 12000, NULL,
  ARRAY['short_term']::text[],
  ARRAY['https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/YOUR_BUCKET/photo-2.jpg']::text[]
)
ON CONFLICT (slug) DO UPDATE SET
  status = EXCLUDED.status, plan = EXCLUDED.plan, nickname = EXCLUDED.nickname,
  description = EXCLUDED.description, location_area = EXCLUDED.location_area,
  location_display = EXCLUDED.location_display, property_type = EXCLUDED.property_type,
  bedrooms = EXCLUDED.bedrooms, bathrooms = EXCLUDED.bathrooms, max_guests = EXCLUDED.max_guests,
  amenities = EXCLUDED.amenities, price_nightly_usd = EXCLUDED.price_nightly_usd,
  price_monthly_usd = EXCLUDED.price_monthly_usd, price_sale_usd = EXCLUDED.price_sale_usd,
  rental_type = EXCLUDED.rental_type, photos = EXCLUDED.photos, updated_at = NOW();
*/
