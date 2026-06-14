import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { useEffect, useState, type ReactNode } from "react";
import CTA from "@/components/home/cta";
import NewFooter from "@/components/theme/footer";
import { BackLink } from "@/components/ui/back-link";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Quick start checklist for the hackathon. Served at
 * `/hackathon/quick-start-checklist` and linked as the first Resources card on
 * the event page. Like the other hackathon pages, this is non-indexed; entry is
 * via the hackathon page. Each step can be checked off; progress is persisted in
 * the browser's localStorage so it survives reloads.
 */

const inlineLink = "no-underline text-orange hover:text-db-lava";
// Lists hug the lead-in line above them (small top margin) while their items
// keep a little breathing room between each other.
const bulletList =
  "m-0 flex flex-col gap-y-2.5 mt-1 list-none pl-0 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:content-['–']";
const strong = "font-semibold text-white";

// Marketplace listing for the hackathon dataset. Kept in sync with the
// `datasetUrl` on the event page (src/pages/hackathon/apps-agents-for-good-2026.tsx).
const datasetUrl =
  "https://login.databricks.com/signin?intent=SIGN_IN&auto_login=true&destination_url=%2Fmarketplace%2Fconsumer%2Flistings%2F19326b3d-db63-4627-abc0-cf4e8131a305&utm_source=open-in-databricks&utm_medium=marketplace&utm_campaign=dais-devrel-hackathon";

const STORAGE_KEY = "hackathon-quick-start-checklist:v1";

type ChecklistStep = { id: string; title: string; body?: ReactNode };

