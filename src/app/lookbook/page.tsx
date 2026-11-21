import type { Metadata } from "next";
import Image from "next/image";
import { getLookbook } from "@/lib/catalog";

export const metadata: Metadata = { title: "Lookbook" };

export default function LookbookPage() {
  const images = getLookbook();
  return (
    <div className="container-page py-12">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">The Shop Nova edit</p>
      <h1 className="mt-2 max-w-2xl font-display text-5xl md:text-6xl">Scent, style and the everyday</h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-ink-soft">
        A visual journal of the fragrances and shoes we reach for, from bright mornings to long evenings. Discover the pieces in the shop.
      </p>
      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {images.map((src, i) => (
          <div key={src} className="mb-4 break-inside-avoid overflow-hidden bg-sand">
            <div className={`relative ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
              <Image src={src} alt={`Look ${i + 1}`} fill className="object-cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
