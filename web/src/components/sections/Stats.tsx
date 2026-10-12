import type { Stat } from "@/lib/types";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Stats.module.css";

type Props = { items: Stat[]; note?: string; title?: string };

/** Faixa de números da home. */
export function Stats({ stats }: { stats: Props }) {
  return (
    <section className="section" style={{ paddingTop: 0 }} aria-label="O programa em números">
      <Reveal className="wrap">
        <StatsBand {...stats} />
      </Reveal>
    </section>
  );
}

/** O bloco escuro com os números, reutilizado nas páginas internas. */
export function StatsBand({ items, note, title }: Props) {
  return (
    <div className={`${styles.stats} on-dark`}>
      {title ? <h2 className={styles.title}>{title}</h2> : null}
      <Reveal stagger className={styles.grid}>
        {items.map((s) => (
          <div key={s.label}>
            <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} className={styles.num} />
            <div className={styles.label}>{s.label}</div>
          </div>
        ))}
      </Reveal>
      {note ? <div className={styles.note}>{note}</div> : null}
    </div>
  );
}
