import type { HomeContent } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Services.module.css";

export function Services({ services }: { services: HomeContent["services"] }) {
  return (
    <section className="section" id="servicos" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal style={{ marginBottom: "2rem" }}>
          <span className="eyebrow">{services.eyebrow}</span>
          <h2 className="section-title">{services.title}</h2>
        </Reveal>
        <Reveal className={styles.grid}>
          {services.items.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.icon}>
                <Icon name={item.icon} />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href={item.cta.href} className={styles.link}>
                  {item.cta.label}
                  <Icon name="arrow-right" width={16} height={16} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
