// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import TechnicolorPlayer from "./TechnicolorPlayer";

/**
 * AudioHydrator — intheGno
 * Scans the blog body for `[data-audio-hydrate]` placeholder divs
 * and mounts a TechnicolorPlayer into each one.
 */
export default function AudioHydrator() {
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;

    const placeholders = document.querySelectorAll("[data-audio-hydrate]");
    placeholders.forEach((el) => {
      const src = el.getAttribute("data-audio-src");
      if (!src) return;

      // Clear any existing content
      el.innerHTML = "";

      // Mount TechnicolorPlayer into the placeholder
      const root = createRoot(el);
      root.render(<TechnicolorPlayer url={src} />);
    });
  }, []);

  return null;
}
