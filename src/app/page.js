import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import {
  getCategorySlug,
  getAllProducts,
  getProductCategories,
  getProductsByCategory,
} from "@/lib/product-data";

const heroStats = [
  { label: "Sản phẩm demo", value: "100+" },
  { label: "Thành phố", value: "3" },
  { label: "Bảo hành", value: "12-24 tháng" },
];

const trustCards = [
  {
    title: "Giá minh bạch",
    text: "Hiển thị giá hiện tại, giá gốc, badge giảm rõ ràng.",
  },
  {
    title: "Bảo hành dễ hiểu",
    text: "Thông tin bảo hành và tình trạng hàng có ngay trên thẻ sản phẩm.",
  },
  {
    title: "Mua demo an toàn",
    text: "Checkout V1 chỉ tạo đơn demo, không dùng cổng thanh toán thật.",
  },
];

function SectionHeader({ eyebrow, title, href }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>
      </div>
      {href ? (
        <Link
          href={href}
          className="text-sm font-semibold text-sky-700 hover:text-sky-800"
        >
          Xem tất cả →
        </Link>
      ) : null}
    </div>
  );
}

function ProductSection({ eyebrow, title, products, href }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow={eyebrow} title={title} href={href} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const products = getAllProducts();
  const categories = getProductCategories();
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 4);
  const dealProducts = products
    .filter((product) => product.discountPercent > 0)
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 4);
  const newestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  const bestSellers = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 4);
  const phoneProducts = getProductsByCategory("Điện thoại").slice(0, 4);
  const laptopProducts = getProductsByCategory("Laptop").slice(0, 4);
  const accessoryProducts = products
    .filter((product) =>
      ["Phụ kiện", "Tai nghe", "Sạc dự phòng", "Chuột", "Bàn phím"].includes(
        product.category,
      ),
    )
    .slice(0, 4);

  const homepageFeatured = featuredProducts.length ? featuredProducts : newestProducts;

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-slate-950 via-sky-950 to-cyan-800 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit rounded-full border border-cyan-300/30 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100">
              NgocThanh Tech Store
            </p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Mua công nghệ rõ giá, rõ quà, rõ bảo hành.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
              Demo e-commerce tiếng Việt cho điện thoại, laptop, tablet, phụ kiện,
              thiết bị mạng, camera và nhiều nhóm hàng công nghệ.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/search"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-900/30 transition hover:bg-orange-600"
              >
                Tìm sản phẩm ngay
              </Link>
              <Link
                href="/khuyen-mai"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Xem deal nổi bật
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4"
                >
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="mt-1 text-sm text-slate-200">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-slate-950/30">
            <div className="rounded-[1.5rem] bg-white p-5 text-slate-900">
              <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                Gợi ý hôm nay
              </p>
              <div className="mt-5 space-y-4">
                {dealProducts.slice(0, 3).map((product) => (
                  <Link
                    key={product.sku}
                    href={`/san-pham/${product.slug}`}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 p-3 transition hover:border-sky-300 hover:bg-sky-50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sm font-bold text-sky-700">
                      -{product.discountPercent}%
                    </div>
                    <div>
                      <p className="line-clamp-1 text-sm font-semibold">{product.name}</p>
                      <p className="text-sm font-bold text-slate-900">
                        {product.priceLabel}₫
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Danh mục" title="Mua nhanh theo nhóm hàng" href="/search" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category}
              href={`/danh-muc/${getCategorySlug(category)}`}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-sky-300 hover:shadow-md"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-lg font-bold text-sky-700">
                {category.slice(0, 1)}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{category}</h3>
              <p className="mt-2 text-sm text-slate-500">Xem sản phẩm và lọc theo giá, hãng.</p>
            </Link>
          ))}
        </div>
      </section>

      <ProductSection
        eyebrow="Nổi bật"
        title="Sản phẩm đáng xem"
        products={homepageFeatured}
        href="/search"
      />
      <ProductSection
        eyebrow="Điện thoại"
        title="Điện thoại bán chạy"
        products={phoneProducts}
        href="/danh-muc/dien-thoai"
      />
      <ProductSection
        eyebrow="Laptop"
        title="Laptop cho học tập và làm việc"
        products={laptopProducts}
        href="/danh-muc/laptop"
      />
      <ProductSection
        eyebrow="Phụ kiện"
        title="Phụ kiện công nghệ cần có"
        products={accessoryProducts.length ? accessoryProducts : dealProducts}
        href="/danh-muc/phu-kien"
      />
      <ProductSection
        eyebrow="Deal"
        title="Giá tốt hôm nay"
        products={dealProducts}
        href="/khuyen-mai"
      />
      <ProductSection
        eyebrow="Mới về"
        title="Sản phẩm mới cập nhật"
        products={newestProducts}
        href="/search?sort=newest"
      />
      <ProductSection
        eyebrow="Đánh giá cao"
        title="Được khách demo quan tâm"
        products={bestSellers}
        href="/search?sort=rating"
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {trustCards.map((card) => (
            <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
