/**
 * The one action on /about.
 *
 * Was two buttons of equal weight, the second of which — "Get in touch" —
 * was `href="#"`. No email address, contact form, or inbox exists anywhere
 * in the codebase, so it went nowhere and had always gone nowhere.
 * MIGRATION-CHECKLIST.md marked it fixed; it was not.
 *
 * Removed rather than pointed somewhere plausible. A site whose premise is
 * that everything on it is verifiable cannot ship a button that pretends
 * to have a destination. When a real address exists, it comes back as a
 * `mailto:` and this comment goes away.
 *
 * That leaves exactly one filled button, which is also what the design
 * rules ask for.
 */
export function ContributionCTA() {
    return (
        <section className="rounded-md border border-rule-standard bg-surface-raised p-6 md:p-8">
            <h2 className="text-section font-bold tracking-tight text-ink-primary">
                Become part of the journey.
            </h2>

            <p className="mt-3 max-w-2xl text-meta text-ink-secondary">
                This is a public build. The repository is open, the issues are
                open, and every change ships through a pull request you can
                read.
            </p>

            <a
                href="https://github.com/thisisankit27/vibe-through-code"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-meta font-medium text-ink-on-accent transition-colors duration-100 ease-out hover:bg-accent/90"
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                Contribute on GitHub
            </a>
        </section>
    );
}
