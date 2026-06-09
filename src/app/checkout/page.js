"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN").format(value || 0);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "TP. Hồ Chí Minh",
    fulfillmentType: "delivery",
    paymentMethod: "cod",
    note: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const shippingFee = useMemo(() => 0, []);
  const discountTotal = useMemo(() => 0, []);
  const grandTotal = cartTotal + shippingFee - discountTotal;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) {
      router.push("/cart");
      return;
    }

    setSubmitting(true);

    const order = {
      orderCode: `NT${Date.now().toString().slice(-8)}`,
      customerName: form.fullName,
      customerPhone: form.phone,
      customerEmail: form.email,
      shippingAddress: `${form.address}, ${form.city}`,
      fulfillmentType: form.fulfillmentType,
      paymentMethod: form.paymentMethod,
      items: cart,
      subtotal: cartTotal,
      shippingFee,
      discountTotal,
      total: grandTotal,
      note: form.note,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("ngocthanh_demo_order", JSON.stringify(order));
    clearCart();
    router.push("/checkout/success");
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Thanh toán demo</h1>
        <p className="mt-2 text-slate-600">
          Nhập thông tin nhận hàng để tạo đơn demo.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Thông tin khách hàng</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Họ và tên"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                required
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Số điện thoại"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
                required
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500 sm:col-span-2"
                required
              />
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Địa chỉ giao hàng"
                className="min-h-28 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500 sm:col-span-2"
                required
              />
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              >
                <option>TP. Hồ Chí Minh</option>
                <option>Hà Nội</option>
                <option>Đà Nẵng</option>
              </select>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Ghi chú đơn hàng"
                className="min-h-28 rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Phương thức nhận hàng</h2>
            <div className="mt-4 grid gap-3">
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <span>Giao hàng tận nơi</span>
                <input
                  type="radio"
                  name="fulfillmentType"
                  value="delivery"
                  checked={form.fulfillmentType === "delivery"}
                  onChange={handleChange}
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <span>Nhận tại cửa hàng</span>
                <input
                  type="radio"
                  name="fulfillmentType"
                  value="pickup"
                  checked={form.fulfillmentType === "pickup"}
                  onChange={handleChange}
                />
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Thanh toán</h2>
            <div className="mt-4 grid gap-3">
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <span>COD</span>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={handleChange}
                />
              </label>
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <span>Chuyển khoản ngân hàng</span>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={form.paymentMethod === "bank_transfer"}
                  onChange={handleChange}
                />
              </label>
            </div>
          </section>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Đang tạo đơn..." : "Tạo đơn demo"}
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Tóm tắt đơn hàng</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Tạm tính</span>
              <span>{formatCurrency(cartTotal)}₫</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Phí giao hàng</span>
              <span>{formatCurrency(shippingFee)}₫</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Giảm giá</span>
              <span>{formatCurrency(discountTotal)}₫</span>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between text-base font-bold text-slate-900">
                <span>Tổng cộng</span>
                <span>{formatCurrency(grandTotal)}₫</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm text-slate-600">
              Demo chỉ tạo đơn giả lập. Không kết nối cổng thanh toán thật.
            </p>
            <Link
              href="/cart"
              className="inline-flex w-full justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
            >
              Quay lại giỏ hàng
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}