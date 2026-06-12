import Head from "@docusaurus/Head";
import { MDXProvider } from "@mdx-js/react";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";
import { BaseUrlAnchor } from "@/components/base-url-anchor";
import { Faq, type HackathonFaqItem } from "@/components/hackathon/faq";
import CTA from "@/components/home/cta";
import { MarkdownProse } from "@/components/markdown-prose";
import NewFooter from "@/components/theme/footer";
import { BackLink } from "@/components/ui/back-link";
import SetupContent from "@site/content/hackathon/free-edition-setup.md";

/**
 * Free Edition setup guide for the hackathon. Served at
 * `/hackathon/free-edition-setup` and linked from the event page's Resources
 * section. Like the event pages, this is non-indexed; entry is via the
 * hackathon page. Wording follows the "Free Edition Setup" tab of the
 * hackathon challenge doc.
 */

const pageComponents = { a: BaseUrlAnchor };
const inlineLink =
  "font-medium text-db-lava underline underline-offset-2 hover:text-db-lava-dark";

const faqs: HackathonFaqItem[] = [
  {
    question: "Can I use my company or enterprise Databricks account?",
    answer:
      "Please don't. Use Free Edition so every team is working under the same platform constraints.",
  },
  {
    question: "What if I already have a Free Edition account?",
    answer:
      "Use it. You do not need to create a new one unless your existing workspace is blocked, out of resources, or tied up with other work.",
  },
  {
    question: "What if I cannot get into my Free Edition account?",
    answer:
      "Create a new Free Edition account with another email address or email alias.",
  },
  {
    question:
      "What if my existing Free Edition account has resources running that I do not want to tear down?",
    answer:
      "Create a separate Free Edition account for the hackathon using another email address or alias.",
  },
  {
    question: "What if I use up my Free Edition credits or quota?",
    answer: (
      <p>
        While the default credit limits are generous, we can add credits if
        needed. If you hit a limit during the hackathon, simply post your
        account ID in the #get-databricks-credits{" "}
        <a
          href="https://discord.com/invite/bedRGCjFq"
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          Discord
        </a>{" "}
        channel.
      </p>
    ),
  },
  {
    question: "What limits should I expect?",
    answer:
      "Free Edition is serverless-only and quota-limited. Plan to build efficiently, stop unused workloads, and avoid long-running jobs where possible.",
  },
  {
    question: "Can I add teammates to my Free Edition workspace?",
    answer: (
      <p>
        Yes, teammates can be added to your workspace for collaboration. This{" "}
        <a
          href="https://www.youtube.com/watch?v=eA1SZvKiCfk"
          target="_blank"
          rel="noopener noreferrer"
          className={inlineLink}
        >
          step-by-step video
        </a>{" "}
        shows you how.
      </p>
    ),
  },
];

export default function FreeEditionSetupPage(): ReactNode {
  return (
    <Layout
      title="Set up Databricks Free Edition"
      description="How to set up Databricks Free Edition for the hackathon: create your account, work locally, and get your team ready to build and demo."
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
                Set up Databricks Free Edition
              </h1>
              <p className="mt-4 text-base leading-snug text-pretty tracking-[-0.04em] text-grey-90 md:text-lg">
                Build and demo your hackathon project on Databricks Free
                Edition. Here&rsquo;s how to get your account and team set up.
              </p>

              <div className="mt-12 max-w-[46rem] md:mt-16">
                <MDXProvider components={pageComponents}>
                  <MarkdownProse variant="dark">
                    <SetupContent />
                  </MarkdownProse>
                </MDXProvider>
              </div>
            </article>
          </div>
        </section>

        <div className="h-8 bg-orange md:h-14" aria-hidden="true" />

        <div className="bg-[#F9F7F4]">
          <Faq title="Frequently asked questions" items={faqs} theme="light" />
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
