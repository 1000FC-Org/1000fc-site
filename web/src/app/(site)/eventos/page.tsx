import type { Metadata } from "next";
import { getEvents, getPages } from "@/lib/content";
import { PageHeader } from "@/components/blocks/PageHeader";
import { EventList } from "@/components/sections/Events";
import styles from "../pages.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { eventos } = await getPages();
  return { title: "Eventos", description: eventos.lead };
}

export default async function EventosPage() {
  const [{ eventos }, events] = await Promise.all([getPages(), getEvents()]);

  return (
    <>
      <PageHeader eyebrow={eventos.eyebrow} title={eventos.title} lead={eventos.lead} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {events.length ? (
            <EventList events={events} headingLevel={2} />
          ) : (
            <p className={styles.empty}>{eventos.empty}</p>
          )}
          {eventos.note ? <p className={`muted ${styles.note}`}>{eventos.note}</p> : null}
        </div>
      </section>
    </>
  );
}
