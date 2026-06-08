import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { Button } from "@/components/ui/button";
import { SliderArrowIcon } from "@/components/ui/slider-arrow-icon";
import { cn } from "@/lib/utils";
import { domAnimation, LazyMotion } from "motion/react";
import * as m from "motion/react-m";
import {
  type KeyboardEvent,
  type RefObject,
  type SVGProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { type TemplateSliderSettings, useTemplateSlider } from "./use-slider";

type TemplateCardItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
};

function TitleLinkIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.9844 14.5332V8.11257H7.56374"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <path
        d="M3.21094 18.8887L13.7109 8.38867"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

const TEMPLATE_ITEMS: TemplateCardItem[] = [
  {
    id: "agentic-support-console",
    title: "AI assistant",
    description:
      "An AI-powered assistant that answers questions using your enterprise data, leveraging RAG patterns and AgentBricks to deliver accurate, context-aware insights.",
    href: "/templates/agentic-support-console",
    imageUrl: "/img/home/templates/ai-assistant.png",
    imageWidth: 1388,
    imageHeight: 983,
  },
  {
    id: "vacation-rentals",
    title: "Data pipeline monitor",
    description:
      "Monitor your data pipelines in real time with a unified view of job status, latency metrics, and failure alerts for full visibility into system health and performance.",
    href: "/templates/vacation-rentals",
    imageUrl: "/img/home/templates/data-pipeline-monitor.png",
    imageWidth: 3286,
    imageHeight: 2064,
  },
  {
    id: "app-with-lakebase",
    title: "AppKit Starter",
    description:
      "A minimal starter template using the Databricks AppKit component library. The fastest way to start building.",
    href: "/templates/app-with-lakebase",
    imageUrl: "/img/home/templates/appkit-starter.png",
    imageWidth: 3456,
    imageHeight: 2168,
  },
];

const TEMPLATE_ITEM_REPEATS = 2;
const CAROUSEL_TEMPLATE_ITEMS = Array.from(
  { length: TEMPLATE_ITEM_REPEATS },
  () => TEMPLATE_ITEMS,
).flat();

const TEMPLATE_DESCRIPTION_WIDTH = {
  inactive: "26rem",
  active: "34rem",
};

function TemplateDescriptionText({
  children,
  isVisible,
  width,
  duration,
}: {
  children: string;
  isVisible: boolean;
  width: string;
  duration: number;
}) {
  return (
    <p
      aria-hidden={!isVisible}
      className={cn(
        "col-start-1 row-start-1 min-w-0 max-w-full text-[15px] leading-normal tracking-tight break-words text-grey-70 transition-[opacity,transform] ease-out",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-1 opacity-0",
      )}
      style={{
        maxWidth: "100%",
        transitionDuration: `${duration}s`,
        width,
      }}
    >
      {children}
    </p>
  );
}

function TemplateCarouselCard({
  item,
  isActive,
  canOpenLink,
  isKeyboardMode,
  imageDuration,
  textWidthDuration,
}: {
  item: TemplateCardItem;
  isActive: boolean;
  canOpenLink: boolean;
  isKeyboardMode: boolean;
  imageDuration: number;
  textWidthDuration: number;
}) {
  const imageSrc = useBaseUrl(item.imageUrl);

  return (
    <Link
      className="group/card mt-auto flex h-fit w-full min-w-0 flex-col justify-end text-white no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#121317]"
      to={item.href}
      draggable={false}
      aria-label={`${item.title} template`}
      onDragStart={(event) => event.preventDefault()}
    >
      <h3 className="text-xl leading-tight font-medium tracking-tight text-white text-pretty">
        <span className="inline-flex items-center gap-1.5 text-white">
          <span>{item.title}</span>
          <TitleLinkIcon
            className={cn(
              "size-6 text-db-lava-light opacity-0 transition-[opacity,transform] duration-200",
              canOpenLink &&
                "group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:opacity-100 group-focus-visible/card:-translate-y-0.5 group-focus-visible/card:translate-x-0.5 group-focus-visible/card:opacity-100",
              isKeyboardMode &&
                isActive &&
                canOpenLink &&
                "-translate-y-0.5 translate-x-0.5 opacity-100",
            )}
            aria-hidden="true"
          />
        </span>
      </h3>
      <div className="mt-2.5 grid w-full min-w-0 grid-cols-1">
        <TemplateDescriptionText
          duration={textWidthDuration}
          isVisible={!isActive}
          width={TEMPLATE_DESCRIPTION_WIDTH.inactive}
        >
          {item.description}
        </TemplateDescriptionText>
        <TemplateDescriptionText
          duration={textWidthDuration}
          isVisible={isActive}
          width={TEMPLATE_DESCRIPTION_WIDTH.active}
        >
          {item.description}
        </TemplateDescriptionText>
      </div>
      <img
        className="relative mt-6 overflow-hidden border border-[#515151] w-full shadow-[0_18px_50px_rgb(0_0_0/0.32)] ease-out"
        src={imageSrc}
        draggable={false}
        width={item.imageWidth}
        height={item.imageHeight}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ transitionDuration: `${imageDuration}s` }}
      />
    </Link>
  );
}

