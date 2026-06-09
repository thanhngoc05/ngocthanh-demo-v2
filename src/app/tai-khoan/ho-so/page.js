"use client";
import { useState } from "react";
import { CustomerRouteGuard } from "@/components/CustomerRouteGuard";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = updateProfile(form);
    setMessage(result.message);
    if (result.ok) {
      setTimeout(() => setMessage(""), 3000);
    }
  }

  return (
    <CustomerRouteGuard>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Hồ sơ cá nhân</h1>
          <p className="mt-2 text-slate-500">Cập nhật thông tin liên lạc của bạn.</p>
        </div>

        <div className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Họ và tên</span>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
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
                />
              </label>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <span className="text-xs font-semibold uppercase text-slate-400">Email (Không thể thay đổi)</span>
                <p className="mt-1 text-sm font-medium text-slate-600">{user?.email}</p>
              </div>
            </div>

            {message ? (
              <div className={`rounded-2xl border p-4 text-sm ${
                message.includes("thành công") 
                ? "border-emerald-200 bg-emerald-50 text-emerald-800" 
                : "border-red-200 bg-red-50 text-red-800"
              }`}>
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              className="rounded-full bg-sky-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
            >
              Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </CustomerRouteGuard>
  );
}