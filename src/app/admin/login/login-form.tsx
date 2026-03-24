"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSignOutButton } from "@/app/admin/SignOutButton";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLoginForm({
  sessionForbidden = false,
  queryForbidden = false,
}: {
  sessionForbidden?: boolean;
  queryForbidden?: boolean;
}) {
  const router = useRouter();
  const forbidden = sessionForbidden || queryForbidden;
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const missingPublicConfig =
    !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!email || !password) {
      setError("Enter email and password.");
      setPending(false);
      return;
    }
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setError(
        "Supabase URL/anon key are missing in this deployment. In Vercel (or your host), add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY, then redeploy so the browser bundle includes them."
      );
      setPending(false);
      return;
    }
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.refresh();
    router.push("/admin/properties");
  }

  return (
    <div className="mt-8 space-y-4">
      {forbidden && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p>
            You do not have access to admin. Use an email listed in{" "}
            <code className="text-xs">ADMIN_ALLOWED_EMAILS</code> or ask the site owner to add your
            email.
          </p>
          <div className="mt-3">
            <AdminSignOutButton className="text-sm font-medium text-amber-950 underline hover:no-underline disabled:opacity-50">
              Sign out and try another account
            </AdminSignOutButton>
          </div>
        </div>
      )}
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {missingPublicConfig && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-950">
          This deployment is missing <code className="text-xs">NEXT_PUBLIC_SUPABASE_URL</code> or{" "}
          <code className="text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in the hosting environment.
          Add both (same values as in Supabase → Settings → API), then redeploy. They must be
          available at build time for Next.js.
        </p>
      )}
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      )}
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1.5 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
    </div>
  );
}
