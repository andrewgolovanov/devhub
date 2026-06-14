import type { ReactNode } from "react";

import { AnimatedArrowLink } from "@/components/ui/animated-arrow-link";

export function Hero(): ReactNode {
  return (
    <section
      id="templates-hero"
      className="bg-black py-8 text-white md:py-12 lg:pt-18 lg:pb-[3.625rem] xl:pt-40 xl:pb-29"
    >
      <div className="relative mx-auto flex w-full max-w-400 flex-col gap-2 px-5 md:gap-5 md:px-8 lg:gap-6">
        <h1 className="max-w-330 font-sans text-3xl/[1.125] font-normal tracking-normal text-balance md:text-5xl/[1.125] lg:text-6xl/[1.125] xl:text-7xl/[1.125]">
          <span className="inline md:block xl:ml-36 2xl:ml-50">
            <span className="text-db-lava">Templates</span>{" "}
            <span className="text-white">to jumpstart</span>
          </span>{" "}
          <span className="inline text-white md:block">
            your next Databricks app.
          </span>
        </h1>
        <div className="flex flex-col gap-3 xl:absolute xl:right-8 xl:-bottom-1 xl:pb-2 2xl:pb-3">
          <p className="max-w-md text-base leading-tight tracking-normal text-grey-80 xl:max-w-2xs 2xl:max-w-68 min-[100rem]:max-w-79">
            Copy any template as a prompt for your coding agent to build for
            you.
          </p>
          <AnimatedArrowLink
            to="/docs/templates"
            className="inline-flex w-fit items-center gap-2 font-sans text-base font-normal tracking-tight text-orange no-underline transition-colors hover:text-db-lava md:text-lg"
            size="size-4 md:size-5"
          >
            New to templates? Learn more here
          </AnimatedArrowLink>
        </div>
      </div>
    </section>
  );
}
