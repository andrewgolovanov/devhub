import { Sparkles } from "lucide-react";
import {
  LazyMotion,
  domAnimation,
  useInView,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import { useRef, type ReactNode } from "react";

import { FeatureInfographicCard } from "@/components/ui/feature-card";
import { cn } from "@site/src/lib/utils";

const sparklesIconSrc = "/img/home-new/features/sparkles-icon.svg";
const STEP_MOVE_DURATION = 0.68;
const DEPLOYING_LABEL = "Deploying...";
const DEPLOYING_TYPE_DELAY = 0.08;
const DEPLOYING_TYPE_DURATION = 0.25;
const DEPLOYING_STEP_INDEX = 1;
const DEPLOYING_STEP_DELAY = 0.16;
const DEPLOYING_TYPE_END_DELAY =
  DEPLOYING_STEP_DELAY + DEPLOYING_TYPE_DELAY + DEPLOYING_TYPE_DURATION;
const BROWSER_URL = "https://app.databricks.com/my-app";
const BROWSER_STEP_INDEX = 2;
const BROWSER_URL_TYPE_DELAY = 0.12;
const BROWSER_URL_TYPE_DURATION = 0.25;
const BROWSER_CONTENT_DELAY =
  BROWSER_URL_TYPE_DELAY + BROWSER_URL_TYPE_DURATION + 0.1;
const BROWSER_CONTENT_STAGGER = 0.08;
const BROWSER_CONTENT_DURATION = 0.26;
const BROWSER_CONTENT_INITIAL_Y = 10;
const STEP_MOVE_DELAYS = [0, 0.16, 0.54] as const;
const STEP_MOVE_EASE = [0.17, -0.17, 0, 1] as const;
const STEP_INITIAL_Y_BY_INDEX = [-10, -12, -18] as const;
const CONNECTOR_LINE_DELAY = 0.18;
const CONNECTOR_LINE_DURATION = 0.24;
const TEXT_LINE_INITIAL_Y = 8;
const TEXT_LINE_STAGGER = 0.055;
const TEXT_LINE_DURATION = 0.24;
const TEXT_LINE_DELAY = 0.08;
const TEXT_LINE_EASE = [0.22, 1, 0.36, 1] as const;
const TERMINAL_CURSOR_LINE_INDEX = 3;
const INFOGRAPHIC_IN_VIEW_AMOUNT = 0.45;
const TERMINAL_LINES = [
  {
    id: "command",
    className: "text-black",
    content: "$ dbx deploy",
  },
  {
    id: "connecting",
    className: "mt-4 text-black/45",
    content: "Connecting to workspace...",
  },
  {
    id: "uploading",
    className: "mt-1 text-black/45",
    content: "Uploading app...",
  },
  {
    id: "linking",
    className: "mt-1 text-black/45",
    content: "Linking data sources...",
  },
] as const;

type AnimatedAppsStepProps = {
  children: ReactNode;
  className?: string;
  isVisible: boolean;
  reduceMotion: boolean;
  stepIndex: number;
};

type AnimatedConnectorLineProps = {
  className?: string;
  isVisible: boolean;
  reduceMotion: boolean;
  stepIndex: number;
};

function getStepDelay(stepIndex: number) {
  return STEP_MOVE_DELAYS[stepIndex] ?? STEP_MOVE_DELAYS[2];
}

function getStepInitialY(stepIndex: number) {
  return STEP_INITIAL_Y_BY_INDEX[stepIndex] ?? -18;
}

function getStepTransition(stepIndex: number) {
  return {
    delay: getStepDelay(stepIndex),
    duration: STEP_MOVE_DURATION,
    ease: STEP_MOVE_EASE,
  };
}

function getConnectorLineTransition(stepIndex: number) {
  return {
    delay:
      stepIndex === DEPLOYING_STEP_INDEX
        ? DEPLOYING_TYPE_END_DELAY
        : getStepDelay(stepIndex) + CONNECTOR_LINE_DELAY,
    duration: CONNECTOR_LINE_DURATION,
  };
}

function getTextLineTransition(stepIndex: number, lineIndex: number) {
  return {
    delay:
      getStepDelay(stepIndex) + TEXT_LINE_DELAY + lineIndex * TEXT_LINE_STAGGER,
    duration: TEXT_LINE_DURATION,
    ease: TEXT_LINE_EASE,
  };
}

function getTerminalCursorTransition() {
  return {
    delay:
      getStepDelay(0) +
      TEXT_LINE_DELAY +
      TERMINAL_CURSOR_LINE_INDEX * TEXT_LINE_STAGGER,
    duration: 0.75,
    repeat: 2,
    repeatDelay: 0.12,
    times: [0, 0.45, 0.55, 1],
  };
}

function getDeployingCharacterTransition(characterIndex: number) {
  return {
    delay:
      getStepDelay(DEPLOYING_STEP_INDEX) +
      DEPLOYING_TYPE_DELAY +
      characterIndex *
        (DEPLOYING_TYPE_DURATION / Math.max(DEPLOYING_LABEL.length - 1, 1)),
    duration: 0.01,
  };
}

function getBrowserUrlCharacterTransition(characterIndex: number) {
  return {
    delay:
      getStepDelay(BROWSER_STEP_INDEX) +
      BROWSER_URL_TYPE_DELAY +
      characterIndex *
        (BROWSER_URL_TYPE_DURATION / Math.max(BROWSER_URL.length - 1, 1)),
    duration: 0.01,
  };
}

function getBrowserContentTransition(itemIndex: number) {
  return {
    delay:
      getStepDelay(BROWSER_STEP_INDEX) +
      BROWSER_CONTENT_DELAY +
      itemIndex * BROWSER_CONTENT_STAGGER,
    duration: BROWSER_CONTENT_DURATION,
    ease: TEXT_LINE_EASE,
  };
}

function AnimatedAppsStep({
  children,
  className,
  isVisible,
  reduceMotion,
  stepIndex,
}: AnimatedAppsStepProps) {
  return (
    <m.div
      animate={isVisible && !reduceMotion ? { opacity: 1, y: 0 } : undefined}
      className={className}
      initial={
        reduceMotion ? false : { opacity: 0, y: getStepInitialY(stepIndex) }
      }
      transition={getStepTransition(stepIndex)}
    >
      {children}
    </m.div>
  );
}

function AnimatedTextLine({
  children,
  className,
  isVisible,
  lineIndex,
  reduceMotion,
  stepIndex,
}: {
  children: ReactNode;
  className?: string;
  isVisible: boolean;
  lineIndex: number;
  reduceMotion: boolean;
  stepIndex: number;
}) {
  return (
    <m.span
      animate={isVisible && !reduceMotion ? { opacity: 1, y: 0 } : undefined}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: TEXT_LINE_INITIAL_Y }}
      transition={getTextLineTransition(stepIndex, lineIndex)}
    >
      {children}
    </m.span>
  );
}

