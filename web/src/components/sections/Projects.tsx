import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { HomeContent, Project } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";
import { asset } from "@/lib/asset";
import styles from "./Projects.module.css";

type Props = {
  intro: HomeContent["projects"];
  projects: Project[];
  mapTool: HomeContent["mapTool"];
};

/** Vitrine de projetos da home. */
export function Projects({ intro, projects, mapTool }: Props) {
  return (
    <section className="section" id="projetos" style={{ paddingTop: "clamp(36px,5vw,72px)" }}>
      <div className="wrap">
        <Reveal className={styles.head}>
          <div>
            <span className="eyebrow">{intro.eyebrow}</span>
            <h2 className={`section-title ${styles.title}`}>{intro.title}</h2>
          </div>
          <div className={styles.headAside}>
            <p className="muted">{intro.text}</p>
            <SmartLink href={intro.cta.href} className="btn btn-ghost">
              {intro.cta.label}
            </SmartLink>
          </div>
        </Reveal>

        <ProjectGrid projects={projects} />
        <MapTool tool={mapTool} />
      </div>
    </section>
  );
}

export function ProjectGrid({ projects, detailed = false }: { projects: Project[]; detailed?: boolean }) {
  return (
    <Reveal stagger className={styles.grid}>
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} detailed={detailed} />
      ))}
    </Reveal>
  );
}

export function accentStyle(project: Project) {
  return { "--accent": project.accent, "--accent-ink": project.accentInk } as CSSProperties;
}

function ProjectCard({ project, detailed }: { project: Project; detailed: boolean }) {
  const href = `/projetos/${project.id}`;
  return (
    <article className={styles.card} style={accentStyle(project)}>
      <Link href={href} className={styles.banner} tabIndex={-1} aria-hidden>
        <Image
          src={asset(project.logo.src)}
          alt=""
          width={project.logo.width}
          height={project.logo.height}
          sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 360px"
        />
      </Link>
      <div className={styles.body}>
        {detailed ? <h2 className={styles.cardTitle}>{project.name}</h2> : <h3 className="sr-only">{project.name}</h3>}
        <p>{project.summary}</p>
        {detailed ? (
          <p className={styles.coord}>
            <span>Coordenação</span>
            {project.coordination}
          </p>
        ) : null}
        <Link href={href} className={styles.more} aria-label={`Saiba mais sobre ${project.name}`}>
          Saiba mais <Icon name="arrow-right" width={16} height={16} strokeWidth={2.5} />
        </Link>
      </div>
    </article>
  );
}

export function MapTool({ tool }: { tool: HomeContent["mapTool"] }) {
  return (
    <Reveal className={`${styles.tool} on-dark`}>
      <div className={styles.toolIcon}>
        <Icon name="map" style={{ color: "#69BC45" }} />
      </div>
      <div>
        <span className={styles.tag}>{tool.tag}</span>
        <h3>{tool.title}</h3>
        <p>{tool.text}</p>
      </div>
      <SmartLink href={tool.cta.href} external={tool.cta.external} className="btn btn-light">
        {tool.cta.label}
      </SmartLink>
    </Reveal>
  );
}
