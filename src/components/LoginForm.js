"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoggedIn, user } = useAuth();
  const [form, setForm] = useState({ email: user?.email || "", password: user?.password || "" });
  const [message, setMessage] = useState("");

  const nextPath = searchParams.get("next") || "/tai-khoan";

  function handleChange(event) {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = login(form);
    setMessage(result.message);

    if (result.ok) {
      router.push(nextPath);
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Bạn đang đăng nhập với tài khoản {user.name}.
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Mật khẩu</span>
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="Nhập mật khẩu demo"
          />
        </label>

        {message ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            {message}
          </div>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-full bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
        >
          Đăng nhập
        </button>

        <Link
          href="/forgot-password"
          className="block text-center text-sm font-medium text-slate-500 hover:text-sky-700"
        >
          Quên mật khẩu?
        </Link>
      </form>
    </>
  );
}