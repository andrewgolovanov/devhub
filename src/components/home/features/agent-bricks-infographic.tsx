import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Lock } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  useInView,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import { useRef, type ComponentProps } from "react";

import { FeatureInfographicCard } from "@/components/ui/feature-card";

const israelGrantSrc = "/img/home/features/israel-grant.jpg";
const agentBricksIconSrc = "/img/home/features/agent-bricks-icon.svg";
const lockIconSrc = "/img/home/features/lock-icon.svg";

const STEP_MOVE_DURATION = 0.68;
const STEP_MOVE_DELAYS = [0, 0.16, 0.46] as const;
const STEP_MOVE_EASE = [0.17, -0.17, 0, 1] as const;
const STEP_INITIAL_Y_BY_INDEX = [-10, -15, -20] as const;
const CONNECTOR_LINE_DELAY = 0.18;
const CONNECTOR_LINE_DURATION = 0.24;
const CONTENT_LINE_INITIAL_Y = 4;
const CONTENT_LINE_STAGGER = 0.085;
const CONTENT_LINE_DURATION = 0.46;
const CONTENT_LINE_DELAY = 0.08;
const CONTENT_LINE_EASE = [0.16, 1, 0.3, 1] as const;
const INFOGRAPHIC_IN_VIEW_AMOUNT = 0.45;

const AGENT_BRICKS_PROGRESS_LINES = [
  {
    id: "selecting-llm",
    content: <span>Selecting best-fit LLM</span>,
  },
  {
    id: "loading-data",
    content: (
      <div className="flex flex-col gap-1 @md/infographic:gap-1.5">
        <span>Loading data</span>
        <span className="mt-1 flex flex-row gap-x-1.5 text-black pl-7.5">
          <span className="relative top-1 inline-block size-1.25 bg-[#2272B4]" />
          Lakehouse <span className="text-black/80">(sales_fact_table)</span>
        </span>
        <span className="flex flex-row gap-x-1.5 text-black pl-7.5">
          <span className="relative top-1 inline-block size-1.25 bg-[#2272B4]" />
          SQL Warehouse <span className="text-black/80">(KPIs)</span>
        </span>
      </div>
    ),
  },
  {
    id: "running-tools",
    content: (
      <div className="flex flex-col gap-1 @md/infographic:gap-1.5">
        <span>Running tools</span>
        <span className="mt-1 flex flex-row gap-x-1.5 text-black pl-7.5">
          <span className="relative top-1 inline-block size-1.25 bg-[#2272B4]" />
          Python analytics{" "}
          <span className="text-black/80">(trends, anomalies)</span>
        </span>
      </div>
    ),
  },
  {
    id: "generating-output",
    content: <span>Generating output</span>,
  },
] as const;

const PYTHON_CODE_LINES = [
  {
    id: "output-open",
    content: (
      <>
        <span className="text-[#8D8D8D]">output</span>{" "}
        <span className="text-[#00A972]">=</span>{" "}
        <span className="text-[#2272B4]">{"{"}</span>
      </>
    ),
  },
  {
    id: "forecast",
    content: (
      <>
        {"    "}
        "forecast"
        <span className="text-[#2272B4]">:</span> "+13% (10-17%)",
      </>
    ),
  },
  {
    id: "drivers",
    content: (
      <>
        {"    "}
        "drivers"
        <span className="text-[#2272B4]">:</span>{" "}
        <span className="text-[#2272B4]">[</span>"demand", "history", "market"
        <span className="text-[#2272B4]">]</span>,
      </>
    ),
  },
  {
    id: "actions",
    content: (
      <>
        {"    "}
        "actions"
        <span className="text-[#2272B4]">:</span>{" "}
        <span className="text-[#2272B4]">[</span>"scale SKUs", "optimize
        pricing"<span className="text-[#2272B4]">]</span>
      </>
    ),
  },
  {
    id: "output-close",
    content: <span className="text-[#2272B4]">{"}"}</span>,
  },
] as const;

type AgentBricksInfographicCardProps = {
  className?: string;
  cardClassName?: string;
  step: string;
  stepIndex: number;
  isVisible: boolean;
  isLast?: boolean;
  reduceMotion: boolean;
};

function getStepTransition(stepIndex: number) {
  return {
    delay: getStepDelay(stepIndex),
    duration: STEP_MOVE_DURATION,
    ease: STEP_MOVE_EASE,
  };
}

function getStepDelay(stepIndex: number) {
  return STEP_MOVE_DELAYS[stepIndex] ?? STEP_MOVE_DELAYS[2];
}

function getStepInitialY(stepIndex: number) {
  return STEP_INITIAL_Y_BY_INDEX[stepIndex] ?? -20;
}

function getConnectorLineTransition(stepIndex: number) {
  return {
    delay: getStepDelay(stepIndex) + CONNECTOR_LINE_DELAY,
    duration: CONNECTOR_LINE_DURATION,
  };
}

function getContentLineTransition(stepIndex: number, lineIndex: number) {
  return {
    delay:
      getStepDelay(stepIndex) +
      CONTENT_LINE_DELAY +
      lineIndex * CONTENT_LINE_STAGGER,
    duration: CONTENT_LINE_DURATION,
    ease: CONTENT_LINE_EASE,
  };
}

function AnimatedProgressLine({
  children,
  className,
  isVisible,
  lineIndex,
  reduceMotion,
  stepIndex,
}: ComponentProps<"div"> & {
  isVisible: boolean;
  lineIndex: number;
  reduceMotion: boolean;
  stepIndex: number;
}) {
  return (
    <m.li
      animate={isVisible && !reduceMotion ? { opacity: 1, y: 0 } : undefined}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: CONTENT_LINE_INITIAL_Y }}
      transition={getContentLineTransition(stepIndex, lineIndex)}
    >
      {children}
    </m.li>
  );
}

