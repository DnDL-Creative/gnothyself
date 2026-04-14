import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { PipeFrame } from "@/components/ui/PipeFrame/PipeFrame";
import { getPost, getAllSlugs, getAllPosts } from "../posts";
import RelatedPosts from "./_components/RelatedPosts";
import ProductCarousel from "./_components/ProductCarousel";
import styles from "./page.module.css";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      type: "article",
      ...(post.heroImage && {
        images: [{ url: post.heroImage, width: 1200, height: 630, alt: post.heroImageAlt || post.title }],
      }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();

  return (
    <main className={styles.main}>
      {/* ── HERO IMAGE ──────────────────────────────────────────── */}
      {post.heroImage && (
        <div className={styles.heroWrap}>
          <PipeFrame>
            <Image
              src={post.heroImage}
              alt={post.heroImageAlt || post.title}
              width={960}
              height={540}
              className={styles.heroImage}
              priority
            />
          </PipeFrame>
        </div>
      )}

      {/* ── ARTICLE ─────────────────────────────────────────────── */}
      <article className={styles.article}>
        <Link href="/blog" className={styles.backLink}>
          ← back to observations
        </Link>

        {/* ── HEADER ────────────────────────────────────────────── */}
        <header className={styles.header}>
          <div className={styles.meta}>
            <span>{post.date}</span>
            <span className={styles.dot}>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.subtitle}>{post.subtitle}</p>
          <div className={styles.tags}>
            {post.tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </header>

        {/* ── BODY CONTENT ────────────────────────────────────── */}
        <div className={styles.body}>
          {post.content ? parse(post.content) : (
            <p>Content unavailable.</p>
          )}
        </div>

        <footer className={styles.postFooter}>
          <Link href="/blog" className={styles.backLink}>
            ← all observations
          </Link>
        </footer>
      </article>

      {/* ── STAY GROUNDED — LATEST RELEASES ───────────────────── */}
      <section className={styles.carouselSection}>
        <h2 className={styles.carouselHeading}>Stay Grounded</h2>
        <ProductCarousel />
      </section>

      {/* ── RELATED POSTS CAROUSEL ──────────────────────────────── */}
      <section className={styles.carouselSection}>
        <h2 className={styles.carouselHeading}>More Observations</h2>
        <RelatedPosts currentSlug={slug} allPosts={allPosts} />
      </section>
    </main>
  );
}
