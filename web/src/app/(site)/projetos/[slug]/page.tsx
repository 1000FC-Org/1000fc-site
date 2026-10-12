import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";
import { asset } from "@/lib/asset";
import { PageHeader } from "@/components/blocks/PageHeader";
import { SectionHead } from "@/components/blocks/SectionHead";
import { accentStyle } from "@/components/sections/Projects";
import { Icon } from "@/components/ui/Icon";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";
import styles from "./project.module.css";

// Só existem as páginas dos projetos cadastrados (necessário no export estático).
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([getProject(slug), getProjects()]);
  if (!project) notFound();

  const others = projects.filter((p) => p.id !== project.id);

  return (
    <div style={accentStyle(project)}>
      <PageHeader
        eyebrow="Projeto"
        title={project.name}
        lead={project.summary}
        accent={project.accent}
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className={`wrap ${styles.layout}`}>
          <Reveal className={styles.main}>
            <div className={styles.banner}>
              <Image
                src={asset(project.logo.src)}
                alt={project.logo.alt}
                width={project.logo.width}
                height={project.logo.height}
                sizes="(max-width: 960px) 100vw, 640px"
                priority
              />
            </div>
            {project.description.map((p) => (
              <p key={p} className={styles.text}>
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal as="aside" className={styles.aside}>
            <div className={styles.card}>
              <h2 className={styles.cardLabel}>Coordenação</h2>
              <p className={styles.coord}>{project.coordination}</p>
            </div>
            {project.activities?.length ? (
              <div className={styles.card}>
                <h2 className={styles.cardLabel}>Atividades</h2>
                <ul className={styles.list}>
                  {project.activities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {project.cta ? (
              <SmartLink href={project.cta.href} external={project.cta.external} className={`btn ${styles.cta}`}>
                {project.cta.label}
                <Icon name="arrow-right" />
              </SmartLink>
            ) : null}
          </Reveal>
        </div>
      </section>

      {project.photos.length ? (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <SectionHead title="Fotos" />
            <PhotoGallery photos={project.photos} />
          </div>
        </section>
      ) : null}

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <SectionHead
            title="Outros projetos"
            action={
              <Link href="/projetos" className="btn btn-ghost">
                Ver todos
              </Link>
            }
          />
          <ul className={styles.others}>
            {others.map((p) => (
              <li key={p.id} style={accentStyle(p)}>
                <Link href={`/projetos/${p.id}`} className={styles.other}>
                  <Image src={asset(p.logo.src)} alt="" width={p.logo.width} height={p.logo.height} sizes="200px" />
                  <span>{p.shortName}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
