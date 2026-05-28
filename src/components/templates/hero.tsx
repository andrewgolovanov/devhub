import type { ReactNode } from "react";

export function Hero(): ReactNode {
  return (
    <section className="bg-black py-20 text-white md:pt-24 md:pb-24 lg:pt-36 xl:pt-40 lg:pb-29">
      <div className="relative mx-auto flex flex-col w-full max-w-400 gap-6 px-5 md:px-8">
        <h1 className="max-w-330 font-sans text-4xl leading-[0.98] font-normal tracking-normal text-balance md:text-6xl 2xl:text-8xl">
          <span className="text-db-lava xl:ml-36 2xl:ml-50">Templates.</span>{" "}
          <span>[Jumpstart your next Databricks app]</span>
        </h1>
        <p className="max-w-md text-base leading-tight tracking-normal text-grey-80 xl:max-w-2xs xl:absolute xl:right-8 xl:-bottom-1 2xl:max-w-68 min-[100rem]:max-w-79">
          Use each template step by step, or copy it as a prompt for your coding
          agent to build for you.
        </p>
      </div>
    </section>
  );
}
