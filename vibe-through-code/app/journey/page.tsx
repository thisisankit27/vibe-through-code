import { JourneyTimeline } from "@/components/journey";

import {
    getJourneyEvents,
    getJourneyStatus,
} from "@/lib/journey";

export const dynamic = "force-dynamic";
export default async function JourneyPage() {
    const status = await getJourneyStatus();
    const events = await getJourneyEvents();

    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            <JourneyTimeline
                status={status}
                events={events}
                cta={{
                    label: "Explore the full Project Catalog",
                    href: "/projects",
                }}
            />
        </main>
    );
}