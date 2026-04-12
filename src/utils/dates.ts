/* ═══════════════════════════════════════════════════════════════════
   Date Utilities
   Formatting helpers for Codex articles and product timestamps.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Format an ISO date string into a human-readable form.
 * @example formatDate("2026-04-10T12:00:00Z") → "April 10, 2026"
 */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

/**
 * Format a date into a short form (e.g., "Apr 10, 2026").
 */
export function formatDateShort(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

/**
 * Get a relative time string (e.g., "3 days ago", "just now").
 */
export function getRelativeTime(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;

  return formatDateShort(dateString);
}
