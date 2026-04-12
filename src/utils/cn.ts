/* ═══════════════════════════════════════════════════════════════════
   cn — Conditional Classname Utility
   Merges class strings, filtering out falsy values.
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Merge multiple class strings, filtering out undefined/null/false values.
 * Used for combining CSS module classes with optional conditional classes.
 *
 * @example
 * ```tsx
 * import styles from './Button.module.css';
 * import { cn } from '@/utils/cn';
 *
 * <button className={cn(styles.button, isActive && styles.active, className)}>
 * ```
 */
export function cn(
  ...inputs: Array<string | undefined | null | false>
): string {
  return inputs.filter(Boolean).join(" ");
}
