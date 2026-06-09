import productImageManifest from "../../data/product-image-manifest.json";
import productsSeed from "../../data/tech_products_100_demo.json";

const DEFAULT_IMAGE_SET = productImageManifest._default || {
  mainImage: "/assets/products/placeholder/product-placeholder.png",
  gallery: ["/assets/products/placeholder/product-placeholder.png"],
  alt: "NgocThanh product placeholder",
};

function safeParseJson(value) {
  if (!value || typeof value !== "string") {
    return {};
  }

  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function formatVnd(value) {
  return new Intl.NumberFormat("vi-VN").format(Number(value || 0));
}

function getImageSetBySku(sku) {
  if (!sku) {
    return DEFAULT_IMAGE_SET;
  }

  return productImageManifest[sku] || DEFAULT_IMAGE_SET;
}

function normalizeProduct(product) {
  const imageSet = getImageSetBySku(product.sku);
  const specs = safeParseJson(product.specs_json);

  return {
    id: product.id,
    sku: product.sku,
    name: product.name,
    slug: product.slug,
    category: product.category,
    brand: product.brand,
    priceVnd: Number(product.price_vnd || 0),
    originalPriceVnd: Number(product.original_price_vnd || 0),
    discountPercent: Number(product.discount_percent || 0),
    stock: Number(product.stock || 0),
    rating: Number(product.rating || 0),
    reviewCount: Number(product.review_count || 0),
    warrantyMonths: Number(product.warranty_months || 0),
    description: product.description || "",
    specs,
    isFeatured: Boolean(product.is_featured),
    status: product.status || "inactive",
    createdAt: product.created_at || "",
    imageUrl: imageSet.mainImage,
    gallery: imageSet.gallery || [imageSet.mainImage],
    imageAlt: imageSet.alt || product.name,
    priceLabel: formatVnd(product.price_vnd),
    originalPriceLabel: formatVnd(product.original_price_vnd),
  };
}

export function getAllProducts() {
  return productsSeed.map(normalizeProduct);
}

export function getProductBySlug(slug) {
  return getAllProducts().find((product) => product.slug === slug);
}

export function getProductsByCategory(category) {
  if (!category) {
    return [];
  }

  return getAllProducts().filter((product) => product.category === category);
}

export function getFeaturedProducts() {
  return getAllProducts().filter((product) => product.isFeatured);
}

export function getProductCategories() {
  return [...new Set(getAllProducts().map((product) => product.category))];
}

export function getProductBrands() {
  return [...new Set(getAllProducts().map((product) => product.brand))];
}

export function filterAndSortProducts({
  query = "",
  category = null,
  brand = null,
  minPrice = null,
  maxPrice = null,
  sort = "relevance",
}) {
  let products = getAllProducts();

  if (query) {
    const q = query.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (category) {
    products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (brand) {
    products = products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }

  if (minPrice !== null) {
    products = products.filter((p) => p.priceVnd >= minPrice);
  }

  if (maxPrice !== null) {
    products = products.filter((p) => p.priceVnd <= maxPrice);
  }

  switch (sort) {
    case "price_asc":
      products.sort((a, b) => a.priceVnd - b.priceVnd);
      break;
    case "price_desc":
      products.sort((a, b) => b.priceVnd - a.priceVnd);
      break;
    case "newest":
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case "rating":
      products.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      products.sort((a, b) => b.discountPercent - a.discountPercent);
      break;
    default:
      // Relevance is default (seed order)
      break;
  }

  return products;
}
