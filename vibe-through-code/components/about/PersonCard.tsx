"use client";

import { Person } from "@/data/people";
import { cn } from "@/lib/utils";

interface PersonCardProps {
    person: Person;
    featured?: boolean;
}

export function PersonCard({ person, featured = false }: PersonCardProps) {
    return (
        <article
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-6 transition-all duration-300",
                "hover:-translate-y-1 hover:border-emerald-500/40",
                featured && "md:p-8"
            )}
        >
            {/* Emerald glow */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-emerald-500/15 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Avatar */}
                <div
                    className={cn(
                        "relative overflow-hidden rounded-full border-2 border-white/10 bg-neutral-800",
                        featured ? "h-24 w-24 md:h-28 md:w-28" : "h-20 w-20"
                    )}
                >
                    {person.avatar ? (
                        <img
                            src={person.avatar}
                            alt={person.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-neutral-600">
                            {person.name.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Founder badge */}
                {person.isFounder && (
                    <span className="mt-4 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                        Youtube Face
                    </span>
                )}

                {/* Name */}
                <h3
                    className={cn(
                        "mt-4 font-bold tracking-tight text-white",
                        featured ? "text-2xl md:text-3xl" : "text-xl"
                    )}
                >
                    {person.name}
                </h3>

                {/* Role */}
                <p className="mt-1 text-sm text-emerald-400">{person.role}</p>

                {/* Bio */}
                <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                    {person.bio}
                </p>

                {/* Social links */}
                <div className="mt-6 flex items-center gap-3">
                    {person.github && (
                        <a
                            href={person.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-neutral-400 transition-colors hover:border-white/10 hover:text-white"
                            aria-label="GitHub"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                        </a>
                    )}
                    {/* {person.linkedin && (
                        <a
                            href={person.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-neutral-400 transition-colors hover:border-white/10 hover:text-white"
                            aria-label="LinkedIn"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
                            </svg>
                        </a>
                    )} */}
                    {person.website && (
                        <a
                            href={person.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5 text-neutral-400 transition-colors hover:border-white/10 hover:text-white"
                            aria-label="Website"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}