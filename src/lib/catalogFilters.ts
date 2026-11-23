import type { Gender, Product } from "@/lib/types";

export function productGender(product: Product): Gender {
  return product.gender ?? "unisex";
}

export function matchesGender(product: Product, gender: string) {
  if (!gender || gender === "all") return true;
  const value = productGender(product);
  if (gender === "unisex") return value === "unisex";
  if (gender === "men" || gender === "women") {
    return value === gender || value === "unisex";
  }
  return true;
}

export function matchesCatalogFilter(product: Product, filter: string) {
  if (!filter) return true;
  if (filter === "new") return Boolean(product.isNew);
  if (filter === "bestseller") return Boolean(product.isBestseller);
  if (filter === "sale") {
    return Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  }
  return true;
}

export function inStock(product: Product) {
  return product.stockQuantity === undefined || product.stockQuantity > 0;
}
