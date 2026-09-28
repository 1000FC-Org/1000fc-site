import Image from "next/image";
import type { Project, SiteContent } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import styles from "./Footer.module.css";
import { asset } from "@/lib/asset";

type Props = {
  site: SiteContent;
  projects: Project[];
  /** Links extras na coluna "Projetos" (ex.: Mapa da Mineração). */
  extraProjectLinks?: { label: string; href: string }[];
};

export function Footer({ site, projects, extraProjectLinks = [] }: Props) {
  const { footer, contact, social, logo } = site;
  const projectLinks = [
    ...projects.map((p) => ({ label: p.name, href: "#projetos" })),
    ...extraProjectLinks,
  ];

  return (
    <footer id="contato" className={`${styles.footer} on-dark`}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.chip}>
              <Image src={asset(logo.src)} alt={logo.alt} width={logo.width} height={logo.height} />
            </div>
            <p>{footer.tagline}</p>
            <div className={styles.socials}>
              {social.map((s) => {
                const external = s.href.startsWith("http");
                return (
                  <a
                    key={s.network}
                    href={s.href}
                    aria-label={s.label}
                    {...(external ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    <Icon name={s.network} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className={styles.col}>
            <h3>{footer.navTitle}</h3>
            <ul>
              {footer.nav.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h3>{footer.projectsTitle}</h3>
            <ul>
              {projectLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.col} ${styles.contact}`}>
            <h3>{footer.contactTitle}</h3>
            <ul>
              <li>
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2" aria-hidden>
                  <path d="M3 5h18v14H3z" strokeLinejoin="round" />
                  <path d="m3 6 9 6 9-6" />
                </svg>
                {contact.email}
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2" aria-hidden>
                  <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10Z" strokeLinejoin="round" />
                  <circle cx="12" cy="11" r="2.2" />
                </svg>
                {contact.address}
              </li>
            </ul>
            <a href={footer.cta.href} className={`btn btn-primary ${styles.cta}`}>
              {footer.cta.label}
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>{footer.legal}</span>
          {footer.note ? <span>{footer.note}</span> : null}
        </div>
      </div>
    </footer>
  );
}
