"use client";

import { useSyncExternalStore } from "react";

/** true quando a página rolou além de `offset` px (header "encolhe"). */
export function useScrolled(offset = 20) {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > offset,
    () => false,
  );
}
