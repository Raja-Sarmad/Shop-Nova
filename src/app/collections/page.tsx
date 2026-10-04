import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/catalog";

export const metadata: Metadata = { title: "Collections" };

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="container-page py-12">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Edits</p>
      <h1 className="mt-2 max-w-2xl font-display text-5xl md:text-6xl">
        Collections from the cutting table
      </h1>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {collections.map((c) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className="group relative min-h-[420px] overflow-hidden bg-sand">
            <Image
              src={c.image}
              alt={c.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-ink/10" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-cream">
              <p className="text-[11px] tracking-[0.22em] uppercase text-gold">{c.eyebrow}</p>
              <h2 className="mt-2 font-display text-4xl">{c.title}</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-cream/80">{c.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
