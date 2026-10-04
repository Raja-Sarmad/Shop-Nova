import type { Metadata } from "next";
import { getFaqs } from "@/lib/catalog";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  const faqs = getFaqs();
  return (
    <div className="container-page max-w-3xl py-16">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Help</p>
      <h1 className="mt-2 font-display text-5xl">Questions we are asked often</h1>
      <div className="mt-12 divide-y divide-sand border-y border-sand">
        {faqs.map((f) => (
          <details key={f.q} className="group py-6">
            <summary className="cursor-pointer list-none font-display text-2xl">
              {f.q}
            </summary>
            <p className="mt-3 text-sm leading-7 text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
