import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getJournal } from "@/lib/catalog";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Journal" };

export default async function JournalPage() {
  const posts = await getJournal();
  return (
    <div className="container-page py-12">
      <p className="text-[11px] tracking-[0.22em] uppercase text-muted">Notes</p>
      <h1 className="mt-2 font-display text-5xl">Atelier journal</h1>
      <div className="mt-12 space-y-12">
        {posts.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="grid gap-8 border-t border-sand pt-10 md:grid-cols-[280px_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
            <div>
              <p className="text-[11px] tracking-[0.18em] uppercase text-muted">
                {formatDate(post.date)} · {post.readTime}
              </p>
              <h2 className="mt-3 font-display text-4xl">{post.title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-ink-soft">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
