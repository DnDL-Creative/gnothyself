import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { PipeFrame } from "@/components/ui/PipeFrame/PipeFrame";
import { getPost, getAllSlugs, getAllPosts } from "../posts";
import { processShortcodes } from "../processShortcodes";
import RelatedPosts from "./_components/RelatedPosts";
import ProductCarousel from "./_components/ProductCarousel";
import CarouselHydrator from "./_components/CarouselHydrator";
import ImageLightbox from "@/components/ui/ImageLightbox";
import styles from "./page.module.css";

/** Revalidate every 60s so VibeWriter edits go live without redeploying */
export const revalidate = 60;

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
    title: post.seoTitle || post.title,
    description: post.subtitle,
    openGraph: {
      title: post.seoTitle || post.title,
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
          {post.heroImageAlt && post.heroImageAlt !== post.title && (
            <div className={styles.heroCaption}>
              {post.heroImageAlt}
            </div>
          )}
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
            {post.author && (
              <>
                <span className={styles.dot}>·</span>
                <span>{post.author}{post.authorTitle ? ` | ${post.authorTitle}` : ""}</span>
              </>
            )}
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.subtitle}>{post.subtitle}</p>
          <div className={styles.tags}>
            {post.tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        </header>

        {/* ── AUDIO (Spotify / Blogcast) ────────────────────────── */}
        {(post.musicEmbed || post.blogcastUrl) && (
          <div className={styles.audioSection}>
            {post.musicEmbed && (
              <div className={styles.audioCard}>
                <iframe
                  style={{ borderRadius: "12px", display: "block" }}
                  src={post.musicEmbed.includes("/embed/") ? post.musicEmbed : post.musicEmbed.replace(".com/", ".com/embed/")}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                  title="Music embed"
                />
              </div>
            )}
            {post.blogcastUrl && (
              <div className={styles.audioCard}>
                <div className={styles.blogcastLabel}>⊙ blogcast</div>
                <audio controls className={styles.blogcastPlayer}>
                  <source src={post.blogcastUrl} />
                </audio>
              </div>
            )}
          </div>
        )}

        {/* ── BODY CONTENT ────────────────────────────────────── */}
        <div className={styles.body} data-lightbox>
          <CarouselHydrator />
          <ImageLightbox />
          {post.content ? parse(processShortcodes(post.content)) : (
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
