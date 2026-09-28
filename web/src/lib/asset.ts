/**
 * Prefixa caminhos de arquivos em `public/` com o basePath do build.
 *
 * O Next aplica o basePath sozinho em links, scripts e no favicon, mas não
 * em caminhos de imagem que vêm como texto (os `src` dos JSONs de conteúdo).
 * Sem isso, no GitHub Pages (servido em /1000fc-site) as imagens quebram.
 * URLs absolutas (ex.: vindas de um CMS no futuro) passam intactas.
 */
export function asset(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
