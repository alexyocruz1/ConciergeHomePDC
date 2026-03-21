-- Casa Concierge PDC — properties for Vitrina / listings portal
-- Run in Supabase SQL editor or via CLI: supabase db push

CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive')),
  plan TEXT NOT NULL CHECK (plan IN ('vitrina', 'esencial', 'gestor', 'premium')),
  nickname JSONB NOT NULL DEFAULT '{}'::jsonb,
  description JSONB NOT NULL DEFAULT '{}'::jsonb,
  location_area TEXT NOT NULL,
  location_display JSONB NOT NULL DEFAULT '{}'::jsonb,
  property_type TEXT NOT NULL CHECK (property_type IN ('apartment', 'condo', 'house', 'villa')),
  bedrooms INTEGER NOT NULL DEFAULT 0,
  bathrooms INTEGER NOT NULL DEFAULT 1,
  max_guests INTEGER NOT NULL DEFAULT 2,
  amenities TEXT[] DEFAULT '{}',
  price_nightly_usd NUMERIC,
  price_monthly_usd NUMERIC,
  price_sale_usd NUMERIC,
  rental_type TEXT[] NOT NULL DEFAULT '{}',
  photos TEXT[] DEFAULT '{}',
  ical_url TEXT,
  google_maps_embed TEXT,
  hubspot_contact_id TEXT,
  hubspot_deal_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_properties_status ON properties (status);
CREATE INDEX IF NOT EXISTS idx_properties_slug ON properties (slug);
CREATE INDEX IF NOT EXISTS idx_properties_location_area ON properties (location_area);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties (created_at DESC);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Public read: only published listings (website + anon key)
CREATE POLICY "Public can read active properties"
  ON properties
  FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

-- Optional: allow authenticated service role full access (manage via dashboard with service role)
-- Default Supabase service role bypasses RLS.

COMMENT ON TABLE properties IS 'Property listings; website reads active rows via anon key + RLS.';
