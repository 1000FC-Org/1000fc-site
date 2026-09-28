import type { HomeContent } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Volunteer.module.css";

export function Volunteer({ volunteer }: { volunteer: HomeContent["volunteer"] }) {
  return (
    <section className="section" id="voluntariado" style={{ paddingTop: 0 }}>
      <Reveal className="wrap">
        <div className={`${styles.band} on-dark`}>
          <div className={styles.inner}>
            <div>
              <span className="eyebrow" style={{ color: "#fff" }}>
                {volunteer.eyebrow}
              </span>
              <h2 className={styles.title}>{volunteer.title}</h2>
              <p className={styles.text}>{volunteer.text}</p>
              <a href={volunteer.cta.href} className="btn btn-light">
                {volunteer.cta.label}
                <Icon name="arrow-right" width={18} height={18} />
              </a>
            </div>
            <ol className={styles.steps}>
              {volunteer.steps.map((step, i) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.n} aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
