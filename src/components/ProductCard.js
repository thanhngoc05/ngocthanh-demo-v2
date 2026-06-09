"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

function renderShortSpecs(specs) {
  const entries = Object.entries(specs || {}).slice(0, 3);

  if (!entries.length) {
    return "Cấu hình đang cập nhật";
  }

  return entries.map(([, value]) => value).join(" • ");
}

function getStockLabel(stock) {
  if (stock <= 0) {
    return { text: "Hết hàng", className: "bg-rose-50 text-rose-700" };
  }

  if (stock <= 10) {
    return { text: "Sắp hết hàng", className: "bg-orange-50 text-orange-700" };
  }

  return { text: "Còn hàng", className: "bg-emerald-50 text-emerald-700" };
}

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const stockState = getStockLabel(product.stock);

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/san-pham/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt || product.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          {product.discountPercent > 0 ? (
            <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
              -{product.discountPercent}%
            </span>
          ) : null}
        </div>

        <div className="space-y-4 p-5">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-sky-700">
              {product.brand}
            </p>
            <h3 className="line-clamp-2 min-h-[3.5rem] text-base font-semibold text-slate-900">
              {product.name}
            </h3>
            <p className="line-clamp-2 text-sm leading-6 text-slate-500">
              {renderShortSpecs(product.specs)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold text-slate-900">{product.priceLabel}₫</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400 line-through">
                {product.originalPriceLabel}₫
              </span>
              <span className="text-sm font-medium text-sky-700">
                {product.reviewCount} đánh giá
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${stockState.className}`}
            >
              {stockState.text}
            </span>
            <span className="text-sm font-medium text-slate-500">★ {product.rating}</span>
          </div>

          <div className="flex gap-2">
            <div className="inline-flex items-center rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-sky-700">
              Xem chi tiết
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
            >
              Thêm
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}