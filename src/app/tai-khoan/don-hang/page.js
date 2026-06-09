"use client";
import { CustomerRouteGuard } from "@/components/CustomerRouteGuard";
import { useAuth } from "@/context/AuthContext";

export default function OrderHistoryPage() {
  const { customerOrders } = useAuth();

  return (
    <CustomerRouteGuard>
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Lịch sử đơn hàng</h1>
          <p className="mt-2 text-slate-500">Theo dõi trạng thái và chi tiết các đơn hàng demo của bạn.</p>
        </div>

        {customerOrders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
              📦
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Chưa có đơn hàng nào</h3>
            <p className="mt-2 text-sm text-slate-500">
              Bạn chưa thực hiện đặt hàng nào. Hãy khám phá các sản phẩm công nghệ mới nhất của NgocThanh!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {customerOrders.map((order) => (
              <div key={order.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-xs uppercase font-semibold text-slate-400">Mã đơn hàng</p>
                      <p className="font-bold text-slate-900">{order.orderCode}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-semibold text-slate-400">Ngày đặt</p>
                      <p className="text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString("vi-VN")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                    <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
                    {order.status.toUpperCase()}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <p className="text-xs uppercase font-semibold text-slate-400">Sản phẩm</p>
                    <ul className="space-y-2">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between text-sm">
                          <span className="text-slate-600">{item.productNameSnapshot} x{item.quantity}</span>
                          <span className="font-medium text-slate-900">{item.total.toLocaleString()} ₫</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col items-end justify-between rounded-2xl bg-slate-50 p-4">
                    <div className="space-y-1 text-right">
                      <p className="text-xs text-slate-500">Tổng thanh toán</p>
                      <p className="text-xl font-bold text-sky-600">{order.total.toLocaleString()} ₫</p>
                    </div>
                    <p className="text-xs text-slate-400">Thanh toán: {order.paymentMethod === "COD" ? "Khi nhận hàng" : "Chuyển khoản"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerRouteGuard>
  );
}