/* ═══════════════════════════════════════════════════════════════════
   Shopify Storefront API Client
   Server-side only — access token never exposed to browser.
   ═══════════════════════════════════════════════════════════════════ */

import { SHOPIFY_API_VERSION, SHOPIFY_STOREFRONT_ENDPOINT } from "./constants";

type ShopifyFetchOptions = {
  query: string;
  variables?: Record<string, unknown>;
  /** Override the default cache strategy */
  cache?: RequestCache;
  /** ISR revalidation interval in seconds */
  revalidate?: number;
};

type ShopifyResponse<T> = {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
    extensions?: Record<string, unknown>;
  }>;
};

/**
 * Execute a GraphQL query against the Shopify Storefront API.
 *
 * This function is designed for use in Server Components and API routes.
 * It automatically injects the access token and targets the configured
 * API version.
 *
 * @example
 * ```ts
 * const { products } = await shopifyFetch<{ products: ProductConnection }>({
 *   query: GET_ALL_PRODUCTS,
 *   variables: { first: 12 },
 * });
 * ```
 */
export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  revalidate,
}: ShopifyFetchOptions): Promise<T> {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!token) {
    throw new Error(
      "[GnoThyself] Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN environment variable."
    );
  }

  const fetchOptions: RequestInit & { next?: { revalidate?: number } } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  };

  // If revalidate is specified, use ISR-style caching
  if (revalidate !== undefined) {
    fetchOptions.next = { revalidate };
    // When using `next.revalidate`, we shouldn't set `cache`
    delete fetchOptions.cache;
  }

  const response = await fetch(SHOPIFY_STOREFRONT_ENDPOINT, fetchOptions);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `[GnoThyself] Shopify Storefront API returned ${response.status}: ${body}`
    );
  }

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    const messages = json.errors.map((e) => e.message).join("\n");
    throw new Error(`[GnoThyself] Shopify GraphQL errors:\n${messages}`);
  }

  return json.data;
}

/**
 * Shopify image URL optimization helper.
 * Appends width/height/crop params to Shopify CDN URLs.
 */
export function getShopifyImageUrl(
  src: string,
  options?: { width?: number; height?: number; crop?: "center" | "top" | "bottom" }
): string {
  if (!src) return "";

  const url = new URL(src);
  if (options?.width) url.searchParams.set("width", String(options.width));
  if (options?.height) url.searchParams.set("height", String(options.height));
  if (options?.crop) url.searchParams.set("crop", options.crop);

  return url.toString();
}
