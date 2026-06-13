import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { TitleCross } from "@/components/title-cross";
import { Button } from "@/components/ui/button";
import { getBootstrapPromptApiPath } from "@/lib/bootstrap-prompt";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { track } from "@vercel/analytics";
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
      track("copy_bootstrap_prompt", { source: "hero" });
    } catch {
      setCopyState("idle");
    }
  }

  return (
    <Button
      className="h-10 font-mono gap-x-4.5 text-base leading-none tracking-tight text-black uppercase shadow-none lg:h-11"
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
  return (
    <span className="relative inline-block text-db-lava md:whitespace-nowrap">
      <span
        className="pointer-events-none absolute -inset-x-1.5 inset-y-0 hidden border border-grey-20 md:block"
        aria-hidden="true"
      />
      <TitleCross className="-top-2 -left-3.5" />
      <TitleCross className="-top-2 -right-3.5" />
      <TitleCross className="-bottom-2 -left-3.5" />
      <TitleCross className="-bottom-2 -right-3.5" />
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
      <div className="relative flex flex-col justify-end min-h-[max(125vw,660px)] w-full overflow-hidden pb-16 sm:min-h-[max(100vw,700px)] md:min-h-200 md:pb-20 lg:min-h-[max(min(calc(100vh-2rem),1000px),700px)] lg:pb-[min(5vh,6.5rem)] xl:min-h-[max(min(calc(100vh-2rem),1000px),700px)] 2xl:min-h-[max(min(calc(100vh-2rem),1200px),800px)]">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bottom-0 md:top-8 w-full max-w-400 px-5 md:px-8 lg:top-0">
          <div
            className="absolute top-0 left-[-20%] w-[150vw] aspect-2300/1144 sm:left-[-23%] md:w-5xl md:-left-38 lg:h-[max(min(85vh,800px),640px)] lg:left-0 lg:-translate-x-[14.5%] lg:w-auto xl:h-[max(min(90vh,1024px),640px)] 2xl:h-[max(min(95vh,1144px),640px)]"
            aria-hidden="true"
          >
            <DbHeroAnimation />
            <div className="absolute inset-x-0 top-0 pointer-events-none bg-linear-to-t from-transparent to-black h-16 lg:h-24" />
            <div className="absolute inset-x-0 bottom-0 pointer-events-none bg-linear-to-b from-transparent to-black h-1/3" />
            <div className="absolute inset-y-0 left-0 pointer-events-none bg-linear-to-l from-transparent via-black/90 via-80% to-black w-1/7" />
            <div className="absolute inset-y-0 right-0 pointer-events-none bg-linear-to-r from-transparent via-black/90 via-80% to-black w-1/7" />
          </div>
        </div>
        <div
          className="block h-14 md:h-16 lg:h-10 xl:hidden"
          aria-hidden="true"
        />
        <header className="pointer-events-none relative z-10 flex flex-col justify-end">
          <div className="pointer-events-auto mx-auto grid w-full max-w-400 grid-cols-1 px-5 md:px-8 xl:grid-cols-[1fr_auto] xl:items-end xl:gap-7">
            <h1 className="max-w-md md:max-w-4xl pb-1 font-heading text-4xl/none tracking-normal text-white md:text-5xl/none lg:text-[64px]/none 2xl:text-7xl/none">
              <span className="relative z-10">Build </span>
              <HeroTitleHighlight>agentic applications</HeroTitleHighlight>
              <br />
              <span className="relative z-10">
                in&nbsp;minutes, not months.
              </span>
            </h1>
            <p className="order-last max-w-sm text-base/tight tracking-normal mt-4 text-grey-80 xl:order-0 xl:mt-0 xl:row-span-2">
              Open your agent in any folder and paste. Works with Cursor, Claude
              Code, Codex, or your favorite coding agent.
            </p>
            <div className="mt-4.5 flex flex-col gap-x-5 gap-y-3 sm:flex-row md:mt-5 lg:mt-6 xl:mt-0">
              <Button
                className="h-10 rounded-none bg-white px-7 font-mono text-base leading-none font-medium tracking-tight text-black uppercase shadow-none hover:bg-white/90 lg:h-11"
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
