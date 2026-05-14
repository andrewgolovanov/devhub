import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { type SVGProps, useCallback, useRef, useState } from "react";

interface TemplatesProps {
  className?: string;
}

type TemplateCardItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
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

function LinkArrowIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 16.0352H29"
        stroke="currentColor"
        strokeWidth="4"
        strokeMiterlimit="10"
      />
      <path
        d="M20 7.03516L29 16.0352L20 25.0352"
        stroke="currentColor"
        strokeWidth="4"
        strokeMiterlimit="10"
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
  },
  {
    id: "vacation-rentals",
    title: "Data pipeline monitor",
    description:
      "Monitor your data pipelines in real time with a unified view of job status, latency metrics, and failure alerts for full visibility into system health and performance.",
    href: "/templates/vacation-rentals",
    imageUrl: "/img/home-new/templates/data-pipeline-monitor.png",
  },
  {
    id: "app-with-lakebase",
    title: "AppKit Starter",
    description:
      "A minimal starter template using the Databricks AppKit component library. The fastest way to start building.",
    href: "/templates/app-with-lakebase",
    imageUrl: "/img/home-new/templates/appkit-starter.png",
  },
  {
    id: "rag-chat",
    title: "AI assistant",
    description:
      "An AI-powered assistant that answers questions using your enterprise data, leveraging RAG patterns and AgentBricks to deliver accurate, context-aware insights.",
    href: "/templates/agentic-support-console",
    imageUrl: "/img/home-new/templates/ai-assistant.png",
  },
];

function TemplateCarouselCard({
  item,
  isActive,
}: {
  item: TemplateCardItem;
  isActive: boolean;
}) {
  const imageSrc = useBaseUrl(item.imageUrl);

  return (
    <div className="flex flex-col h-full justify-end">
      <h3 className="text-xl leading-tight font-medium tracking-tight text-white flex items-center gap-1.5 text-pretty">
        <span className="inline">{item.title}</span>
        {isActive ? (
          <TitleLinkIcon
            className="inline size-6 text-db-lava-light transition-transform duration-200 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5"
            aria-hidden="true"
          />
        ) : null}
      </h3>
      <p
        className={cn(
          "max-w-104 mt-2.5 text-[15px] leading-normal tracking-tight text-grey-70",
          isActive && "max-w-136",
        )}
      >
        {item.description}
      </p>
      <Link
        to={item.href}
        className="block mt-4"
        aria-label={`${item.title} template`}
      >
        <img
          src={imageSrc}
          alt=""
          className={cn(
            "relative hidden w-full overflow-hidden border border-[#515151] object-cover object-top shadow-[0_18px_50px_rgb(0_0_0/0.32)] md:mt-6 xl:block",
            isActive
              ? "h-[67vw] max-h-96.5 md:h-[24.125rem]"
              : "h-[48vw] max-h-70 md:h-[17.5rem]",
          )}
          loading="eager"
          decoding="async"
        />
      </Link>
    </div>
  );
}

function Templates({ className }: TemplatesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselApiRef = useRef<CarouselApi | null>(null);

  const handleCarouselApi = useCallback((api: CarouselApi) => {
    if (!api || carouselApiRef.current === api) return;

    carouselApiRef.current = api;

    const syncActiveSlide = () => {
      setActiveIndex(api.selectedScrollSnap());
      window.requestAnimationFrame(() => api.reInit());
    };

    syncActiveSlide();
    api.on("select", syncActiveSlide);
  }, []);

  return (
    <section
      className={cn(
        "templates overflow-hidden bg-grey-8 text-white pt-20 md:pt-28 lg:pt-34",
        className,
      )}
      aria-labelledby="home-new-templates-title"
    >
      <div className="mx-auto flex w-full max-w-400 flex-col px-5 md:px-8">
        <header className="flex flex-col gap-y-6">
          <div className="flex items-center gap-1.5">
            <span className="size-1.5 bg-[#FF6038]" aria-hidden="true" />
            <p className="font-mono text-sm/none font-medium tracking-normal text-[#5e616e] uppercase">
              [Templates]
            </p>
          </div>
          <h2
            className="text-4xl leading-[1.125] max-w-184 font-normal tracking-[-0.04em] text-balance text-white md:text-5xl md:leading-[1.125] lg:text-[3.5rem]"
            id="home-new-templates-title"
          >
            Start from working templates to fork, deploy,{" "}
            <span className="text-grey-70">
              and build agentic applications.
            </span>
          </h2>
        </header>
      </div>

      <Carousel
        className="group @container"
        opts={{ align: "start" }}
        setApi={handleCarouselApi}
      >
        <div className="mx-auto flex w-full max-w-400 flex-col px-5 md:px-8">
          <div className="mt-9 flex items-center gap-5">
            <CarouselPrevious
              className={cn(
                "static size-11 translate-0 rounded-none border border-white/14 bg-transparent text-white/45 shadow-none transition-colors duration-150",
                "hover:border-white/28 hover:bg-white/8 hover:text-white",
                "disabled:border-white/8 disabled:bg-transparent disabled:text-white/18",
                "focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#121317]",
                "[&_svg]:size-6",
              )}
            >
              <SliderArrowIcon className="rotate-180 size-6" />
            </CarouselPrevious>
            <CarouselNext
              className={cn(
                "static size-11 translate-0 rounded-none border border-db-lava-light bg-db-lava-light text-white shadow-none transition-colors duration-150",
                "hover:border-db-lava hover:bg-db-lava",
                "disabled:border-white/8 disabled:bg-transparent disabled:text-white/18",
                "focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#121317]",
                "[&_svg]:size-6",
              )}
            >
              <SliderArrowIcon className="size-6" />
            </CarouselNext>
          </div>
        </div>
        <CarouselContent className="mt-12 gap-x-8 scroll-px-5 md:mt-14 md:scroll-px-8 lg:mt-10.5">
          {TEMPLATE_ITEMS.map((item, index) => (
            <CarouselItem
              className={cn(
                "basis-[78vw] first:pl-5 md:basis-md md:first:pl-8",
                activeIndex === index && "md:basis-xl",
                index === 0 && "xl:pl-[calc((100vw-96rem)/2+1rem)]!",
                index === 0 &&
                  activeIndex === index &&
                  "xl:basis-[calc(36rem+((100vw-96rem)/2+1rem))]",
                index === 0 &&
                  activeIndex !== index &&
                  "xl:basis-[calc(28rem+((100vw-96rem)/2+1rem))]",
              )}
              key={item.id}
            >
              <TemplateCarouselCard
                item={item}
                isActive={activeIndex === index}
              />
            </CarouselItem>
          ))}
          <div
            className="invisible w-5 shrink-0 snap-start md:w-8 xl:w-[calc((100cqw-96rem)/2)]"
            aria-hidden
          />
        </CarouselContent>
      </Carousel>

      <Button
        className="mt-14 w-full flex rounded-none bg-orange px-5 font-mono text-xl font-medium tracking-normal text-white uppercase shadow-none hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#121317] md:mt-18 md:text-[2rem]"
        asChild
      >
        <Link
          to="/templates"
          className="gap-5 h-14 no-underline tracking-tight md:gap-8"
        >
          <LinkArrowIcon className="size-8" />
          <span>See all templates</span>
          <LinkArrowIcon className="size-8 rotate-180" />
        </Link>
      </Button>
    </section>
  );
}

export default Templates;
