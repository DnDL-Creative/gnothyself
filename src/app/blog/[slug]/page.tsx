import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getAllSlugs } from "../posts";
import styles from "./page.module.css";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.subtitle,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <Link href="/blog" className={styles.backLink}>
          ← back to posts
        </Link>
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

        <div className={styles.body}>
          {post.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <footer className={styles.postFooter}>
          <Link href="/blog" className={styles.backLink}>
            ← all posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
