"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const fmt = new Intl.NumberFormat("pt-BR");
const format = (v: number) => (v >= 1000 ? fmt.format(v) : String(v));

type Props = {
  value: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
};

/**
 * Número que "conta" de 0 até `value` quando aparece na tela.
 *
 * Diferente do mockup, o HTML do servidor já sai com o valor final
 * (bom para SEO, leitores de tela e quem está sem JS). Só depois de
 * hidratar, e se o número ainda estiver fora da tela, ele volta a 0
 * para animar quando for visto.
 */
export function CountUp({ value, suffix = "", className, suffixClassName }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState<{ n: number; done: boolean }>({ n: value, done: true });

  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) return;

    let raf = 0;
    setDisplay({ n: 0, done: false });

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const dur = 1400;
        let t0: number | null = null;
        const step = (ts: number) => {
          t0 ??= ts;
          const p = Math.min((ts - t0) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setDisplay({ n: Math.floor(ease * value), done: p === 1 });
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, reduceMotion]);

  return (
    <div ref={ref} className={className}>
      {format(display.n)}
      {display.done && suffix ? <span className={suffixClassName}>{suffix}</span> : null}
    </div>
  );
}
