"use client";

import { useRef, useState } from "react";
import { Share2 } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { ShareDialog } from "@/components/share/ShareDialog";
import type { ShareConfig } from "@/lib/share";
import { cn } from "@/lib/utils";

/** Build props with `getProductShare(product)` or `getLineupShare(products)`. */
export interface ShareButtonProps extends ShareConfig {
  variant?: "pill" | "icon";
  label?: string;
  className?: string;
}

/**
 * Share trigger. Opens a dialog with a product preview, copy link, social
 * targets and (where supported) the device's native share sheet.
 */
export function ShareButton({ path, title, text, preview, variant = "pill", label = "Share", className }: ShareButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [url, setUrl] = useState<string | null>(null);

  const open = () => {
    // Resolve against the live origin so sharing works on any deployment.
    setUrl(new URL(path, window.location.origin).toString());
    dialogRef.current?.showModal();
  };

  const accessibleLabel = `${label} ${preview.name}`;

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={open}
          aria-label={accessibleLabel}
          aria-haspopup="dialog"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-colors hover:border-accent hover:bg-accent hover:text-black",
            className,
          )}
        >
          <Share2 aria-hidden="true" className="size-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          className={cn(buttonClasses({ variant: "secondary" }), className)}
        >
          <Share2 aria-hidden="true" className="size-4" />
          {label}
          <span className="sr-only"> {preview.name}</span>
        </button>
      )}

      <ShareDialog ref={dialogRef} url={url} title={title} text={text} preview={preview} />
    </>
  );
}
