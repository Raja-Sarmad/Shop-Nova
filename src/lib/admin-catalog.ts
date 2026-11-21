import type { Product } from "@/lib/types";
import { products as starterProducts } from "@/lib/data/catalog-data";

export const ADMIN_PRODUCTS_KEY = "velora-admin-products";
export const ADMIN_PRODUCTS_EVENT = "velora-admin-products-updated";

export function getStarterProducts(): Product[] {
  return starterProducts.map((product) => ({
    ...product,
    images: [...product.images],
    stockQuantity: product.inStock ? 10 : 0,
  }));
}

export function readManagedProducts(): Product[] {
  try {
    const stored = localStorage.getItem(ADMIN_PRODUCTS_KEY);
    return stored ? (JSON.parse(stored) as Product[]) : getStarterProducts();
  } catch {
    return getStarterProducts();
  }
}

export function saveManagedProducts(next: Product[]) {
  localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(ADMIN_PRODUCTS_EVENT));
}
