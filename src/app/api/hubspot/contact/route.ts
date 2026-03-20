import { NextResponse } from "next/server";

export const runtime = "nodejs";

type HubspotContactPayload = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

function splitName(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName
    .split(/\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const firstname = parts[0] || "";
  const lastname = parts.length > 1 ? parts.slice(1).join(" ") : "";
  return { firstname, lastname };
}

export async function POST(req: Request) {
  try {
    const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    const messagePropertyInternalName = process.env.HUBSPOT_CONTACT_PROPERTY_MESSAGE || "message";

    if (!hubspotToken) {
      return NextResponse.json(
        { error: "Missing HUBSPOT_PRIVATE_APP_TOKEN" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as Partial<HubspotContactPayload>;

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const topic = String(body.topic || "").trim();
    const message = String(body.message || "").trim();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }
    if (!topic) {
      return NextResponse.json({ error: "Missing topic" }, { status: 400 });
    }
    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const combinedMessage = `Topic: ${topic}\n\nMessage: ${message}`;
    const { firstname, lastname } = splitName(name);

    const baseUrl = "https://api.hubapi.com";
    const headers: Record<string, string> = {
      Authorization: `Bearer ${hubspotToken}`,
      "Content-Type": "application/json",
    };

    // Try to find an existing contact by email so we don't create duplicates.
    const searchRes = await fetch(`${baseUrl}/crm/v3/objects/contacts/search`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              { propertyName: "email", operator: "EQ", value: email },
            ],
          },
        ],
        limit: 1,
        // Not strictly required, but keeps the response small.
        properties: ["email"],
      }),
    });

    if (!searchRes.ok) {
      const text = await searchRes.text().catch(() => "");
      return NextResponse.json(
        { error: `HubSpot search failed: ${text || searchRes.statusText}` },
        { status: 502 }
      );
    }

    type HubspotSearchResponse = {
      results?: Array<{ id?: string }>;
    };

    const searchJson = (await searchRes.json()) as HubspotSearchResponse;
    const existingContactId = searchJson?.results?.[0]?.id;

    const properties: Record<string, string> = {
      email,
      [messagePropertyInternalName]: combinedMessage,
    };
    if (firstname) properties.firstname = firstname;
    if (lastname) properties.lastname = lastname;
    if (phone) properties.phone = phone;

    let contactId: string | undefined = existingContactId;

    if (existingContactId) {
      const patchRes = await fetch(`${baseUrl}/crm/v3/objects/contacts/${existingContactId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ properties }),
      });

      if (!patchRes.ok) {
        const text = await patchRes.text().catch(() => "");
        return NextResponse.json(
          { error: `HubSpot update failed: ${text || patchRes.statusText}` },
          { status: 502 }
        );
      }
    } else {
      const createRes = await fetch(`${baseUrl}/crm/v3/objects/contacts`, {
        method: "POST",
        headers,
        body: JSON.stringify({ properties }),
      });

      if (!createRes.ok) {
        const text = await createRes.text().catch(() => "");
        return NextResponse.json(
          { error: `HubSpot create failed: ${text || createRes.statusText}` },
          { status: 502 }
        );
      }

      type HubspotCreateResponse = { id?: string };
      const createJson = (await createRes.json().catch(() => null)) as
        | HubspotCreateResponse
        | null;
      contactId = createJson?.id;
    }

    return NextResponse.json({ ok: true, contactId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

