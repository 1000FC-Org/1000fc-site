import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getEvents, getSite } from "@/lib/content";

/**
 * Layout das páginas públicas. O grupo `(site)` não aparece na URL; ele só
 * separa o site público de áreas futuras como `(admin)` (painel com login).
 */
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const [site, events] = await Promise.all([getSite(), getEvents()]);
  // Sem eventos cadastrados, "Eventos" sai do menu (a página continua existindo).
  const nav = events.length ? site.nav : site.nav.filter((item) => item.href !== "/eventos");

  return (
    <>
      <a href="#main" className="skip">
        Pular para o conteúdo
      </a>
      <Header logo={site.logo} nav={nav} headerCta={site.headerCta} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer site={site} />
    </>
  );
}
