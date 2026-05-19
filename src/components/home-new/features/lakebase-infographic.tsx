import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Database } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  useInView,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import { useRef, type ReactNode } from "react";

import { FeatureInfographicCard } from "@/components/ui/feature-card";

const autoScaleGraphSrc = "/img/home-new/features/auto-scale-compute.jpg";
const postgresIconSrc = "/img/home-new/features/postgres-icon.svg";
const CARD_MOVE_DURATION = 0.42;
const CARD_MOVE_EASE = [0.17, -0.17, 0, 1] as const;
const CARD_MOVE_TRANSITION = {
  duration: CARD_MOVE_DURATION,
  ease: CARD_MOVE_EASE,
} as const;
const INNER_ANIMATION_DELAY = CARD_MOVE_DURATION / 2;
const INNER_ANIMATION_DURATION = CARD_MOVE_DURATION;
const CHANGELOG_ROW_DURATION = INNER_ANIMATION_DURATION * 1.5;
const INNER_CARD_MOVE_TRANSITION = {
  delay: INNER_ANIMATION_DELAY,
  duration: INNER_ANIMATION_DURATION,
  ease: CARD_MOVE_EASE,
} as const;
const INNER_BRANCH_LINES_TRANSITION = {
  delay: INNER_ANIMATION_DELAY + 0.08,
  duration: 0.24,
} as const;
const CHANGELOG_ROW_STAGGER = 0.035;
const BACKGROUND_SCHEME_TRANSITION = {
  delay: CARD_MOVE_DURATION,
  duration: 0.24,
} as const;
const INFOGRAPHIC_IN_VIEW_AMOUNT = 0.45;
const CHANGELOG_ROWS = [
  ["10:01", "insert", "order #101", "created"],
  ["10:02", "update", "customer #4", "paid"],
  ["10:03", "delete", "order #102", "removed"],
] as const;

type BranchCardProps = {
  className?: string;
  name: string;
  isProductionBranch: boolean;
  size: string;
  tables?: number;
};

type AnimatedInfographicCardProps = {
  children: ReactNode;
  className?: string;
  isVisible: boolean;
  offsetY?: number;
  reduceMotion: boolean;
};

type BackgroundSchemeProps = {
  isVisible: boolean;
  reduceMotion: boolean;
};

function getChangelogRowTransition(index: number) {
  const delay = INNER_ANIMATION_DELAY + index * CHANGELOG_ROW_STAGGER;

  return {
    delay,
    duration: CHANGELOG_ROW_DURATION,
    ease: CARD_MOVE_EASE,
  };
}

function AnimatedInfographicCard({
  children,
  className,
  isVisible,
  offsetY,
  reduceMotion,
}: AnimatedInfographicCardProps) {
  return (
    <m.div
      animate={isVisible && !reduceMotion ? { y: 0 } : undefined}
      className={className}
      initial={reduceMotion ? false : { y: offsetY }}
      transition={CARD_MOVE_TRANSITION}
    >
      {children}
    </m.div>
  );
}

function AnimatedInnerBranchCard({
  children,
  className,
  isVisible,
  offsetY = -12,
  reduceMotion,
}: AnimatedInfographicCardProps) {
  return (
    <m.div
      animate={isVisible && !reduceMotion ? { y: 0 } : undefined}
      className={cn("relative z-20", className)}
      initial={reduceMotion ? false : { y: offsetY }}
      transition={INNER_CARD_MOVE_TRANSITION}
    >
      {children}
    </m.div>
  );
}

function AnimatedInnerBranchLines({
  isVisible,
  reduceMotion,
}: BackgroundSchemeProps) {
  return (
    <m.div
      animate={isVisible && !reduceMotion ? { opacity: 1 } : undefined}
      className="relative z-0 mx-auto w-[55%]"
      initial={reduceMotion ? false : { opacity: 0 }}
      transition={INNER_BRANCH_LINES_TRANSITION}
    >
      <div className="mx-auto h-4.75 w-px bg-black/30" />
      <div className="mx-auto h-4.75 w-full rounded-t-xs border-t border-r border-l border-black/30" />
    </m.div>
  );
}

