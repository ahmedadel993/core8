import type { SVGProps } from "react";

/**
 * Minimal brand glyphs (lucide-react v1 no longer ships brand icons).
 * All are decorative: pair them with visible text or an aria-label.
 */
type IconProps = SVGProps<SVGSVGElement>;

const defaults = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...defaults} fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.06.89.9-2.98-.2-.31a8.2 8.2 0 1 1 6.84 3.73Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M13.5 21v-7.5h2.53l.38-2.93H13.5V8.7c0-.85.24-1.43 1.45-1.43h1.55V4.65A20.8 20.8 0 0 0 14.24 4.5c-2.24 0-3.77 1.37-3.77 3.88v2.19H7.94v2.93h2.53V21h3.03Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M21.43 4.1 2.97 11.22c-1.26.5-1.25 1.2-.23 1.52l4.74 1.48 1.83 5.62c.22.62.11.86.76.86.5 0 .72-.23 1-.5l2.4-2.33 4.98 3.68c.92.5 1.58.25 1.81-.85l3.27-15.43c.34-1.34-.5-1.95-1.4-1.54l-.7.37ZM8.92 13.93l9.03-5.7c.45-.27.86-.12.52.18l-7.73 6.97-.3 3.2-1.52-4.65Z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 13.4c0-3.1-.67-5.16-4.27-5.16-1.73 0-2.89.95-3.36 1.85h-.05V8.5H9.52V20h3.37v-5.69c0-1.5.28-2.95 2.14-2.95 1.83 0 1.86 1.71 1.86 3.05V20h3.37l.18-6.6Z" />
    </svg>
  );
}
