"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { THEME_STORAGE_KEY, type ThemeName } from "./theme-script";

/**
 * Switches between the two designed themes.
 *
 * Reads the class the inline script already applied rather than keeping
 * its own source of truth, so there is no second opinion about what is
 * currently rendered and no hydration mismatch.
 */
export function ThemeToggle() {
    const [theme, setTheme] = useState<ThemeName | null>(null);

    useEffect(() => {
        setTheme(
            document.documentElement.classList.contains("theme-dark")
                ? "dark"
                : "paper"
        );
    }, []);

    const toggle = () => {
        const next: ThemeName = theme === "dark" ? "paper" : "dark";
        const el = document.documentElement;

        el.classList.remove("theme-paper", "theme-dark");
        el.classList.add(`theme-${next}`);

        try {
            localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
            // Private mode or storage disabled — the toggle still works
            // for this session, it just won't be remembered.
        }

        setTheme(next);
    };

    // Renders server-side assuming paper (the default ground) so the
    // control exists before JS loads, then corrects itself once the
    // effect reads the class the inline script actually applied.
    // suppressHydrationWarning covers the one-frame mismatch for a
    // visitor whose stored choice is dark.
    const goingDark = theme !== "dark";

    return (
        <button
            type="button"
            onClick={toggle}
            suppressHydrationWarning
            aria-label={goingDark ? "Switch to dark theme" : "Switch to paper theme"}
            title={goingDark ? "Lights off" : "Lights on"}
            className="flex h-9 w-9 items-center justify-center rounded-md text-ink-tertiary transition-colors duration-100 ease-out hover:bg-surface-hover hover:text-ink-primary"
        >
            {goingDark ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
        </button>
    );
}
