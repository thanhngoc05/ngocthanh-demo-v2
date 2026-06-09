"use client";
import Link from "next/link";
import { CustomerRouteGuard } from "@/components/CustomerRouteGuard";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { user, logout } = useAuth();

  return (
    <CustomerRouteGuard>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Tài khoản của tôi</h1>
          <p className="mt-2 text-slate-500">Quản lý thông tin cá nhân và theo dõi đơn hàng của bạn.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-lg font-bold text-sky-600">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
              </div>
              
              <nav className="flex flex-col gap-2">
                <Link 
                  href="/tai-khoan/ho-so" 
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-sky-700"
                >
                  Hồ sơ cá nhân
                </Link>
                <Link 
                  href="/tai-khoan/dia-chi" 
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-sky-700"
                >
                  Sổ địa chỉ
                </Link>
                <Link 
                  href="/tai-khoan/don-hang" 
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-sky-700"
                >
                  Lịch sử đơn hàng
                </Link>
                <button 
                  onClick={logout}
                  className="mt-4 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                  Đăng xuất
                </button>
              </nav>
            </div>
          </aside>

          <main className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Chào mừng trở lại, {user?.name}!</h2>
              <p className="text-sm leading-6 text-slate-600">
                Bạn có thể nhanh chóng cập nhật thông tin liên lạc hoặc kiểm tra trạng thái các đơn hàng demo đã đặt. 
                Mọi dữ liệu hiện tại được lưu trữ tạm thời trên trình duyệt của bạn.
              </p>
              
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Đơn hàng</p>
                  <p className="text-2xl font-bold text-slate-900">Demo</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Trạng thái</p>
                  <p className="text-2xl font-bold text-emerald-600">Kích hoạt</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs text-slate-500 uppercase font-semibold">Vai trò</p>
                  <p className="text-2xl font-bold text-slate-900">Khách hàng</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </CustomerRouteGuard>
  );
}