const steps: ChecklistStep[] = [
  {
    id: "install-agent",
    title: "Install a coding agent",
    body: (
      <>
        <p className="m-0">
          We suggest{" "}
          <a
            href="https://cursor.com"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Cursor
          </a>
          ,{" "}
          <a
            href="https://claude.com/product/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Claude Code
          </a>
          , or{" "}
          <a
            href="https://openai.com/codex/"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Codex
          </a>
          .
        </p>
        <details className="group mt-4 border border-grey-30 bg-grey-5 p-4 md:p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base/snug font-medium text-white md:text-lg/snug [&::-webkit-details-marker]:hidden">
            Can&rsquo;t run a coding agent on your laptop?
            <CalloutChevronIcon className="size-5 shrink-0 text-grey-70 transition-transform duration-200 group-open:rotate-180" />
          </summary>
          <div className="mt-3 flex flex-col gap-y-3 text-base/normal tracking-tight text-grey-90 md:text-base/normal">
            <p className="m-0">
              Some participants may be using corporate laptops where local
              installs, IDE extensions, or coding agents are restricted.
              That&rsquo;s okay &mdash; you can still participate. You can
              follow the manual AppKit quick start to scaffold and deploy a
              Databricks App with the CLI:{" "}
              <Link
                to="/docs/appkit/v0#manual-quick-start"
                className={inlineLink}
              >
                Getting started with AppKit
              </Link>
              .
            </p>
            <p className="m-0">
              If possible, try to form a team with at least one person who has a
              local coding-agent setup and can iterate on the app. Not everyone
              on the team needs to work on the app code at the same time &mdash;
              other teammates can focus on data exploration, product direction,
              evaluation, storytelling, the final demo, and other areas where a
              local coding agent is less valuable.
            </p>
            <p className="m-0">
              You can also use agentic tools that don&rsquo;t require local
              setup:
            </p>
            <ul className={bulletList}>
              <li>
                <strong className={strong}>Databricks Genie Code</strong>{" "}
                &mdash; use Genie Code inside Databricks for help understanding
                the dataset, writing SQL, exploring tables, shaping the data
                work that powers your app, and creating and managing the app.
              </li>
              <li>
                <strong className={strong}>
                  Browser-based development tools
                </strong>{" "}
                &mdash; tools like Replit can be useful when your laptop
                can&rsquo;t install a local coding environment. Check your
                company policies before connecting accounts, repos, or data.
              </li>
            </ul>
            <p className="m-0">
              If your team is blocked by laptop restrictions, don&rsquo;t spend
              the whole hackathon fighting the machine. Shift work to the
              teammate or environment that can run the app, and use Databricks
              itself for as much data exploration and prototyping as possible.
              Ask hackathon mentors for help and ideas.
            </p>
          </div>
        </details>
      </>
    ),
  },
  {
    id: "free-edition",
    title: "Create a Free Edition account",
    body: (
      <>
        <p className="m-0">
          Sign up for{" "}
          <a
            href="https://www.databricks.com/learn/free-edition"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineLink}
          >
            Databricks Free Edition
          </a>
          . New to Free Edition? The{" "}
          <Link to="/hackathon/free-edition-setup" className={inlineLink}>
            Free Edition setup guide
          </Link>{" "}
          walks you through it. Once your account is ready, move on to the next
          step.
        </p>
        <p className="m-0 mt-2">
          Use a personal Free Edition account,{" "}
          <strong className={strong}>not</strong> your work or enterprise
          Databricks account. Building and demoing on Free Edition keeps every
          team on the same playing field.
        </p>
      </>
    ),
  },
  {
    id: "get-dataset",
    title: "Get the hackathon dataset",
    body: (
      <>
        <ul className={bulletList}>
          <li>
            After clicking the{" "}
            <strong className={strong}>Open in Databricks</strong> button,
            you&rsquo;ll be prompted to sign in.
          </li>
          <li>
            Use the same personal account you used to sign up for Free Edition.
          </li>
          <li>
            Once you&rsquo;re logged in, you&rsquo;ll be redirected to the
            dataset page.
          </li>
          <li>
            Click the <strong className={strong}>Get instant access</strong>{" "}
            button in the top-right corner and accept the terms and conditions.
          </li>
          <li>
            Once the terms and conditions are accepted, an{" "}
            <strong className={strong}>Open</strong> button will appear. Click
            it to add the dataset to your Databricks workspace.
          </li>
        </ul>
        <div className="mt-4">
          <DatasetButton href={datasetUrl} />
        </div>
      </>
    ),
  },
  {
    id: "install-cli",
    title: "Install the Databricks CLI",
    body: (
      <p className="m-0">
        Follow the{" "}
        <Link to="/docs/tools/databricks-cli" className={inlineLink}>
          Databricks CLI
        </Link>{" "}
        guide to install it on your machine.
      </p>
    ),
  },
  {
    id: "auth-cli",
    title: "Make sure your CLI is authenticated",
    body: (
      <p className="m-0">
        The CLI guide covers this when you install it &mdash; just double-check
        you&rsquo;re authenticated to your personal Free Edition workspace (the
        same one you added the dataset to), not a work or enterprise workspace.
        See{" "}
        <Link
          to="/docs/tools/databricks-cli#authenticate"
          className={inlineLink}
        >
          Authenticate
        </Link>{" "}
        in the CLI guide.
      </p>
    ),
  },
  {
    id: "install-skills",
    title: "Install agent skills",
    body: (
      <p className="m-0">
        Install{" "}
        <Link to="/docs/tools/ai-tools/agent-skills" className={inlineLink}>
          agent skills
        </Link>{" "}
        so your coding agent knows how to build on Databricks.
      </p>
    ),
  },
  {
    id: "scaffold-app",
    title: "Scaffold a Databricks app with Lakebase",
    body: (
      <>
        <p className="m-0">
          To get started quickly, use the{" "}
          <Link to="/templates/app-with-lakebase" className={inlineLink}>
            App with Lakebase
          </Link>{" "}
          template to scaffold a Databricks App backed by Lakebase.
        </p>
        <p className="m-0 mt-2">
          <strong className={strong}>Note:</strong> once your data is clean and
          ready, use the{" "}
          <Link to="/templates/sync-tables-autoscaling" className={inlineLink}>
            Sync Tables: Unity Catalog to Lakebase (Autoscaling)
          </Link>{" "}
          template to bring it into Lakebase.
        </p>
      </>
    ),
  },
];

function parseStored(raw: string | null): Record<string, boolean> {
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const record = parsed as Record<string, unknown>;
    const result: Record<string, boolean> = {};
    for (const step of steps) {
      if (record[step.id] === true) result[step.id] = true;
    }
    return result;
  } catch {
    return {};
  }
}

function computeProgress(
  done: Record<string, boolean>,
  allSteps: ChecklistStep[],
): { completed: number; total: number } {
  const completed = allSteps.filter((step) => done[step.id]).length;
  const total = allSteps.length;
  return { completed, total };
}

function DatasetButton({ href }: { href: string }): ReactNode {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 items-center bg-orange px-4.5 font-mono text-sm/none font-medium tracking-tight text-black uppercase no-underline transition-colors hover:bg-db-lava-light hover:text-black hover:no-underline focus-visible:ring-2 focus-visible:ring-orange/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      Open in Databricks
    </a>
  );
}

