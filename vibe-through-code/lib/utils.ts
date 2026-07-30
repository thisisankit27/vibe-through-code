import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Normalises a value from a Postgres `DATE` column to `YYYY-MM-DD`.
 *
 * The driver hands back a JS `Date` set to LOCAL midnight, so `toISOString()`
 * converts to UTC and moves it back a day in every timezone east of it — in
 * Asia/Calcutta that rendered 2026-07-29 as "2026-07-28". Reading the local
 * components instead keeps the calendar day the database actually stores.
 *
 * Lives here rather than beside either caller because both the public record
 * (`lib/journey.ts`) and the admin form need the identical conversion, and a
 * second implementation is a second chance to reintroduce the shift.
 *
 * Returns "" for anything unparseable — a date field is better blank than
 * filled with `[object Object]`.
 */
export function toISODateString(value: unknown): string {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return "";

    const y = String(value.getFullYear()).padStart(4, "0");
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  if (typeof value === "string") return value.slice(0, 10);
  return "";
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