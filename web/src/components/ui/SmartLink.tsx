import NextLink from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  /** Força abrir em nova aba. Por padrão, links http(s) externos já abrem. */
  external?: boolean;
  children: ReactNode;
};

/**
 * Link único para o conteúdo vindo dos JSONs.
 * - "/rota" → next/link (navegação no cliente e basePath do GitHub Pages)
 * - "http..." → <a> em nova aba
 * - "mailto:", "#ancora" → <a> comum
 */
export function SmartLink({ href, external, children, ...rest }: Props) {
  if (href.startsWith("/")) {
    return (
      <NextLink href={href} {...rest}>
        {children}
      </NextLink>
    );
  }
  const newTab = external ?? /^https?:\/\//.test(href);
  return (
    <a href={href} {...(newTab ? { target: "_blank", rel: "noopener" } : {})} {...rest}>
      {children}
    </a>
  );
}
