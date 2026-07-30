import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Formats an integer amount of USD cents for display.
 *
 * Whole dollars render without decimals (`$0`, `$1,240`); fractional amounts
 * render with two (`$12.50`). See VOICE.md — currency is USD sitewide, and a
 * figure is never editorialised.
 */
export function formatUsd(cents: number) {
  const safe = Number.isFinite(cents) ? cents : 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: safe % 100 === 0 ? 0 : 2,
  }).format(safe / 100);
}