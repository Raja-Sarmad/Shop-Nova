import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getRelated, getReviews } from "@/lib/catalog";
import { ProductGallery } from "@/components/product/ProductGallery";
import { AddToBag } from "@/components/product/AddToBag";
import { ProductGrid } from "@/components/product/ProductCard";
import { formatDate } from "@/lib/format";
import { products } from "@/lib/data/catalog-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.subtitle };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const [related, reviews] = await Promise.all([
    getRelated(product),
    getReviews(product.id),
  ]);

  return (
    <div className="container-page py-10">
      <nav className="mb-8 text-xs text-muted">
        <Link href="/shop" className="hover:text-ink">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery product={product} />
        <div>
          <AddToBag product={product} />
          <div className="mt-12 grid gap-8 border-t border-sand pt-8 sm:grid-cols-2">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Details</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
                {product.fabric ? <li>{product.fabric}</li> : null}
              </ul>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-muted">Care</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {product.care.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-sm text-ink-soft">
            Rated {product.rating} · {product.reviewCount} reviews
          </p>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-4xl">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft">No written reviews yet for this piece.</p>
        ) : (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {reviews.map((r) => (
              <blockquote key={r.id} className="border-t border-sand pt-6">
                <p className="text-sm tracking-[0.16em] uppercase text-gold">
                  {"★".repeat(r.rating)}
                </p>
                <h3 className="mt-2 font-display text-2xl">{r.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{r.body}</p>
                <p className="mt-4 text-xs text-muted">
                  {r.author} · {formatDate(r.date)}
                </p>
              </blockquote>
            ))}
          </div>
        )}
      </section>

      {related.length > 0 ? (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-4xl">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </div>
  );
}
