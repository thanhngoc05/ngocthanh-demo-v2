"use client";
import { useState } from "react";
import { CustomerRouteGuard } from "@/components/CustomerRouteGuard";
import { useAuth } from "@/context/AuthContext";

export default function AddressPage() {
  const { user, updateAddress } = useAuth();
  const [form, setForm] = useState({
    address: user?.addressBook?.[0]?.fullAddress || "",
    city: user?.addressBook?.[0]?.city || "",
    district: user?.addressBook?.[0]?.district || "",
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
    const result = updateAddress(form);
    setMessage(result.message);
    if (result.ok) {
      setTimeout(() => setMessage(""), 3000);
    }
  }

  return (
    <CustomerRouteGuard>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Sổ địa chỉ</h1>
          <p className="mt-2 text-slate-500">Quản lý địa chỉ nhận hàng mặc định của bạn.</p>
        </div>

        <div className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Địa chỉ chi tiết</span>
                <input
                  name="address"
                  type="text"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                  placeholder="Số nhà, tên đường, phường/xã..."
                />
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Quận/Huyện</span>
                  <input
                    name="district"
                    type="text"
                    required
                    value={form.district}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                    placeholder="Quận 1, Cầu Giấy..."
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">Thành phố</span>
                  <input
                    name="city"
                    type="text"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
                    placeholder="TP. Hồ Chí Minh, Hà Nội..."
                  />
                </label>
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
              Lưu địa chỉ
            </button>
          </form>
        </div>
      </div>
    </CustomerRouteGuard>
  );
}