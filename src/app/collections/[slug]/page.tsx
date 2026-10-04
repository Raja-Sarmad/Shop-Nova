import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAllColors, getAllSizes, getCollection, getCollections, getProducts } from "@/lib/catalog";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollection(slug);
  return { title: collection?.title ?? "Collection" };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = await getCollection(slug);
  if (!collection) notFound();
  const products = await getProducts({ collection: slug });

  return (
    <Suspense>
      <ShopCatalog
        products={products}
        colors={getAllColors()}
        sizes={getAllSizes()}
        title={collection.title}
        subtitle={collection.description}
      />
    </Suspense>
  );
}
