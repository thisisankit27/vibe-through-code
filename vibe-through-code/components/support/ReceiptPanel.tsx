"use client";

import { cn } from "@/lib/utils";

interface ReceiptPanelProps {
    isOpen: boolean;
    onClose: () => void;
    tier: {
        title: string;
        price: number;
        currency: string;
        frequency?: string;
    } | null;
}

export function ReceiptPanel({ isOpen, onClose, tier }: ReceiptPanelProps) {
    if (!tier) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                )}
                onClick={onClose}
            />
            {/* Panel */}
            <div
                className={cn(
                    "fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-white/10 bg-[#0A0A0A] p-8 shadow-2xl transition-transform duration-300",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded p-2 text-neutral-500 transition-colors hover:text-white"
                    aria-label="Close"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

                <div className="mt-8 font-mono">
                    <p className="text-[10px] uppercase tracking-wider text-neutral-600">
                        VIBE THROUGH CODE
                    </p>
                    <p className="mt-1 text-[10px] text-neutral-600">
                        {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </p>
                    <div className="my-6 border-t border-dashed border-white/10" />
                    <p className="text-xs text-neutral-500">SELECTED SUPPORT</p>
                    <p className="mt-1 text-lg font-bold text-white">{tier.title}</p>
                    <div className="my-6 border-t border-dashed border-white/10" />
                    <div className="flex justify-between text-sm">
                        <span className="text-neutral-400">Amount</span>
                        <span className="text-white">
                            {tier.currency}{tier.price}
                            {tier.frequency && <span className="text-neutral-500">{tier.frequency}</span>}
                        </span>
                    </div>
                    <div className="my-6 border-t border-dashed border-white/10" />
                    <div className="rounded border border-emerald-500/20 bg-emerald-500/5 p-4">
                        <p className="text-xs text-emerald-400">Status</p>
                        <p className="mt-1 text-sm text-neutral-300">
                            Payment integration coming soon.
                        </p>
                        <p className="mt-2 text-[10px] text-neutral-500">
                            This receipt is a placeholder. Real checkout will be wired here.
                        </p>
                    </div>
                    <div className="my-6 border-t border-dashed border-white/10" />
                    <p className="text-center text-[10px] text-neutral-600">
                        Thank you for keeping the journey moving.
                    </p>
                </div>
            </div>
        </>
    );
}