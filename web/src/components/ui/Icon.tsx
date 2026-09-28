import type { SVGProps } from "react";
import type { IconName } from "@/lib/types";

/**
 * Ícones do site (mesmos traços do mockup). O conteúdo em JSON referencia
 * ícones pelo nome, então quem editar pelo painel escolhe de uma lista.
 */

type Props = SVGProps<SVGSVGElement> & { name: IconName };

const stroke = {
  fill: "none",
  stroke: "currentColor",
} as const;

export function Icon({ name, ...props }: Props) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: false, ...props } as const;

  switch (name) {
    case "arrow-right":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2.4}>
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2.3}>
          <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2.4}>
          <path
            d="M8 2v4M16 2v4M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "plus":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2.2}>
          <path d="M3 12h18M12 3v18" strokeLinecap="round" />
        </svg>
      );
    case "flask":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2.2}>
          <path d="M9 3h6M10 3v6L5 18a3 3 0 0 0 2.7 4.3h8.6A3 3 0 0 0 19 18l-5-9V3" strokeLinejoin="round" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2.2}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" strokeLinecap="round" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2}>
          <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10Z" strokeLinejoin="round" />
          <circle cx="12" cy="11" r="2.2" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" strokeLinecap="round" />
        </svg>
      );
    case "map":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2}>
          <path d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3Z" strokeLinejoin="round" />
          <path d="M9 3v15M15 6v15" />
        </svg>
      );
    case "certificate":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2}>
          <path d="M4 4h16v12H4z" strokeLinejoin="round" />
          <path d="M8 20h8M12 16v4" strokeLinecap="round" />
          <circle cx="12" cy="10" r="2.4" />
        </svg>
      );
    case "report":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2}>
          <path d="M6 3h9l4 4v14H6z" strokeLinejoin="round" />
          <path d="M14 3v5h5M9 13h6M9 17h6" strokeLinecap="round" />
        </svg>
      );
    case "code":
      return (
        <svg {...common} {...stroke} strokeWidth={props.strokeWidth ?? 2}>
          <path d="m9 8-4 4 4 4M15 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common} fill="currentColor">
          <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm.4 2 8.6 6 8.6-6H3.4Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.4.68.8.9 1.4.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.42-.8.68-1.4.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.4-.68-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.7.07-.9.04-1.4.2-1.7.32-.42.17-.72.36-1 .66-.3.28-.5.58-.66 1-.12.3-.28.8-.32 1.7C3.6 8.5 3.6 8.9 3.6 12s0 3.5.07 4.7c.04.9.2 1.4.32 1.7.17.42.36.72.66 1 .28.3.58.5 1 .66.3.12.8.28 1.7.32 1.2.06 1.6.07 4.7.07s3.5 0 4.7-.07c.9-.04 1.4-.2 1.7-.32.42-.17.72-.36 1-.66.3-.28.5-.58.66-1 .12-.3.28-.8.32-1.7.06-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.04-.9-.2-1.4-.32-1.7a2.7 2.7 0 0 0-.66-1c-.28-.3-.58-.5-1-.66-.3-.12-.8-.28-1.7-.32C15.5 4 15.1 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.15-.6a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M14 8.5h2.2V5.6c-.4-.05-1.4-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3v2.3H7.3v3.1h2.3V22h3.2v-6.8h2.3l.4-3.1h-2.7V9.8c0-.9.24-1.3 1.5-1.3Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} fill="currentColor">
          <path d="M22 8.2a2.6 2.6 0 0 0-1.8-1.8C18.6 6 12 6 12 6s-6.6 0-8.2.4A2.6 2.6 0 0 0 2 8.2 27 27 0 0 0 1.6 12 27 27 0 0 0 2 15.8a2.6 2.6 0 0 0 1.8 1.8C5.4 18 12 18 12 18s6.6 0 8.2-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22.4 12 27 27 0 0 0 22 8.2ZM10 15V9l5.2 3L10 15Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common} fill="currentColor">
          <path d="M16.5 3c.3 2.2 1.6 3.7 3.8 3.9v2.4c-1.3.1-2.5-.3-3.8-1v5.7c0 4-3 6.2-6.2 5.9-3-.3-4.9-2.8-4.6-5.6.3-2.7 2.7-4.6 5.4-4.3.2 0 .4 0 .6.1v2.5c-.2-.06-.5-.1-.7-.1-1.3-.1-2.5.8-2.6 2-.1 1.3.8 2.4 2 2.5 1.3.1 2.5-.8 2.5-2.3V3h3.2Z" />
        </svg>
      );
  }
}

/** Frasco colorido do badge "UFMG" no hero (ilustração, não ícone de linha). */
export function FlaskMini(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden focusable={false} {...props}>
      <path
        d="M20 6h8M22 6v11L12 34a5 5 0 0 0 4.4 7.5h15.2A5 5 0 0 0 36 34L26 17V6"
        stroke="#69BC45"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <circle cx="21" cy="30" r="2" fill="#69BC45" />
      <circle cx="27" cy="34" r="1.6" fill="#02A896" />
    </svg>
  );
}
