import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

const staffModules = [
  "Quản lý sản phẩm",
  "Quản lý tồn kho",
  "Quản lý đơn hàng",
  "Quản lý khách hàng",
];

export default function StaffEntryPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <BrandLogo href="/" variant="horizontal" />
        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            Staff portal
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Entry nội bộ NgocThanh đã sẵn sàng cho giai đoạn staff.
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Bản demo hiện có trang đăng nhập staff và tài liệu luồng nội bộ. Dashboard quản trị đầy đủ vẫn được giữ trong backlog để triển khai sau khi public storefront được duyệt.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {staffModules.map((moduleName) => (
            <div key={moduleName} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{moduleName}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">Đang chờ triển khai trong staff portal V1.</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/staff/login"
            className="inline-flex justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-sky-700"
          >
            Mở staff login
          </Link>
          <Link
            href="/"
            className="inline-flex justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-700"
          >
            Về storefront
          </Link>
        </div>
      </section>
    </div>
  );
}
