import Link from "next/link";

export function FilterSidebar({
  brands = [],
  currentBrand,
  currentSort,
  basePath = "/search",
  searchParams = {},
}) {
  function buildUrl(updates) {
    const params = new URLSearchParams();
    
    // Copy existing params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    // Apply updates
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  }

  const sortOptions = [
    { value: "relevance", label: "Nổi bật" },
    { value: "newest", label: "Mới nhất" },
    { value: "price_asc", label: "Giá thấp đến cao" },
    { value: "price_desc", label: "Giá cao đến thấp" },
    { value: "rating", label: "Đánh giá cao" },
    { value: "discount", label: "Khuyến mãi tốt" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900">
          Sắp xếp theo
        </h3>
        <div className="flex flex-col gap-2">
          {sortOptions.map((option) => {
            const isActive = (currentSort || "relevance") === option.value;
            return (
              <Link
                key={option.value}
                href={buildUrl({ sort: option.value === "relevance" ? null : option.value })}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div
                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    isActive ? "border-sky-600" : "border-slate-300"
                  }`}
                >
                  {isActive && <div className="h-2 w-2 rounded-full bg-sky-600" />}
                </div>
                {option.label}
              </Link>
            );
          })}
        </div>
      </div>

      {brands.length > 0 && (
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-900">
            Thương hiệu
          </h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildUrl({ brand: null })}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                !currentBrand
                  ? "border-sky-600 bg-sky-50 text-sky-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              Tất cả
            </Link>
            {brands.map((brand) => {
              const isActive = currentBrand === brand;
              return (
                <Link
                  key={brand}
                  href={buildUrl({ brand })}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "border-sky-600 bg-sky-50 text-sky-700"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {brand}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}