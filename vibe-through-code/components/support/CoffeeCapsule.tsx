"use client";

interface CoffeeCapsuleProps {
    progress: number;
}

export function CoffeeCapsule({ progress }: CoffeeCapsuleProps) {
    const fillHeight = Math.min(100, progress * 130);
    const isPouring = progress < 0.55;
    const steamOpacity = progress > 0.6 ? Math.min(1, (progress - 0.6) * 2.5) : 0;

    return (
        <div className="relative flex items-center justify-center">
            <svg width="120" height="160" viewBox="0 0 120 160" className="md:h-48 md:w-36">
                {/* Cup body */}
                <path
                    d="M30 60 L35 130 Q35 140 45 140 L75 140 Q85 140 85 130 L90 60 Z"
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                />
                {/* Cup rim highlight */}
                <path
                    d="M30 60 Q60 55 90 60"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                />
                {/* Cup handle */}
                <path
                    d="M90 75 Q110 75 110 95 Q110 115 90 115"
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                />
                {/* Liquid */}
                <defs>
                    <clipPath id="cup-clip">
                        <path d="M32 62 L36.5 128 Q36.5 138 45 138 L75 138 Q83.5 138 83.5 128 L88 62 Z" />
                    </clipPath>
                </defs>
                <rect
                    x="30"
                    y={140 - fillHeight * 0.78}
                    width="60"
                    height={fillHeight * 0.78}
                    fill="rgba(139, 90, 60, 0.9)"
                    clipPath="url(#cup-clip)"
                    style={{ transition: "y 0.1s linear, height 0.1s linear" }}
                />
                {/* Liquid surface highlight */}
                <ellipse
                    cx="60"
                    cy={140 - fillHeight * 0.78}
                    rx="26"
                    ry="3"
                    fill="rgba(160, 110, 70, 0.4)"
                    clipPath="url(#cup-clip)"
                    style={{ transition: "cy 0.1s linear" }}
                />
                {/* Pour stream */}
                {isPouring && (
                    <rect
                        x="56"
                        y="20"
                        width="8"
                        height={progress < 0.5 ? 40 + progress * 80 : 80}
                        fill="rgba(139, 90, 60, 0.8)"
                        rx="4"
                        style={{ opacity: isPouring ? 1 : 0, transition: "opacity 0.2s" }}
                    />
                )}
                {/* Steam particles */}
                <g style={{ opacity: steamOpacity }}>
                    <SteamParticle cx="50" cy="30" delay="0s" />
                    <SteamParticle cx="60" cy="25" delay="0.8s" />
                    <SteamParticle cx="70" cy="32" delay="1.5s" />
                </g>
                {/* Heating element glow */}
                <ellipse
                    cx="60"
                    cy="142"
                    rx="20"
                    ry="4"
                    fill="rgba(251, 191, 36, 0.3)"
                    style={{
                        opacity: progress > 0.3 ? 0.3 + progress * 0.3 : 0,
                        transition: "opacity 0.3s",
                    }}
                />
            </svg>
        </div>
    );
}

function SteamParticle({ cx, cy, delay }: { cx: string; cy: string; delay: string }) {
    return (
        <circle cx={cx} cy={cy} r="3" fill="rgba(255,255,255,0.35)">
            <animate
                attributeName="cy"
                values={`${cy};${parseInt(cy) - 20}`}
                dur="3s"
                repeatCount="indefinite"
                begin={delay}
            />
            <animate
                attributeName="opacity"
                values="0.35;0;0.35"
                dur="3s"
                repeatCount="indefinite"
                begin={delay}
            />
        </circle>
    );
}