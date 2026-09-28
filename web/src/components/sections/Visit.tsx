import Image from "next/image";
import type { HomeContent } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Visit.module.css";

export function Visit({ visit }: { visit: HomeContent["visit"] }) {
  return (
    <section className="section" id="visitas" style={{ paddingTop: 0 }}>
      <Reveal className="wrap">
        <div className={styles.visit}>
          <div className={styles.text}>
            <span className="eyebrow">{visit.eyebrow}</span>
            <h2>{visit.title}</h2>
            <p>{visit.text}</p>
            <a href={visit.cta.href} className="btn btn-primary">
              {visit.cta.label}
              <Icon name="calendar" width={18} height={18} />
            </a>
          </div>
          <div className={styles.photo}>
            <Image src={visit.image.src} alt={visit.image.alt} fill sizes="(max-width: 960px) 100vw, 560px" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
