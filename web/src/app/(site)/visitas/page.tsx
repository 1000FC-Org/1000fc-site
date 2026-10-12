import type { Metadata } from "next";
import Link from "next/link";
import { getPages } from "@/lib/content";
import { PageHeader } from "@/components/blocks/PageHeader";
import { SectionHead } from "@/components/blocks/SectionHead";
import { SplitText } from "@/components/blocks/SplitText";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { Icon } from "@/components/ui/Icon";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { SmartLink } from "@/components/ui/SmartLink";

export async function generateMetadata(): Promise<Metadata> {
  const { visitas } = await getPages();
  return { title: "Visitas", description: visitas.lead };
}

export default async function VisitasPage() {
  const { visitas: v } = await getPages();
  const [cover, ...photos] = v.photos;

  return (
    <>
      <PageHeader
        eyebrow={v.eyebrow}
        title={v.title}
        lead={v.lead}
        actions={
          <>
            <SmartLink href={v.cta.href} external={v.cta.external} className="btn btn-primary">
              {v.cta.label}
              <Icon name="calendar" />
            </SmartLink>
            <Link href="/projetos/experimentando" className="btn btn-ghost">
              Conheça o Experimentando no DQ
            </Link>
          </>
        }
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SplitText paragraphs={v.paragraphs} image={cover} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead title={v.howItWorks.title} />
          <FeatureGrid items={v.howItWorks.items} numbered />
        </div>
      </section>

      {photos.length ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <PhotoGallery photos={photos} />
          </div>
        </section>
      ) : null}
    </>
  );
}