export function TemplateSlider({
  sectionRef,
  settings,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  settings?: TemplateSliderSettings;
}) {
  const slider = useTemplateSlider({
    itemCount: CAROUSEL_TEMPLATE_ITEMS.length,
    sectionRef,
    settings,
  });
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const [keyboardPressedArrow, setKeyboardPressedArrow] = useState<
    "previous" | "next" | null
  >(null);
  const keyboardPressTimeoutRef = useRef<number | null>(null);
  const openActiveTemplate = useCallback(() => {
    const activeItem = CAROUSEL_TEMPLATE_ITEMS[slider.activeCarouselIndex];

    if (activeItem) {
      window.location.href = activeItem.href;
    }
  }, [slider.activeCarouselIndex]);
  const showKeyboardArrowPress = useCallback((arrow: "previous" | "next") => {
    if (keyboardPressTimeoutRef.current !== null) {
      window.clearTimeout(keyboardPressTimeoutRef.current);
    }

    setKeyboardPressedArrow(arrow);
    keyboardPressTimeoutRef.current = window.setTimeout(() => {
      setKeyboardPressedArrow(null);
      keyboardPressTimeoutRef.current = null;
    }, 160);
  }, []);

  const handleArrowButtonKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setIsKeyboardMode(true);
      showKeyboardArrowPress("previous");
      slider.handlePreviousSlide();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setIsKeyboardMode(true);
      showKeyboardArrowPress("next");
      slider.handleNextSlide();
      return;
    }
  };

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement || !slider.isAutoplayInViewport) return;

    const handleSectionKeyDown = (event: globalThis.KeyboardEvent) => {
      const target = event.target;
      const focusedElement = document.activeElement;

      if (
        !(focusedElement instanceof HTMLElement) ||
        !sectionElement.contains(focusedElement)
      ) {
        return;
      }

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"].includes(
            target.tagName,
          ))
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIsKeyboardMode(true);
        showKeyboardArrowPress("previous");
        slider.handlePreviousSlide();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setIsKeyboardMode(true);
        showKeyboardArrowPress("next");
        slider.handleNextSlide();
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        setIsKeyboardMode(true);
        openActiveTemplate();
        return;
      }
    };

    window.addEventListener("keydown", handleSectionKeyDown);

    return () => {
      window.removeEventListener("keydown", handleSectionKeyDown);
    };
  }, [
    openActiveTemplate,
    sectionRef,
    showKeyboardArrowPress,
    slider.handleNextSlide,
    slider.handlePreviousSlide,
    slider.isAutoplayInViewport,
  ]);

  useEffect(() => {
    return () => {
      if (keyboardPressTimeoutRef.current !== null) {
        window.clearTimeout(keyboardPressTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="group @container"
      onMouseEnter={() => slider.setIsAutoplayPaused(true)}
      onMouseLeave={() => slider.setIsAutoplayPaused(false)}
      onPointerDown={() => setIsKeyboardMode(false)}
      onPointerMove={() => setIsKeyboardMode(false)}
    >
      <div className="mx-auto flex w-full max-w-400 flex-col px-5 md:px-8">
        <div className="mt-9 flex items-center gap-5">
          <Button
            aria-label="Previous slide"
            aria-disabled={slider.isPreviousSlideDisabled}
            onClick={slider.handlePreviousSlide}
            onKeyDown={handleArrowButtonKeyDown}
            className={cn(
              "static size-11 translate-0 rounded-none shadow-none transition-colors duration-150",
              slider.isPreviousSlideDisabled
                ? "border border-white/25 bg-transparent text-white/35 hover:border-white/25 hover:bg-transparent hover:text-white/35"
                : "border border-db-lava-light bg-db-lava-light text-white hover:border-db-lava hover:bg-db-lava focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#121317]",
              keyboardPressedArrow === "previous" &&
                !slider.isPreviousSlideDisabled &&
                "border-db-lava bg-db-lava text-white transition-none",
              "[&_svg]:size-6",
            )}
          >
            <SliderArrowIcon className="rotate-180 size-6" />
          </Button>
          <Button
            aria-label="Next slide"
            aria-disabled={slider.isNextSlideDisabled}
            onClick={slider.handleNextSlide}
            onKeyDown={handleArrowButtonKeyDown}
            className={cn(
              "static size-11 translate-0 rounded-none shadow-none transition-colors duration-150",
              slider.isNextSlideDisabled
                ? "border border-white/25 bg-transparent text-white/35 hover:border-white/25 hover:bg-transparent hover:text-white/35"
                : "border border-db-lava-light bg-db-lava-light text-white hover:border-db-lava hover:bg-db-lava focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#121317]",
              keyboardPressedArrow === "next" &&
                !slider.isNextSlideDisabled &&
                "border-db-lava bg-db-lava text-white transition-none",
              "[&_svg]:size-6",
            )}
          >
            <SliderArrowIcon className="size-6" />
          </Button>
        </div>
      </div>
      <div className="relative mt-12 overflow-hidden md:mt-14 lg:mt-10.5">
        <LazyMotion features={domAnimation}>
          <div
            className={cn(
              "@container mx-auto w-full max-w-400 px-5 transition-opacity duration-150 md:px-8",
              slider.shouldUseNativeScroll
                ? "snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth [scroll-padding-left:1.25rem] [scroll-padding-right:1.25rem] [scrollbar-width:none] [-webkit-overflow-scrolling:touch] md:[scroll-padding-left:2rem] md:[scroll-padding-right:2rem] [&::-webkit-scrollbar]:hidden"
                : "overflow-visible",
              slider.isCarouselMeasured
                ? "opacity-100"
                : "pointer-events-none opacity-0",
            )}
            data-template-slider-viewport
            ref={slider.carouselViewportRef}
            onPointerDown={
              slider.shouldUseNativeScroll
                ? slider.handleNativeCarouselPointerDown
                : undefined
            }
            onScroll={
              slider.shouldUseNativeScroll
                ? slider.handleNativeCarouselScroll
                : undefined
            }
          >
            <m.div
              animate={{ x: slider.shouldUseNativeScroll ? 0 : slider.trackX }}
              className={cn(
                "flex w-max min-h-[70vw] md:min-h-96 lg:min-h-112 2xl:min-h-136",
                slider.shouldUseNativeScroll
                  ? "cursor-auto touch-auto"
                  : "cursor-grab touch-pan-y active:cursor-grabbing",
              )}
              initial={false}
              ref={slider.carouselTrackRef}
              onPointerCancel={
                slider.shouldUseNativeScroll
                  ? undefined
                  : slider.handleCarouselPointerCancel
              }
              onPointerDown={
                slider.shouldUseNativeScroll
                  ? undefined
                  : slider.handleCarouselPointerDown
              }
              onPointerLeave={
                slider.shouldUseNativeScroll
                  ? undefined
                  : slider.handleCarouselPointerLeave
              }
              onPointerMove={
                slider.shouldUseNativeScroll
                  ? undefined
                  : slider.handleCarouselPointerMove
              }
              onPointerUp={
                slider.shouldUseNativeScroll
                  ? undefined
                  : slider.handleCarouselPointerUp
              }
              style={{ columnGap: slider.cardGap }}
              transition={
                slider.shouldAnimateTrack
                  ? slider.trackTransition
                  : { duration: 0 }
              }
            >
              {CAROUSEL_TEMPLATE_ITEMS.map((item, index) => {
                const isActive = slider.activeCarouselIndex === index;
                const indexDistance = index - slider.activeCarouselIndex;
                const isVisibleCard = slider.shouldUseTwoFullCardsLayout
                  ? indexDistance >= 0 && indexDistance <= 1
                  : slider.shouldUseThreeCardLayout
                    ? Math.abs(indexDistance) <= 1
                    : isActive;
                const isInitialLeadingPartialCard =
                  slider.shouldUseThreeCardLayout && !slider.hasCarouselMoved
                    ? index < slider.activeCarouselIndex - 1
                    : !slider.hasCarouselMoved && indexDistance < 0;

                return (
                  <m.div
                    animate={{
                      opacity:
                        !slider.hasCarouselMoved && isInitialLeadingPartialCard
                          ? 0
                          : isVisibleCard
                            ? 1
                            : 0.5,
                    }}
                    data-active={isActive}
                    className={cn(
                      "pointer-events-auto w-[var(--template-card-width)] shrink-0 flex flex-col justify-end overflow-hidden transition-[width] ease-out [contain:layout_paint] will-change-transform",
                      slider.shouldUseNativeScroll && "snap-start",
                      "[--template-card-width:min(72cqw,360px)]",
                      "md:[--template-card-width:min(calc((100cqw-24px)/2),576px)]",
                      "xl:[--template-card-width:344px] 2xl:[--template-card-width:448px]",
                      "data-[active=true]:xl:[--template-card-width:448px] data-[active=true]:2xl:[--template-card-width:576px]",
                      isActive && "relative z-10",
                    )}
                    initial={false}
                    key={`${item.id}-${index}`}
                    onClickCapture={(event) =>
                      slider.handleCarouselClickCapture(
                        event,
                        index,
                        isVisibleCard,
                      )
                    }
                    style={{
                      transitionDuration: `${
                        settings?.cardResizeDuration ?? 0.5
                      }s`,
                    }}
                    transition={slider.cardTransition}
                  >
                    <TemplateCarouselCard
                      item={item}
                      isActive={isActive}
                      canOpenLink={isVisibleCard}
                      isKeyboardMode={isKeyboardMode}
                      imageDuration={settings?.cardDuration ?? 0.5}
                      textWidthDuration={settings?.textWidthDuration ?? 0.5}
                    />
                  </m.div>
                );
              })}
            </m.div>
          </div>
        </LazyMotion>
      </div>
    </div>
  );
}
