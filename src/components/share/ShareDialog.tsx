"use client";

import Image from "next/image";
import { useState, useSyncExternalStore, type ComponentType, type Ref, type SVGProps } from "react";
import { Check, Copy, Mail, Share, X } from "lucide-react";
import {
  FacebookIcon,
  LinkedInIcon,
  TelegramIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/ui/BrandIcons";
import { getShareTargets, type SharePreview, type ShareTargetId } from "@/lib/share";
import { accentStyle, cn } from "@/lib/utils";

interface ShareDialogProps {
  ref: Ref<HTMLDialogElement>;
  url: string | null;
  title: string;
  text: string;
  preview: SharePreview;
}

const icons: Record<ShareTargetId, ComponentType<SVGProps<SVGSVGElement>>> = {
  whatsapp: WhatsAppIcon,
  facebook: FacebookIcon,
  x: XIcon,
  telegram: TelegramIcon,
  linkedin: LinkedInIcon,
  email: Mail,
};

const noopSubscribe = () => () => {};

/** `navigator.share` support, read without a hydration mismatch. */
function useCanNativeShare() {
  return useSyncExternalStore(
    noopSubscribe,
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
    () => false,
  );
}

export function ShareDialog({ ref, url, title, text, preview }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const canNativeShare = useCanNativeShare();
  const titleId = `share-title-${preview.name.replace(/\W+/g, "-").toLowerCase()}`;

  const closeDialog = (dialog: HTMLDialogElement | null) => {
    dialog?.close();
    setCopied(false);
  };

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (permissions / insecure context): select the field instead.
      const input = document.getElementById(`${titleId}-url`);
      if (input instanceof HTMLInputElement) input.select();
    }
  };

  const nativeShare = async () => {
    if (!url) return;
    try {
      await navigator.share({ title, text, url });
    } catch {
      // User dismissed the native sheet: nothing to do.
    }
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      style={accentStyle(preview.color)}
      onClick={(event) => {
        // Clicking the backdrop (the dialog element itself) closes it.
        if (event.target === event.currentTarget) closeDialog(event.currentTarget);
      }}
      onClose={() => setCopied(false)}
      className={cn(
        "m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-3xl border border-white/10 bg-core8-dark p-0 text-white shadow-2xl",
        "max-sm:mb-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-b-none",
        "backdrop:bg-black/75 backdrop:backdrop-blur-sm",
        "translate-y-6 opacity-0 transition-[opacity,translate,display,overlay] transition-discrete duration-300 open:translate-y-0 open:opacity-100 starting:open:translate-y-6 starting:open:opacity-0 motion-reduce:transition-none",
      )}
    >
      {url ? (
        <div className="relative">
          <button
            type="button"
            onClick={(event) => closeDialog(event.currentTarget.closest("dialog"))}
            aria-label="Close share dialog"
            className="absolute end-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white hover:text-black"
          >
            <X aria-hidden="true" className="size-5" />
          </button>

          {/* Preview card */}
          <div className="relative flex h-56 items-end justify-center overflow-hidden bg-black">
            <div
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/4 rounded-full bg-accent opacity-35 blur-3xl"
            />
            <div className="relative flex items-end justify-center -space-x-6 pb-0">
              {preview.images.map((image, index) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={preview.images.length > 1 ? "" : image.alt}
                  width={image.width}
                  height={image.height}
                  className={cn(
                    "w-auto drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]",
                    preview.images.length > 1 ? "h-36" : "h-52",
                    preview.images.length > 1 && index % 2 === 1 && "h-32",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-7">
            {preview.eyebrow ? (
              <p className="text-[0.65rem] font-semibold tracking-[0.3em] text-accent uppercase">{preview.eyebrow}</p>
            ) : null}
            <h2 id={titleId} className="mt-2 font-display text-3xl font-extrabold uppercase [font-stretch:85%]">
              Share {preview.name}
            </h2>
            <p className="mt-1 text-sm text-core8-gray">{preview.subtitle}</p>

            <ul className="mt-6 grid grid-cols-3 gap-2" aria-label="Share on">
              {getShareTargets({ url, title, text }).map((target) => {
                const Icon = icons[target.id];
                return (
                  <li key={target.id}>
                    <a
                      href={target.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 px-2 py-3.5 text-xs text-core8-muted transition-colors hover:border-accent hover:text-white"
                    >
                      <Icon className="size-5" />
                      {target.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex items-center gap-2 rounded-full border border-white/10 bg-black p-1.5 ps-4">
              <label htmlFor={`${titleId}-url`} className="sr-only">
                Link to share
              </label>
              <input
                id={`${titleId}-url`}
                readOnly
                value={url}
                onFocus={(event) => event.currentTarget.select()}
                className="min-w-0 flex-1 bg-transparent text-sm text-core8-muted outline-none"
              />
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 text-xs font-semibold tracking-wider text-black uppercase transition-colors hover:bg-white"
              >
                {copied ? <Check aria-hidden="true" className="size-4" /> : <Copy aria-hidden="true" className="size-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p role="status" className="sr-only">
              {copied ? "Link copied to clipboard" : ""}
            </p>

            {canNativeShare ? (
              <button
                type="button"
                onClick={nativeShare}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-xs font-semibold tracking-[0.14em] uppercase transition-colors hover:border-white"
              >
                <Share aria-hidden="true" className="size-4" />
                More sharing options
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
