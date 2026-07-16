import Image from "next/image";
import Link from "next/link";

import Container from "@/components/layout/container";
import StatusBadge from "@/components/ui/status-badge";
import SectionHeading from "@/components/ui/section-heading";

import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
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
                    title="Building to $1,000,000"
                    description="One Livestream. One Commit. One Project at a Time."
                />

                <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                    <Link
                        href="https://youtube.com/@VibeThroughCode"
                        target="_blank"
                        className="inline-flex items-center justify-center rounded-md bg-emerald-500 px-6 py-3 font-medium text-black transition hover:bg-emerald-400"
                    >
                        <Play className="mr-2 h-5 w-5 fill-current" />
                        Watch Live
                    </Link>

                    <Link
                        href="https://github.com/thisisankit27/vibe-through-code"
                        target="_blank"
                        className="inline-flex items-center justify-center rounded-md border border-white/15 px-6 py-3 font-medium text-white transition hover:border-emerald-500 hover:text-emerald-400"
                    >
                        <ArrowRight className="mr-2 h-5 w-5" />
                        View GitHub
                    </Link>
                </div>

                <div className="mt-20 rounded-xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur">

                    <p className="text-sm uppercase tracking-wider text-zinc-500">
                        Currently Building
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                        Vibe Through Code Platform
                    </h2>

                    <p className="mt-2 text-zinc-400">
                        Day 4 · PR-2 · Landing Page
                    </p>

                </div>

            </Container>
        </section>
    );
}