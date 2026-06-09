"use client";
import Link from "next/link";
import { Suspense } from "react";
import { AuthShell } from "@/components/AuthShell";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="Đăng nhập khách hàng"
      description="Dùng tài khoản demo đã đăng ký để xem hồ sơ, địa chỉ và lịch sử đơn hàng."
      footer={
        <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Chưa có tài khoản?</span>
          <Link href="/register" className="font-semibold text-sky-700 hover:text-sky-800">
            Tạo tài khoản demo
          </Link>
        </div>
      }
    >
      <Suspense fallback={<div className="p-4 text-sm text-slate-500">Đang tải...</div>}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}