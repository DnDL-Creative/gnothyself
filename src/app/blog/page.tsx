import type { Metadata } from "next";
import Link from "next/link";
import { PipeFrame } from "@/components/ui/PipeFrame/PipeFrame";
import { getAllPosts } from "./posts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Observations",
  description:
    "Field notes from the uncomfortable middle. Essays on new-age grift, nonlinear truth, and the patterns they don't want you to see.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Observations</h1>
        <p className={styles.subtitle}>
          field notes from a spirit finding its way out
        </p>
      </header>

      <div className={styles.grid}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.cardLink}>
            <PipeFrame bg="hsl(38, 28%, 88%)">
              <article className={styles.card}>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardSubtitle}>{post.subtitle}</p>
                <div className={styles.tags}>
                  {post.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <div className={styles.meta}>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            </PipeFrame>
          </Link>
        ))}
      </div>
    </main>
  );
}
