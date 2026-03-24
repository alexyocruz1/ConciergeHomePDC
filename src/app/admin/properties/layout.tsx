import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/auth/admin";
import { signOutAdmin } from "@/app/admin/auth-actions";

export default async function AdminPropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await requireAdminUser();
  if ("error" in auth) {
    if (auth.error.includes("not allowed")) {
      redirect("/admin/login?error=forbidden");
    }
    redirect("/admin/login");
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-sm text-slate-600">
          Signed in as{" "}
          <span className="font-medium text-slate-900">{auth.user.email ?? auth.user.id}</span>
        </p>
        <form action={signOutAdmin}>
          <button
            type="submit"
            className="text-sm font-medium text-primary-700 hover:text-primary-900 hover:underline"
          >
            Sign out
          </button>
        </form>
      </div>
      {children}
    </>
  );
}
