import { BrandLogo } from "@/components/BrandLogo";

export function AuthShell({ title, description, children, footer }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-220px)] w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[32px] bg-slate-900 p-8 text-white shadow-xl sm:p-10">
          <BrandLogo href="/" variant="horizontal" className="[&_img]:brightness-0 [&_img]:invert" />
          <div className="mt-10 space-y-5">
            <span className="inline-flex rounded-full border border-sky-400/40 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-200">
              Demo customer auth
            </span>
            <h1 className="max-w-lg text-3xl font-bold leading-tight sm:text-4xl">
              Mua sắm công nghệ rõ giá, rõ bảo hành, rõ lịch sử đơn hàng.
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Khu vực tài khoản khách hàng giúp đăng nhập nhanh, theo dõi đơn demo, cập nhật hồ sơ
              và địa chỉ nhận hàng trong cùng một trải nghiệm thống nhất.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">1</p>
              <p className="mt-2 text-sm font-semibold">Tạo tài khoản demo</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">2</p>
              <p className="mt-2 text-sm font-semibold">Xem đơn hàng đã đặt</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">3</p>
              <p className="mt-2 text-sm font-semibold">Cập nhật hồ sơ dễ dùng</p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          </div>

          {children}

          {footer ? <div className="mt-6 border-t border-slate-200 pt-6">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}