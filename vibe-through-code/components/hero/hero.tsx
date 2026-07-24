import Image from "next/image";
import Link from "next/link";

import Container from "@/components/layout/container";
import StatusBadge from "@/components/ui/status-badge";
import SectionHeading from "@/components/ui/section-heading";
import CurrentProject from "@/components/project/current-project";

import { site } from "@/data/site";
import type { Project } from "@/types/project";
import type { LatestStream } from "@/lib/streams";
import { ArrowRight, Play } from "lucide-react";

interface HeroProps {
    project: Project;
    latestStream: LatestStream;
}

export default function Hero({
    project,
    latestStream,
}: HeroProps) {
    return (
        <section className="relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-emerald-500/10 blur-3xl" />

            <Container className="flex min-h-[90vh] flex-col items-center justify-center text-center">

                <Image
                    src="/logo.png"
                    alt="Vibe Through Code"
                    width={140}
                    height={140}
                    priority
                    className="mb-10"
                />

                <StatusBadge label="Building in Public" />

                <SectionHeading
                    title={site.tagline}
                    description={site.hero.title}
                />

                <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                    <Link
                        href={site.links.youtube}
                        target="_blank"
                        className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-6 py-3 font-medium text-black transition hover:bg-emerald-400"
                    >
                        <Play className="mr-2 h-5 w-5 fill-current" />
                        Watch Live
                    </Link>

                    <Link
                        href={site.links.github}
                        target="_blank"
                        className="inline-flex items-center justify-center rounded-md border border-white/15 px-6 py-3 font-medium text-white transition hover:border-emerald-500 hover:text-emerald-400"
                    >
                        <ArrowRight className="mr-2 h-5 w-5" />
                        View GitHub
                    </Link>
                </div>

                <CurrentProject
                    project={project}
                    latestStream={latestStream}
                />

            </Container>
        </section>
    );
}