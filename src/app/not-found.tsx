import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="text-[11px] tracking-[0.28em] uppercase text-muted">404</p>
      <h1 className="mt-3 font-display text-6xl">This page has left the atelier.</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">
        The link may be old, or the piece has sold through. Return to the shop or the house notes.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/shop" className="bg-ink px-6 py-3 text-xs tracking-[0.18em] uppercase text-cream">
          Shop
        </Link>
        <Link href="/" className="px-6 py-3 text-xs tracking-[0.18em] uppercase">
          Home
        </Link>
      </div>
    </div>
  );
}
