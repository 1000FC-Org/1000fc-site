import type { Metadata } from "next";
import { getPages, getSite } from "@/lib/content";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";
import styles from "../pages.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { contato } = await getPages();
  return { title: "Contato", description: contato.lead };
}

export default async function ContatoPage() {
  const [{ contato }, site] = await Promise.all([getPages(), getSite()]);

  return (
    <>
      <PageHeader eyebrow={contato.eyebrow} title={contato.title} lead={contato.lead} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal as="ul" stagger className={styles.channels}>
            {contato.channels.map((c) => (
              <li key={c.title} className={styles.channel}>
                <span className={styles.channelIcon}>
                  <Icon name={c.icon} />
                </span>
                <div>
                  <h2>{c.title}</h2>
                  <p>{c.text}</p>
                  <SmartLink href={c.link.href} external={c.link.external} className={styles.link}>
                    {c.link.label}
                    <Icon name="arrow-right" width={16} height={16} strokeWidth={2.5} />
                  </SmartLink>
                </div>
              </li>
            ))}
          </Reveal>
          <p className={styles.address}>
            <Icon name="pin" width={18} height={18} />
            {site.contact.address}
          </p>
        </div>
      </section>
    </>
  );
}
