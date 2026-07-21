"use client";

interface BuildCapsuleProps {
    progress: number;
}

export function BuildCapsule({ progress }: BuildCapsuleProps) {
    const columnHeight = Math.min(1, progress * 4);
    const floorVisible = progress > 0.35 ? Math.min(1, (progress - 0.35) * 3) : 0;
    const wallHeight = progress > 0.5 ? Math.min(1, (progress - 0.5) * 3) : 0;
    const roofVisible = progress > 0.75 ? Math.min(1, (progress - 0.75) * 4) : 0;
    const flagVisible = progress > 0.95 ? 1 : 0;
    const craneAngle = progress * 30;

    return (
        <div className="relative flex items-center justify-center">
            <svg width="140" height="160" viewBox="0 0 140 160" className="md:h-52 md:w-52">
                {/* Foundation */}
                <rect x="20" y="140" width="100" height="8" fill="rgba(255,255,255,0.1)" rx="1" />
                {/* Left column */}
                <rect
                    x="30"
                    y={140 - 80 * columnHeight}
                    width="8"
                    height={80 * columnHeight}
                    fill="rgba(255,255,255,0.12)"
                    style={{ transition: "all 0.1s linear" }}
                />
                {/* Right column */}
                <rect
                    x="102"
                    y={140 - 80 * columnHeight}
                    width="8"
                    height={80 * columnHeight}
                    fill="rgba(255,255,255,0.12)"
                    style={{ transition: "all 0.1s linear" }}
                />
                {/* Floor plate */}
                <rect
                    x="28"
                    y="100"
                    width="84"
                    height="4"
                    fill="rgba(0,230,118,0.3)"
                    style={{ opacity: floorVisible, transition: "opacity 0.2s" }}
                />
                {/* Walls */}
                <rect
                    x="38"
                    y={100 - 60 * wallHeight}
                    width="64"
                    height={60 * wallHeight}
                    fill="rgba(255,255,255,0.06)"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                    style={{ transition: "all 0.1s linear" }}
                />
                {/* Roof */}
                <polygon
                    points="35,100 70,85 105,100"
                    fill="rgba(0,230,118,0.15)"
                    stroke="rgba(0,230,118,0.3)"
                    strokeWidth="1"
                    style={{ opacity: roofVisible, transition: "opacity 0.2s" }}
                />
                {/* Crane */}
                <g
                    style={{
                        transform: `rotate(${craneAngle}deg)`,
                        transformOrigin: "110px 60px",
                        transition: "transform 0.1s linear",
                    }}
                >
                    <line x1="110" y1="60" x2="110" y2="20" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                    <line x1="110" y1="20" x2="130" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
                    <line x1="110" y1="25" x2="125" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 2" />
                </g>
                {/* Flag */}
                <g style={{ opacity: flagVisible, transition: "opacity 0.3s" }}>
                    <line x1="70" y1="85" x2="70" y2="65" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                    <polygon points="70,67 85,72 70,77" fill="rgba(0,230,118,0.6)" />
                </g>
                {/* Scaffolding hint */}
                <g style={{ opacity: progress > 0.4 ? 0.3 : 0, transition: "opacity 0.3s" }}>
                    <line x1="25" y1="110" x2="25" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <line x1="115" y1="110" x2="115" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    <line x1="25" y1="95" x2="115" y2="95" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="2 2" />
                </g>
            </svg>
        </div>
    );
}