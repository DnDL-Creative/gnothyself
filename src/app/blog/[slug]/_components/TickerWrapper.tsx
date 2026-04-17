"use client";

import { useRef, useEffect, type ReactNode } from "react";
import styles from "./TickerWrapper.module.css";

interface TickerWrapperProps {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  isPlaying: boolean;
}

export default function TickerWrapper({ children, speed = 0.5, reverse = false, isPlaying }: TickerWrapperProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const playingRef = useRef(isPlaying);
  const hoveredRef = useRef(false);

  useEffect(() => {
    playingRef.current = isPlaying;
    if (!isPlaying && scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [isPlaying]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Wait a frame for children to render, then measure
    requestAnimationFrame(() => {
      // Half the scrollWidth is one copy of the content
      const halfWidth = el.scrollWidth / 2;
      if (reverse) {
        el.scrollLeft = halfWidth;
      }
    });
  }, [reverse]);

  useEffect(() => {
    const tick = () => {
      const el = scrollRef.current;
      if (el && playingRef.current && !hoveredRef.current) {
        // Half the total scrollWidth = width of one content set
        const halfWidth = el.scrollWidth / 2;

        if (reverse) {
          el.scrollLeft -= speed;
          // When we've scrolled past the beginning of the duplicate, jump forward
          if (el.scrollLeft <= 0) {
            el.scrollLeft += halfWidth;
          }
        } else {
          el.scrollLeft += speed;
          // When we've scrolled past the first copy, jump back
          if (el.scrollLeft >= halfWidth) {
            el.scrollLeft -= halfWidth;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, reverse]);

  return (
    <div
      ref={scrollRef}
      className={`${styles.ticker} ${isPlaying ? styles.tickerPlaying : styles.tickerPaused}`}
      onMouseEnter={() => { hoveredRef.current = true; }}
      onMouseLeave={() => { hoveredRef.current = false; }}
      onTouchStart={() => { hoveredRef.current = true; }}
      onTouchEnd={() => { hoveredRef.current = false; }}
    >
      {/* Duplicate only when auto-scrolling for seamless loop */}
      {children}
      {isPlaying && children}
    </div>
  );
}
