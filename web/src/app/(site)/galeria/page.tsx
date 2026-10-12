import type { Metadata } from "next";
import { getGallery, getPages } from "@/lib/content";
import { PageHeader } from "@/components/blocks/PageHeader";
import { PhotoGallery } from "@/components/ui/PhotoGallery";

export async function generateMetadata(): Promise<Metadata> {
  const { galeria } = await getPages();
  return { title: "Galeria", description: galeria.lead };
}

export default async function GaleriaPage() {
  const [{ galeria }, items] = await Promise.all([getPages(), getGallery()]);

  return (
    <>
      <PageHeader eyebrow={galeria.eyebrow} title={galeria.title} lead={galeria.lead} />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <PhotoGallery photos={items} />
        </div>
      </section>
    </>
  );
}
