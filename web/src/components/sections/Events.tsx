import type { EventItem, HomeContent } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";
import styles from "./Events.module.css";

type Props = {
  intro: HomeContent["events"];
  events: EventItem[];
};

/** Prévia da agenda na home. */
export function Events({ intro, events }: Props) {
  return (
    <section className="section" id="eventos" style={{ paddingTop: 0 }}>
      <Reveal className="wrap">
        <div className={styles.head}>
          <div>
            <span className="eyebrow">{intro.eyebrow}</span>
            <h2 className="section-title">{intro.title}</h2>
          </div>
          <SmartLink href={intro.cta.href} className="btn btn-ghost">
            {intro.cta.label}
          </SmartLink>
        </div>
        <EventList events={events.slice(0, 2)} />
        {intro.note ? <p className={`muted ${styles.note}`}>{intro.note}</p> : null}
      </Reveal>
    </section>
  );
}

export function EventList({ events, headingLevel = 3 }: { events: EventItem[]; headingLevel?: 2 | 3 }) {
  return (
    <div className={styles.list}>
      {events.map((evt) => (
        <EventCard key={evt.id} event={evt} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

function EventCard({ event, headingLevel }: { event: EventItem; headingLevel: 2 | 3 }) {
  const { link } = event;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={styles.evt}>
      <div className={styles.date}>
        <div className={styles.month}>{event.date.month}</div>
        <div className={styles.day}>{event.date.headline}</div>
        {event.date.caption ? <div className={styles.caption}>{event.date.caption}</div> : null}
      </div>
      <div>
        {event.status ? (
          <span className={styles.live}>
            <i className={styles.pulse} />
            {event.status}
          </span>
        ) : null}
        <Heading className={styles.title}>{event.title}</Heading>
        <div className={styles.meta}>
          <span>
            <Icon name="pin" width={15} height={15} strokeWidth={2} />
            {event.location}
          </span>
          <span>
            <Icon name="clock" width={15} height={15} strokeWidth={2} />
            {event.time}
          </span>
        </div>
      </div>
      <SmartLink href={link.href} external={link.external} className="btn btn-primary">
        {link.label}
        <Icon name="arrow-up-right" width={17} height={17} />
      </SmartLink>
    </article>
  );
}
