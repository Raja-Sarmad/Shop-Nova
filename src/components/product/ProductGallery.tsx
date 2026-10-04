"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-3 md:grid-cols-[88px_1fr]">
      <div className="order-2 flex gap-2 md:order-1 md:flex-col">
        {product.images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={`relative aspect-[3/4] w-20 overflow-hidden bg-sand ${active === i ? "ring-1 ring-ink" : ""}`}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-[3/4] overflow-hidden bg-sand md:order-2">
        <Image
          src={product.images[active]}
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
