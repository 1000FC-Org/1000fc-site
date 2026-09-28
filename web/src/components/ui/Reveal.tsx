"use client";

import type { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";
import { useInView } from "@/hooks/useInView";

type Props<T extends ElementType> = {
  as?: T;
  /** Anima os filhos em cascata em vez do bloco inteiro. */
  stagger?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * Animação de entrada no scroll. Os filhos podem ser Server Components:
 * só este invólucro roda no cliente. Sem JS, o <noscript> do layout
 * mostra o conteúdo normalmente.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  stagger = false,
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, inView } = useInView<HTMLElement>(0.14);
  const classes = [className, stagger ? "stagger" : "reveal", inView && "in"]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
