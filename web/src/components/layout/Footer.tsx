import Image from "next/image";
import type { SiteContent } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { asset } from "@/lib/asset";
import styles from "./Footer.module.css";

/** Rodapé: marca e redes no topo, contato no meio, créditos embaixo. A navegação fica no header. */
export function Footer({ site }: { site: SiteContent }) {
  const { footer, contact, social, logo } = site;

  return (
    <footer className={`${styles.footer} on-dark`}>
      {/* Símbolo dos "zeros-sorriso" como marca d'água decorativa. */}
      <Image
        src={asset("/images/logos/1000fc-logo-horizontal.png")}
        alt=""
        width={940}
        height={585}
        className={styles.watermark}
        aria-hidden
      />

      <div className={`wrap ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image src={asset(logo.src)} alt={logo.alt} width={logo.width} height={logo.height} className={styles.logo} />
            <p>{footer.tagline}</p>
          </div>

          <ul className={styles.socials} aria-label="Redes sociais">
            {social.map((s) => {
              const external = s.href.startsWith("http");
              return (
                <li key={s.network}>
                  <a href={s.href} aria-label={s.label} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
                    <Icon name={s.network} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <address className={styles.contact}>
          <a href={`mailto:${contact.email}`} className={styles.contactItem}>
            <span className={styles.contactIcon}>
              <Icon name="mail" />
            </span>
            <span>
              <span className={styles.contactLabel}>E-mail</span>
              {contact.email}
            </span>
          </a>
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>
              <Icon name="pin" />
            </span>
            <span>
              <span className={styles.contactLabel}>Endereço</span>
              {/* "Departamento de Química, UFMG · Pampulha, ..." → uma parte por linha */}
              {contact.address.split(" · ").map((part, i) => (
                <span key={part} className={styles.line}>
                  {i > 0 ? <span className="sr-only">, </span> : null}
                  {part}
                </span>
              ))}
            </span>
          </div>
        </address>

        <div className={styles.bottom}>
          <span>{`© ${new Date().getFullYear()} ${footer.legal}`}</span>
        </div>
      </div>
    </footer>
  );
}
