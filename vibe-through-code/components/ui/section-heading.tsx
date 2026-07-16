interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    centered?: boolean;
}

export default function SectionHeading({
    eyebrow,
    title,
    description,
    centered = true,
}: SectionHeadingProps) {
    return (
        <div className={centered ? "text-center" : "text-left"}>
            {eyebrow && (
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">
                    {eyebrow}
                </p>
            )}

            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                {title}
            </h2>

            {description && (
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
                    {description}
                </p>
            )}
        </div>
    );
}