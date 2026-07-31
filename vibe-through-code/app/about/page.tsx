import Container from "@/components/layout/container";
import { PersonCard, ContributionCTA } from "@/components/about";
import { sql } from "@/lib/db";
import type { Person } from "@/types/person";

export const dynamic = "force-dynamic";

/**
 * Who is building this.
 *
 * Same header grammar as /projects and the homepage. The "Contributors"
 * divider is the ruled section label used on the homepage, not a second
 * centred eyebrow — one heading style per site.
 */
export default async function AboutPage() {
    const rows = await sql`
        SELECT * FROM people ORDER BY is_founder DESC, name ASC
    `;

    const people: Person[] = rows.map((row: Record<string, unknown>) => ({
        id: String(row.id),
        name: String(row.name),
        role: String(row.role ?? ""),
        bio: String(row.bio ?? ""),
        avatar: (row.avatar as string) ?? "",
        github: (row.github as string) ?? undefined,
        linkedin: (row.linkedin as string) ?? undefined,
        website: (row.website as string) ?? undefined,
        isFounder: Boolean(row.is_founder),
    }));

    const founder = people.find((p) => p.isFounder);
    const contributors = people.filter((p) => !p.isFounder);

    return (
        <Container className="max-w-5xl pb-24 pt-14 md:pb-32 md:pt-20">
            <header className="max-w-2xl">
                <h1 className="text-title font-bold tracking-tight text-ink-primary">
                    About
                </h1>
                <p className="mt-5 text-body text-ink-secondary">
                    One engineer, building a software company in public. Every
                    project is developed live on stream.
                </p>
            </header>

            {founder ? (
                <div className="mt-12 max-w-2xl">
                    <PersonCard person={founder} featured />
                </div>
            ) : (
                /* The page previously rendered nothing at all here when no
                   row carried is_founder — silently, so a wiped column
                   looked like a design choice. */
                <p className="mt-12 border-t border-rule-strong pt-6 text-meta text-ink-tertiary">
                    No founder recorded.
                </p>
            )}

            {contributors.length > 0 && (
                <section aria-label="Contributors" className="mt-16">
                    <h2 className="border-b border-rule-strong pb-2 text-micro font-medium uppercase tracking-wider text-ink-tertiary">
                        Contributors
                    </h2>

                    <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {contributors.map((person) => (
                            <PersonCard key={person.id} person={person} />
                        ))}
                    </div>
                </section>
            )}

            <div className="mt-16">
                <ContributionCTA />
            </div>
        </Container>
    );
}
