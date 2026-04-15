"use client";

import { useState, useCallback } from "react";

interface CarouselWidgetProps {
  images: string[];
  caption?: string;
}

export default function CarouselWidget({ images, caption }: CarouselWidgetProps) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const next = useCallback(() => setCurrent((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + total) % total), [total]);

  if (total === 0) return null;

  return (
    <figure style={{ margin: "2.5rem 0", padding: 0, position: "relative" }}>
      {/* ── STACKED CARD CONTAINER ────────────────── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 10",
          margin: "0 auto",
        }}
      >
        {/* Background offset cards for stack effect */}
        {total > 1 && (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "12px",
                border: "1px solid var(--pipe-color, rgba(0,0,0,0.12))",
                background: "var(--bg-alt, rgba(0,0,0,0.03))",
                transform: "rotate(2.5deg) scale(0.96)",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "12px",
                border: "1px solid var(--pipe-color, rgba(0,0,0,0.12))",
                background: "var(--bg-alt, rgba(0,0,0,0.03))",
                transform: "rotate(-1.5deg) scale(0.98)",
                zIndex: 1,
              }}
            />
          </>
        )}

        {/* Main visible slide */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid var(--pipe-color, rgba(0,0,0,0.15))",
            background: "var(--bg-alt, #f5f5f0)",
          }}
        >
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={caption || `Slide ${i + 1}`}
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: i === current ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
            />
          ))}
        </div>

        {/* ── CHEVRON BUTTONS ─────────────────────── */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid var(--pipe-color, rgba(0,0,0,0.2))",
                background: "rgba(0, 0, 0, 0.45)",
                backdropFilter: "blur(8px)",
                color: "#fff",
                fontSize: "1.25rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid var(--pipe-color, rgba(0,0,0,0.2))",
                background: "rgba(0, 0, 0, 0.45)",
                backdropFilter: "blur(8px)",
                color: "#fff",
                fontSize: "1.25rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* ── DOTS ──────────────────────────────────── */}
      {total > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "12px",
          }}
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? "20px" : "8px",
                height: "8px",
                borderRadius: "4px",
                border: "none",
                background: i === current
                  ? "var(--text-primary, #1a1a1a)"
                  : "var(--pipe-color, rgba(0,0,0,0.2))",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* ── CAPTION ───────────────────────────────── */}
      {caption && (
        <figcaption
          style={{
            textAlign: "center",
            fontStyle: "italic",
            fontSize: "0.85rem",
            opacity: 0.6,
            marginTop: "8px",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
