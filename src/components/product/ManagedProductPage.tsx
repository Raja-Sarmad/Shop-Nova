"use client";

import Link from "next/link";
import { useManagedProducts } from "@/hooks/useManagedProducts";
import { AddToBag } from "@/components/product/AddToBag";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

export function ManagedProductPage({
  slug,
  initialProducts,
}: {
  slug: string;
  initialProducts: Product[];
}) {
  const products = useManagedProducts(initialProducts);
  const product = products.find(
    (item) =>
      item.slug === slug &&
      (item.stockQuantity === undefined || item.stockQuantity > 0),
  );

  if (!product) {
    return (
      <div className="container-page py-16 text-center sm:py-24">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
          Product unavailable
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">
          This piece is no longer in the collection.
        </h1>
        <Link
          href="/shop"
          className="mt-6 inline-flex border-b border-ink pb-1 text-sm"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const related = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category &&
        (item.stockQuantity === undefined || item.stockQuantity > 0),
    )
    .slice(0, 4);

  const categoryLabel =
    product.category === "fragrance"
      ? "Perfumes"
      : product.category === "shoes"
        ? "Shoes"
        : "Shop";
  const categoryHref =
    product.category === "fragrance" || product.category === "shoes"
      ? `/shop?category=${product.category}`
      : "/shop";

  return (
    <div className="container-page py-8 sm:py-10">
      <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted sm:mb-8">
        <Link href="/shop" className="hover:text-ink">
          Shop
        </Link>
        <span>/</span>
        <Link href={categoryHref} className="hover:text-ink">
          {categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-ink-soft">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <ProductGallery product={product} />
        <div>
          <AddToBag product={product} />

          <div className="mt-10 grid gap-8 border-t border-sand pt-8 sm:mt-12 sm:grid-cols-2">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">
                Details
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {product.details?.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
                {product.fabric ? <li>{product.fabric}</li> : null}
                {!product.details?.length && !product.fabric ? (
                  <li>Premium quality · Ready to ship</li>
                ) : null}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">
                Care
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {product.care?.length ? (
                  product.care.map((care) => <li key={care}>{care}</li>)
                ) : (
                  <li>Store in a cool, dry place away from direct sunlight.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="mt-16 sm:mt-20">
          <h2 className="mb-6 font-display text-3xl sm:mb-8 sm:text-4xl">
            You may also like
          </h2>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </div>
  );
}
