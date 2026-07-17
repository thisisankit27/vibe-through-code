import Link from "next/link";
import Container from "@/components/layout/container";

import {
    FolderKanban,
    Route,
    BookOpen,
    ArrowRight,
    Play,
    ArrowUpRight,
} from "lucide-react";

import { site } from "@/data/site";

const items = [
    {
        title: "Projects",
        description: "Every project built during the journey.",
        href: "#",
        icon: FolderKanban,
        external: false,
    },
    {
        title: "Journey",
        description: "Follow the path from $0 to $1,000,000.",
        href: "#",
        icon: Route,
        external: false,
    },
    {
        title: "Archive",
        description:
            "Engineering notes, backend, architecture and Responsible AI.",
        href: site.links.archive,
        icon: BookOpen,
        external: true,
    },
    {
        title: "GitHub",
        description: "Open source repositories.",
        href: site.links.github,
        icon: ArrowRight,
        external: true,
    },
    {
        title: "YouTube",
        description: "Daily livestreams.",
        href: site.links.youtube,
        icon: Play,
        external: true,
    },
];

export default function Explore() {
    return (
        <section className="py-24">
            <Container>
                <div className="mb-16 text-center">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">
                        Explore
                    </p>

                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Explore the Journey
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
                        Everything related to Vibe Through Code, all in one place.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
                    {items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                className="group rounded-2xl border border-white/10 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40"
                            >
                                <Icon className="mb-5 h-8 w-8 text-emerald-400" />

                                <h3 className="text-xl font-semibold">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-zinc-400">
                                    {item.description}
                                </p>

                                <div className="mt-8 flex items-center text-sm font-medium text-emerald-400">
                                    {item.href === "#" ? "Coming Soon" : "Explore"}

                                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}