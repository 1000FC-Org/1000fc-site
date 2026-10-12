import Image from "next/image";
import type { TeamMember } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import styles from "./TeamGrid.module.css";

/** "Natália Araújo" → "NA"; "Enzo" → "E". */
function initials(name: string) {
  const parts = name.split(" ");
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (parts[0][0] + last).toUpperCase();
}

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <Reveal as="ul" stagger className={styles.grid}>
      {members.map((m) => (
        <li key={m.id} className={styles.member}>
          <div className={styles.photo}>
            {m.photo ? (
              <Image src={asset(m.photo.src)} alt="" width={m.photo.width} height={m.photo.height} sizes="160px" />
            ) : (
              <span className={styles.initials} aria-hidden>
                {initials(m.name)}
              </span>
            )}
          </div>
          <h3>{m.name}</h3>
          <p>{m.role}</p>
        </li>
      ))}
    </Reveal>
  );
}
