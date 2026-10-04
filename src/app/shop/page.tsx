import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllColors, getAllSizes, getProducts } from "@/lib/catalog";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "The full Velora catalog — apparel, shoes, bags, jewelry, and home.",
};

export default async function ShopPage() {
  const products = await getProducts();
  const colors = getAllColors();
  const sizes = getAllSizes();

  return (
    <Suspense>
      <ShopCatalog
        products={products}
        colors={colors}
        sizes={sizes}
        subtitle="Filter by fibre, silhouette, and scale. Every piece is cut in small runs from the Lahore atelier."
      />
    </Suspense>
  );
}
