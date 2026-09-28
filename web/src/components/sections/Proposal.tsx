import type { HomeContent } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Proposal.module.css";

/**
 * Bloco "Proposta · sem código" herdado do mockup. É um recado para o
 * cliente, não conteúdo do site: some quando `proposal` sair do home.json.
 */
export function Proposal({ proposal }: { proposal: NonNullable<HomeContent["proposal"]> }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <Reveal className="wrap">
        <div className={styles.box}>
          <div className={styles.icon}>
            <Icon name="code" width={28} height={28} style={{ color: "#fff" }} />
          </div>
          <div>
            <span className={styles.tag}>{proposal.tag}</span>
            <h3>{proposal.title}</h3>
            <p className="muted">{proposal.text}</p>
            <div className={styles.chips}>
              {proposal.chips.map((c) => (
                <span key={c} className={styles.chip}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
