"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signOutAdmin } from "@/app/admin/auth-actions";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function AdminLoginForm({ sessionForbidden = false }: { sessionForbidden?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const forbidden = sessionForbidden || searchParams.get("error") === "forbidden";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

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
          <form action={signOutAdmin} className="mt-3">
            <button
              type="submit"
              className="text-sm font-medium text-amber-950 underline hover:no-underline"
            >
              Sign out and try another account
            </button>
          </form>
        </div>
      )}
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
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
