import "server-only";

import siteData from "@/data/site.json";
import homeData from "@/data/home.json";
import pagesData from "@/data/pages.json";
import projectsData from "@/data/projects.json";
import teamData from "@/data/team.json";
import eventsData from "@/data/events.json";
import galleryData from "@/data/gallery.json";

import type {
  EventItem,
  GalleryItem,
  HomeContent,
  PagesContent,
  Project,
  SiteContent,
  TeamMember,
} from "./types";

/**
 * Camada de conteúdo: o único lugar do app que sabe de onde os dados vêm.
 *
 * Hoje lê os JSONs de `src/data/`. As funções já são assíncronas de
 * propósito: quando o conteúdo passar a vir de um banco ou CMS com painel
 * de edição, só o corpo delas muda.
 */

export async function getSite(): Promise<SiteContent> {
  return siteData as SiteContent;
}

export async function getHome(): Promise<HomeContent> {
  return homeData as HomeContent;
}

export async function getPages(): Promise<PagesContent> {
  return pagesData as PagesContent;
}

export async function getProjects(): Promise<Project[]> {
  return projectsData as Project[];
}

export async function getProject(id: string): Promise<Project | undefined> {
  return (projectsData as Project[]).find((p) => p.id === id);
}

export async function getTeam(): Promise<TeamMember[]> {
  return teamData as TeamMember[];
}

export async function getEvents(): Promise<EventItem[]> {
  return eventsData as EventItem[];
}

export async function getGallery(): Promise<GalleryItem[]> {
  return galleryData as GalleryItem[];
}
