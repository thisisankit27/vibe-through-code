import Container from "@/components/layout/container";
import { Code2, BrainCircuit, Share2 } from "lucide-react";

const cards = [
    {
        title: "Build",
        description: (
            <>
                Real software.
                <br />
                Real projects.
            </>
        ),
        icon: Code2,
    },
    {
        title: "Learn",
        description: (
            <>
                Backend.
                <br />
                Architecture.
                <br />
                Responsible AI.
            </>
        ),
        icon: BrainCircuit,
    },
    {
        title: "Share",
        description: (
            <>
                Everything happens live.
                <br />
                Every step is public.
            </>
        ),
        icon: Share2,
    },
];

export default function Mission() {
    return (
        <section className="py-24">
            <Container>

                <div className="mb-16 text-center">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">
                        Mission
                    </p>

                    <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                        Build. Learn. Share.
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
                        Everything created throughout this journey follows three simple
                        principles.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {cards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="rounded-2xl border border-white/10 bg-zinc-950 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40"
                            >
                                <Icon className="mb-6 h-8 w-8 text-emerald-400" />

                                <h3 className="text-2xl font-semibold">
                                    {card.title}
                                </h3>

                                <div className="my-6 h-px w-full bg-white/10" />

                                <p className="leading-8 text-zinc-400">
                                    {card.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </Container>
        </section>
    );
}