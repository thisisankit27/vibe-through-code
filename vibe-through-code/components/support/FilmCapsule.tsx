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
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                />
                {/* Body top highlight */}
                <path
                    d="M30 56 Q30 50 36 50 L104 50 Q110 50 110 56"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                />
                {/* Lens outer */}
                <circle
                    cx="70"
                    cy="77"
                    r="18"
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                />
                {/* Lens inner ring */}
                <circle
                    cx="70"
                    cy="77"
                    r="14"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="0.5"
                />
                {/* Aperture blades */}
                <g style={{ opacity: apertureOpen, transition: "opacity 0.3s" }}>
                    <circle cx="70" cy="77" r="12" fill="rgba(0,0,0,0.5)" />
                    <circle cx="70" cy="77" r="6" fill="rgba(255,255,255,0.1)" />
                </g>
                {/* Left reel */}
                <g
                    style={{
                        transform: `rotate(${reelRotation}deg)`,
                        transformOrigin: "40px 40px",
                        transition: "transform 0.1s linear",
                    }}
                >
                    <circle cx="40" cy="40" r="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                    <circle cx="40" cy="40" r="4" fill="rgba(255,255,255,0.2)" />
                    <line x1="40" y1="24" x2="40" y2="56" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <line x1="24" y1="40" x2="56" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    {/* Cross spokes */}
                    <line x1="28.7" y1="28.7" x2="51.3" y2="51.3" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                    <line x1="51.3" y1="28.7" x2="28.7" y2="51.3" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                </g>
                {/* Right reel */}
                <g
                    style={{
                        transform: `rotate(${-reelRotation}deg)`,
                        transformOrigin: "100px 40px",
                        transition: "transform 0.1s linear",
                    }}
                >
                    <circle cx="100" cy="40" r="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
                    <circle cx="100" cy="40" r="4" fill="rgba(255,255,255,0.2)" />
                    <line x1="100" y1="24" x2="100" y2="56" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <line x1="84" y1="40" x2="116" y2="40" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    {/* Cross spokes */}
                    <line x1="88.7" y1="28.7" x2="111.3" y2="51.3" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                    <line x1="111.3" y1="28.7" x2="88.7" y2="51.3" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                </g>
                {/* Film strip between reels */}
                <path
                    d="M40 56 Q55 65 70 60 Q85 55 100 56"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    style={{ opacity: filmVisible, transition: "opacity 0.3s" }}
                />
                {/* Recording LED */}
                <circle
                    cx="100"
                    cy="92"
                    r="4"
                    fill={isRecording ? "#ef4444" : "rgba(255,255,255,0.2)"}
                    style={{
                        opacity: isRecording ? undefined : 0.4,
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
                <rect x="55" y="42" width="30" height="8" rx="2" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            </svg>
        </div>
    );
}