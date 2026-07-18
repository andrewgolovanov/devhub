"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

declare global {
  interface Window {
    OneTrust?: { ToggleInfoDisplay: () => void };
  }
}

/**
 * The legally required "Your Privacy Choices" footer link with the GPC icon,
 * matching www.databricks.com. Opens the OneTrust preference center when the
 * consent scripts are loaded (production/previews, see src/lib/onetrust.ts);
 * a no-op in local dev where they are off.
 */
export function YourPrivacyChoicesLink({ className }: { className?: string }) {
  return (
    <a
      href="#yourprivacychoices"
      className={cn("inline-flex items-center gap-1.5", className)}
      onClick={(event) => {
        event.preventDefault();
        window.OneTrust?.ToggleInfoDisplay();
      }}
    >
      Your Privacy Choices
      <Image
        src="/img/gpc-icon.png"
        alt=""
        className="h-3.5 w-auto"
        width={75}
        height={36}
        loading="lazy"
      />
    </a>
  );
}
