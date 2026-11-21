import type { Metadata } from "next";
import { getProduct } from "@/lib/catalog";
import { products } from "@/lib/data/catalog-data";
import { ManagedProductPage } from "@/components/product/ManagedProductPage";

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
  return <ManagedProductPage slug={slug} initialProducts={products} />;
}
