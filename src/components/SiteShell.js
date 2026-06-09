"use client";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { getProductCategories } from "@/lib/product-data";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const trustItems = [
  "Giao hàng demo nhanh",
  "Bảo hành rõ ràng",
  "Hỗ trợ cửa hàng 3 thành phố",
];

const footerColumns = [
  {
    title: "Mua sắm",
    links: [
      { label: "Điện thoại", href: "/danh-muc/dien-thoai" },
      { label: "Laptop", href: "/danh-muc/laptop" },
      { label: "Phụ kiện", href: "/danh-muc/phu-kien" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Chính sách bảo hành", href: "/chinh-sach/bao-hanh" },
      { label: "Chính sách đổi trả", href: "/chinh-sach/doi-tra" },
      { label: "Cửa hàng", href: "/cua-hang" },
    ],
  },
  {
    title: "Tài khoản",
    links: [
      { label: "Đăng nhập", href: "/login" },
      { label: "Đăng ký", href: "/register" },
      { label: "Đơn hàng", href: "/tai-khoan/don-hang" },
    ],
  },
];

export function SiteHeader() {
  const categories = getProductCategories().slice(0, 6);
  const { cartCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="bg-slate-900 text-white">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-200">
            {trustItems.map((item) => (
              <span key={item}>• {item}</span>
            ))}
          </div>
          <Link href="/staff/login" className="font-medium text-sky-300 hover:text-sky-200">
            Staff login
          </Link>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <BrandLogo href="/" variant="horizontal" priority />
        <div className="hidden flex-1 md:block">
          <label className="relative block">
            <span className="sr-only">Tìm sản phẩm</span>
            <input
              type="search"
              placeholder="Tìm điện thoại, laptop, phụ kiện..."
              className="w-full rounded-full border border-slate-300 bg-slate-50 px-5 py-3 pr-4 text-sm outline-none transition focus:border-sky-500"
            />
          </label>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/gio-hang"
            className="relative rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-400 hover:text-sky-700"
          >
            Giỏ hàng
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link 
                href="/tai-khoan" 
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-[10px] font-bold text-sky-600">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span>{user?.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="text-xs font-medium text-slate-400 transition hover:text-red-500"
              >
                Thoát
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Tài khoản
            </Link>
          )}
        </div>
      </div>

      <nav className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-4 py-3 text-sm sm:px-6 lg:px-8">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/danh-muc/${encodeURIComponent(category.toLowerCase())}`}
              className="whitespace-nowrap rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
            >
              {category}
            </Link>
          ))}
          <Link
            href="/khuyen-mai"
            className="whitespace-nowrap rounded-full border border-orange-200 bg-orange-50 px-4 py-2 font-medium text-orange-700 transition hover:bg-orange-100"
          >
            Khuyến mãi
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div>
          <BrandLogo href="/" variant="horizontal" />
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
            NgocThanh demo cửa hàng công nghệ Việt Nam. Giao diện hướng tới mua sắm rõ giá, rõ
            bảo hành, rõ hỗ trợ.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold text-slate-900">{column.title}</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-sky-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}