import { JourneyTimeline } from "@/components/journey";
import { journey } from "@/data/journey";

export default function JourneyPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <JourneyTimeline
                status={{
                    label: journey.isLive ? "Streaming Live" : "Currently Building",
                    message: `${journey.currentGoal} — ${journey.currentMilestone}`,
                    isLive: journey.isLive,
                    meta: [
                        { label: "Day", value: `${journey.currentDay}` },
                        { label: "Streak", value: `${journey.streak} days` },
                        { label: "Revenue", value: `$${journey.revenue}` },
                    ],
                }}
                events={journey.events}
                cta={{
                    label: "Explore the full Project Catalog",
                    href: "/projects",
                }}
            />
        </main>
    );
}