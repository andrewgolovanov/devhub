import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { ArrowLeft, HelpCircle } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Free Edition setup guide for the hackathon. Served at
 * `/hackathon/free-edition-setup` and linked from the event page's Resources
 * section. Like the event pages, this is non-indexed; entry is via the
 * hackathon page. Wording follows the "Free Edition Setup" tab of the
 * hackathon challenge doc.
 */

const inlineLink =
  "font-medium text-db-lava underline underline-offset-2 hover:text-db-lava-dark";
// Lists hug the lead-in line above them (small top margin) while their items
// keep a little breathing room between each other.
const bulletList = "m-0 mt-1 list-disc space-y-1 pl-5";
const strong = "font-semibold text-black dark:text-white";

type SetupStep = { title: string; body: ReactNode };

const steps: SetupStep[] = [
  {
    title: "1. Create or use a Free Edition account",
    body: (
      <>
        <p className="m-0">
          Start here:{" "}
          <a
            href="https://www.databricks.com/learn/free-edition"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            https://www.databricks.com/learn/free-edition
          </a>
        </p>
        <p className="m-0 mt-2">
          Click <strong className={strong}>Sign up for Free Edition</strong>.
        </p>
        <p className="m-0 mt-2">
          If you already have a Free Edition account, you may use it for the
          hackathon.
        </p>
        <p className="m-0 mt-2">
          Please do <strong className={strong}>not</strong> use an enterprise
          Databricks workspace or paid organizational account for your
          submission. To keep the challenge fair, teams should build and demo on
          Free Edition.
        </p>
      </>
    ),
  },
  {
    title: "2. Work locally when it helps",
    body: (
      <>
        <p className="m-0">
          For app development, we recommend iterating locally when possible,
          then deploying to Free Edition regularly.
        </p>
        <p className="m-0 mt-3">A practical workflow is:</p>
        <ul className={bulletList}>
          <li>Build and test the frontend or app code locally.</li>
          <li>
            Use Free Edition for Databricks-specific pieces such as data access,
            SQL, model serving, Vector Search, Lakebase, and the deployed
            Databricks App.
          </li>
          <li>
            Deploy early at least once, then continue iterating locally and
            redeploying as needed.
          </li>
        </ul>
        <p className="m-0 mt-3">
          This helps conserve Free Edition resources and keeps your final demo
          close to the deployed environment.
        </p>
      </>
    ),
  },
  {
    title: "3. Collaborate with your team",
    body: (
      <>
        <p className="m-0">
          Each teammate should have their own Free Edition workspace and can use
          it for exploration, prototyping, notebooks, local app development, and
          experiments.
        </p>
        <p className="m-0 mt-2">
          As the project becomes more concrete, choose one teammate&rsquo;s Free
          Edition workspace as the team&rsquo;s{" "}
          <strong className={strong}>final demo workspace</strong>. This is
          where the shared dataset, deployed Databricks App, and final demo
          state should live.
        </p>
        <p className="m-0 mt-3">Suggested team setup:</p>
        <ul className={bulletList}>
          <li>
            Everyone creates or uses their own Free Edition workspace for
            individual development.
          </li>
          <li>
            Keep source code in Git so teammates can share changes across
            workspaces.
          </li>
          <li>
            Pick one final demo workspace early enough to avoid last-minute
            migration work.
          </li>
          <li>
            Invite teammates to the final demo workspace if they need to inspect
            data, run notebooks, or help deploy the app. Watch a{" "}
            <a
              href="https://www.youtube.com/watch?v=eA1SZvKiCfk"
              target="_blank"
              rel="noopener noreferrer"
              className={inlineLink}
            >
              step-by-step video
            </a>{" "}
            on adding teammates to your Free Edition workspace.
          </li>
          <li>Decide who owns the final deployment before demo time.</li>
        </ul>
      </>
    ),
  },
];

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Can I use my company or enterprise Databricks account?",
    a: "Please don't. Use Free Edition so every team is working under the same platform constraints.",
  },
  {
    q: "What if I already have a Free Edition account?",
    a: "Use it. You do not need to create a new one unless your existing workspace is blocked, out of resources, or tied up with other work.",
  },
  {
    q: "What if I cannot get into my Free Edition account?",
    a: "Create a new Free Edition account with another email address or email alias.",
  },
  {
    q: "What if my existing Free Edition account has resources running that I do not want to tear down?",
    a: "Create a separate Free Edition account for the hackathon using another email address or alias.",
  },
  {
    q: "What if I use up my Free Edition credits or quota?",
    a: (
      <>
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
      </>
    ),
  },
  {
    q: "What limits should I expect?",
    a: "Free Edition is serverless-only and quota-limited. Plan to build efficiently, stop unused workloads, and avoid long-running jobs where possible.",
  },
  {
    q: "Can I add teammates to my Free Edition workspace?",
    a: (
      <>
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
      </>
    ),
  },
];

export default function FreeEditionSetupPage(): ReactNode {
  return (
    <Layout
      title="Set up Databricks Free Edition"
      description="How to set up Databricks Free Edition for the hackathon: create your account, work locally, and get your team ready to build and demo."
    >
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="border-t border-db-cyan/30 bg-db-bg dark:border-db-cyan/25 dark:bg-[#0d1a1f]">
        <section className="container px-4 pt-16 pb-10 md:pt-20 md:pb-12">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/hackathon"
              className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-db-lava no-underline hover:underline"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
              Back to the hackathon
            </Link>
            <h1 className="mb-4 text-4xl leading-[1.06] font-medium tracking-tight text-black dark:text-white md:text-5xl">
              Set up Databricks{" "}
              <span className="text-db-lava">Free Edition</span>
            </h1>
            <p className="m-0 max-w-2xl text-lg text-black/68 dark:text-white/68">
              Build and demo your hackathon project on Databricks Free Edition.
              Here&rsquo;s how to get your account and team set up.
            </p>
          </div>
        </section>

        <section className="container px-4 py-10 md:py-14">
          <div className="mx-auto max-w-4xl space-y-4">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-black/10 bg-[#f7f6f4] p-6 dark:border-white/10 dark:bg-[#182a32]"
              >
                <h2 className="m-0 mb-3 text-lg font-medium text-black dark:text-white">
                  {step.title}
                </h2>
                <div className="text-[14px] leading-relaxed text-black/68 dark:text-white/68">
                  {step.body}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="container px-4 pt-10 pb-20 md:pt-14 md:pb-28">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-medium text-black dark:text-white">
              <HelpCircle className="h-5 w-5 text-db-lava" aria-hidden />
              FAQ
            </h2>
            <dl className="m-0 space-y-4">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-xl border border-black/10 bg-[#f7f6f4] p-5 dark:border-white/10 dark:bg-[#182a32]"
                >
                  <dt className="m-0 mb-2 text-sm font-semibold text-black dark:text-white">
                    {item.q}
                  </dt>
                  <dd className="m-0 text-sm text-black/68 dark:text-white/68">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
    </Layout>
  );
}