function BackgroundScheme({ isVisible, reduceMotion }: BackgroundSchemeProps) {
  return (
    <m.div
      animate={isVisible && !reduceMotion ? { opacity: 1 } : undefined}
      className="absolute inset-y-1 left-1/2 top-0 -translate-x-1/2 w-full"
      initial={reduceMotion ? false : { opacity: 0 }}
      transition={BACKGROUND_SCHEME_TRANSITION}
    >
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-20 w-px border-l border-dashed border-black" />
      <div className="absolute top-10 h-[calc(100%-2.5rem)] w-full rounded-t-xs border-t border-dashed border-r border-l border-black" />
    </m.div>
  );
}

function BranchCard({
  className,
  name,
  isProductionBranch,
  size,
  tables,
}: BranchCardProps) {
  return (
    <div
      className={cn(
        "p-2 pt-1.5 bg-[#F8F6F3]/40 border border-[#D4D2CF]",
        className,
      )}
    >
      <div className="flex items-center justify-between text-[9px] @xl/infographic:text-[11px]">
        <span className="inline-flex items-center gap-1 font-medium">
          <Database className="size-2.5 text-black opacity-60" />
          {name}
        </span>
        <Badge
          className={cn(
            "rounded-full leading-none tracking-tight border-0 px-1 py-0.25 text-[7px] font-medium @xl/infographic:px-2.25 @xl/infographic:py-0.75  @xl/infographic:text-[9px]/none",
            isProductionBranch
              ? "bg-[#DDF5ED] text-[#00A972]"
              : "hidden bg-black/11 text-black @sm/infographic:flex",
          )}
        >
          {isProductionBranch ? "production" : "branch"}
        </Badge>
      </div>
      <div className="mt-2 flex items-center gap-1 text-[8px] leading-tight tracking-tight whitespace-nowrap text-black/60 @md/infographic:mt-3.5 @md/infographic:gap-2 @md/infographic:text-[10px]">
        <span>Size: {size}</span>
        {tables && tables > 0 && (
          <>
            <span>/</span>
            <span>Tables: {tables}</span>
          </>
        )}
      </div>
    </div>
  );
}

