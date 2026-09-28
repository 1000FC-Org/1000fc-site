import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getHome, getProjects, getSite } from "@/lib/content";

/**
 * Layout das páginas públicas. O grupo `(site)` não aparece na URL; ele só
 * separa o site público de áreas futuras como `(admin)` (painel com login),
 * que terão layout, header e regras de acesso próprios.
 */
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const [site, projects, home] = await Promise.all([getSite(), getProjects(), getHome()]);

  return (
    <>
      <a href="#main" className="skip">
        Pular para o conteúdo
      </a>
      <Header logo={site.logo} nav={site.nav} headerCta={site.headerCta} />
      <main>{children}</main>
      <Footer
        site={site}
        projects={projects}
        extraProjectLinks={[{ label: home.mapTool.title, href: "#projetos" }]}
      />
    </>
  );
}
