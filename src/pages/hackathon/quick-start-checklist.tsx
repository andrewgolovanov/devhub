import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { OpenInDatabricksButton } from "@/components/hackathon/hackathon-event-page";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

/**
 * Quick start checklist for the hackathon. Served at
 * `/hackathon/quick-start-checklist` and linked as the first Resources card on
 * the event page. Like the other hackathon pages, this is non-indexed; entry is
 * via the hackathon page. Each step can be checked off; progress is persisted in
 * the browser's localStorage so it survives reloads.
 */

const inlineLink =
  "font-medium text-db-lava underline underline-offset-2 hover:text-db-lava-dark";
// Lists hug the lead-in line above them (small top margin) while their items
// keep a little breathing room between each other.
const bulletList = "m-0 mt-1 list-disc space-y-1 pl-5";
const strong = "font-semibold text-black dark:text-white";

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
        <div className="mt-3">
          <OpenInDatabricksButton href={datasetUrl} />
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
    title: "Scaffold your app and link to the dataset",
    body: (
      <p className="m-0">
        Scaffold your app from the{" "}
        <Link
          to="/templates/hackathon-app-with-synced-dataset"
          className={inlineLink}
        >
          Hackathon starter
        </Link>{" "}
        template &mdash; a Databricks App backed by Lakebase with the hackathon
        dataset automatically synced in.
      </p>
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
): { completed: number; total: number; pct: number } {
  const completed = allSteps.filter((step) => done[step.id]).length;
  const total = allSteps.length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, pct };
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
    <li className="rounded-xl border border-black/10 bg-[#f7f6f4] p-6 dark:border-white/10 dark:bg-[#182a32]">
      <label className="flex cursor-pointer items-start gap-3">
        <Checkbox
          checked={checked}
          onCheckedChange={onToggle}
          className="mt-0.5"
          aria-label={step.title}
        />
        <span
          className={`text-base font-medium ${
            checked
              ? "text-black/40 line-through dark:text-white/40"
              : "text-black dark:text-white"
          }`}
        >
          {index}. {step.title}
        </span>
      </label>
      {step.body && (
        <div className="mt-2 pl-7 text-[14px] leading-relaxed text-black/68 dark:text-white/68">
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

  const { completed, total, pct } = computeProgress(done, steps);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="m-0 text-sm font-medium text-black/68 dark:text-white/68">
            {completed} of {total} complete
          </p>
          {completed > 0 && (
            <button
              type="button"
              onClick={() => {
                setDone({});
                window.localStorage.removeItem(STORAGE_KEY);
              }}
              className="inline-flex items-center gap-1 text-sm font-medium text-db-lava hover:underline"
            >
              <RotateCcw aria-hidden className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
        <Progress value={pct} aria-label="Checklist progress" />
      </div>
      <ol className="m-0 list-none space-y-4 p-0">
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
              Hackathon quick start{" "}
              <span className="text-db-lava">checklist</span>
            </h1>
            <p className="m-0 max-w-2xl text-lg text-black/68 dark:text-white/68">
              Work through these steps to get set up and start building.
            </p>
          </div>
        </section>

        <section className="container px-4 pb-20 md:pb-28">
          <Checklist />
        </section>
      </main>
    </Layout>
  );
}
