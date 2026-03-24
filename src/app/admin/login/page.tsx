import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { requireAdminUser } from "@/lib/auth/admin";
import { AdminLoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin — Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const auth = await requireAdminUser();
  if (!("error" in auth)) {
    redirect("/admin/properties");
  }
  const sessionForbidden = auth.error.includes("not allowed");

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-slate-900">Admin sign in</h1>
      <p className="mt-2 text-sm text-slate-600">
        Use your Supabase account (email and password). Set{" "}
        <code className="rounded bg-slate-200 px-1 text-xs">ADMIN_ALLOWED_EMAILS</code> in{" "}
        <code className="rounded bg-slate-200 px-1">.env</code> to limit which emails can open admin.
      </p>
      <Suspense fallback={<div className="mt-8 text-sm text-slate-500">Loading…</div>}>
        <AdminLoginForm sessionForbidden={sessionForbidden} />
      </Suspense>
      <p className="mt-6 text-center text-sm text-slate-600">
        <Link href="/" className="text-primary-700 hover:underline">
          ← Site home
        </Link>
      </p>
    </div>
  );
}
