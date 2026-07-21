"use client";

import { useEffect, useState, RefObject } from "react";

export function useChapterProgress(ref: RefObject<HTMLElement | null>) {
    const [progress, setProgress] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalDistance = windowHeight + rect.height;
            const scrolled = windowHeight - rect.top;
            const p = scrolled / totalDistance;
            const clamped = Math.max(0, Math.min(1, p));
            setProgress(clamped);
            setIsActive(rect.top < windowHeight && rect.bottom > 0);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [ref]);

    return { progress, isActive };
}