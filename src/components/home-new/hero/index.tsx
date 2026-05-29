import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getBootstrapPromptApiPath } from "@/lib/bootstrap-prompt";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Check, LoaderCircle } from "lucide-react";
import { useState } from "react";

import { DbHeroAnimation } from "./animation";

interface HeroProps {
  className?: string;
}

function HeroCopyPromptButton() {
  const apiPath = useBaseUrl(getBootstrapPromptApiPath());
  const [copyState, setCopyState] = useState<"idle" | "copying" | "copied">(
    "idle",
  );

  async function handleCopy() {
    setCopyState("copying");

    try {
      const response = await fetch(apiPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch bootstrap prompt: ${response.status}`);
      }

      const prompt = await response.text();
      await navigator.clipboard.writeText(prompt);
      setCopyState("copied");
    } catch {
      setCopyState("idle");
    }
  }

  return (
    <Button
      // inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 px-4 py-2 has-[>svg]:px-3 h-11 rounded-none bg-orange pl-7 pr-6 font-mono gap-x-4.5 text-base leading-none font-medium tracking-tight text-black uppercase shadow-none hover:bg-primary
      className="font-mono gap-x-4.5 text-base leading-none tracking-tight text-black uppercase shadow-none"
      onClick={handleCopy}
      disabled={copyState === "copying"}
      title="Copy agent prompt"
      size="xl"
      variant="orange"
    >
      {copyState === "copied" ? "Copied" : "Copy agent prompt"}
      {copyState === "copying" ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      ) : copyState === "copied" ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Icons.copy className="size-3.5" aria-hidden="true" />
      )}
    </Button>
  );
}

function HeroTitleHighlight({ children }: { children: string }) {
  const cornerClassName =
    "absolute hidden size-4 md:block before:absolute before:top-0 before:left-1/2 before:h-full before:w-px before:-translate-x-1/2 before:bg-grey-60 after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:-translate-y-1/2 after:bg-grey-60";

  return (
    <span className="relative inline-block text-db-lava md:whitespace-nowrap">
      <span
        className="pointer-events-none absolute -inset-x-1.5 inset-y-0 hidden border border-grey-20 md:block"
        aria-hidden="true"
      />
      <span
        className={cn(cornerClassName, "-top-2 -left-3.5")}
        aria-hidden="true"
      />
      <span
        className={cn(cornerClassName, "-top-2 -right-3.5")}
        aria-hidden="true"
      />
      <span
        className={cn(cornerClassName, "-bottom-2 -left-3.5")}
        aria-hidden="true"
      />
      <span
        className={cn(cornerClassName, "-right-3.5 -bottom-2")}
        aria-hidden="true"
      />
      <span className="relative">{children}</span>
    </span>
  );
}

function Hero({ className }: HeroProps) {
  return (
    <section
      className={cn(
        "hero relative -mt-16 block bg-black text-white border-b border-grey-20",
        className,
      )}
    >
      <div className="relative flex flex-col justify-end min-h-[max(125vw,600px)] w-full overflow-hidden pb-16 sm:min-h-[max(100vw,700px)] md:min-h-200 md:pb-20 lg:min-h-240 xl:min-h-276 2xl:min-h-296 lg:pb-26">
        <div
          className="absolute top-8 left-[-20%] w-[150vw] aspect-2300/1144 sm:left-[-22%] md:top-8 md:w-5xl md:-left-34 lg:top-0 lg:w-400 lg:-left-58 xl:w-500 xl:-left-74 2xl:-translate-x-1/2 2xl:w-575 2xl:left-[max(50rem,50%)]"
          aria-hidden="true"
        >
          <DbHeroAnimation />
          <div className="absolute inset-x-0 top-0 pointer-events-none bg-linear-to-t from-transparent to-black h-16 lg:h-24" />
          <div className="absolute inset-x-0 bottom-0 pointer-events-none bg-linear-to-b from-transparent to-black h-1/3" />
          <div className="absolute inset-y-0 left-0 pointer-events-none bg-linear-to-l from-transparent via-black/90 via-80% to-black w-1/7" />
          <div className="absolute inset-y-0 right-0 pointer-events-none bg-linear-to-r from-transparent via-black/90 via-80% to-black w-1/7" />
        </div>
        <header className="pointer-events-none relative z-10 flex flex-col justify-end">
          <div className="pointer-events-auto mx-auto grid w-full max-w-400 grid-cols-1 px-5 md:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-7">
            <h1 className="max-w-md pb-1 font-heading text-3xl leading-none tracking-normal text-white md:max-w-4xl md:text-6xl md:leading-none lg:text-5xl/[0.96] xl:text-7xl/none">
              <span className="relative z-10">Build </span>
              <HeroTitleHighlight>agentic applications</HeroTitleHighlight>
              <br />
              <span className="relative z-10">
                in&nbsp;minutes, not months.
              </span>
            </h1>
            <p className="max-w-sm text-sm/tight tracking-normal mt-4 text-grey-80 md:text-base/tight lg:mt-0 lg:row-span-2">
              Open your agent in any folder and paste. Works with Cursor, Claude
              Code, Codex, or your favorite coding agent.
            </p>
            <div className="mt-6 flex flex-col gap-x-5 gap-y-3 sm:flex-row lg:mt-0">
              <Button
                className="h-11 rounded-none bg-white pl-7 pr-6 font-mono text-base leading-none font-medium tracking-tight text-black uppercase shadow-none hover:bg-white/90"
                asChild
              >
                <Link
                  className="no-underline hover:no-underline"
                  to="/docs/start-here"
                >
                  Read the docs
                </Link>
              </Button>
              <HeroCopyPromptButton />
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}

export default Hero;
