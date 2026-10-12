import type { Metadata } from "next";
import { getPages } from "@/lib/content";
import { PageHeader } from "@/components/blocks/PageHeader";
import { SectionHead } from "@/components/blocks/SectionHead";
import { StatsBand } from "@/components/sections/Stats";
import { Volunteer } from "@/components/sections/Volunteer";
import { PhotoGallery } from "@/components/ui/PhotoGallery";

export async function generateMetadata(): Promise<Metadata> {
  const { voluntariado } = await getPages();
  return { title: "Voluntariado", description: voluntariado.lead };
}

export default async function VoluntariadoPage() {
  const { voluntariado: v } = await getPages();

  return (
    <>
      <PageHeader
        eyebrow={v.eyebrow}
        title={v.title}
        lead={v.lead}
      />

      <Volunteer
        volunteer={{
          eyebrow: "Como participar",
          title: "Três passos para começar",
          text: v.paragraphs.join(" "),
          cta: v.cta,
          steps: v.steps,
        }}
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <StatsBand title={v.numbers.title} items={v.numbers.items} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead title="A equipe em ação" />
          <PhotoGallery photos={v.photos} />
        </div>
      </section>
    </>
  );
}
