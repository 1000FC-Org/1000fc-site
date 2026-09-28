"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/types";
import { useScrolled } from "@/hooks/useScrolled";
import styles from "./Header.module.css";

type Props = Pick<SiteContent, "logo" | "nav" | "headerCta">;

export function Header({ logo, nav, headerCta }: Props) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(20);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header id="top" className={styles.header}>
      <div className={styles.nav}>
        <div className={`${styles.inner} ${scrolled ? styles.scrolled : ""}`}>
          <a href="#top" className={styles.brand}>
            <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} priority />
          </a>

          <nav
            id="primaryNav"
            aria-label="Navegação principal"
            className={`${styles.links} ${open ? styles.open : ""}`}
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.cta}>
            <a href={headerCta.href} className={`btn btn-primary ${styles.ctaButton}`}>
              {headerCta.label}
            </a>
            <button
              type="button"
              className={styles.burger}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="primaryNav"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
