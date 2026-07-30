interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    centered?: boolean;
    /**
     * Heading level. Structural, not visual — the size is fixed by the
     * design scale regardless. Every page needs exactly one `h1`.
     */
    as?: "h1" | "h2";
}

export default function SectionHeading({
    eyebrow,
    title,
    description,
    centered = true,
    as: Heading = "h2",
}: SectionHeadingProps) {
    return (
        <div className={centered ? "text-center" : "text-left"}>
            {eyebrow && (
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">
                    {eyebrow}
                </p>
            )}

            <Heading className="text-4xl font-bold tracking-tight md:text-5xl">
                {title}
            </Heading>

            {description && (
                <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-lg leading-8 text-zinc-400">
                    {description}
                </p>
            )}
        </div>
    );
}
