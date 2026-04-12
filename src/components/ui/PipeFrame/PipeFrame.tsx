"use client";

import { useRef, useState, useLayoutEffect, useCallback, type ReactNode } from "react";
import styles from "./PipeFrame.module.css";

/* ═══════════════════════════════════════════════════════════════════
   PipeFrame — Reusable copper pipe border for any content.

   Same geometry as PipeButton: 4 straight pipes, 4 elbow fittings
   with flared collar mouths. Wraps arbitrary children.
   ═══════════════════════════════════════════════════════════════════ */

const PIPE = 2.5;
const ELBOW = 3.5;
const R = 5;
const EXT = 3.5;
const COLLAR = 2.5;
const COPPER = "#B87333";
const COPPER_DARK = "#B06A2E";

export function PipeFrame({
  children,
  className,
  bg,
}: {
  children: ReactNode;
  className?: string;
  bg?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    if (!ref.current) return;
    const w = ref.current.offsetWidth;
    const h = ref.current.offsetHeight;
    if (w > 0 && h > 0) {
      setDims({ w, h });
    } else {
      requestAnimationFrame(() => {
        if (!ref.current) return;
        setDims({
          w: ref.current.offsetWidth,
          h: ref.current.offsetHeight,
        });
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) return;
    measure();
    const obs = new ResizeObserver(measure);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [measure]);

  const { w, h } = dims;
  const pad = COLLAR + 2;

  const mouths =
    w > 0 && h > 0
      ? [
          { x: R + EXT, y: 0, dir: "v" },
          { x: 0, y: R + EXT, dir: "h" },
          { x: w - R - EXT, y: 0, dir: "v" },
          { x: w, y: R + EXT, dir: "h" },
          { x: w, y: h - R - EXT, dir: "h" },
          { x: w - R - EXT, y: h, dir: "v" },
          { x: R + EXT, y: h, dir: "v" },
          { x: 0, y: h - R - EXT, dir: "h" },
        ]
      : [];

  return (
    <div ref={ref} className={`${styles.frame} ${className ?? ""}`}>
      {w > 0 && h > 0 && (
        <svg
          className={styles.svg}
          width={w + pad * 2}
          height={h + pad * 2}
          viewBox={`${-pad} ${-pad} ${w + pad * 2} ${h + pad * 2}`}
          aria-hidden="true"
        >
          {/* Background fill — behind pipes */}
          {bg && (
            <rect
              x={-0.5} y={-0.5}
              width={w + 1} height={h + 1}
              rx={6} ry={6}
              fill={bg}
              stroke={bg}
              strokeWidth={0.5}
            />
          )}
          <line x1={R + EXT} y1={0} x2={w - R - EXT} y2={0}
            stroke={COPPER} strokeWidth={PIPE} strokeLinecap="butt" />
          <line x1={w} y1={R + EXT} x2={w} y2={h - R - EXT}
            stroke={COPPER} strokeWidth={PIPE} strokeLinecap="butt" />
          <line x1={w - R - EXT} y1={h} x2={R + EXT} y2={h}
            stroke={COPPER} strokeWidth={PIPE} strokeLinecap="butt" />
          <line x1={0} y1={h - R - EXT} x2={0} y2={R + EXT}
            stroke={COPPER} strokeWidth={PIPE} strokeLinecap="butt" />

          <path d={`M 0 ${R + EXT} L 0 ${R} A ${R} ${R} 0 0 1 ${R} 0 L ${R + EXT} 0`}
            fill="none" stroke={COPPER} strokeWidth={ELBOW} strokeLinecap="butt" strokeLinejoin="round" />
          <path d={`M ${w - R - EXT} 0 L ${w - R} 0 A ${R} ${R} 0 0 1 ${w} ${R} L ${w} ${R + EXT}`}
            fill="none" stroke={COPPER} strokeWidth={ELBOW} strokeLinecap="butt" strokeLinejoin="round" />
          <path d={`M ${w} ${h - R - EXT} L ${w} ${h - R} A ${R} ${R} 0 0 1 ${w - R} ${h} L ${w - R - EXT} ${h}`}
            fill="none" stroke={COPPER} strokeWidth={ELBOW} strokeLinecap="butt" strokeLinejoin="round" />
          <path d={`M ${R + EXT} ${h} L ${R} ${h} A ${R} ${R} 0 0 1 0 ${h - R} L 0 ${h - R - EXT}`}
            fill="none" stroke={COPPER} strokeWidth={ELBOW} strokeLinecap="butt" strokeLinejoin="round" />

          {mouths.map((m, i) => (
            <line key={i}
              x1={m.dir === "v" ? m.x : m.x - 0.5}
              y1={m.dir === "h" ? m.y : m.y - 0.5}
              x2={m.dir === "v" ? m.x : m.x + 0.5}
              y2={m.dir === "h" ? m.y : m.y + 0.5}
              stroke={COPPER_DARK} strokeWidth={COLLAR * 2} strokeLinecap="round"
            />
          ))}
        </svg>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
