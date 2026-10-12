import { Reveal } from "@/components/ui/Reveal";
import styles from "./Timeline.module.css";

type Props = {
  items: { year: string; title: string; points: string[] }[];
};

export function Timeline({ items }: Props) {
  return (
    <Reveal as="ol" stagger className={styles.timeline}>
      {items.map((item) => (
        <li key={item.year} className={styles.item}>
          <span className={styles.year}>{item.year}</span>
          <div className={styles.card}>
            <h3>{item.title}</h3>
            <ul>
              {item.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </Reveal>
  );
}
