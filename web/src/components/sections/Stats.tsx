import type { HomeContent } from "@/lib/types";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Stats.module.css";

export function Stats({ stats }: { stats: HomeContent["stats"] }) {
  return (
    <section className="section" style={{ paddingTop: 0 }} aria-label="O programa em números">
      <Reveal className="wrap">
        <div className={`${styles.stats} on-dark`}>
          <Reveal stagger className={styles.grid}>
            {stats.items.map((s) => (
              <div key={s.label}>
                <CountUp value={s.value} suffix={s.suffix} className={styles.num} />
                <div className={styles.label}>{s.label}</div>
              </div>
            ))}
          </Reveal>
          {stats.note ? <div className={styles.note}>{stats.note}</div> : null}
        </div>
      </Reveal>
    </section>
  );
}
