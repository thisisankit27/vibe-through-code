"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
    const mq = window.matchMedia(QUERY);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
    return window.matchMedia(QUERY).matches;
}

/**
 * Whether the visitor has asked for reduced motion.
 *
 * `globals.css` already handles the CSS side globally, and that covers
 * most of the site. This hook exists for the two cases CSS cannot reach:
 *
 *   1. Animation interpolated in JS from a number, where there is no
 *      transition for a media query to shorten (the support capsules).
 *   2. SMIL — `<animate>` elements inside SVG are not styleable, so the
 *      global `animation-duration: 0.01ms` rule does nothing to them.
 *
 * `useSyncExternalStore` rather than `useEffect` + `useState`: it reads
 * the media query without a cascading render on mount, and it tracks
 * changes if the visitor flips the setting mid-session. The server
 * snapshot is `false` so markup renders in its animated form and the
 * client corrects on hydration — the safe direction, since a static
 * first paint that starts moving is worse than the reverse.
 */
export function useReducedMotion(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
