/* ═══════════════════════════════════════════════════════════════════
   Price Formatting Utilities
   Shopify returns prices as string amounts with currency codes.
   ═══════════════════════════════════════════════════════════════════ */

type MoneyV2 = {
  amount: string;
  currencyCode: string;
};

/**
 * Format a Shopify MoneyV2 object into a localized currency string.
 *
 * @example
 * ```ts
 * formatPrice({ amount: "29.99", currencyCode: "USD" })
 * // → "$29.99"
 * ```
 */
export function formatPrice(money: MoneyV2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
    minimumFractionDigits: 2,
  }).format(parseFloat(money.amount));
}

/**
 * Check if a product has a compare-at (sale) price.
 */
export function isOnSale(price: MoneyV2, compareAtPrice?: MoneyV2): boolean {
  if (!compareAtPrice) return false;
  return parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
}

/**
 * Calculate the discount percentage between price and compare-at price.
 */
export function getDiscountPercentage(
  price: MoneyV2,
  compareAtPrice: MoneyV2
): number {
  const original = parseFloat(compareAtPrice.amount);
  const current = parseFloat(price.amount);
  if (original <= 0) return 0;
  return Math.round(((original - current) / original) * 100);
}
