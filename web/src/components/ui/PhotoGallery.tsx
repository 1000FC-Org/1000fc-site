"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ImageAsset } from "@/lib/types";
import { asset } from "@/lib/asset";
import styles from "./PhotoGallery.module.css";

export type GalleryPhoto = ImageAsset & {
  /** Só usado no layout "showcase" (grade de 4 colunas da home). */
  size?: "big" | "wide" | "normal";
};

type Props = {
  photos: GalleryPhoto[];
  /**
   * showcase: grade em mosaico da home (big/wide/normal)
   * grid: grade uniforme de 3 colunas (páginas internas)
   */
  layout?: "showcase" | "grid";
  className?: string;
};

/** Grade de fotos com lightbox (teclado: Esc fecha, ← → navegam). */
export function PhotoGallery({ photos, layout = "grid", className }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const active = index === null ? null : photos[index];

  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, step]);

  const sizes =
    layout === "showcase"
      ? (p: GalleryPhoto) =>
          p.size === "normal" ? "(max-width: 560px) 100vw, 280px" : "(max-width: 560px) 100vw, 560px"
      : () => "(max-width: 560px) 100vw, (max-width: 960px) 50vw, 370px";

  return (
    <>
      <div className={[layout === "showcase" ? styles.showcase : styles.grid, className].filter(Boolean).join(" ")}>
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            className={`${styles.item} ${layout === "showcase" ? (styles[photo.size ?? "normal"] ?? "") : ""}`}
            aria-label={`Ampliar foto: ${photo.alt}`}
            onClick={(e) => {
              lastFocus.current = e.currentTarget;
              setIndex(i);
            }}
          >
            <Image src={asset(photo.src)} alt={photo.alt} fill sizes={sizes(photo)} />
          </button>
        ))}
      </div>

      {/* Portal: o lightbox é position:fixed e não pode ficar preso dentro de
          ancestrais com transform (ex.: a animação do Reveal). */}
      {active
        ? createPortal(
            <div
              className={`${styles.lightbox} ${styles.open}`}
              role="dialog"
              aria-modal="true"
              aria-label="Foto ampliada"
              onClick={(e) => e.target === e.currentTarget && close()}
            >
              <button ref={closeRef} type="button" className={styles.close} aria-label="Fechar" onClick={close}>
                ×
              </button>
              {photos.length > 1 ? (
                <>
                  <button
                    type="button"
                    className={`${styles.nav} ${styles.prev}`}
                    aria-label="Foto anterior"
                    onClick={() => step(-1)}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className={`${styles.nav} ${styles.next}`}
                    aria-label="Próxima foto"
                    onClick={() => step(1)}
                  >
                    ›
                  </button>
                </>
              ) : null}
              <figure>
                {/* Imagem original em tamanho cheio (sem otimização) para o zoom. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(active.src)} alt={active.alt} />
                <figcaption>
                  {active.alt}
                  {photos.length > 1 ? <span>{`${(index ?? 0) + 1} / ${photos.length}`}</span> : null}
                </figcaption>
              </figure>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