export function LakebaseInfographic() {
  const infographicRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(infographicRef, {
    once: true,
    amount: INFOGRAPHIC_IN_VIEW_AMOUNT,
    margin: "0px",
  });
  const reduceMotion = useReducedMotion();
  const isVisible = reduceMotion || isInView;

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="@container/infographic flex w-full flex-col items-center pt-5 font-sans text-black md:py-16.5 xl:px-8"
        ref={infographicRef}
      >
        <AnimatedInfographicCard
          isVisible={isVisible}
          offsetY={10}
          reduceMotion={reduceMotion}
        >
          <FeatureInfographicCard className="flex w-3xs shrink-0 items-center gap-2 p-3 @md/infographic:gap-3">
            <div className="grid size-6 shrink-0 place-items-center border border-[#D4D2CF]/50 @md/infographic:size-8">
              <img
                src={postgresIconSrc}
                alt=""
                className="size-5 @md/infographic:size-7"
                width={28}
                height={28}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="min-w-0 flex flex-col gap-y-1">
              <h3 className="text-[11px] leading-tight font-medium tracking-[-0.02em] whitespace-nowrap @md/infographic:text-sm/tight">
                Managed Postgres
              </h3>
              <span className="text-[9px] leading-tight whitespace-nowrap tracking-[-0.02em] text-black/70 @md/infographic:text-[11px]">
                Colocated with your Lakehouse
              </span>
            </div>
          </FeatureInfographicCard>
        </AnimatedInfographicCard>

        <div className="relative flex flex-col gap-y-12 pt-22 pb-12 w-4/5 @md/infographic:w-3/4 @xl/infographic:w-[72%]">
          <BackgroundScheme isVisible={isVisible} reduceMotion={reduceMotion} />

          <AnimatedInfographicCard
            className="relative mx-auto shrink-0 max-w-80 w-4/5 @md/infographic:w-3/4"
            isVisible={isVisible}
            offsetY={-12}
            reduceMotion={reduceMotion}
          >
            <FeatureInfographicCard className="w-full p-1.5 @md/infographic:p-2.5 @xl/infographic:p-4">
              <h4 className="text-xs tracking-tight leading-tight font-medium @xl/infographic:text-[13px]">
                Instant branching
              </h4>
              <AnimatedInnerBranchCard
                className="mt-3 w-full max-w-37 mx-auto"
                isVisible={isVisible}
                offsetY={12}
                reduceMotion={reduceMotion}
              >
                <BranchCard
                  name="main"
                  isProductionBranch={true}
                  size="120 GB"
                  tables={240}
                />
              </AnimatedInnerBranchCard>
              <AnimatedInnerBranchLines
                isVisible={isVisible}
                reduceMotion={reduceMotion}
              />
              <div className="grid grid-cols-2 gap-2 @md/infographic:gap-4  @xl/infographic:gap-8">
                {["dev", "staging"].map((branch) => (
                  <AnimatedInnerBranchCard
                    key={branch}
                    isVisible={isVisible}
                    reduceMotion={reduceMotion}
                  >
                    <BranchCard
                      name={branch}
                      isProductionBranch={false}
                      size="120 GB"
                    />
                  </AnimatedInnerBranchCard>
                ))}
              </div>
            </FeatureInfographicCard>
          </AnimatedInfographicCard>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 @xl/infographic:gap-x-8">
          <AnimatedInfographicCard
            className="md:h-full"
            isVisible={isVisible}
            offsetY={-12}
            reduceMotion={reduceMotion}
          >
            <FeatureInfographicCard className="flex flex-col p-2 md:h-full @xl/infographic:p-4">
              <div className="flex flex-col gap-0.5 @md/infographic:items-center @md/infographic:justify-between @md/infographic:gap-2 @md/infographic:flex-row">
                <h4 className="text-xs tracking-tight leading-tight font-medium @xl/infographic:text-[13px]">
                  Auto-scale compute
                </h4>
                <p className="text-[8px] leading-tight tracking-tight text-black/70 @xl/infographic:text-[11px]">
                  Currect load:{" "}
                  <span className="font-medium text-black">23%</span>
                </p>
              </div>
              <img
                src={autoScaleGraphSrc}
                alt=""
                className="mt-2 block min-h-0 flex-1 @xl/infographic:mt-5"
                width={282}
                height={129}
                loading="lazy"
                decoding="async"
              />
            </FeatureInfographicCard>
          </AnimatedInfographicCard>

          <AnimatedInfographicCard
            className="md:h-full"
            isVisible={isVisible}
            offsetY={-12}
            reduceMotion={reduceMotion}
          >
            <FeatureInfographicCard className="flex flex-col overflow-hidden p-2 md:h-full @xl/infographic:p-4 @xl/infographic:pb-2">
              <h4 className="text-xs tracking-tight leading-tight font-medium @xl/infographic:text-[13px]">
                Database change log
              </h4>
              <div className="mt-2 grid grid-cols-[0.9fr_1.15fr_1.35fr_1fr] bg-[#F8F6F3] px-1 py-1 text-[6px] leading-none text-black/50 uppercase @md/infographic:text-[7px] @xl/infographic:mt-5 @xl/infographic:px-2.5 @xl/infographic:py-2 @xl/infographic:text-[9px]">
                <span>Time</span>
                <span>Operation</span>
                <span>Entity</span>
                <span>Change</span>
              </div>
              <div className="mt-1 flex-1">
                {CHANGELOG_ROWS.map(
                  ([time, operation, entity, change], index) => (
                    <m.div
                      animate={
                        isVisible && !reduceMotion
                          ? { opacity: 1, y: 0 }
                          : undefined
                      }
                      initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                      transition={getChangelogRowTransition(index)}
                      key={time}
                      className="grid grid-cols-[0.9fr_1.15fr_1.35fr_1fr] text-black/90 border-b border-[#ECEBE8] last:border-0 items-center py-1 font-mono text-[7px] tracking-tight leading-none @md/infographic:pt-3 @md/infographic:pb-2 @md/infographic:text-[11px]"
                    >
                      <span className="pl-1 font-mono">{time}</span>
                      <span>
                        <span
                          className={cn(
                            "relative -top-0.25 rounded px-0.5 py-0.25 @md/infographic:px-1 @md/infographic:py-0.5",
                            operation === "insert" &&
                              "bg-[#DDF5ED] text-[#00A972]/90",
                            operation === "update" &&
                              "bg-[#FFE3DE] text-[#FF5F46]/90",
                            operation === "delete" &&
                              "bg-[#ECEBE8] text-black/90",
                          )}
                        >
                          {operation}
                        </span>
                      </span>
                      <span>{entity}</span>
                      <span>{change}</span>
                    </m.div>
                  ),
                )}
              </div>
            </FeatureInfographicCard>
          </AnimatedInfographicCard>
        </div>
      </div>
    </LazyMotion>
  );
}
