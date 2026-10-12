import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fredoka";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";
import { getHome, getSite } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const [site, home] = await Promise.all([getSite(), getHome()]);
  return {
    metadataBase: new URL(process.env.SITE_URL || site.url),
    title: { default: site.title, template: `%s · ${site.name}` },
    description: site.description,
    openGraph: {
      type: "website",
      locale: site.locale.replace("-", "_"),
      siteName: site.name,
      title: site.name,
      description: site.description,
      images: [{ url: home.hero.image.src, width: home.hero.image.width, height: home.hero.image.height }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#183A12",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSite();
  return (
    <html lang={site.locale}>
      <body>
        <noscript>
          <style>{`.reveal,.stagger>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
