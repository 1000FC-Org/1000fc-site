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
  | "users"
  | "school"
  | "teacher"
  | "chat"
  | "rocket"
  | "box"
  | "instagram"
  | "facebook"
  | "youtube"
  | "tiktok";

/**
 * `href` interno começa com "/" (ex.: "/projetos") e é navegado pelo Next.
 * Qualquer outro valor é tratado como link externo.
 */
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

/** Cabeçalho padrão das páginas internas. */
export interface PageIntro {
  eyebrow: string;
  title: string;
  lead: string;
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
  /** Formulários externos (Google Forms hoje). */
  forms: {
    volunteer: string;
    visit: string;
  };
  footer: {
    tagline: string;
    /** Sem o ano: o rodapé coloca "© <ano atual>" na frente. */
    legal: string;
  };
}

/* ---------- home.json (landing) ---------- */

export interface HeroBadge {
  title: string;
  lines: string[];
  icon: Extract<IconName, "flask" | "pin">;
}

export interface Stat {
  value: number;
  /** Texto antes do número, ex.: "+". */
  prefix?: string;
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
    cta: Link;
    pillars: { label: string; icon: IconName }[];
    mission: { label: string; text: string };
  };
  projects: SectionIntro & {
    text: string;
    cta: Link;
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
    cta: Link;
    note?: string;
  };
  gallery: SectionIntro & {
    cta: Link;
  };
}

/* ---------- projects.json ---------- */

export interface Project {
  /** Também é o slug da página: /projetos/{id}. */
  id: string;
  /** Nome oficial do projeto. */
  name: string;
  /** Nome curto (cards, rodapé, menus). */
  shortName: string;
  /** Cor da submarca (decorativa: banner, borda). */
  accent: string;
  /** Variante escura da cor, usada em texto (contraste AA sobre branco). */
  accentInk: string;
  logo: ImageAsset;
  /** Resumo de uma frase (cards). */
  summary: string;
  /** Descrição completa (página do projeto). */
  description: string[];
  coordination: string;
  /** Atividades típicas do projeto. */
  activities?: string[];
  /** Chamada específica do projeto (ex.: agendar visita). */
  cta?: Link;
  photos: ImageAsset[];
}

/* ---------- team.json ---------- */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  /** Sem foto, o card mostra as iniciais. */
  photo?: Omit<ImageAsset, "alt">;
}

/* ---------- pages.json (páginas internas) ---------- */

export interface PagesContent {
  sobre: PageIntro & {
    paragraphs: string[];
    mission: { label: string; text: string };
    numbers: { title: string; items: Stat[]; note?: string };
    history: { title: string; items: { year: string; title: string; points: string[] }[] };
    activities: { title: string; lead: string; items: { title: string; text: string; icon: IconName }[] };
    team: { title: string; lead: string };
    photos: ImageAsset[];
  };
  projetos: PageIntro;
  voluntariado: PageIntro & {
    paragraphs: string[];
    cta: Link;
    steps: { title: string; text: string }[];
    numbers: { title: string; items: Stat[] };
    photos: ImageAsset[];
  };
  visitas: PageIntro & {
    paragraphs: string[];
    cta: Link;
    howItWorks: { title: string; items: { title: string; text: string; icon: IconName }[] };
    note?: string;
    photos: ImageAsset[];
  };
  eventos: PageIntro & { note?: string; empty: string };
  galeria: PageIntro;
  contato: PageIntro & {
    channels: { title: string; text: string; link: Link; icon: IconName }[];
  };
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
  /**
   * Tamanho na grade da home (4 colunas): big = 2x2, wide = 2x1, normal = 1x1.
   * A home mostra só os itens com `featured`; a página /galeria mostra todos.
   */
  size: "big" | "wide" | "normal";
  featured?: boolean;
}
