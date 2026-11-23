import {
  collections,
  faqs,
  journalPosts,
  lookbookImages,
  products,
  reviews,
  testimonials,
} from "@/lib/data/catalog-data";
import type {
  Category,
  Collection,
  JournalPost,
  Product,
  ProductFilters,
  Review,
} from "@/lib/types";

const API = process.env.NEXT_PUBLIC_API_URL;

async function fromApi<T>(path: string): Promise<T | null> {
  if (!API) return null;
  try {
    // no-store so dashboard create / edit / delete shows immediately on the shop
    const res = await fetch(`${API}${path}`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function applyFilters(list: Product[], filters: ProductFilters = {}) {
  let next = [...list];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    next = next.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q)),
    );
  }

  if (filters.category && filters.category !== "all") {
    next = next.filter((p) => p.category === filters.category);
  }

  if (filters.collection) {
    next = next.filter((p) => p.collection === filters.collection);
  }

  if (filters.color) {
    next = next.filter((p) =>
      p.colors.some((c) => c.name.toLowerCase() === filters.color?.toLowerCase()),
    );
  }

  if (filters.size) {
    next = next.filter((p) => p.sizes.includes(filters.size!));
  }

  if (typeof filters.minPrice === "number") {
    next = next.filter((p) => p.price >= filters.minPrice!);
  }

  if (typeof filters.maxPrice === "number") {
    next = next.filter((p) => p.price <= filters.maxPrice!);
  }

  switch (filters.sort) {
    case "newest":
      next.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      break;
    case "price-asc":
      next.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      next.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      next.sort((a, b) => b.rating - a.rating);
      break;
    default:
      next.sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller));
  }

  return next;
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const remote = await fromApi<{ products: Product[] }>(`/products`);
  // Prefer API only when configured — never mix deleted Mongo items with mock catalog
  if (API) {
    return applyFilters(remote?.products ?? [], filters);
  }
  return applyFilters(products, filters);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  if (API) {
    const remote = await fromApi<{ product: Product }>(`/products/slug/${slug}`);
    return remote?.product;
  }
  return products.find((p) => p.slug === slug);
}

export async function getRelated(product: Product, limit = 4): Promise<Product[]> {
  const list = await getProducts({ category: product.category });
  return list.filter((p) => p.id !== product.id).slice(0, limit);
}

export async function getCollections(): Promise<Collection[]> {
  const remote = await fromApi<{ collections: Collection[] }>(`/collections`);
  return remote?.collections ?? collections;
}

export async function getCollection(slug: string): Promise<Collection | undefined> {
  const remote = await fromApi<{ collection: Collection }>(`/collections/${slug}`);
  if (remote?.collection) return remote.collection;
  const list = await getCollections();
  return list.find((c) => c.slug === slug);
}

export async function getReviews(productId: string): Promise<Review[]> {
  return reviews.filter((r) => r.productId === productId);
}

export async function getJournal(): Promise<JournalPost[]> {
  return journalPosts;
}

export async function getJournalPost(slug: string): Promise<JournalPost | undefined> {
  const list = await getJournal();
  return list.find((p) => p.slug === slug);
}

export function getTestimonials() {
  return testimonials;
}

export function getFaqs() {
  return faqs;
}

export function getLookbook() {
  return lookbookImages;
}

export function getCategories(): Category[] {
  return ["shoes", "fragrance"];
}

export function getAllColors() {
  const map = new Map<string, string>();
  products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c.hex)));
  return [...map.entries()].map(([name, hex]) => ({ name, hex }));
}

export function getAllSizes() {
  return [...new Set(products.flatMap((p) => p.sizes))];
}