function AnimatedCodeLine({
  children,
  isVisible,
  lineIndex,
  reduceMotion,
  stepIndex,
}: ComponentProps<"span"> & {
  isVisible: boolean;
  lineIndex: number;
  reduceMotion: boolean;
  stepIndex: number;
}) {
  return (
    <m.span
      animate={isVisible && !reduceMotion ? { opacity: 1, y: 0 } : undefined}
      className="block"
      initial={reduceMotion ? false : { opacity: 0, y: CONTENT_LINE_INITIAL_Y }}
      transition={getContentLineTransition(stepIndex, lineIndex)}
    >
      {children}
    </m.span>
  );
}

function AgentBricksInfographicCard({
  className,
  cardClassName,
  children,
  step,
  stepIndex,
  isVisible,
  isLast = false,
  reduceMotion,
}: ComponentProps<"div"> & AgentBricksInfographicCardProps) {
  return (
    <m.div
      animate={isVisible && !reduceMotion ? { opacity: 1, y: 0 } : undefined}
      className={cn(
        "grid gap-x-4 grid-cols-[1.75rem_1fr] @md/infographic:gap-x-10 @md/infographic:grid-cols-[2.375rem_1fr]",
        className,
      )}
      initial={
        reduceMotion ? false : { opacity: 0, y: getStepInitialY(stepIndex) }
      }
      transition={getStepTransition(stepIndex)}
    >
      <div className="relative">
        <span className="flex shrink-0 size-7 items-center justify-center text-center border border-[#D4D2CF] bg-white font-mono text-[11px] shadow-[0_.625rem_1.25rem_rgb(4_4_6/0.06)] @md/infographic:aspect-square @md/infographic:size-9.5 @md/infographic:text-base">
          {step}
        </span>
        {!isLast && (
          <m.span
            animate={isVisible && !reduceMotion ? { opacity: 1 } : undefined}
            className="absolute top-8 left-1/2 -translate-x-1/2 border-l border-black w-fit h-[calc(100%-1.5rem)] mx-auto border-dashed @md/infographic:top-10.5 @md/infographic:h-[calc(100%-1.625rem)]"
            initial={reduceMotion ? false : { opacity: 0 }}
            transition={getConnectorLineTransition(stepIndex)}
          />
        )}
      </div>
      <FeatureInfographicCard className={cn("shrink-0", cardClassName)}>
        {children}
      </FeatureInfographicCard>
    </m.div>
  );
}

