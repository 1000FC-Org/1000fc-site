"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem, HomeContent } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Gallery.module.css";

type Props = {
  intro: HomeContent["gallery"];
  items: GalleryItem[];
};

export function Gallery({ intro, items }: Props) {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = (item: GalleryItem, trigger: HTMLElement) => {
    lastFocus.current = trigger;
    setActive(item);
  };

  const close = useCallback(() => {
    setActive(null);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    if (!active) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close]);

  return (
    <section className="section" id="galeria" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className={styles.head}>
          <div>
            <span className="eyebrow">{intro.eyebrow}</span>
            <h2 className="section-title">{intro.title}</h2>
          </div>
          <a href={intro.cta.href} className="btn btn-ghost">
            {intro.cta.label}
          </a>
        </Reveal>

        <Reveal className={styles.grid}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.item} ${styles[item.size] ?? ""}`}
              aria-label={`Ampliar foto: ${item.alt}`}
              onClick={(e) => open(item, e.currentTarget)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={item.size === "normal" ? "(max-width: 560px) 100vw, 280px" : "(max-width: 560px) 100vw, 560px"}
              />
            </button>
          ))}
        </Reveal>
      </div>

      <div
        className={`${styles.lightbox} ${active ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Foto ampliada"
        aria-hidden={!active}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        <button ref={closeRef} type="button" className={styles.close} aria-label="Fechar" onClick={close}>
          ×
        </button>
        {active ? (
          // Imagem original em tamanho cheio (sem otimização) para o zoom.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={active.src} alt={active.alt} />
        ) : null}
      </div>
    </section>
  );
}