function CalloutChevronIcon({ className }: { className?: string }): ReactNode {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChecklistCheckIcon({ className }: { className?: string }): ReactNode {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 10.1429L5.57143 13.7143L13.9048 3"
        stroke="currentColor"
        strokeWidth="2.14286"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ResetIcon(): ReactNode {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="quick-start-reset-icon-mask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="1"
        y="1"
        width="12"
        height="12"
      >
        <path
          d="M11.8125 2.1875L2.1875 11.8125M2.1875 2.1875L11.8125 11.8125"
          stroke="#040406"
          strokeWidth="1.13"
          strokeMiterlimit="10"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#quick-start-reset-icon-mask)">
        <rect
          y="1.16602"
          width="12.8333"
          height="11.6667"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

function StepCard({
  step,
  index,
  checked,
  onToggle,
}: {
  step: ChecklistStep;
  index: number;
  checked: boolean;
  onToggle: () => void;
}): ReactNode {
  return (
    <li className="border-t border-grey-20 py-5 first:border-t last:pb-0">
      <label className="flex cursor-pointer items-start gap-4">
        <Checkbox
          checked={checked}
          onCheckedChange={onToggle}
          className="relative top-1 size-5 rounded-none border-grey-30 bg-transparent text-white shadow-none data-[state=checked]:border-orange data-[state=checked]:bg-orange data-[state=checked]:text-white dark:bg-transparent dark:data-[state=checked]:bg-orange"
          indicatorIcon={<ChecklistCheckIcon className="size-4" />}
          aria-label={step.title}
        />
        <span className="text-lg/snug font-medium tracking-tight text-white md:text-xl/snug">
          {index}. {step.title}
        </span>
      </label>
      {step.body && (
        <div className="mt-2.5 pl-9 text-base leading-normal tracking-tight text-grey-90 md:text-lg/normal">
          {step.body}
        </div>
      )}
    </li>
  );
}

function Checklist(): ReactNode {
  const [done, setDone] = useState<Record<string, boolean>>({});

  // localStorage is unavailable during SSR, so start empty and hydrate on mount.
  // Rendering unchecked on both server and first client paint avoids a mismatch.
  useEffect(() => {
    setDone(parseStored(window.localStorage.getItem(STORAGE_KEY)));
  }, []);

  const setAndPersist = (next: Record<string, boolean>) => {
    setDone(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const { completed, total } = computeProgress(done, steps);

  return (
    <div className="mx-auto max-w-4xl border border-grey-30 p-5 md:p-6">
      <div className="flex items-center justify-between gap-4 pb-5">
        <div className="flex min-w-0 items-center gap-5">
          <h2 className="m-0 text-xl leading-tight font-medium tracking-tight text-white md:text-2xl/snug">
            Hackathon checklist
          </h2>
          {completed > 0 && (
            <span className="h-7 w-12 flex items-center justify-center bg-grey-5 border border-grey-30 font-mono text-sm/none font-medium text-grey-80 md:h-8 md:w-14 ">
              {completed}/{total}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center">
          {completed > 0 && (
            <button
              className="inline-flex items-center gap-1 font-mono text-sm leading-none font-medium tracking-[-0.02em] text-grey-30 uppercase transition-colors hover:text-grey-90"
              type="button"
              onClick={() => {
                setDone({});
                window.localStorage.removeItem(STORAGE_KEY);
              }}
            >
              Reset
              <ResetIcon />
            </button>
          )}
        </div>
      </div>
      <ol className="m-0 list-none p-0">
        {steps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            index={index + 1}
            checked={Boolean(done[step.id])}
            onToggle={() =>
              setAndPersist({ ...done, [step.id]: !done[step.id] })
            }
          />
        ))}
      </ol>
    </div>
  );
}

export default function QuickStartChecklistPage(): ReactNode {
  return (
    <Layout
      title="Hackathon quick start checklist"
      description="Step-by-step checklist to get set up for the hackathon: install a coding agent, create a Free Edition account, get the dataset, set up the CLI, and scaffold your app."
      noFooter
    >
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="bg-black text-white">
        <section className="pt-9 md:pt-12 xl:pt-17.5">
          <div className="mx-auto max-w-4xl px-5 md:px-8">
            <BackLink to="/hackathon">Back to the hackathon</BackLink>
            <h1 className="mt-6.5 text-[2rem]/[1.125] font-normal tracking-[-0.04em] wrap-break-word text-white md:text-[2.5rem]/[1.125] lg:text-[3rem]/[1.125] xl:text-[3.5rem]/[1.125]">
              Hackathon quick start checklist
            </h1>
            <p className="mt-4 text-lg/snug tracking-[-0.04em] text-pretty text-grey-90 md:text-xl/snug">
              Work through these steps to get set up and start building.
            </p>

            <div className="mt-10 md:mt-14">
              <Checklist />
            </div>
          </div>
        </section>

        <div className="mx-auto mt-24 max-w-432 border-x border-grey-20 bg-black md:mt-36 lg:mt-44 xl:mt-60">
          <CTA
            className="pt-0 pb-16 lg:pb-22"
            theme="outline"
            label="Start building"
            title="Ready to ship your next agentic app in minutes?"
          />
          <NewFooter className="border-t border-white/10 bg-black lg:px-8" />
        </div>
      </main>
    </Layout>
  );
}
