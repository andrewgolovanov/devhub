import type { ReactNode } from "react";

export function Hero(): ReactNode {
  return (
    <header className="hero-section mb-24 md:mb-28.5">
      <h1 className="font-heading m-0 max-w-232 text-[2.75rem] leading-[1.125] font-normal tracking-normal wrap-break-word text-white md:text-[4.5rem]">
        <span className="block">
          <span className="text-db-lava">Developer-first </span>
          guides
        </span>
        {` `}
        <span className="block">for building on Databricks</span>
      </h1>
    </header>
  );
}
