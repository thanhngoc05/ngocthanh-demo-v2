"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";

const demoStaff = {
  email: "staff@ngocthanh.demo",
  password: "demo123",
};

export default function StaffLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
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

    if (form.email.trim().toLowerCase() !== demoStaff.email || form.password !== demoStaff.password) {
      setMessage("Email hoặc mật khẩu staff demo chưa đúng.");
      return;
    }

    setMessage("Đăng nhập staff demo thành công. Portal quản trị đầy đủ sẽ được triển khai ở giai đoạn tiếp theo.");
    window.localStorage.setItem(
      "ngocthanh_staff_demo",
      JSON.stringify({
        email: demoStaff.email,
        role: "staff",
        loggedInAt: new Date().toISOString(),
      }),
    );
    router.push("/staff");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-220px)] w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[32px] bg-slate-950 p-8 text-white shadow-xl sm:p-10">
          <BrandLogo href="/" variant="horizontal" className="[&_img]:brightness-0 [&_img]:invert" />
          <div className="mt-10 max-w-2xl">
            <p className="inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100">
              Staff access
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              Khu vực đăng nhập nội bộ NgocThanh.
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Trang này xác nhận entry staff riêng biệt cho demo. Các module quản lý sản phẩm, tồn kho, đơn hàng và người dùng vẫn nằm trong backlog.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {["Sản phẩm", "Tồn kho", "Đơn hàng"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold">{item}</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">Module staff V1 đang chờ triển khai.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Đăng nhập staff</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Dùng tài khoản demo để kiểm tra route nội bộ. Thông tin này chỉ phục vụ bản demo local.
            </p>
          </div>

          <div className="mb-6 rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sm text-sky-900">
            Demo: <span className="font-semibold">{demoStaff.email}</span> / <span className="font-semibold">{demoStaff.password}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Email staff</span>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                placeholder="staff@ngocthanh.demo"
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
                placeholder="demo123"
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
              Đăng nhập staff demo
            </button>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-6 text-sm text-slate-600">
            <Link href="/" className="font-semibold text-sky-700 hover:text-sky-800">
              Quay lại website khách hàng
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
