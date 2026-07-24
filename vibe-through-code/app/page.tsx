import Hero from "@/components/hero/hero";
import Mission from "@/components/mission/mission";
import Explore from "@/components/explore/explore";

import { getCurrentProject } from "@/lib/projects";
import { getLatestStream } from "@/lib/streams";

export default async function HomePage() {
  const project = await getCurrentProject();

  if (!project) {
    return (
      <>
        <Mission />
        <Explore />
      </>
    );
  }

  const latestStream = await getLatestStream();

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