function AnimatedConnectorLine({
  className,
  isVisible,
  reduceMotion,
  stepIndex,
}: AnimatedConnectorLineProps) {
  return (
    <m.div
      animate={isVisible && !reduceMotion ? { opacity: 1 } : undefined}
      className={cn(
        "h-12 border-l border-dashed border-black @md/infographic:h-16",
        className,
      )}
      initial={reduceMotion ? false : { opacity: 0 }}
      transition={getConnectorLineTransition(stepIndex)}
    />
  );
}

function TerminalCursor({
  isVisible,
  reduceMotion,
}: {
  isVisible: boolean;
  reduceMotion: boolean;
}) {
  if (reduceMotion) {
    return <span className="text-black">█</span>;
  }

  return (
    <m.span
      animate={isVisible ? { opacity: [1, 1, 0, 0] } : undefined}
      className="text-black"
      transition={getTerminalCursorTransition()}
    >
      █
    </m.span>
  );
}

function DeployingText({
  isVisible,
  reduceMotion,
}: {
  isVisible: boolean;
  reduceMotion: boolean;
}) {
  if (reduceMotion) {
    return <span>{DEPLOYING_LABEL}</span>;
  }

  return (
    <span aria-label={DEPLOYING_LABEL}>
      {Array.from(DEPLOYING_LABEL).map((character, index) => (
        <m.span
          animate={isVisible ? { opacity: 1 } : undefined}
          initial={{ opacity: 0 }}
          key={`${character}-${index}`}
          transition={getDeployingCharacterTransition(index)}
        >
          {character}
        </m.span>
      ))}
    </span>
  );
}

function BrowserUrlText({
  isVisible,
  reduceMotion,
}: {
  isVisible: boolean;
  reduceMotion: boolean;
}) {
  if (reduceMotion) {
    return <span>{BROWSER_URL}</span>;
  }

  return (
    <span aria-label={BROWSER_URL}>
      {Array.from(BROWSER_URL).map((character, index) => (
        <m.span
          animate={isVisible ? { opacity: 1 } : undefined}
          initial={{ opacity: 0 }}
          key={`${character}-${index}`}
          transition={getBrowserUrlCharacterTransition(index)}
        >
          {character}
        </m.span>
      ))}
    </span>
  );
}

function AnimatedBrowserElement({
  children,
  className,
  isVisible,
  itemIndex,
  reduceMotion,
}: {
  children: ReactNode;
  className?: string;
  isVisible: boolean;
  itemIndex: number;
  reduceMotion: boolean;
}) {
  return (
    <m.div
      animate={isVisible && !reduceMotion ? { opacity: 1, y: 0 } : undefined}
      className={className}
      initial={
        reduceMotion ? false : { opacity: 0, y: BROWSER_CONTENT_INITIAL_Y }
      }
      transition={getBrowserContentTransition(itemIndex)}
    >
      {children}
    </m.div>
  );
}

function Placeholder({ className }: { className: string }) {
  return (
    <div
      className={cn(
        "rounded-full bg-[#E9E7E4] h-1.5 shrink-0 @sm/infographic:h-2",
        className,
      )}
    />
  );
}

