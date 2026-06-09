"use client";

import Link from "next/link";

export default function CheckoutSuccessPage() {
  let order = null;

  if (typeof window !== "undefined") {
    try {
      const rawOrder = localStorage.getItem("ngocthanh_demo_order");
      if (rawOrder) {
        order = JSON.parse(rawOrder);
      }
    } catch (error) {
      console.error("Failed to read demo order", error);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">Đặt hàng thành công</h1>
        <p className="mt-3 text-slate-600">
          Đơn demo đã được tạo. Nhân viên có thể xử lý trong hệ thống nội bộ.
        </p>

        {order ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Thông tin đơn hàng
            </h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Mã đơn</dt>
                <dd className="font-semibold text-slate-900">{order.orderCode}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Khách hàng</dt>
                <dd className="font-semibold text-slate-900">{order.customerName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Tổng tiền</dt>
                <dd className="font-semibold text-slate-900">
                  {new Intl.NumberFormat("vi-VN").format(order.total || 0)}₫
                </dd>
              </div>
            </dl>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Về trang chủ
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
          >
            Mua tiếp
          </Link>
        </div>
      </div>
    </div>
  );
}