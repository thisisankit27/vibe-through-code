"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Milliseconds for a capsule to play from empty to full. */
const DURATION_MS = 1200;

/**
 * Drives a capsule's 0→1 animation once, when its chapter enters view.
 *
 * Replaces `useChapterProgress`, which mapped scroll position onto
 * progress. That implementation attached a scroll listener that called
 * `getBoundingClientRect()` and fired *two* `setState` calls per event,
 * across three mounted chapters — three forced reflows per tick, on the
 * site's most expensive runtime path. (It also returned an `isActive`
 * flag that nothing ever consumed.)
 *
 * Here an IntersectionObserver fires once, disconnects, and hands off to
 * a single `requestAnimationFrame` loop that stops on arrival. No scroll
 * listener, no layout read, nothing running at rest.
 *
 * The behavioural change is deliberate and is the better reading of
 * "motion reports state; it never performs": scroll-mapped progress ran
 * the animation *backwards* when you scrolled up, so a coffee cup
 * emptied itself for no reason anyone could act on. Playing forward once
 * and holding reports "you have seen this".
 *
 * Under reduced motion the animated value is bypassed entirely rather
 * than being set to 1 — deriving it means no effect runs and no state is
 * written, so there is no mount-time cascading render.
 */
export function useInViewProgress(ref: RefObject<HTMLElement | null>) {
    const [animated, setAnimated] = useState(0);
    const frame = useRef<number | null>(null);
    const reduced = useReducedMotion();

    useEffect(() => {
        const el = ref.current;
        if (!el || reduced) return;

        const play = () => {
            const start = performance.now();

            const step = (now: number) => {
                const p = Math.min(1, (now - start) / DURATION_MS);
                setAnimated(p);
                frame.current = p < 1 ? requestAnimationFrame(step) : null;
            };

            frame.current = requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((e) => e.isIntersecting)) return;
                // Once only — the capsule holds its finished state
                // afterwards, so there is nothing left to observe.
                observer.disconnect();
                play();
            },
            // Starts a little before the chapter is fully in view, so the
            // capsule is already moving by the time it is worth looking at.
            { threshold: 0.15 }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
            if (frame.current !== null) cancelAnimationFrame(frame.current);
        };
    }, [ref, reduced]);

    return { progress: reduced ? 1 : animated };
}
