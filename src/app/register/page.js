"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/AuthShell";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm((currentForm) => ({
      ...currentForm,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = register(form);
    setMessage(result.message);

    if (result.ok) {
      router.push("/tai-khoan");
    }
  }

  return (
    <AuthShell
      title="Tạo tài khoản khách hàng"
      description="Tài khoản demo được lưu trên trình duyệt, phù hợp để thử luồng mua hàng V1."
      footer={
        <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <span>Đã có tài khoản?</span>
          <Link href="/login" className="font-semibold text-sky-700 hover:text-sky-800">
            Đăng nhập
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Họ tên</span>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="Nguyễn Văn A"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
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
            <span className="text-sm font-semibold text-slate-700">Số điện thoại</span>
            <input
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
              placeholder="0900000000"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Mật khẩu demo</span>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
            placeholder="Tối thiểu 6 ký tự"
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
          Tạo tài khoản
        </button>
      </form>
    </AuthShell>
  );
}