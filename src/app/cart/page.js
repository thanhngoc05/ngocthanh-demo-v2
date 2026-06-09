"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN").format(value || 0);
}

export default function CartPage() {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="max-w-xl rounded-3xl border border-dashed border-slate-300 bg-white p-10">
          <h1 className="text-3xl font-bold text-slate-900">Giỏ hàng trống</h1>
          <p className="mt-3 text-slate-600">
            Chưa có sản phẩm nào trong giỏ. Quay lại mua sắm để thêm sản phẩm yêu thích.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Giỏ hàng</h1>
        <p className="mt-2 text-slate-600">Kiểm tra lại sản phẩm trước khi đặt hàng demo.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          {cart.map((item) => (
            <article
              key={item.sku}
              className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row"
            >
              <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-28 sm:w-28 sm:flex-shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(min-width: 640px) 112px, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <Link
                      href={`/san-pham/${item.slug}`}
                      className="text-lg font-semibold text-slate-900 hover:text-sky-700"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.brand} · {item.category}
                    </p>
                  </div>
                  <div className="text-lg font-bold text-slate-900">
                    {formatCurrency(item.priceVnd)}₫
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-slate-200">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                      className="px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span className="min-w-12 px-3 py-2 text-center text-sm font-semibold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                      className="px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.sku)}
                    className="text-sm font-semibold text-rose-600 hover:text-rose-700"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Tóm tắt đơn hàng</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Tạm tính</span>
              <span>{formatCurrency(cartTotal)}₫</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Giảm giá</span>
              <span>0₫</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Phí giao hàng</span>
              <span>Miễn phí demo</span>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between text-base font-bold text-slate-900">
                <span>Tổng cộng</span>
                <span>{formatCurrency(cartTotal)}₫</span>
              </div>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Tiếp tục thanh toán
          </Link>
        </aside>
      </div>
    </div>
  );
}
