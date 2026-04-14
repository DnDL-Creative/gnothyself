"use client";

import { useState } from "react";
import Link from "next/link";
import { PipeFrame } from "@/components/ui/PipeFrame/PipeFrame";
import TickerWrapper from "./TickerWrapper";
import type { BlogPost } from "../../posts";
import styles from "./RelatedPosts.module.css";

interface RelatedPostsProps {
  currentSlug: string;
  allPosts: BlogPost[];
}

type SortOption = "newest" | "oldest" | "popular";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "↑ Newest", value: "newest" },
  { label: "↓ Oldest", value: "oldest" },
  { label: "♛ Popular", value: "popular" },
];

const parseDate = (dateStr: string): number => {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? 0 : d.getTime();
};

export default function RelatedPosts({ currentSlug, allPosts }: RelatedPostsProps) {
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [isPlaying, setIsPlaying] = useState(true);

  const related = allPosts.filter((p) => p.slug !== currentSlug);

  const sorted = [...related].sort((a, b) => {
    switch (sortOption) {
      case "oldest":
        return parseDate(a.date) - parseDate(b.date);
      case "popular":
        return parseDate(b.date) - parseDate(a.date);
      case "newest":
      default:
        return parseDate(b.date) - parseDate(a.date);
    }
  });

  if (sorted.length === 0) return null;

  return (
    <>
      {/* Controls row — play/pause always here, sort pills appear when paused */}
      <div className={styles.controlsRow}>
        <button
          onClick={() => setIsPlaying((p) => !p)}
          className={styles.playBtn}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <span className={styles.modeLabel}>
          {isPlaying ? "auto scroll" : "manual scroll →"}
        </span>
        {!isPlaying && SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSortOption(opt.value)}
            className={`${styles.sortPill} ${sortOption === opt.value ? styles.sortPillActive : ""}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <TickerWrapper speed={0.3} reverse isPlaying={isPlaying}>
        {sorted.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.cardLink}>
            <PipeFrame bg="hsl(38, 28%, 88%)">
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardSubtitle}>{post.subtitle}</p>
                <div className={styles.cardTags}>
                  {post.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <div className={styles.cardMeta}>
                  <span>{post.date}</span>
                  <span className={styles.dot}>·</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            </PipeFrame>
          </Link>
        ))}
      </TickerWrapper>
    </>
  );
}
