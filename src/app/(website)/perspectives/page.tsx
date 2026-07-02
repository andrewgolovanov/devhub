import type { ReactNode } from "react";
import Link from "next/link";

import { getMetadata } from "@/lib/get-metadata";
import { getPerspectiveEntries } from "@/lib/perspectives/perspective-entries";

export const metadata = getMetadata({
  title: "Perspectives",
  description:
    "Answers to common questions about building data apps and AI agents on Databricks.",
  pathname: "/perspectives",
});

export default function PerspectivesPage(): ReactNode {
  const entries = getPerspectiveEntries();

  return (
    <main className="border-t border-white/10 bg-black text-white">
      <section className="mx-auto w-full max-w-4xl px-5 py-12 md:px-8 md:py-16 lg:py-20">
        <header className="max-w-3xl">
          <span className="text-grey-50 m-0 block font-mono text-xs leading-none font-medium uppercase">
            Perspectives
          </span>
          <h1 className="font-heading md:leading-tighter lg:leading-tighter mt-5 max-w-4xl text-3xl leading-tight font-medium tracking-tight text-balance md:text-5xl lg:text-6xl">
            DevHub Perspectives
          </h1>
          <p className="text-muted-foreground mt-2.5 max-w-lg text-lg leading-snug tracking-tight text-pretty lg:mt-4">
            Answers to common questions about building data apps and AI agents
            on Databricks.
          </p>
        </header>

        <div
          className="mt-12 flex flex-col gap-y-3.5"
          aria-label="Perspective pages"
        >
          {entries.map((entry) => (
            <article className="flex items-start gap-x-3" key={entry.slug}>
              <span
                className="bg-grey-80 relative top-3 h-px w-2.5 shrink-0"
                aria-hidden="true"
              />
              <Link
                className="hover:text-orange focus-visible:outline-db-cyan block text-base/snug font-normal text-white no-underline transition-colors hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
                href={`/perspectives/${entry.slug}`}
              >
                {entry.question}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
