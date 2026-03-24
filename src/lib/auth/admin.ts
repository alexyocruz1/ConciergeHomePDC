import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server-auth";

function parseAllowedEmails(): string[] {
  const raw = process.env.ADMIN_ALLOWED_EMAILS?.trim();
  if (!raw) return [];
  return raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
}

function isEmailAllowed(email: string | undefined, allowed: string[]): boolean {
  if (!allowed.length) return true;
  const e = email?.toLowerCase();
  return Boolean(e && allowed.includes(e));
}

/**
 * Returns the signed-in user if they may use admin tools, otherwise an error message.
 * When `ADMIN_ALLOWED_EMAILS` is set (comma-separated), only those emails are allowed.
 * When unset, any authenticated user is allowed (lock down your project or set the allowlist).
 */
export async function requireAdminUser(): Promise<
  { user: User } | { error: string }
> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { error: "Supabase is not configured (anon key / URL)." };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { error: "Sign in required." };
  }

  const allowed = parseAllowedEmails();
  if (!isEmailAllowed(user.email ?? undefined, allowed)) {
    return { error: "This account is not allowed to manage properties." };
  }

  return { user };
}
