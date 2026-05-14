import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "@docusaurus/Link";
import type { ComponentProps, SVGProps } from "react";

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
  imageSrc: string;
  reversed?: boolean;
};

const FEATURE_IMAGES: Record<FeatureVisual, string> = {
  lakebase: "/img/home-new/features/lakebase.png",
  agents: "/img/home-new/features/agent-bricks.png",
  apps: "/img/home-new/features/databricks-apps.png",
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

function FeatureCardRoot({ className, ...props }: ComponentProps<"article">) {
  return (
    <article
      data-slot="feature-card"
      className={cn(
        "grid text-foreground max-w-xl mx-auto lg:max-w-none lg:grid-cols-2 lg:gap-x-16",
        className,
      )}
      {...props}
    />
  );
}

function FeatureCardHeader({
  className,
  reversed,
  ...props
}: ComponentProps<"div"> & { reversed?: boolean }) {
  return (
    <div
      data-slot="feature-card-header"
      className={cn(
        "flex flex-col items-start",
        reversed && "lg:order-2",
        className,
      )}
      {...props}
    />
  );
}

function FeatureCardEyebrow({
  className,
  ...props
}: ComponentProps<typeof Badge>) {
  return (
    <Badge
      data-slot="feature-card-eyebrow"
      className={cn(
        "flex gap-x-2 rounded-none bg-[#FF5F46] p-1.5 font-mono text-sm leading-none font-medium tracking-normal text-primary-foreground uppercase md:text-base/none",
        className,
      )}
      {...props}
    />
  );
}

function FeatureCardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="feature-card-title"
      className={cn(
        "mt-7 font-sans text-xl/tight font-normal tracking-[-0.04em] text-pretty text-black md:mt-8 md:text-3xl/tight md:max-xl:text-2xl/tight lg:text-[2.5rem]/tight",
        className,
      )}
      {...props}
    />
  );
}

function FeatureCardAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="feature-card-action"
      className={cn("mt-6 w-full max-w-152 md:mt-8 xl:mt-auto", className)}
      {...props}
    />
  );
}

function FeatureCardVisual({
  className,
  reversed,
  ...props
}: ComponentProps<"div"> & { reversed?: boolean }) {
  return (
    <div
      data-slot="feature-card-visual"
      className={cn(
        "flex overflow-hidden border border-black bg-[#F2F0ED] lg:justify-end max-xl:p-3 md:max-xl:p-4",
        reversed && "lg:order-1 lg:justify-start",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

function FeatureCardFooter({
  className,
  label,
  description,
  ...props
}: ComponentProps<"div"> & { label: string; description: string }) {
  return (
    <div
      className={cn(
        "mt-4 flex flex-col gap-2 md:mt-6 md:flex-row md:justify-between md:gap-4",
        className,
      )}
      data-slot="feature-card-footer"
      {...props}
    >
      <span className="flex flex-row gap-2 pt-1 font-medium text-muted-foreground">
        <span
          className="relative top-1 size-1.5 shrink-0 bg-primary"
          aria-hidden="true"
        />
        <span className="text-base/none whitespace-nowrap tracking-tight font-medium text-black/30">
          [ {label} ]
        </span>
      </span>
      <p className="text-sm/tight tracking-tight text-pretty max-w-sm text-black md:text-base xl:max-w-120">
        {description}
      </p>
    </div>
  );
}

function Features({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "features bg-background pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-28 lg:pb-32 xl:pt-44 xl:pb-54",
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
                imageSrc={FEATURE_IMAGES[visual]}
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
  imageSrc,
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
        <div className="mx-auto my-auto w-full max-w-184">
          <img
            src={imageSrc}
            alt=""
            className="block aspect-square w-full object-contain"
            loading="eager"
            width={720}
            height={720}
            decoding="async"
          />
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
