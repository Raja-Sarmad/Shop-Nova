import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllColors, getAllSizes, getProducts } from "@/lib/catalog";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "Explore Shop Nova perfumes and shoes, selected for everyday rituals and memorable nights.",
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
        subtitle="Explore considered fragrances and everyday shoes, selected to make getting ready feel like your own ritual."
      />
    </Suspense>
  );
}
