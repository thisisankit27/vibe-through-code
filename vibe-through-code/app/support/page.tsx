"use client";

import { useState } from "react";
import Container from "@/components/layout/container";
import { SupportChapter, SystemTerminus, ReceiptPanel } from "@/components/support";
import { supportTiers, SupportTier } from "@/data/support";

export default function SupportPage() {
    const [selectedTier, setSelectedTier] = useState<SupportTier | null>(null);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);

    const handleSelect = (tier: SupportTier) => {
        setSelectedTier(tier);
        setIsReceiptOpen(true);
    };

    const handleClose = () => {
        setIsReceiptOpen(false);
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <Container>
                {/* Page header */}
                <div className="pt-20 pb-10 text-center md:pt-24 md:pb-14">
                    <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                        Support
                    </p>
                    <h1 className="mt-3 text-5xl font-bold tracking-tight text-white">
                        The Conduit
                    </h1>
                    <p className="mt-6 text-neutral-400">
                        Help keep the journey moving.
                    </p>
                </div>

                {/* Chapters */}
                <div className="relative">
                    {supportTiers.map((tier, index) => (
                        <SupportChapter
                            key={tier.id}
                            tier={tier}
                            index={index}
                            total={supportTiers.length}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>

                {/* Terminus */}
                <SystemTerminus />
            </Container>

            {/* Receipt panel */}
            <ReceiptPanel
                isOpen={isReceiptOpen}
                onClose={handleClose}
                tier={selectedTier}
            />
        </main>
    );
}