import "server-only";

import siteData from "@/data/site.json";
import homeData from "@/data/home.json";
import projectsData from "@/data/projects.json";
import eventsData from "@/data/events.json";
import galleryData from "@/data/gallery.json";

import type {
  EventItem,
  GalleryItem,
  HomeContent,
  Project,
  SiteContent,
} from "./types";

/**
 * Camada de conteúdo: o único lugar do app que sabe de onde os dados vêm.
 *
 * Hoje lê os JSONs de `src/data/` (mesma ideia do `data/` do Mineração MG).
 * As funções já são assíncronas de propósito: quando o conteúdo passar a vir
 * de um banco ou CMS com painel de edição, só o corpo delas muda. Páginas e
 * componentes continuam chamando `await getHome()` do mesmo jeito.
 *
 * `server-only` garante que isso nunca vá parar no bundle do navegador
 * (importante quando entrarem credenciais de banco).
 */

export async function getSite(): Promise<SiteContent> {
  return siteData as SiteContent;
}

export async function getHome(): Promise<HomeContent> {
  return homeData as HomeContent;
}

export async function getProjects(): Promise<Project[]> {
  return projectsData as Project[];
}

export async function getEvents(): Promise<EventItem[]> {
  return eventsData as EventItem[];
}

export async function getGallery(): Promise<GalleryItem[]> {
  return galleryData as GalleryItem[];
}