export function AgentBricksInfographic() {
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
        className="@container/infographic py-8 font-sans text-black max-w-lg mx-auto my-auto @md/infographic:px-4 lg:pt-22 lg:pb-23"
        ref={infographicRef}
      >
        <AgentBricksInfographicCard
          className="pb-3 @md/infographic:pb-5"
          cardClassName="p-2 @md/infographic:p-3"
          isVisible={isVisible}
          reduceMotion={reduceMotion}
          step="01"
          stepIndex={0}
        >
          <>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5 @md/infographic:gap-3">
                <img
                  src={israelGrantSrc}
                  alt=""
                  className="size-7 shrink-0 @md/infographic:size-9"
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex flex-col gap-y-0.75">
                  <h4 className="text-[11px] leading-tight tracking-[-0.02em] font-medium @md/infographic:text-xs/tight">
                    David Grant
                  </h4>
                  <span className="text-[10px] leading-tight tracking-[-0.02em] text-black/70 @md/infographic:text-[11px]">
                    grant@hotmail.com
                  </span>
                </div>
              </div>
              <div className="text-[9px] flex items-center tracking-[-0.02em] gap-x-1.25 whitespace-nowrap text-black/70 @md/infographic:text-[11px] pr-1 pt-0.5">
                Today <span className="flex shrink-0 bg-black/40 size-0.5" />{" "}
                11:56 AM
              </div>
            </div>
            <p className="mt-1.5 max-w-sm opacity-90 text-black text-[11px] leading-normal tracking-[-0.02em] @md/infographic:mt-2.5 @md/infographic:max-w-sm @md/infographic:text-[13px]">
              Analyze sales data and forecast based on trends, history, and
              market indicators.
            </p>
          </>
        </AgentBricksInfographicCard>

        <AgentBricksInfographicCard
          className="pb-3 @md/infographic:pb-5"
          cardClassName="p-2 @md/infographic:p-3"
          isVisible={isVisible}
          reduceMotion={reduceMotion}
          step="02"
          stepIndex={1}
        >
          <>
            <div className="flex items-start justify-between">
              <div className="flex flex-row items-center gap-x-2.5 @md/infographic:gap-3">
                <div className="flex items-center justify-center size-7 shrink-0 border border-[#D4D2CF80]/50 bg-white @md/infographic:size-9">
                  <img
                    src={agentBricksIconSrc}
                    alt=""
                    className="size-4.5 shrink-0 @md/infographic:size-6"
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h4 className="text-xs tracking-tight leading-tight font-medium @md/infographic:text-sm/tight">
                  Agent Bricks
                </h4>
              </div>
              <Badge className="gap-1 rounded-full mr-1 mt-1 border border-[#00A972]/50 bg-[#00A972]/5 pl-1.5 pr-2.5 py-0.5 text-[9px] font-normal text-black @md/infographic:pl-2 @md/infographic:pr-3 @md/infographic:py-1 @md/infographic:text-xs/tight">
                <img
                  src={lockIconSrc}
                  alt=""
                  className="size-2.5 shrink-0 @md/infographic:size-3.5"
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                />
                Secure
              </Badge>
            </div>
            <ul className="mt-2 flex flex-col gap-1 text-[11px] leading-tight tracking-[-0.02em] opacity-90 text-black/80 @md/infographic:mt-3.5 @md/infographic:gap-2.5 @md/infographic:text-[13px]">
              {AGENT_BRICKS_PROGRESS_LINES.map(({ content, id }, index) => (
                <AnimatedProgressLine
                  className="flex items-start gap-1.5"
                  isVisible={isVisible}
                  key={id}
                  lineIndex={index}
                  reduceMotion={reduceMotion}
                  stepIndex={1}
                >
                  <Check className="mt-px size-3 shrink-0" strokeWidth={1.5} />
                  {content}
                </AnimatedProgressLine>
              ))}
            </ul>
          </>
        </AgentBricksInfographicCard>

        <AgentBricksInfographicCard
          cardClassName="p-0"
          isLast
          isVisible={isVisible}
          reduceMotion={reduceMotion}
          step="03"
          stepIndex={2}
        >
          <>
            <div className="flex items-center px-2 py-2.5 gap-1.5 border-b border-[#D4D2CF] bg-[#F0EEEB] @md/infographic:px-3">
              <span className="flex gap-x-0.5 font-medium leading-tight text-xs @md/infographic:text-sm/tight">
                <span>&lt;</span>
                <span>/</span>
                <span>&gt;</span>
              </span>
              <h4 className="text-xs tracking-tight leading-tight font-medium @md/infographic:text-sm/tight">
                Python
              </h4>
            </div>
            <pre className="m-0 bg-white whitespace-pre-wrap p-2 text-black font-mono text-[11px] leading-normal tracking-tight @md/infographic:p-3 @md/infographic:text-[13px]">
              {PYTHON_CODE_LINES.map(({ content, id }, index) => (
                <AnimatedCodeLine
                  isVisible={isVisible}
                  key={id}
                  lineIndex={index}
                  reduceMotion={reduceMotion}
                  stepIndex={2}
                >
                  {content}
                </AnimatedCodeLine>
              ))}
            </pre>
          </>
        </AgentBricksInfographicCard>
      </div>
    </LazyMotion>
  );
}
