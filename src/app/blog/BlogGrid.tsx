"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PipeFrame } from "@/components/ui/PipeFrame/PipeFrame";
import type { BlogPost } from "./posts";
import styles from "./page.module.css";

type SortOption = "newest" | "oldest";

const parseDate = (dateStr: string): number => {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? 0 : d.getTime();
};

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [sort, setSort] = useState<SortOption>("newest");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [posts]);

  const sorted = useMemo(() => {
    let filtered = activeTag
      ? posts.filter((p) => p.tags.includes(activeTag))
      : posts;
    return [...filtered].sort((a, b) => {
      const da = parseDate(a.date);
      const db = parseDate(b.date);
      return sort === "newest" ? db - da : da - db;
    });
  }, [posts, sort, activeTag]);

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.sortGroup}>
          {(["newest", "oldest"] as SortOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setSort(opt)}
              className={`${styles.sortBtn} ${sort === opt ? styles.sortBtnActive : ""}`}
            >
              {opt === "newest" ? "↑ newest" : "↓ oldest"}
            </button>
          ))}
        </div>
        <div className={styles.tagFilters}>
          <button
            onClick={() => setActiveTag(null)}
            className={`${styles.sortBtn} ${activeTag === null ? styles.sortBtnActive : ""}`}
          >
            all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`${styles.sortBtn} ${activeTag === tag ? styles.sortBtnActive : ""}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {sorted.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.cardLink}>
            <PipeFrame bg="hsl(38, 28%, 88%)">
              <article className={styles.card}>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardSubtitle}>{post.subtitle}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.meta}>{post.date}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.readTime}>{post.readTime}</span>
                  <span className={styles.dot}>·</span>
                  {post.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </article>
            </PipeFrame>
          </Link>
        ))}
      </div>
    </>
  );
}
