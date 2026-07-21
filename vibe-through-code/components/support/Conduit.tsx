"use client";

import { cn } from "@/lib/utils";

interface ConduitProps {
    isFirst?: boolean;
    isLast?: boolean;
    progress: number;
}

export function Conduit({ isFirst = false, isLast = false, progress }: ConduitProps) {
    return (
        <div className="relative h-full w-6 md:w-10">
            {/* Rail */}
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/20" />

            {/* Emerald glow core */}
            <div
                className="absolute left-1/2 w-px -translate-x-1/2 bg-emerald-500/60 blur-[1px]"
                style={{
                    top: 0,
                    height: `${progress * 100}%`,
                    transition: "height 0.1s linear",
                }}
            />

            {/* Top junction */}
            {!isFirst && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Junction rotation={progress < 0.15 ? progress * 400 : 60} />
                </div>
            )}

            {/* Bottom junction */}
            {!isLast && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                    <Junction rotation={progress > 0.85 ? (progress - 0.85) * 400 : 0} />
                </div>
            )}
        </div>
    );
}

function Junction({ rotation }: { rotation: number }) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" className="md:h-6 md:w-6">
            <polygon
                points="10,1 18,6 18,14 10,19 2,14 2,6"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1"
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: "10px 10px",
                    transition: "transform 0.1s linear",
                }}
            />
            <polygon
                points="10,1 18,6 18,14 10,19 2,14 2,6"
                fill="rgba(0,230,118,0.1)"
                stroke="rgba(0,230,118,0.4)"
                strokeWidth="0.5"
                style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: "10px 10px",
                    transition: "transform 0.1s linear",
                }}
            />
        </svg>
    );
}