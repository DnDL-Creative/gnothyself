"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PipeFrame } from "@/components/ui/PipeFrame/PipeFrame";
import TickerWrapper from "./TickerWrapper";
import styles from "./ProductCarousel.module.css";

const products = [
  {
    handle: "proud-unregistered-voter",
    title: "Proud Unregistered Voter",
    image:
      "https://media.beinthegno.com/apparel/shirt-proud.png",
    price: "29.00",
    category: "apparel",
    href: "/apparel",
    badge: "Coming Soon",
    addedDate: "2026-04-01",
    sales: 0,
  },
  {
    handle: "literal-tinfoil-hat",
    title: "(Almost) Literal Tinfoil Hat",
    image: null,
    price: "24.00",
    category: "apparel",
    href: "/apparel",
    badge: "Coming Soon",
    addedDate: "2026-04-13",
    sales: 0,
  },
  {
    handle: "copper-tensor-ring",
    title: "Copper Tensor Ring",
    image: null,
    price: null,
    category: "copper",
    href: "/copper",
    badge: "Coming Soon",
    addedDate: "2026-04-10",
    sales: 0,
  },
  {
    handle: "emf-protection-pendant",
    title: "EMF Protection Pendant",
    image: null,
    price: null,
    category: "anti-emf",
    href: "/anti-emf",
    badge: "Coming Soon",
    addedDate: "2026-04-08",
    sales: 0,
  },
  {
    handle: "orgone-pyramid",
    title: "Orgone Pyramid",
    image: null,
    price: null,
    category: "orgone",
    href: "/orgone",
    badge: "Coming Soon",
    addedDate: "2026-04-05",
    sales: 0,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  apparel: "var(--pipe-color)",
  copper: "#b87333",
  "anti-emf": "#8b5e3c",
  orgone: "#6b705c",
};

type SortOption = "newest" | "oldest" | "best-sellers";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "↑ Newest", value: "newest" },
  { label: "↓ Oldest", value: "oldest" },
  { label: "★ Best Sellers", value: "best-sellers" },
];

export default function ProductCarousel() {
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [isPlaying, setIsPlaying] = useState(true);

  const sorted = [...products].sort((a, b) => {
    switch (sortOption) {
      case "oldest":
        return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
      case "best-sellers":
        return b.sales - a.sales;
      case "newest":
      default:
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
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

      <TickerWrapper speed={0.4} isPlaying={isPlaying}>
        {sorted.map((product) => (
          <Link key={product.handle} href={product.href} className={styles.cardLink}>
            <PipeFrame bg="hsl(38, 28%, 88%)">
              <article className={styles.card}>
                {product.image ? (
                  <div className={styles.imageWrap}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={240}
                      height={240}
                      className={styles.image}
                    />
                  </div>
                ) : (
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderText}>coming soon</span>
                  </div>
                )}
                <div className={styles.details}>
                  <span
                    className={styles.categoryTag}
                    style={{ borderColor: CATEGORY_COLORS[product.category] || "var(--pipe-color)", color: CATEGORY_COLORS[product.category] || "var(--pipe-color)" }}
                  >
                    {product.category}
                  </span>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  {product.price && <span className={styles.price}>${product.price}</span>}
                  {product.badge && <span className={styles.badge}>{product.badge}</span>}
                </div>
              </article>
            </PipeFrame>
          </Link>
        ))}
      </TickerWrapper>
    </>
  );
}
