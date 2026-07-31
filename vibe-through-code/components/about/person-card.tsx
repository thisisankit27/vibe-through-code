import type { Person } from "@/types/person";
import { cn } from "@/lib/utils";

/**
 * One person on /about.
 *
 * The second and last place a card is correct (DESIGN.md: "a project, a
 * person. That is the complete list").
 *
 * Left-aligned, not centred. Centred composition reads as presentation;
 * this is a record of who is building the thing, so it reads as an entry.
 *
 * A Server Component — it carried `"use client"` while containing no hook
 * and no event handler, so its markup shipped to the browser twice.
 *
 * The founder badge read "Youtube Face" until 2026-07-31, having been
 * marked fixed in MIGRATION-CHECKLIST.md without being fixed. It is now
 * a marker beside the name; `person.role` still renders the real role
 * from the record rather than being replaced by the badge.
 */
interface PersonCardProps {
    person: Person;
    featured?: boolean;
}

interface SocialLink {
    href: string;
    label: string;
    /** 24×24 viewBox path data, stroked with currentColor. */
    paths: string[];
}

export function PersonCard({ person, featured = false }: PersonCardProps) {
    // Built from the record so that a person with no links renders no
    // link row at all, rather than an empty bordered container.
    const links: SocialLink[] = (
        [
            person.github && {
                href: person.github,
                label: `${person.name} on GitHub`,
                paths: [
                    "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
                    "M9 18c-4.51 2-5-2-7-2",
                ],
            },
            // Read from the `people` table and mapped in app/about/page.tsx,
            // but rendered nowhere until now — a column loaded on every
            // request and silently discarded.
            person.linkedin && {
                href: person.linkedin,
                label: `${person.name} on LinkedIn`,
                paths: [
                    "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z",
                    "M2 9h4v12H2z",
                    "M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z",
                ],
            },
            person.website && {
                href: person.website,
                label: `${person.name}'s website`,
                paths: [
                    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
                    "M2 12h20",
                    "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
                ],
            },
        ] as (SocialLink | undefined | "" | false)[]
    ).filter(Boolean) as SocialLink[];

    return (
        <article className="flex h-full flex-col rounded-md border border-rule-standard bg-surface-raised p-6">
            <header className="flex items-center gap-4">
                <div
                    className={cn(
                        "shrink-0 overflow-hidden rounded-full border border-rule-standard bg-surface-hover",
                        featured ? "h-16 w-16" : "h-12 w-12"
                    )}
                >
                    {person.avatar ? (
                        // Remote avatars, and next/image would need an
                        // `images.remotePatterns` entry in next.config.ts —
                        // which is still untouched boilerplate. Revisit
                        // when that file is configured.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={person.avatar}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-section font-bold text-ink-tertiary">
                            {person.name.charAt(0)}
                        </div>
                    )}
                </div>

                <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3
                            className={cn(
                                "font-bold tracking-tight text-ink-primary",
                                featured ? "text-section" : "text-body"
                            )}
                        >
                            {person.name}
                        </h3>

                        {person.isFounder && (
                            <span className="text-micro font-medium uppercase tracking-wider text-accent">
                                Founder
                            </span>
                        )}
                    </div>

                    {person.role && (
                        <p className="mt-1 text-meta text-ink-secondary">
                            {person.role}
                        </p>
                    )}
                </div>
            </header>

            {person.bio && (
                <p className="mt-5 flex-1 text-meta text-ink-secondary">
                    {person.bio}
                </p>
            )}

            {links.length > 0 && (
                <div className="mt-6 flex items-center gap-2 border-t border-rule-hairline pt-5">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="rounded-sm border border-rule-hairline p-2 text-ink-secondary transition-colors duration-100 ease-out hover:border-rule-standard hover:text-accent"
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
                                {link.paths.map((d) => (
                                    <path key={d} d={d} />
                                ))}
                            </svg>
                        </a>
                    ))}
                </div>
            )}
        </article>
    );
}
