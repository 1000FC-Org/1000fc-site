"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dispara uma única vez quando o elemento entra na viewport.
 * Usado pelo Reveal (animação de entrada) e pelo CountUp.
 */
export function useInView<T extends Element>(threshold = 0.14) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, inView]);

  return { ref, inView };
}
