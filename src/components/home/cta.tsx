import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { track } from "@vercel/analytics";
import { Check, Copy, LoaderCircle } from "lucide-react";
import { type ReactNode, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { TitleCross } from "@/components/title-cross";
import { getBootstrapPromptApiPath } from "@/lib/bootstrap-prompt";
import { cn } from "@/lib/utils";

const TOPBAR_DOTS = ["bg-db-lava", "bg-yellow-400", "bg-green-500"] as const;

const TITLE_HIGHLIGHT = "agentic app";

type CopyState = "idle" | "copying" | "copied";
type CTATheme = "filled" | "outline";

type CTAProps = {
  label?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
  theme?: CTATheme;
};

function titleSegments(title: string): {
  before: string;
  highlight: string;
  after: string;
} {
  const highlightStart = title.indexOf(TITLE_HIGHLIGHT);

  if (highlightStart === -1) {
    return {
      before: title,
      highlight: "",
      after: "",
    };
  }

  return {
    before: title.slice(0, highlightStart),
    highlight: title.slice(
      highlightStart,
      highlightStart + TITLE_HIGHLIGHT.length,
    ),
    after: title.slice(highlightStart + TITLE_HIGHLIGHT.length),
  };
}

function CTATitleHighlight({ children }: { children: string }) {
  return (
    <span className="relative inline-block text-db-lava md:whitespace-nowrap">
      <span
        className="pointer-events-none absolute -inset-x-0.5 inset-y-0 hidden border border-grey-20 md:block"
        aria-hidden="true"
      />
      <TitleCross className="-top-2 -left-2.25" />
      <TitleCross className="-top-2 -right-2.25" />
      <TitleCross className="-bottom-2 -left-2.25" />
      <TitleCross className="-bottom-2 -right-2.25" />
      <span className="relative">{children}</span>
    </span>
  );
}

function Topbar({ theme }: { theme: CTATheme }) {
  return (
    <header
      className={cn(
        "flex items-center gap-x-4.5 md:gap-x-6.5 py-4.5 px-6.5",
        theme === "outline"
          ? "border-y border-grey-20 bg-black"
          : "mx-1.5 bg-[#202021]",
      )}
    >
      <div
        className="flex items-center gap-2 md:gap-3 lg:gap-4"
        aria-hidden="true"
      >
        {TOPBAR_DOTS.map((dotClassName) => (
          <span
            className={cn(
              "size-2.5 md:size-3 lg:size-4 shrink-0",
              theme === "outline" && "border border-grey-20",
              dotClassName,
            )}
            key={dotClassName}
          />
        ))}
      </div>
      <p className="truncate font-mono text-sm leading-[1.15] font-normal tracking-[-0.04em] text-white/40 uppercase md:text-lg">
        Databricks Developer Hub
      </p>
    </header>
  );
}

function CTAButtons({
  copyState,
  onCopy,
}: {
  copyState: CopyState;
  onCopy: () => void;
}) {
  return (
    <div className="flex w-full flex-col gap-y-3 gap-x-5 sm:w-auto sm:flex-row sm:items-center lg:justify-end">
      <Button
        className="font-mono gap-x-4.5 text-base leading-none tracking-tight text-black uppercase shadow-none h-10 lg:h-11"
        onClick={onCopy}
        disabled={copyState === "copying"}
        title="Copy agent prompt"
        size="xl"
        type="button"
        variant="orange"
      >
        {copyState === "copied" ? "Copied" : "Copy agent prompt"}
        {copyState === "copying" ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : copyState === "copied" ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4 rotate-180" aria-hidden="true" />
        )}
      </Button>
      <Button
        className="h-10 lg:h-11 rounded-none bg-white px-7 font-mono text-base leading-none font-medium tracking-tight text-black uppercase shadow-none hover:bg-white/90"
        asChild
      >
        <Link className="no-underline hover:no-underline" to="/docs/start-here">
          Read docs
        </Link>
      </Button>
    </div>
  );
}

function CTA({
  className,
  label = "Start building",
  title = "Ready to ship your next agentic app in minutes?",
  actions,
  theme = "filled",
}: CTAProps) {
  const bootstrapPromptApiPath = useBaseUrl(getBootstrapPromptApiPath());
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const { before, highlight, after } = titleSegments(title);

  const handleCopy = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    setCopyState("copying");

    try {
      const response = await fetch(bootstrapPromptApiPath);
      if (!response.ok) throw new Error("Failed to fetch bootstrap prompt");

      const bootstrapPrompt = await response.text();
      await navigator.clipboard.writeText(bootstrapPrompt);
      setCopyState("copied");
      track("copy_bootstrap_prompt", { source: "cta" });
    } catch {
      setCopyState("idle");
    }
  }, [bootstrapPromptApiPath]);

  return (
    <section
      aria-label={label}
      className={cn("cta bg-black text-white pt-1.5", className)}
    >
      <Topbar theme={theme} />
      <div className="relative mx-auto px-5 md:px-8 lg:px-16 2xl:px-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end mt-10 md:mt-16 lg:mt-20">
          <h2 className="relative font-heading text-4xl/none font-normal tracking-normal text-balance text-white md:text-5xl/none xl:text-6xl/none 2xl:text-[5rem]">
            <span className="relative z-10">{before}</span>
            {highlight ? (
              <CTATitleHighlight>{highlight}</CTATitleHighlight>
            ) : null}
            <span className="relative z-10">{after}</span>
          </h2>

          {actions ?? <CTAButtons copyState={copyState} onCopy={handleCopy} />}
        </div>
      </div>
    </section>
  );
}

export default CTA;
