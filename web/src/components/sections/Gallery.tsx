import type { GalleryItem, HomeContent } from "@/lib/types";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";
import styles from "./Gallery.module.css";

type Props = {
  intro: HomeContent["gallery"];
  items: GalleryItem[];
};

/** Mosaico de destaques na home; a galeria completa fica em /galeria. */
export function Gallery({ intro, items }: Props) {
  return (
    <section className="section" id="galeria" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className={styles.head}>
          <div>
            <span className="eyebrow">{intro.eyebrow}</span>
            <h2 className="section-title">{intro.title}</h2>
          </div>
          <SmartLink href={intro.cta.href} className="btn btn-ghost">
            {intro.cta.label}
          </SmartLink>
        </Reveal>
        <Reveal>
          <PhotoGallery layout="showcase" photos={items.filter((i) => i.featured)} />
        </Reveal>
      </div>
    </section>
  );
}
