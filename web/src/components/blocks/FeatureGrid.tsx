import type { IconName } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./FeatureGrid.module.css";

type Props = {
  items: { title: string; text: string; icon: IconName }[];
  /** Numera os cards (passo a passo) em vez de mostrar só o ícone. */
  numbered?: boolean;
  columns?: 2 | 3;
};

/** Cards com ícone, título e texto (atividades, "como funciona"...). */
export function FeatureGrid({ items, numbered = false, columns = 3 }: Props) {
  const Tag = numbered ? "ol" : "ul";
  return (
    <Reveal as={Tag} stagger className={`${styles.grid} ${columns === 2 ? styles.two : ""}`}>
      {items.map((item, i) => (
        <li key={item.title} className={styles.card}>
          <span className={styles.icon}>
            <Icon name={item.icon} />
          </span>
          <div>
            <h3>
              {numbered ? <span className={styles.n}>{i + 1}.</span> : null}
              {item.title}
            </h3>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </Reveal>
  );
}
