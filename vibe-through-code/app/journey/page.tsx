import { JourneyTimeline } from "@/components/journey";
import { demoJourneyData } from "@/components/journey/demo-data";

export default function JourneyPage() {
    return (
        <JourneyTimeline
            status={demoJourneyData.status}
            events={demoJourneyData.events}
            cta={demoJourneyData.cta}
        />
    );
}