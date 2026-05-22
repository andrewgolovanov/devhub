import { cn } from "@/lib/utils";
import Link from "@docusaurus/Link";
import type { SVGProps } from "react";

import { AgentBricksInfographic } from "./agent-bricks-infographic";
import { DatabricksAppsInfographic } from "./databricks-apps-infographic";
import { LakebaseInfographic } from "./lakebase-infographic";
import {
  FeatureCardAction,
  FeatureCardEyebrow,
  FeatureCardFooter,
  FeatureCardHeader,
  FeatureCardRoot,
  FeatureCardTitle,
  FeatureCardVisual,
} from "@/components/ui/feature-card";

const FEATURES = [
  {
    eyebrow: "Lakebase",
    title: "Managed Postgres, colocated with your Lakehouse.",
    description:
      "Provision with the CLI, connect like any Postgres. Instant branching, scales to zero, and change data feed to Unity Catalog.",
    href: "/docs/lakebase/overview",
    visual: "lakebase",
  },
  {
    eyebrow: "Agent Bricks",
    title: "LLM-driven apps that call tools and return structured output.",
    description:
      "Any Python framework, Databricks-hosted models, automatic MLflow tracing, and MCP for workspace tools.",
    href: "/docs/agents/overview",
    visual: "agents",
  },
  {
    eyebrow: "Databricks Apps",
    title: "Web apps that run inside your workspace.",
    description:
      "One CLI command to deploy. Fixed URL, built-in OAuth, and direct access to your workspace data, with no separate hosting service.",
    href: "/docs/apps/overview",
    visual: "apps",
  },
] as const;

type Feature = (typeof FEATURES)[number];
type FeatureVisual = Feature["visual"];

type FeatureCardProps = {
  eyebrow: string;
  index: number;
  title: string;
  description: string;
  href: string;
  visual: FeatureVisual;
  reversed?: boolean;
};

function FeatureLinkArrowIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 28 29"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.7109 18.1328V5.29154H11.8697"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="3"
      />
      <path
        d="M3.16406 26.8438L24.1641 5.84375"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="3"
      />
    </svg>
  );
}

function FeatureVisualContent({ visual }: { visual: FeatureVisual }) {
  if (visual === "lakebase") {
    return <LakebaseInfographic />;
  }

  if (visual === "agents") {
    return <AgentBricksInfographic />;
  }

  return <DatabricksAppsInfographic />;
}

function Features({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "features bg-[#F9F7F4] pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-28 lg:pb-32 xl:pt-44 xl:pb-54",
        className,
      )}
      aria-labelledby="home-features-heading"
    >
      <div className="mx-auto flex max-w-400 flex-col gap-12 px-5 md:gap-16 md:px-8 lg:gap-20 xl:gap-60">
        <h2 id="home-features-heading" className="sr-only">
          Databricks developer platform features
        </h2>
        {FEATURES.map(
          ({ eyebrow, title, visual, description, href }, index) => {
            return (
              <FeatureCard
                key={eyebrow}
                eyebrow={eyebrow}
                index={index}
                title={title}
                description={description}
                href={href}
                visual={visual}
                reversed={index % 2 === 1}
              />
            );
          },
        )}
      </div>
    </section>
  );
}

function FeatureCard({
  eyebrow,
  index,
  title,
  description,
  href,
  visual,
  reversed = false,
}: FeatureCardProps) {
  return (
    <FeatureCardRoot>
      <FeatureCardHeader reversed={reversed}>
        <FeatureCardEyebrow>
          <span className="font-mono text-sm/none">0{index + 1}</span>
          {eyebrow}
        </FeatureCardEyebrow>
        <div className="flex grow flex-col justify-between xl:pl-16">
          <FeatureCardTitle>
            {title}
            <span className="text-black/30 max-xl:mt-2 max-xl:block max-xl:text-base/tight max-xl:tracking-normal">
              {" "}
              [{description}]
            </span>
          </FeatureCardTitle>
          <FeatureCardAction>
            <Link
              to={href}
              className="inline-flex w-full items-center justify-between border-b-[3px] border-orange pb-4 font-sans text-xl leading-none font-normal tracking-[-0.04em] text-orange no-underline transition-colors hover:border-primary hover:text-primary md:text-2xl lg:text-3xl xl:text-[2.5625rem]"
            >
              <span>Learn more</span>
              <FeatureLinkArrowIcon className="size-5 md:size-7" />
            </Link>
          </FeatureCardAction>
        </div>
      </FeatureCardHeader>
      <FeatureCardVisual className="mt-8 lg:mt-0" reversed={reversed}>
        <div className="mx-auto my-auto w-full max-w-184" aria-hidden="true">
          <FeatureVisualContent visual={visual} />
        </div>
      </FeatureCardVisual>
      <FeatureCardFooter
        className={cn("lg:row-start-2", !reversed && "lg:col-start-2")}
        label="A central repository"
        description="A central repository where data from multiple sources is collected, cleaned, structured, and governed, providing a reliable, unified."
      />
    </FeatureCardRoot>
  );
}

export default Features;
