/* ═══════════════════════════════════════════════════════════════════
   Global Constants
   Single source of truth for API versions, endpoints, and config.
   ═══════════════════════════════════════════════════════════════════ */

/* ── SHOPIFY ─────────────────────────────────────────────────────── */

/** Shopify Storefront API version. Update quarterly. */
export const SHOPIFY_API_VERSION = "2026-04";

/** Shopify store domain — reads from env at build/runtime. */
export const SHOPIFY_STORE_DOMAIN =
  process.env.SHOPIFY_STORE_DOMAIN ?? process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "";

/** Fully qualified Storefront API endpoint. */
export const SHOPIFY_STOREFRONT_ENDPOINT =
  `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

/* ── SITE ────────────────────────────────────────────────────────── */

export const SITE_NAME = "intheGno";
export const SITE_DOMAIN = "beinthegno.com";
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_DESCRIPTION =
  "Alchemical tools for vessel fortification. EMF protection, esoteric wisdom, and premium consumables engineered to elevate your frequency.";

/* ── BRAND ───────────────────────────────────────────────────────── */

export const BRAND = {
  /** Product categories as defined in the brand strategy */
  categories: {
    RESONANCE_ARMOR: "Resonance Armor",
    SOMA_VITALITY: "Soma / Vitality Alchemy",
    ALCHEMICAL_CONSUMABLES: "Alchemical Consumables",
    APPAREL: "Apparel",
  },
  /** Collection handles that map to brand categories */
  collections: {
    resonanceArmor: "resonance-armor",
    somaVitality: "soma-vitality-alchemy",
    consumables: "alchemical-consumables",
    apparel: "apparel",
  },
} as const;

/* ── CACHE / ISR ─────────────────────────────────────────────────── */

/** Default ISR revalidation for product data (5 minutes). */
export const REVALIDATE_PRODUCTS = 300;

/** Default ISR revalidation for Codex articles (1 hour). */
export const REVALIDATE_CODEX = 3600;

/** Default ISR revalidation for collections (15 minutes). */
export const REVALIDATE_COLLECTIONS = 900;
