"use client";
import Link from "next/link";
import { useState } from "react";
import { AuthShell } from "@/components/AuthShell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("Yêu cầu đã được gửi. Vui lòng kiểm tra email của bạn để nhận hướng dẫn khôi phục mật khẩu (Đây là tính năng demo).");
  }

  return (
    <AuthShell
      title="Quên mật khẩu"
      description="Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu tài khoản demo."
      footer={
        <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Nhớ mật khẩu rồi?</span>
          <Link href="/login" className="font-semibold text-sky-700 hover:text-sky-800">
            Quay lại đăng nhập
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="you@example.com"
          />
        </label>

        {message ? (
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-800">
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-full bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
        >
          Gửi yêu cầu khôi phục
        </button>
      </form>
    </AuthShell>
  );
}