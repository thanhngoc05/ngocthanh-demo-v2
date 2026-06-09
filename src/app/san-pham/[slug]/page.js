import { 
  getCategorySlug,
  getProductBySlug, 
  getProductsByCategory 
} from "@/lib/product-data";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductGrid";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-sky-600">Trang chủ</Link>
        <span>/</span>
        <Link href={`/danh-muc/${getCategorySlug(product.category)}`} className="hover:text-sky-600">
          {product.category}
        </Link>
        <span>/</span>
        <span className="font-medium text-slate-900 truncate">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left: Gallery */}
        <section>
          <ProductGallery images={product.gallery} alt={product.name} />
        </section>

        {/* Right: Product Info */}
        <section className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
              {product.brand}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {product.name}
            </h1>
            
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
                <span className="text-orange-500">★ {product.rating}</span>
                <span className="text-slate-400">({product.reviewCount} đánh giá)</span>
              </div>
              <div className="h-4 w-px bg-slate-300" />
              <div className="text-sm font-medium text-slate-600">
                Bảo hành: {product.warrantyMonths} tháng
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-slate-900">{product.priceLabel}₫</span>
              {product.discountPercent > 0 && (
                <span className="text-lg text-slate-400 line-through">
                  {product.originalPriceLabel}₫
                </span>
              )}
            </div>
            {product.discountPercent > 0 && (
              <div className="mt-2 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                Tiết kiệm {product.discountPercent}%
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  product.stock <= 0 ? "bg-rose-50 text-rose-700" : 
                  product.stock <= 10 ? "bg-orange-50 text-orange-700" : "bg-emerald-50 text-emerald-700"
                }`}>
                  {product.stock <= 0 ? "Hết hàng" : product.stock <= 10 ? "Sắp hết hàng" : "Còn hàng"}
                </span>
                <span className="text-sm text-slate-500">
                  Kho: {product.stock} sản phẩm
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="flex-1 rounded-full bg-sky-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-sky-700 shadow-lg shadow-sky-200">
                Thêm vào giỏ hàng
              </button>
              <button className="flex-1 rounded-full bg-orange-500 px-6 py-4 text-sm font-bold text-white transition hover:bg-orange-600 shadow-lg shadow-orange-200">
                Mua ngay
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Thông tin nhanh
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Tình trạng</span>
                <span className="font-medium text-slate-900">Mới 100%</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Vận chuyển</span>
                <span className="font-medium text-slate-900">Giao nhanh 2h</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-slate-500">Thanh toán</span>
                <span className="font-medium text-slate-900">COD / Chuyển khoản</span>
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Details Section */}
      <div className="mt-16 grid gap-12 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">Hỗ trợ mua hàng</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-lg">🚚</span>
                <p className="text-sm text-slate-600">Miễn phí vận chuyển cho đơn hàng từ 2 triệu đồng.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🛡️</span>
                <p className="text-sm text-slate-600">Đổi trả trong 30 ngày nếu có lỗi từ nhà sản xuất.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">💳</span>
                <p className="text-sm text-slate-600">Hỗ trợ trả góp 0% qua thẻ tín dụng.</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-slate-900">Mô tả sản phẩm</h2>
            <div className="mt-4 prose prose-slate max-w-none text-slate-600 leading-relaxed">
              {product.description || "Thông tin mô tả chi tiết sản phẩm đang được cập nhật."}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900">Thông số kỹ thuật</h2>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-slate-100">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="hover:bg-slate-50 transition">
                      <td className="w-1/3 px-6 py-4 font-medium text-slate-500 bg-slate-50/50">
                        {key}
                      </td>
                      <td className="px-6 py-4 text-slate-900">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* Related Products */}
      <section className="mt-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Sản phẩm tương tự</h2>
          <Link 
            href={`/danh-muc/${getCategorySlug(product.category)}`}
            className="text-sm font-semibold text-sky-700 hover:text-sky-800"
          >
            Xem tất cả {product.category} →
          </Link>
        </div>
        <ProductGrid products={relatedProducts} emptyMessage="Hiện chưa có sản phẩm tương tự." />
      </section>
    </div>
  );
}
