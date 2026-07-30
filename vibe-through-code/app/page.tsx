import Hero from "@/components/hero/hero";
import Mission from "@/components/mission/mission";
import Explore from "@/components/explore/explore";

import { getCurrentProject } from "@/lib/projects";
import { getLatestStream } from "@/lib/streams";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // The hero renders unconditionally — an absent active project hides the
  // project card, never the front door.
  const [project, latestStream] = await Promise.all([
    getCurrentProject(),
    getLatestStream(),
  ]);

  return (
    <>
      <Hero
        project={project}
        latestStream={latestStream}
      />

      <Mission />

      <Explore />
    </>
  );
}
