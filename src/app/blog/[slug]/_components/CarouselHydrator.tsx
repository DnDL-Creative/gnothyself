"use client";

import { useEffect } from "react";

/**
 * CineSonic-style carousel hydrator.
 * Manages active slide classes for the fanned card deck layout.
 */
export default function CarouselHydrator() {
  useEffect(() => {
    const carousels = document.querySelectorAll(".itg-media-carousel");

    carousels.forEach((carousel) => {
      const slides = Array.from(carousel.querySelectorAll(".itg-carousel-slide"));
      const dots = Array.from(carousel.querySelectorAll(".itg-carousel-dot"));
      const prevBtn = carousel.querySelector(".itg-carousel-prev");
      const nextBtn = carousel.querySelector(".itg-carousel-next");

      if (slides.length === 0) return;

      let activeIndex = 0;

      const updateDeck = () => {
        slides.forEach((slide, i) => {
          const el = slide as HTMLElement;
          // Clear all position classes
          el.classList.remove(
            "itg-slide-active",
            "itg-slide-prev",
            "itg-slide-next",
            "itg-slide-far-prev",
            "itg-slide-far-next"
          );

          const offset = i - activeIndex;
          if (offset === 0) el.classList.add("itg-slide-active");
          else if (offset === -1) el.classList.add("itg-slide-prev");
          else if (offset === 1) el.classList.add("itg-slide-next");
          else if (offset < -1) el.classList.add("itg-slide-far-prev");
          else if (offset > 1) el.classList.add("itg-slide-far-next");
        });

        dots.forEach((dot, i) => {
          const el = dot as HTMLElement;
          if (i === activeIndex) {
            el.classList.add("itg-dot-active");
          } else {
            el.classList.remove("itg-dot-active");
          }
        });
      };

      const goTo = (index: number) => {
        activeIndex = Math.max(0, Math.min(slides.length - 1, index));
        updateDeck();
      };

      prevBtn?.addEventListener("click", () => goTo(activeIndex - 1));
      nextBtn?.addEventListener("click", () => goTo(activeIndex + 1));

      dots.forEach((dot, i) => {
        (dot as HTMLElement).style.cursor = "pointer";
        dot.addEventListener("click", () => goTo(i));
      });

      // Init
      updateDeck();
    });
  }, []);

  return null;
}
