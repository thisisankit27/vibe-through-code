"use client";

interface FilmCapsuleProps {
    progress: number;
}

export function FilmCapsule({ progress }: FilmCapsuleProps) {
    const reelRotation = progress * 720;
    const apertureOpen = progress > 0.25 ? Math.min(1, (progress - 0.25) * 4) : 0;
    const isRecording = progress > 0.75;
    const filmVisible = progress > 0.5 ? Math.min(1, (progress - 0.5) * 4) : 0;

    return (
        <div className="relative flex items-center justify-center">
            <svg width="140" height="140" viewBox="0 0 140 140" className="md:h-48 md:w-48">
                {/* Camera body */}
                <rect
                    x="30"
                    y="50"
                    width="80"
                    height="55"
                    rx="6"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                />
                {/* Lens */}
                <circle
                    cx="70"
                    cy="77"
                    r="18"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                />
                {/* Aperture blades */}
                <g style={{ opacity: apertureOpen, transition: "opacity 0.3s" }}>
                    <circle cx="70" cy="77" r="12" fill="rgba(0,0,0,0.5)" />
                    <circle cx="70" cy="77" r="6" fill="rgba(255,255,255,0.05)" />
                </g>
                {/* Left reel */}
                <g
                    style={{
                        transform: `rotate(${reelRotation}deg)`,
                        transformOrigin: "40px 40px",
                        transition: "transform 0.1s linear",
                    }}
                >
                    <circle cx="40" cy="40" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    <circle cx="40" cy="40" r="4" fill="rgba(255,255,255,0.1)" />
                    <line x1="40" y1="24" x2="40" y2="56" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="24" y1="40" x2="56" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </g>
                {/* Right reel */}
                <g
                    style={{
                        transform: `rotate(${-reelRotation}deg)`,
                        transformOrigin: "100px 40px",
                        transition: "transform 0.1s linear",
                    }}
                >
                    <circle cx="100" cy="40" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    <circle cx="100" cy="40" r="4" fill="rgba(255,255,255,0.1)" />
                    <line x1="100" y1="24" x2="100" y2="56" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="84" y1="40" x2="116" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </g>
                {/* Film strip between reels */}
                <path
                    d="M40 56 Q55 65 70 60 Q85 55 100 56"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    style={{ opacity: filmVisible, transition: "opacity 0.3s" }}
                />
                {/* Recording LED */}
                <circle
                    cx="100"
                    cy="92"
                    r="4"
                    fill={isRecording ? "#ef4444" : "rgba(255,255,255,0.1)"}
                    style={{
                        opacity: isRecording ? undefined : 0.3,
                        transition: "fill 0.3s",
                    }}
                >
                    {isRecording && (
                        <animate
                            attributeName="opacity"
                            values="1;0.3;1"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    )}
                </circle>
                {/* Viewfinder bump */}
                <rect x="55" y="42" width="30" height="8" rx="2" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </svg>
        </div>
    );
}