export function DatabricksAppsInfographic() {
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
        className="@container/infographic flex w-full flex-col items-center py-6 font-sans text-black md:min-h-0 md:py-18"
        ref={infographicRef}
      >
        <AnimatedAppsStep
          isVisible={isVisible}
          reduceMotion={reduceMotion}
          stepIndex={0}
        >
          <FeatureInfographicCard className="flex flex-col px-4 py-3 font-mono tracking-tight text-sm/snug w-67.5 @md/infographic:p-3 @md/infographic:text-[13px]/snug">
            {TERMINAL_LINES.map(({ className, content, id }, index) => (
              <AnimatedTextLine
                className={className}
                isVisible={isVisible}
                key={id}
                lineIndex={index}
                reduceMotion={reduceMotion}
                stepIndex={0}
              >
                {content}
                {id === "linking" && (
                  <>
                    {" "}
                    <TerminalCursor
                      isVisible={isVisible}
                      reduceMotion={reduceMotion}
                    />
                  </>
                )}
              </AnimatedTextLine>
            ))}
          </FeatureInfographicCard>
        </AnimatedAppsStep>
        <AnimatedConnectorLine
          isVisible={isVisible}
          reduceMotion={reduceMotion}
          stepIndex={0}
        />
        <AnimatedAppsStep
          isVisible={isVisible}
          reduceMotion={reduceMotion}
          stepIndex={1}
        >
          <div className="flex shrink-0 h-8 items-center justify-center pl-2.5 pr-3 gap-1.5 border border-black/10 tracking-[-0.02em] bg-white text-[11px] font-medium shadow-[0_.625rem_1.25rem_rgba(0,0,0,.06)] @md/infographic:gap-1.5 @md/infographic:text-[13px]">
            <img
              src={sparklesIconSrc}
              alt=""
              className="size-4 shrink-0"
              width={16}
              height={16}
              loading="lazy"
              decoding="async"
            />
            <DeployingText isVisible={isVisible} reduceMotion={reduceMotion} />
          </div>
        </AnimatedAppsStep>
        <AnimatedConnectorLine
          isVisible={isVisible}
          reduceMotion={reduceMotion}
          stepIndex={1}
        />

        <AnimatedAppsStep
          className="w-full max-w-lg"
          isVisible={isVisible}
          reduceMotion={reduceMotion}
          stepIndex={2}
        >
          <FeatureInfographicCard className="overflow-hidden w-full">
            <div className="relative flex items-center border-b border-[#D4D2CF] bg-[#F0EEEB] px-3 py-1.5 @md/infographic:px-4">
              <div className="absolute top-1/2 left-3 -translate-y-1/2 flex gap-x-1.5">
                <span className="size-2.5 shrink-0 rounded-full bg-orange" />
                <span className="size-2.5 shrink-0 rounded-full bg-[#CCCAC6]" />
                <span className="size-2.5 shrink-0 rounded-full bg-[#00A972]" />
              </div>
              <span className="ml-auto flex items-center justify-center tracking-tight bg-white text-[9px] w-44 h-5 text-black/80 @xs/infographic:mx-auto @md/infographic:text-[10px] @md/infographic:w-56 @md/infographic:h-5.5">
                <BrowserUrlText
                  isVisible={isVisible}
                  reduceMotion={reduceMotion}
                />
              </span>
            </div>
            <div className="flex flex-col bg-white p-4 @md/infographic:p-6">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2 @sm/infographic:gap-2.5">
                  <AnimatedBrowserElement
                    isVisible={isVisible}
                    itemIndex={0}
                    reduceMotion={reduceMotion}
                  >
                    <Placeholder className="w-28 @sm/infographic:w-42" />
                  </AnimatedBrowserElement>
                  <AnimatedBrowserElement
                    isVisible={isVisible}
                    itemIndex={1}
                    reduceMotion={reduceMotion}
                  >
                    <Placeholder className="w-20 @sm/infographic:w-30" />
                  </AnimatedBrowserElement>
                </div>
                <AnimatedBrowserElement
                  className="flex items-center gap-2.5 @sm/infographic:gap-4"
                  isVisible={isVisible}
                  itemIndex={2}
                  reduceMotion={reduceMotion}
                >
                  <Placeholder className="w-12" />
                  <Placeholder className="size-5 @sm/infographic:size-7" />
                </AnimatedBrowserElement>
              </div>
              <div className="mt-4.5 grid h-[62%] grid-cols-2 gap-4 @sm/infographic:gap-5">
                {[3, 4].map((itemIndex) => (
                  <AnimatedBrowserElement
                    isVisible={isVisible}
                    itemIndex={itemIndex}
                    key={itemIndex}
                    reduceMotion={reduceMotion}
                  >
                    <div className="relative aspect-222/183 border border-[#D4D2CF] bg-linear-[125deg] from-[#F1EFEC] from-20% via-white via-45% to-[#F1EFEC] to-80% p-3">
                      <Placeholder className="w-16.5 bg-[#DCDAD7]" />
                    </div>
                  </AnimatedBrowserElement>
                ))}
              </div>
            </div>
          </FeatureInfographicCard>
        </AnimatedAppsStep>
      </div>
    </LazyMotion>
  );
}
