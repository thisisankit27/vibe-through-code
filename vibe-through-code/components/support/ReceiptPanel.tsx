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
                    "fixed inset-0 z-40 bg-scrim backdrop-blur-sm transition-opacity duration-300",
                    isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                )}
                onClick={onClose}
            />
            {/* Panel */}
            <div
                className={cn(
                    "fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-rule-standard bg-surface-base p-8 shadow-2xl transition-transform duration-300",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded p-2 text-ink-tertiary transition-colors hover:text-ink-primary"
                    aria-label="Close"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

                <div className="mt-8 font-mono">
                    <p className="text-[10px] uppercase tracking-wider text-ink-tertiary">
                        VIBE THROUGH CODE
                    </p>
                    <p className="mt-1 text-[10px] text-ink-tertiary">
                        {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </p>
                    <div className="my-6 border-t border-dashed border-rule-standard" />
                    <p className="text-xs text-ink-tertiary">SELECTED SUPPORT</p>
                    <p className="mt-1 text-lg font-bold text-ink-primary">{tier.title}</p>
                    <div className="my-6 border-t border-dashed border-rule-standard" />
                    <div className="flex justify-between text-sm">
                        <span className="text-ink-secondary">Amount</span>
                        <span className="text-ink-primary">
                            {tier.currency}{tier.price}
                            {tier.frequency && <span className="text-ink-tertiary">{tier.frequency}</span>}
                        </span>
                    </div>
                    <div className="my-6 border-t border-dashed border-rule-standard" />
                    <div className="rounded border border-accent/20 bg-accent/5 p-4">
                        <p className="text-xs text-accent">Status</p>
                        <p className="mt-1 text-sm text-ink-secondary">
                            Not charged. Checkout is not wired yet.
                        </p>
                        <p className="mt-2 text-[10px] text-ink-tertiary">
                            This receipt records an intent, not a payment.
                        </p>
                    </div>
                    <div className="my-6 border-t border-dashed border-rule-standard" />
                    <p className="text-center text-[10px] text-ink-tertiary">
                        Thank you for keeping the journey moving.
                    </p>
                </div>
            </div>
        </>
    );
}