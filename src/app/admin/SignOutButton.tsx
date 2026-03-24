"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

/**
 * Client-side sign-out avoids Server Action ID mismatches (e.g. stale CDN bundles vs new deploy).
 */
export function AdminSignOutButton({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const [pending, setPending] = useState(false);
  const label = children ?? "Sign out";

  async function handleSignOut() {
    setPending(true);
    const supabase = createSupabaseBrowserClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    // Full navigation so middleware and RSC see cleared session reliably
    window.location.assign("/admin/login");
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={pending}
      className={className}
    >
      {pending ? "Signing out…" : label}
    </button>
  );
}
