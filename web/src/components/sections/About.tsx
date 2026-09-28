import type { HomeContent } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./About.module.css";

export function About({ about }: { about: HomeContent["about"] }) {
  return (
    <section className="section" id="sobre" style={{ paddingTop: 0 }}>
      <div className={`wrap ${styles.grid}`}>
        <Reveal>
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className={styles.title}>{about.title}</h2>
          <p className={`muted ${styles.text}`}>{about.text}</p>
          <div className={styles.pillars}>
            {about.pillars.map((p) => (
              <div key={p.label} className={styles.pillar}>
                <span className={styles.pillarIcon}>
                  <Icon name={p.icon} />
                </span>
                {p.label}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className={`${styles.mission} on-dark`}>
          <span className={styles.missionLabel}>{about.mission.label}</span>
          <p className={styles.missionText}>{about.mission.text}</p>
        </Reveal>
      </div>
    </section>
  );
}
