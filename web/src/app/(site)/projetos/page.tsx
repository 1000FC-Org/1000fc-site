import type { Metadata } from "next";
import { getHome, getPages, getProjects } from "@/lib/content";
import { PageHeader } from "@/components/blocks/PageHeader";
import { MapTool, ProjectGrid } from "@/components/sections/Projects";

export async function generateMetadata(): Promise<Metadata> {
  const { projetos } = await getPages();
  return { title: "Projetos", description: projetos.lead };
}

export default async function ProjetosPage() {
  const [{ projetos }, projects, home] = await Promise.all([getPages(), getProjects(), getHome()]);

  return (
    <>
      <PageHeader eyebrow={projetos.eyebrow} title={projetos.title} lead={projetos.lead} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <ProjectGrid projects={projects} detailed />
          <MapTool tool={home.mapTool} />
        </div>
      </section>
    </>
  );
}
