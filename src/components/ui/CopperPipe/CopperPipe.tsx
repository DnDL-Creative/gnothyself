"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./CopperPipe.module.css";

/**
 * CopperPipe — Ambient background thread.
 *
 * A single thin copper pipe runs vertically through the page,
 * subtly bending around content sections. A faint copper glow
 * travels along it as the user scrolls.
 *
 * Like plumbing behind drywall. Barely there.
 */
export function CopperPipe() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const [pageHeight, setPageHeight] = useState(0);

  // Generate a subtle S-curve pipe path based on page height
  const generatePipePath = useCallback((height: number): string => {
    if (height <= 0) return "";

    const x = 64; // base x offset from left edge
    const bendAmount = 24; // how far the pipe curves left/right
    const sectionHeight = 520; // height of each S-curve segment
    const segments = Math.ceil(height / sectionHeight);

    let d = `M ${x} 0`;

    for (let i = 0; i < segments; i++) {
      const y0 = i * sectionHeight;
      const y1 = y0 + sectionHeight * 0.25;
      const y2 = y0 + sectionHeight * 0.5;
      const y3 = y0 + sectionHeight * 0.75;
      const y4 = Math.min(y0 + sectionHeight, height);

      // Alternate bend direction
      const dir = i % 2 === 0 ? 1 : -1;
      const cx1 = x + bendAmount * dir;
      const cx2 = x - bendAmount * dir;

      // Gentle S-curve using quadratic bezier
      d += ` Q ${cx1} ${y1}, ${x} ${y2}`;
      d += ` Q ${cx2} ${y3}, ${x} ${y4}`;
    }

    return d;
  }, []);

  // Measure page height and regenerate path
  useEffect(() => {
    const measure = () => {
      const h = document.documentElement.scrollHeight;
      setPageHeight(h);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    return () => observer.disconnect();
  }, []);

  // Scroll-linked glow position
  useEffect(() => {
    const path = pathRef.current;
    const glow = glowRef.current;
    if (!path || !glow) return;

    const totalLength = path.getTotalLength();

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      // Clamp progress
      const clampedProgress = Math.max(0, Math.min(1, progress));
      const point = path.getPointAtLength(clampedProgress * totalLength);

      glow.setAttribute("cx", String(point.x));
      glow.setAttribute("cy", String(point.y));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial position

    return () => window.removeEventListener("scroll", onScroll);
  }, [pageHeight]);

  if (pageHeight <= 0) return null;

  const pipePath = generatePipePath(pageHeight);

  // Generate junction points (small circles at bends)
  const sectionHeight = 520;
  const segments = Math.ceil(pageHeight / sectionHeight);
  const junctions: { x: number; y: number }[] = [];
  for (let i = 1; i < segments; i++) {
    junctions.push({ x: 64, y: i * sectionHeight });
  }

  return (
    <svg
      ref={svgRef}
      className={styles.pipe}
      width="128"
      height={pageHeight}
      viewBox={`0 0 128 ${pageHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Copper glow filter */}
        <filter id="copper-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Subtle pipe shadow */}
        <filter id="pipe-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="shadow" />
          <feOffset dx="1" dy="1" result="offsetShadow" />
          <feMerge>
            <feMergeNode in="offsetShadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* The pipe itself — thin, oxidized copper */}
      <path
        ref={pathRef}
        d={pipePath}
        fill="none"
        stroke="#B87333"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.15"
        filter="url(#pipe-shadow)"
      />

      {/* Junction points at bends — tiny copper dots */}
      {junctions.map((j, i) => (
        <circle
          key={i}
          cx={j.x}
          cy={j.y}
          r="3"
          fill="none"
          stroke="#B87333"
          strokeWidth="1"
          opacity="0.12"
        />
      ))}

      {/* The traveling glow — follows scroll position */}
      <circle
        ref={glowRef}
        cx="64"
        cy="0"
        r="4"
        fill="#B87333"
        opacity="0.35"
        filter="url(#copper-glow)"
      />
    </svg>
  );
}
