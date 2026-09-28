import { getEvents, getGallery, getHome, getProjects } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Volunteer } from "@/components/sections/Volunteer";
import { Visit } from "@/components/sections/Visit";
import { Events } from "@/components/sections/Events";
import { Gallery } from "@/components/sections/Gallery";
import { Services } from "@/components/sections/Services";
import { Proposal } from "@/components/sections/Proposal";

export default async function HomePage() {
  const [home, projects, events, gallery] = await Promise.all([
    getHome(),
    getProjects(),
    getEvents(),
    getGallery(),
  ]);

  return (
    <>
      <Hero hero={home.hero} />
      <Stats stats={home.stats} />
      <About about={home.about} />
      <Projects intro={home.projects} projects={projects} mapTool={home.mapTool} />
      <Volunteer volunteer={home.volunteer} />
      <Visit visit={home.visit} />
      <Events intro={home.events} events={events} />
      <Gallery intro={home.gallery} items={gallery} />
      <Services services={home.services} />
      {home.proposal ? <Proposal proposal={home.proposal} /> : null}
    </>
  );
}
