import Image from "next/image";
import type { HomeContent } from "@/lib/types";
import { FlaskMini, Icon } from "@/components/ui/Icon";
import styles from "./Hero.module.css";
import { asset } from "@/lib/asset";
import { SmartLink } from "@/components/ui/SmartLink";

export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  const [badgeTop, badgeBottom] = hero.badges;

  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className={styles.title}>
            {hero.title.before}
            <span className={styles.hl}>{hero.title.highlight}</span>
            {hero.title.after}
          </h1>
          <p className={styles.lead}>{hero.lead}</p>
          <div className={styles.ctas}>
            <SmartLink href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
              <Icon name="arrow-right" />
            </SmartLink>
            <SmartLink href={hero.secondaryCta.href} className="btn btn-ghost">
              {hero.secondaryCta.label}
            </SmartLink>
          </div>
          <div className={styles.trust}>
            {hero.trust.map((t) => (
              <span key={t}>
                <i className={styles.dot} />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.photo}>
            <Image
              src={asset(hero.image.src)}
              alt={hero.image.alt}
              fill
              priority
              sizes="(max-width: 960px) 440px, 520px"
            />
          </div>
          {badgeTop ? <Badge badge={badgeTop} className={styles.badgeTop} /> : null}
          {badgeBottom ? <Badge badge={badgeBottom} className={styles.badgeBottom} /> : null}
        </div>
      </div>
    </section>
  );
}

function Badge({
  badge,
  className,
}: {
  badge: HomeContent["hero"]["badges"][number];
  className: string;
}) {
  return (
    <div className={`${styles.badge} ${className}`}>
      {badge.icon === "flask" ? (
        <FlaskMini className={styles.flask} />
      ) : (
        <div className={styles.badgeIcon}>
          <Icon name={badge.icon} width={18} height={18} strokeWidth={2.2} />
        </div>
      )}
      <div>
        <div className={styles.em}>{badge.title}</div>
        <small>
          {badge.lines.map((line, i) => (
            <span key={i}>
              {i > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </small>
      </div>
    </div>
  );
}
