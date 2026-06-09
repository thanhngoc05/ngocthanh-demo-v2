import { 
  filterAndSortProducts, 
  getProductBrands 
} from "@/lib/product-data";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterSidebar } from "@/components/FilterSidebar";

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const { q = "", brand = null, sort = "relevance" } = resolvedSearchParams;

  const products = filterAndSortProducts({
    query: q,
    brand: brand,
    sort: sort,
  });

  const brands = getProductBrands();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {q ? `Kết quả tìm kiếm cho "${q}"` : "Tất cả sản phẩm"}
        </h1>
        <p className="mt-2 text-slate-500">
          Tìm thấy {products.length} sản phẩm phù hợp.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <FilterSidebar 
            brands={brands} 
            currentBrand={brand} 
            currentSort={sort} 
            searchParams={resolvedSearchParams}
            basePath="/search"
          />
        </aside>

        <main>
          <ProductGrid 
            products={products} 
            emptyMessage={`Không tìm thấy sản phẩm nào khớp với ${q ? `"${q}"` : "yêu cầu của bạn"}.`} 
          />
        </main>
      </div>
    </div>
  );
}
