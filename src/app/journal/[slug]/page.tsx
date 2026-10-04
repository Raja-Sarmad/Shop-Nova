import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournal, getJournalPost } from "@/lib/catalog";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getJournal();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  return { title: post?.title ?? "Journal" };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getJournalPost(slug);
  if (!post) notFound();

  return (
    <article className="container-page max-w-3xl py-16">
      <Link href="/journal" className="text-xs tracking-[0.16em] uppercase text-muted">
        Journal
      </Link>
      <p className="mt-6 text-[11px] tracking-[0.18em] uppercase text-muted">
        {formatDate(post.date)} · {post.readTime}
      </p>
      <h1 className="mt-3 font-display text-5xl md:text-6xl">{post.title}</h1>
      <div className="relative mt-10 aspect-[16/9] overflow-hidden bg-sand">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>
      <div className="mt-10 space-y-6 text-sm leading-8 text-ink-soft">
        {post.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}
