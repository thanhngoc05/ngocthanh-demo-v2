import Link from "next/link";
import { 
  filterAndSortProducts, 
  getProductBrands,
  getProductCategories 
} from "@/lib/product-data";
import { ProductGrid } from "@/components/ProductGrid";
import { FilterSidebar } from "@/components/FilterSidebar";

export default function CategoryPage({ params, searchParams }) {
  const { slug } = params;
  const { brand = null, sort = "relevance" } = searchParams;

  // Decode the slug to get the category name
  const categoryName = decodeURIComponent(slug);
  
  const products = filterAndSortProducts({
    category: categoryName,
    brand: brand,
    sort: sort,
  });

  const brands = getProductBrands();
  const allCategories = getProductCategories();
  
  // Check if the category actually exists
  const categoryExists = allCategories.some(
    (cat) => cat.toLowerCase() === categoryName.toLowerCase()
  );

  if (!categoryExists) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Danh mục không tồn tại</h1>
        <p className="mt-2 text-slate-500">Xin lỗi, chúng tôi không tìm thấy danh mục sản phẩm này.</p>
        <Link href="/" className="mt-6 rounded-full bg-sky-600 px-6 py-2 text-sm font-semibold text-white hover:bg-sky-700">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  // Find the original category name for display (capitalized)
  const displayName = allCategories.find(
    (cat) => cat.toLowerCase() === categoryName.toLowerCase()
  ) || categoryName;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {displayName}
        </h1>
        <p className="mt-2 text-slate-500">
          Tìm thấy {products.length} sản phẩm trong danh mục {displayName}.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <FilterSidebar 
            brands={brands} 
            currentBrand={brand} 
            currentSort={sort} 
            searchParams={searchParams}
            basePath={`/danh-muc/${slug}`}
          />
        </aside>

        <main>
          <ProductGrid 
            products={products} 
            emptyMessage={`Hiện không có sản phẩm nào trong danh mục ${displayName}.`} 
          />
        </main>
      </div>
    </div>
  );
}