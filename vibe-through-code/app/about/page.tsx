import Container from "@/components/layout/container";
import { PersonCard, ContributionCTA } from "@/components/about";
import { sql } from "@/lib/db";
import type { Person } from "@/types/person";

export default async function AboutPage() {
    const rows = await sql`SELECT * FROM people ORDER BY is_founder DESC, name ASC`;

    const people: Person[] = rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        role: row.role,
        bio: row.bio,
        avatar: row.avatar,
        github: row.github,
        linkedin: row.linkedin,
        website: row.website,
        isFounder: row.is_founder,
    }));

    const founder = people.find((p) => p.isFounder);
    const contributors = people.filter((p) => !p.isFounder);

    return (
        <Container>
            <section className="pt-14 pb-24 md:pt-20 md:pb-28">
                {/* Header */}
                <div className="mb-16 text-center">
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                        Who is building this
                    </p>
                    <h1 className="mt-3 text-5xl font-bold tracking-tight text-white">
                        About
                    </h1>
                    <p className="mt-6 text-neutral-400">
                        One engineer. One mission. Building in public.
                    </p>
                </div>

                {/* Founder — featured */}
                {founder && (
                    <div className="mx-auto max-w-lg">
                        <PersonCard person={founder} featured />
                    </div>
                )}

                {/* Contributors */}
                {contributors.length > 0 && (
                    <div className="mt-20">
                        <div className="mb-10 text-center">
                            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                                Contributors
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white">
                                Building alongside
                            </h2>
                        </div>
                        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {contributors.map((person) => (
                                <PersonCard key={person.id} person={person} />
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="mx-auto mt-20 max-w-2xl">
                    <ContributionCTA />
                </div>
            </section>
        </Container>
    );
}