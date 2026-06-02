import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Badge } from "@/components/ui/badge";

export function FeatureInfographicCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border border-[#D4D2CF] bg-white shadow-[0_.625rem_1.25rem_0_rgba(0,0,0,.06)]",
        className,
      )}
      {...props}
    />
  );
}

function FeatureCardRoot({ className, ...props }: ComponentProps<"article">) {
  return (
    <article
      data-slot="feature-card"
      className={cn(
        "grid text-foreground max-w-xl mx-auto md:max-w-none lg:grid-cols-2 lg:gap-x-16",
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
        "mt-5 font-sans text-[28px]/tight font-normal tracking-[-0.04em] text-pretty text-black md:mt-6 md:text-[32px]/tight lg:mt-0 lg:text-[36px]/tight xl:mt-7 xl:text-[2.5rem]/tight",
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
      className={cn(
        "mt-5 w-full max-w-152 md:mt-6 md:max-w-none lg:mt-7 xl:mt-auto xl:max-w-152",
        className,
      )}
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
        "flex overflow-hidden border border-black bg-[#F2F0ED] aspect-square md:aspect-auto max-md:items-center max-md:justify-center max-md:p-3 lg:justify-end",
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
        "mt-4 flex flex-col gap-2 md:mt-6 md:flex-row md:justify-between md:gap-4 lg:flex-col lg:gap-2 xl:flex-row xl:justify-between xl:gap-4",
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
      <p className="text-base/tight tracking-tight text-pretty text-black xl:max-w-120">
        {description}
      </p>
    </div>
  );
}

export {
  FeatureCardRoot,
  FeatureCardHeader,
  FeatureCardEyebrow,
  FeatureCardTitle,
  FeatureCardAction,
  FeatureCardVisual,
  FeatureCardFooter,
};
