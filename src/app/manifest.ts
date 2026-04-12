import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "intheGno — Stay Grounded",
    short_name: "intheGno",
    description:
      "Tools for the spiritually autonomous. Copper, orgone, EMF protection, and apparel for those who question everything.",
    start_url: "/",
    display: "standalone",
    background_color: "hsl(40, 30%, 94%)",   // --color-vellum
    theme_color: "hsl(25, 75%, 47%)",         // --color-copper
    orientation: "portrait-primary",
    categories: ["shopping", "education", "lifestyle"],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
