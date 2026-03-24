import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/auth/admin";
import { AdminLoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin — Sign in",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const auth = await requireAdminUser();
  if (!("error" in auth)) {
    redirect("/admin/properties");
  }
  const sessionForbidden = auth.error.includes("not allowed");
  const sp = await searchParams;
  const queryForbidden = sp.error === "forbidden";

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-bold text-slate-900">Admin sign in</h1>
      <p className="mt-2 text-sm text-slate-600">
        Sign in with the <strong>email and password</strong> for your user in{" "}
        <strong>Supabase → Authentication → Users</strong> (not the database postgres password). Set{" "}
        <code className="rounded bg-slate-200 px-1 text-xs">ADMIN_ALLOWED_EMAILS</code> in{" "}
        <code className="rounded bg-slate-200 px-1">.env</code> to limit which emails can open admin.
      </p>
      <AdminLoginForm sessionForbidden={sessionForbidden} queryForbidden={queryForbidden} />
      <p className="mt-6 text-center text-sm text-slate-600">
        <Link href="/" className="text-primary-700 hover:underline">
          ← Site home
        </Link>
      </p>
    </div>
  );
}
