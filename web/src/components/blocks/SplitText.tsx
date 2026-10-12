import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/lib/asset";
import styles from "./SplitText.module.css";

type Props = {
  paragraphs: string[];
  image?: ImageAsset;
  /** Conteúdo extra na coluna lateral (substitui a foto). */
  aside?: ReactNode;
  children?: ReactNode;
};

/** Texto corrido à esquerda e foto (ou um card) à direita. */
export function SplitText({ paragraphs, image, aside, children }: Props) {
  return (
    <div className={styles.split}>
      <Reveal className={styles.text}>
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {children}
      </Reveal>
      {aside ? (
        <Reveal>{aside}</Reveal>
      ) : image ? (
        <Reveal className={styles.photo}>
          <Image src={asset(image.src)} alt={image.alt} fill sizes="(max-width: 960px) 100vw, 520px" />
        </Reveal>
      ) : null}
    </div>
  );
}
