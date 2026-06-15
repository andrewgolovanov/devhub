import Head from "@docusaurus/Head";
import { MDXProvider } from "@mdx-js/react";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";
import { BaseUrlAnchor } from "@/components/base-url-anchor";
import CTA from "@/components/home/cta";
import { MarkdownProse } from "@/components/markdown-prose";
import NewFooter from "@/components/theme/footer";
import { BackLink } from "@/components/ui/back-link";
import ChallengeContent from "@site/content/hackathon/challenge.md";

/**
 * Hackathon challenge prompt. Served at `/hackathon/challenge` and linked from
 * the event page's Resources section. Like the other hackathon pages, this is
 * non-indexed; entry is via the hackathon page.
 */

const pageComponents = { a: BaseUrlAnchor };

export default function ChallengePage(): ReactNode {
  return (
    <Layout
      title="Hackathon challenge"
      description="The full hackathon challenge prompt: build a Databricks App that turns messy healthcare facility data into trustworthy decisions, with a dataset overview and four tracks to pick from."
      noFooter
    >
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="bg-black text-white">
        <section className="pt-9 pb-24 md:pt-12 xl:pt-17.5 lg:pb-40">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <article>
              <BackLink to="/hackathon" className="tracking-tight">
                Back to the hackathon
              </BackLink>

              <h1 className="mt-6 text-[2rem]/[1.125] font-normal tracking-[-0.04em] wrap-break-word text-white md:text-[2.5rem]/[1.125] lg:text-[3rem]/[1.125] xl:text-[3.5rem]/[1.125]">
                The challenge
              </h1>
              <p className="mt-4 text-base leading-snug text-pretty tracking-[-0.04em] text-grey-90 md:text-lg">
                Build a Databricks App that turns messy healthcare facility data
                into decisions a non-technical planner can trust. Read the full
                prompt, dataset overview, and the four tracks below.
              </p>

              <div className="mt-12 max-w-184 md:mt-16">
                <MDXProvider components={pageComponents}>
                  <MarkdownProse variant="dark">
                    <ChallengeContent />
                  </MarkdownProse>
                </MDXProvider>
              </div>
            </article>
          </div>
        </section>

        <div className="h-8 bg-orange md:h-14" aria-hidden="true" />

        <div className="bg-[#F9F7F4]">
          <CTA
            label="Start building"
            title="Ready to ship your next agentic app in minutes?"
            className="mx-auto max-w-432 border border-grey-20 pb-16 md:pb-22 mt-24 pt-1.5 md:mt-36 lg:mt-46.5"
          />
          <NewFooter className="mx-auto max-w-432 border-x border-b border-grey-20" />
        </div>
      </main>
    </Layout>
  );
}
