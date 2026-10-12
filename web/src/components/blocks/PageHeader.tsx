import type { CSSProperties, ReactNode } from "react";
import styles from "./PageHeader.module.css";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  actions?: ReactNode;
  /** Cor de destaque (páginas de projeto usam a cor da submarca). */
  accent?: string;
  children?: ReactNode;
};

/** Cabeçalho padrão das páginas internas (h1 da página). */
export function PageHeader({ eyebrow, title, lead, actions, accent, children }: Props) {
  const style = accent ? ({ "--page-accent": accent } as CSSProperties) : undefined;
  return (
    <section className={styles.header} style={style}>
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {actions ? <div className={styles.actions}>{actions}</div> : null}
        {children}
      </div>
    </section>
  );
}
