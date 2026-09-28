import type { EventItem, HomeContent } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Events.module.css";

type Props = {
  intro: HomeContent["events"];
  events: EventItem[];
};

export function Events({ intro, events }: Props) {
  return (
    <section className="section" id="eventos" style={{ paddingTop: 0 }}>
      <Reveal className="wrap">
        <div style={{ marginBottom: "2rem" }}>
          <span className="eyebrow">{intro.eyebrow}</span>
          <h2 className="section-title">{intro.title}</h2>
        </div>
        <div className={styles.list}>
          {events.map((evt) => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
        {intro.note ? <p className={`muted ${styles.note}`}>{intro.note}</p> : null}
      </Reveal>
    </section>
  );
}

function EventCard({ event }: { event: EventItem }) {
  const { link } = event;
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
        <h3>{event.title}</h3>
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
      <a
        href={link.href}
        className="btn btn-primary"
        {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
      >
        {link.label}
        <Icon name="arrow-up-right" width={17} height={17} />
      </a>
    </article>
  );
}
