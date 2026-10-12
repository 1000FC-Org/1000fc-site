import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  id?: string;
  action?: ReactNode;
};

/** Título de seção dentro das páginas internas (h2). */
export function SectionHead({ eyebrow, title, lead, id, action }: Props) {
  return (
    <Reveal
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: "1.2rem",
        marginBottom: "1.6rem",
      }}
    >
      <div>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2 id={id} className="section-title">
          {title}
        </h2>
        {lead ? (
          <p className="muted" style={{ marginTop: "0.5rem", maxWidth: "60ch" }}>
            {lead}
          </p>
        ) : null}
      </div>
      {action}
    </Reveal>
  );
}
