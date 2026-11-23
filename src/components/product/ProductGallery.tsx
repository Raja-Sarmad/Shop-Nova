"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/format";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const images = product.images?.length ? product.images : ["/placeholder-product.jpg"];

  return (
    <div className="grid gap-3 md:grid-cols-[80px_1fr] lg:grid-cols-[88px_1fr]">
      <div className="order-2 flex gap-2 overflow-x-auto pb-1 md:order-1 md:flex-col md:overflow-visible md:pb-0">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-xl bg-sand sm:w-20",
              active === i ? "ring-1 ring-ink ring-offset-2" : "opacity-80 hover:opacity-100",
            )}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="80px" />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-[3/4] overflow-hidden rounded-2xl bg-sand sm:rounded-3xl md:order-2">
        <Image
          src={images[active] ?? images[0]}
          alt={product.name}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
    </div>
  );
}
