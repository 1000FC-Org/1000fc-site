/**
 * Modelo de conteúdo do site.
 *
 * Hoje esses tipos descrevem os JSONs em `src/data/`. Quando entrar o painel
 * de edição (login + CMS/banco), eles viram o contrato entre a camada de
 * dados e os componentes: os componentes continuam recebendo exatamente
 * estes formatos, só muda a origem em `src/lib/content.ts`.
 */

export type IconName =
  | "plus"
  | "flask"
  | "globe"
  | "pin"
  | "clock"
  | "calendar"
  | "arrow-right"
  | "arrow-up-right"
  | "map"
  | "certificate"
  | "report"
  | "code"
  | "mail"
  | "instagram"
  | "facebook"
  | "youtube"
  | "tiktok";

export interface Link {
  label: string;
  href: string;
  /** Abre em nova aba (links externos). */
  external?: boolean;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/* ---------- site.json ---------- */

export interface SocialLink {
  network: Extract<IconName, "instagram" | "facebook" | "youtube" | "tiktok" | "mail">;
  label: string;
  href: string;
}

export interface SiteContent {
  name: string;
  title: string;
  description: string;
  url: string;
  locale: string;
  logo: ImageAsset;
  nav: Link[];
  headerCta: Link;
  social: SocialLink[];
  contact: {
    email: string;
    address: string;
  };
  footer: {
    tagline: string;
    navTitle: string;
    nav: Link[];
    projectsTitle: string;
    contactTitle: string;
    cta: Link;
    legal: string;
    note?: string;
  };
}

/* ---------- home.json ---------- */

export interface HeroBadge {
  title: string;
  lines: string[];
  icon: Extract<IconName, "flask" | "pin">;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    title: { before: string; highlight: string; after: string };
    lead: string;
    primaryCta: Link;
    secondaryCta: Link;
    trust: string[];
    image: ImageAsset;
    badges: HeroBadge[];
  };
  stats: {
    items: Stat[];
    note?: string;
  };
  about: SectionIntro & {
    text: string;
    pillars: { label: string; icon: IconName }[];
    mission: { label: string; text: string };
  };
  projects: SectionIntro & {
    text: string;
    /** Card tracejado "+ Novos projetos". Omitir para esconder. */
    placeholderCard?: { title: string; text: string };
  };
  mapTool: {
    tag: string;
    title: string;
    text: string;
    cta: Link;
  };
  volunteer: SectionIntro & {
    text: string;
    cta: Link;
    steps: { title: string; text: string }[];
  };
  visit: SectionIntro & {
    text: string;
    cta: Link;
    image: ImageAsset;
  };
  events: SectionIntro & {
    note?: string;
  };
  gallery: SectionIntro & {
    cta: Link;
  };
  services: SectionIntro & {
    items: {
      id: string;
      icon: IconName;
      title: string;
      text: string;
      cta: Link;
    }[];
  };
  /** Bloco "Proposta · sem código" do mockup. Omitir para esconder. */
  proposal?: {
    tag: string;
    title: string;
    text: string;
    chips: string[];
  };
}

/* ---------- projects.json ---------- */

export interface Project {
  id: string;
  name: string;
  /** Cor da submarca (decorativa: banner, borda). */
  accent: string;
  /** Variante escura da cor, usada em texto (contraste AA sobre branco). */
  accentInk: string;
  logo: ImageAsset;
  summary: string;
  href: string;
}

/* ---------- events.json ---------- */

export interface EventItem {
  id: string;
  title: string;
  status?: string;
  /** Como a data aparece no bloco à esquerda do card. */
  date: { month: string; headline: string; caption?: string };
  location: string;
  time: string;
  link: Link;
}

/* ---------- gallery.json ---------- */

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** big = 2x2, wide = 2x1, normal = 1x1 (na grade de 4 colunas). */
  size: "big" | "wide" | "normal";
}
