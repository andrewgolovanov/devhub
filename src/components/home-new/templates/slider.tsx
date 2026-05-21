import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { domAnimation, LazyMotion } from "motion/react";
import * as m from "motion/react-m";
import { type RefObject, type SVGProps } from "react";

import { TEMPLATE_TRACK_TRANSITION, useTemplateSlider } from "./use-slider";

type TemplateCardItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
};

function SliderArrowIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      width="24"
      height="13"
      viewBox="0 0 24 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.4982 0.707034L21.9982 6.20704L16.4982 11.707M21.9982 6.20704L9.61651e-07 6.20703"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

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
    imageUrl: "/img/home-new/templates/ai-assistant.png",
    imageWidth: 1388,
    imageHeight: 983,
  },
  {
    id: "vacation-rentals",
    title: "Data pipeline monitor",
    description:
      "Monitor your data pipelines in real time with a unified view of job status, latency metrics, and failure alerts for full visibility into system health and performance.",
    href: "/templates/vacation-rentals",
    imageUrl: "/img/home-new/templates/data-pipeline-monitor.png",
    imageWidth: 3286,
    imageHeight: 2064,
  },
  {
    id: "app-with-lakebase",
    title: "AppKit Starter",
    description:
      "A minimal starter template using the Databricks AppKit component library. The fastest way to start building.",
    href: "/templates/app-with-lakebase",
    imageUrl: "/img/home-new/templates/appkit-starter.png",
    imageWidth: 3456,
    imageHeight: 2168,
  },
];

const TEMPLATE_ITEM_REPEATS = 2;
const CAROUSEL_TEMPLATE_ITEMS = Array.from(
  { length: TEMPLATE_ITEM_REPEATS },
  () => TEMPLATE_ITEMS,
).flat();

function TemplateCarouselCard({
  item,
  isActive,
}: {
  item: TemplateCardItem;
  isActive: boolean;
}) {
  const imageSrc = useBaseUrl(item.imageUrl);

  return (
    <Link
      to={item.href}
      draggable={false}
      className="mt-auto flex h-full w-full flex-col justify-end text-white no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#121317]"
      aria-label={`${item.title} template`}
      onDragStart={(event) => event.preventDefault()}
    >
      <h3 className="text-xl leading-tight font-medium tracking-tight text-white text-pretty">
        <span className="group/title inline-flex items-center gap-1.5 text-white">
          <span>{item.title}</span>
          <TitleLinkIcon
            className="size-6 text-db-lava-light opacity-0 transition-[opacity,transform] duration-200 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:opacity-100 group-focus-visible/title:-translate-y-0.5 group-focus-visible/title:translate-x-0.5 group-focus-visible/title:opacity-100"
            aria-hidden="true"
          />
        </span>
      </h3>
      <p
        className={cn(
          "max-w-104 mt-2.5 text-[15px] leading-normal tracking-tight text-grey-70",
          isActive && "max-w-136",
        )}
      >
        {item.description}
      </p>
      <img
        className="relative mt-6 overflow-hidden border border-[#515151] w-full shadow-[0_18px_50px_rgb(0_0_0/0.32)] duration-500 ease-out"
        src={imageSrc}
        draggable={false}
        width={item.imageWidth}
        height={item.imageHeight}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </Link>
  );
}

export function TemplateSlider({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const slider = useTemplateSlider({
    itemCount: CAROUSEL_TEMPLATE_ITEMS.length,
    sectionRef,
  });

  return (
    <div
      className="group @container"
      onMouseEnter={() => slider.setIsAutoplayPaused(true)}
      onMouseLeave={() => slider.setIsAutoplayPaused(false)}
    >
      <div className="mx-auto flex w-full max-w-400 flex-col px-5 md:px-8">
        <div className="mt-9 flex items-center gap-5">
          <Button
            aria-label="Previous slide"
            disabled={slider.isPreviousSlideDisabled}
            onClick={slider.handlePreviousSlide}
            className={cn(
              "static size-11 translate-0 rounded-none shadow-none transition-colors duration-150 disabled:opacity-30",
              slider.isPreviousSlideDisabled
                ? "border border-white bg-transparent text-white"
                : "border border-db-lava-light bg-db-lava-light text-white hover:border-db-lava hover:bg-db-lava",
              "focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#121317]",
              "[&_svg]:size-6",
            )}
          >
            <SliderArrowIcon className="rotate-180 size-6" />
          </Button>
          <Button
            aria-label="Next slide"
            disabled={slider.isNextSlideDisabled}
            onClick={slider.handleNextSlide}
            className={cn(
              "static size-11 translate-0 rounded-none shadow-none transition-colors duration-150 disabled:opacity-30",
              slider.isNextSlideDisabled
                ? "border border-white bg-transparent text-white"
                : "border border-db-lava-light bg-db-lava-light text-white hover:border-db-lava hover:bg-db-lava",
              "focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#121317]",
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
              "mx-auto w-full max-w-400 overflow-visible px-5 transition-opacity duration-150 md:px-8",
              slider.isCarouselMeasured
                ? "opacity-100"
                : "pointer-events-none opacity-0",
            )}
            ref={slider.carouselViewportRef}
          >
            <m.div
              animate={{ x: slider.trackX }}
              className="flex w-max min-h-[70vw] md:min-h-96 lg:min-h-112 2xl:min-h-136"
              initial={false}
              style={{ columnGap: slider.cardGap }}
              transition={
                slider.shouldAnimateTrack
                  ? TEMPLATE_TRACK_TRANSITION
                  : { duration: 0 }
              }
            >
              {CAROUSEL_TEMPLATE_ITEMS.map((item, index) => {
                const isActive = slider.activeCarouselIndex === index;
                const indexDistance = index - slider.activeCarouselIndex;
                const isVisibleCard = slider.shouldUseTwoFullCardsLayout
                  ? indexDistance >= -1 && indexDistance <= 0
                  : slider.shouldUseThreeCardLayout
                    ? Math.abs(indexDistance) <= 1
                    : isActive;
                const isInitialLeadingPartialCard =
                  slider.shouldUseThreeCardLayout
                    ? indexDistance < -1
                    : indexDistance < 0;
                const cardWidth = slider.getCardWidth(isActive);

                return (
                  <m.div
                    animate={{
                      opacity:
                        !slider.hasCarouselMoved && isInitialLeadingPartialCard
                          ? 0
                          : isVisibleCard
                            ? 1
                            : 0.5,
                      ...(slider.shouldAnimateCardWidth
                        ? { width: cardWidth }
                        : {}),
                    }}
                    className={cn(
                      "shrink-0 flex flex-col justify-end overflow-hidden",
                      isVisibleCard
                        ? "pointer-events-auto cursor-grab touch-pan-y active:cursor-grabbing"
                        : "pointer-events-none",
                      isActive && "relative z-10",
                    )}
                    initial={false}
                    key={`${item.id}-${index}`}
                    onClickCapture={slider.handleCarouselClickCapture}
                    onPointerCancel={slider.handleCarouselPointerCancel}
                    onPointerDown={slider.handleCarouselPointerDown}
                    onPointerLeave={slider.handleCarouselPointerLeave}
                    onPointerMove={slider.handleCarouselPointerMove}
                    onPointerUp={slider.handleCarouselPointerUp}
                    style={
                      slider.shouldAnimateCardWidth
                        ? undefined
                        : { width: cardWidth }
                    }
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <TemplateCarouselCard item={item} isActive={isActive} />
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
