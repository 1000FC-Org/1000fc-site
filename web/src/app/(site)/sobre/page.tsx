import type { Metadata } from "next";
import { getPages, getTeam } from "@/lib/content";
import { PageHeader } from "@/components/blocks/PageHeader";
import { SplitText } from "@/components/blocks/SplitText";
import { SectionHead } from "@/components/blocks/SectionHead";
import { Timeline } from "@/components/blocks/Timeline";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { TeamGrid } from "@/components/blocks/TeamGrid";
import { StatsBand } from "@/components/sections/Stats";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import styles from "../pages.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { sobre } = await getPages();
  return { title: "Sobre", description: sobre.lead };
}

export default async function SobrePage() {
  const [{ sobre }, team] = await Promise.all([getPages(), getTeam()]);

  return (
    <>
      <PageHeader eyebrow={sobre.eyebrow} title={sobre.title} lead={sobre.lead} />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SplitText
            paragraphs={sobre.paragraphs}
            aside={
              <div className={`${styles.mission} on-dark`}>
                <span className={styles.missionLabel}>{sobre.mission.label}</span>
                <p>{sobre.mission.text}</p>
              </div>
            }
          />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <StatsBand title={sobre.numbers.title} items={sobre.numbers.items} note={sobre.numbers.note} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead title={sobre.history.title} />
          <Timeline items={sobre.history.items} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead title={sobre.activities.title} lead={sobre.activities.lead} />
          <FeatureGrid items={sobre.activities.items} />
        </div>
      </section>

      <section className="section" id="equipe" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead title={sobre.team.title} lead={sobre.team.lead} />
          <TeamGrid members={team} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <PhotoGallery photos={sobre.photos} />
        </div>
      </section>
    </>
  );
}
