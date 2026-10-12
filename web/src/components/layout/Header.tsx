"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/types";
import { useScrolled } from "@/hooks/useScrolled";
import { asset } from "@/lib/asset";
import styles from "./Header.module.css";

type Props = Pick<SiteContent, "logo" | "nav" | "headerCta">;

/** "/projetos/inspirati" também marca "Projetos" como ativo. */
function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ logo, nav, headerCta }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(20);

  // Fecha o menu mobile ao trocar de página.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className={`${styles.inner} ${scrolled ? styles.scrolled : ""}`}>
          <Link href="/" className={styles.brand} aria-label={`${logo.alt}, página inicial`}>
            <Image src={asset(logo.src)} alt={logo.alt} width={logo.width} height={logo.height} priority />
          </Link>

          <nav
            id="primaryNav"
            aria-label="Navegação principal"
            className={`${styles.links} ${open ? styles.open : ""}`}
          >
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? styles.active : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.cta}>
            <Link href={headerCta.href} className={`btn btn-primary ${styles.ctaButton}`}>
              {headerCta.label}
            </Link>
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
