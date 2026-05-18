import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getBootstrapPromptApiPath } from "@/lib/bootstrap-prompt";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Check, Copy, LoaderCircle } from "lucide-react";
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
        <Copy className="size-4 rotate-180" aria-hidden="true" />
      )}
    </Button>
  );
}

function HeroTitleHighlight({ children }: { children: string }) {
  const cornerClassName =
    "absolute hidden size-3 md:block before:absolute before:top-0 before:left-1/2 before:h-full before:w-px before:-translate-x-1/2 before:bg-white/50 after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:-translate-y-1/2 after:bg-white/50";

  return (
    <span className="relative inline-block text-db-lava md:whitespace-nowrap">
      <span
        className="pointer-events-none absolute -inset-x-2 -inset-y-1 hidden border border-white/14 md:block"
        aria-hidden="true"
      />
      <span
        className={cn(cornerClassName, "-top-2.5 -left-3.5")}
        aria-hidden="true"
      />
      <span
        className={cn(cornerClassName, "-top-2.5 -right-3.5")}
        aria-hidden="true"
      />
      <span
        className={cn(cornerClassName, "-bottom-2.5 -left-3.5")}
        aria-hidden="true"
      />
      <span
        className={cn(cornerClassName, "-right-3.5 -bottom-2.5")}
        aria-hidden="true"
      />
      <span className="relative">{children}</span>
    </span>
  );
}

function Hero({ className }: HeroProps) {
  return (
    <section
      className={cn("hero relative block bg-black text-white", className)}
    >
      <div className="relative min-h-[36rem] w-full overflow-hidden md:min-h-[44rem] xl:min-h-286">
        <div className="absolute top-0 left-1/2 h-full w-screen -translate-x-1/2">
          <DbHeroAnimation />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[74%] bg-linear-to-b from-transparent from-20% to-black/95 md:from-40% md:to-black/92 xl:from-58%" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent to-black to-60%" />
        </div>
        <header className="pointer-events-none relative z-10 flex min-h-[36rem] flex-col justify-end py-14 md:min-h-[44rem] md:py-16 xl:min-h-286 xl:py-16">
          <div className="pointer-events-auto mx-auto grid w-full max-w-400 grid-cols-1 px-5 md:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-7">
            <h1 className="max-w-sm md:max-w-4xl pb-1 font-heading text-[2rem]/[0.98] tracking-normal text-white md:text-6xl/none lg:max-xl:text-5xl/[0.96] xl:text-7xl/none">
              Build{" "}
              <HeroTitleHighlight>agentic applications</HeroTitleHighlight> in
              minutes, not months.
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
