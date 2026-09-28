import Image from "next/image";
import type { CSSProperties } from "react";
import type { HomeContent, Project } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./Projects.module.css";

type Props = {
  intro: HomeContent["projects"];
  projects: Project[];
  mapTool: HomeContent["mapTool"];
};

export function Projects({ intro, projects, mapTool }: Props) {
  return (
    <section className="section" id="projetos" style={{ paddingTop: "clamp(36px,5vw,72px)" }}>
      <div className="wrap">
        <Reveal className={styles.head}>
          <div>
            <span className="eyebrow">{intro.eyebrow}</span>
            <h2 className={`section-title ${styles.title}`}>{intro.title}</h2>
          </div>
          <p className={`muted ${styles.intro}`}>{intro.text}</p>
        </Reveal>

        <Reveal stagger className={styles.grid}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
          {intro.placeholderCard ? (
            <article className={`${styles.card} ${styles.placeholder}`}>
              <div className={styles.body}>
                <span className={styles.placeholderTitle}>{intro.placeholderCard.title}</span>
                <p>{intro.placeholderCard.text}</p>
              </div>
            </article>
          ) : null}
        </Reveal>

        <MapTool tool={mapTool} />
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const style = { "--accent": project.accent, "--accent-ink": project.accentInk } as CSSProperties;

  return (
    <article className={styles.card} style={style}>
      <div className={styles.banner}>
        <Image
          src={project.logo.src}
          alt={project.logo.alt}
          width={project.logo.width}
          height={project.logo.height}
          sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 360px"
        />
      </div>
      <div className={styles.body}>
        <p>{project.summary}</p>
        <a href={project.href} className={styles.more} aria-label={`Saiba mais sobre ${project.logo.alt}`}>
          Saiba mais <Icon name="arrow-right" width={16} height={16} strokeWidth={2.5} />
        </a>
      </div>
    </article>
  );
}

function MapTool({ tool }: { tool: HomeContent["mapTool"] }) {
  const external = tool.cta.external ?? tool.cta.href.startsWith("http");
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
      <a
        href={tool.cta.href}
        className="btn btn-light"
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
      >
        {tool.cta.label}
      </a>
    </Reveal>
  );
}
