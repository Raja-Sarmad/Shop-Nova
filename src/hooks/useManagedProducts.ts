"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { ADMIN_PRODUCTS_EVENT, readManagedProducts } from "@/lib/admin-catalog";

const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

async function fetchLiveProducts(): Promise<Product[] | null> {
  if (!API) return null;
  try {
    const res = await fetch(`${API}/products`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { products?: Product[] };
    return data.products ?? null;
  } catch {
    return null;
  }
}

/**
 * Live catalog for the storefront.
 * When NEXT_PUBLIC_API_URL is set → always sync from MongoDB API (dashboard changes show live).
 * Otherwise → fall back to localStorage mock admin catalog.
 */
export function useManagedProducts(initialProducts: Product[]) {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      if (API) {
        const live = await fetchLiveProducts();
        if (!cancelled && live) {
          setProducts(live);
          // Clear old local mock catalog so it can't override the live shop
          try {
            localStorage.removeItem("velora-admin-products");
          } catch {
            /* ignore */
          }
        }
        return;
      }
      setProducts(readManagedProducts());
    };

    refresh();

    // Poll often so dashboard create/edit/delete appears on the store quickly
    const interval = API ? window.setInterval(refresh, 2000) : undefined;

    const onFocus = () => {
      void refresh();
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener(ADMIN_PRODUCTS_EVENT, () => {
      void refresh();
    });
    window.addEventListener("storage", () => {
      void refresh();
    });

    return () => {
      cancelled = true;
      if (interval) window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return products;
}
