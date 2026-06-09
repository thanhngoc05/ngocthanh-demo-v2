"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function CustomerRouteGuard({ children }) {
  const { hydrated, isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!isLoggedIn) {
      const nextPath = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${nextPath}`);
    }
  }, [hydrated, isLoggedIn, pathname, router]);

  if (!hydrated) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl items-center justify-center px-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-500">Đang kiểm tra phiên đăng nhập...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl items-center justify-center px-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-500">Đang chuyển đến trang đăng nhập...</p>
        </div>
      </div>
    );
  }

  return children;
}