import useBaseUrl from "@docusaurus/useBaseUrl";
import { type UIEvent, useEffect, useRef, useState } from "react";

import { SectionKicker } from "@/components/products/section-kicker";
import { Button } from "@/components/ui/button";
import { SliderArrowIcon } from "@/components/ui/slider-arrow-icon";
import type { ProductPageContent } from "@/lib/products/product-page";
import { cn } from "@/lib/utils";

type TestimonialsSliderProps = {
  content: ProductPageContent;
};

type ProductTestimonial = ProductPageContent["testimonials"][number];

const testimonialLogoAssets = [
  {
    match: "tibber",
    src: "/img/products/testimonials/tibber.svg",
    width: 158,
  },
  {
    match: "ensemble",
    src: "/img/products/testimonials/ensemble-health-partners.svg",
    width: 226,
  },
  {
    match: "yipit",
    src: "/img/products/testimonials/yipitdata.svg",
    width: 197,
  },
] as const;

function getTestimonialLogoAsset(company: string) {
  const normalizedCompany = company.toLowerCase();

  return (
    testimonialLogoAssets.find(({ match }) =>
      normalizedCompany.includes(match),
    ) ?? testimonialLogoAssets[2]
  );
}

function TestimonialLogo({
  company,
}: {
  company: ProductTestimonial["company"];
}) {
  const logo = getTestimonialLogoAsset(company);
  const src = useBaseUrl(logo.src);

  return (
    <img
      alt={`${company} logo`}
      className="h-9 max-w-full self-start object-contain object-left md:h-10 lg:h-11 xl:h-12"
      decoding="async"
      height={36}
      loading="lazy"
      src={src}
      style={{ width: logo.width }}
      width={logo.width}
    />
  );
}

function TestimonialCard({
  active,
  testimonial,
}: {
  active: boolean;
  testimonial: ProductTestimonial;
}) {
  return (
    <article
      className={cn(
        "flex w-[calc(100vw-2.5rem)] min-h-143.5 shrink-0 snap-start flex-col justify-between border border-white/18 bg-db-navy-light p-6 md:w-lg md:px-8 md:py-10",
        active && "bg-db-cyan/20",
      )}
    >
      <TestimonialLogo company={testimonial.company} />
      <div>
        <blockquote className="mt-10 max-w-[448px] text-lg leading-normal tracking-[-0.6px] text-white md:text-xl lg:text-2xl">
          "{testimonial.quote}"
        </blockquote>
        <p className="mt-auto pt-12 text-base text-white/80 tracking-[-0.4px]">
          <span className="text-white">{testimonial.attributionName}</span>
          {testimonial.attributionTitle
            ? `, ${testimonial.attributionTitle}`
            : ""}
        </p>
      </div>
    </article>
  );
}

function getNearestTestimonialIndex(track: HTMLDivElement): number {
  const cards = Array.from(track.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
  const trackCenter = track.scrollLeft + track.clientWidth / 2;

  return cards.reduce((nearestIndex, card, index) => {
    const currentCard = cards[nearestIndex];
    const cardCenter =
      card.offsetLeft - track.offsetLeft + card.offsetWidth / 2;
    const currentCardCenter =
      currentCard.offsetLeft - track.offsetLeft + currentCard.offsetWidth / 2;

    return Math.abs(cardCenter - trackCenter) <
      Math.abs(currentCardCenter - trackCenter)
      ? index
      : nearestIndex;
  }, 0);
}

export function TestimonialsSlider({ content }: TestimonialsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollEndTimerRef = useRef<number | null>(null);
  const targetIndexRef = useRef<number | null>(null);
  const lastIndex = content.testimonials.length - 1;
  const currentIndex = targetIndex ?? activeIndex;
  const progress = `${Math.min(
    100,
    ((currentIndex + 2) / (content.testimonials.length + 1)) * 100,
  )}%`;

  useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current !== null) {
        window.clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, []);

  function scrollToTestimonial(index: number) {
    const nextIndex = Math.max(0, Math.min(index, lastIndex));
    const track = trackRef.current;
    const card = trackRef.current?.children.item(nextIndex);

    if (!track || !(card instanceof HTMLElement)) {
      setActiveIndex(nextIndex);
      setTargetIndex(null);
      targetIndexRef.current = null;
      return;
    }

    const trackStyles = window.getComputedStyle(track);
    const trackLeftInset = Number.parseFloat(trackStyles.paddingLeft) || 0;

    targetIndexRef.current = nextIndex;
    setTargetIndex(nextIndex);

    track.scrollTo({
      left: Math.min(
        Math.max(0, card.offsetLeft - track.offsetLeft - trackLeftInset),
        track.scrollWidth - track.clientWidth,
      ),
      behavior: "smooth",
    });
    settleProgrammaticScroll(track);
  }

  function settleProgrammaticScroll(track: HTMLDivElement) {
    if (scrollEndTimerRef.current !== null) {
      window.clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = window.setTimeout(() => {
      const settledTargetIndex = targetIndexRef.current;
      targetIndexRef.current = null;
      setActiveIndex(settledTargetIndex ?? getNearestTestimonialIndex(track));
      setTargetIndex(null);
    }, 140);
  }

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const track = event.currentTarget;

    if (targetIndexRef.current !== null) {
      settleProgrammaticScroll(track);
      return;
    }

    const nextIndex = getNearestTestimonialIndex(track);

    setActiveIndex((index) => (nextIndex === index ? index : nextIndex));
  }

  return (
    <section className="overflow-hidden bg-db-navy pb-18 text-white md:pb-20">
      <div className="mx-auto w-full max-w-304 px-5 md:px-8 xl:px-0">
        <SectionKicker className="text-grey-70">
          {content.testimonialsIntro.eyebrow}
        </SectionKicker>
        <h2 className="mt-6 max-w-304 font-sans text-[36px] leading-tight font-normal tracking-[-1.76px] md:text-[40px] lg:text-[44px] text-balance">
          {content.testimonialsIntro.titleLead}{" "}
          <span className="text-white/60">
            {content.testimonialsIntro.titleMuted}
          </span>
        </h2>

        <div className="mt-12 flex items-center gap-5">
          <div
            className="h-2 grow bg-white/8"
            role="presentation"
            aria-hidden="true"
          >
            <div
              className="h-full bg-orange transition-[width] duration-300"
              style={{ width: progress }}
            />
          </div>
          <div className="hidden shrink-0 items-center gap-5 md:flex">
            <Button
              className={cn(
                "static size-9 md:size-10 lg:size-11 translate-0 rounded-none shadow-none transition-colors duration-150 disabled:opacity-30",
                currentIndex === 0
                  ? "border border-white bg-transparent text-white"
                  : "border border-db-lava-light bg-db-lava-light text-white hover:border-db-lava hover:bg-db-lava",
                "focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#121317]",
                "[&_svg]:size-6",
              )}
              type="button"
              onClick={() => scrollToTestimonial(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Previous testimonial"
            >
              <SliderArrowIcon className="size-6 rotate-180" />
            </Button>
            <Button
              className={cn(
                "static size-9 md:size-10 lg:size-11 translate-0 rounded-none shadow-none transition-colors duration-150 disabled:opacity-30",
                currentIndex === lastIndex
                  ? "border border-white bg-transparent text-white"
                  : "border border-db-lava-light bg-db-lava-light text-white hover:border-db-lava hover:bg-db-lava",
                "focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-[#121317]",
                "[&_svg]:size-6",
              )}
              type="button"
              onClick={() => scrollToTestimonial(currentIndex + 1)}
              disabled={currentIndex === lastIndex}
              aria-label="Next testimonial"
            >
              <SliderArrowIcon className="size-6" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className="mt-[39px] [--testimonial-left:max(1.25rem,calc((100vw-76rem)/2))] md:[--testimonial-left:max(2rem,calc((100vw-76rem)/2))]"
        aria-live="polite"
      >
        <div
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-2 pl-[var(--testimonial-left)] pr-[var(--testimonial-left)] [scroll-padding-left:var(--testimonial-left)] [scroll-padding-right:var(--testimonial-left)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={trackRef}
          onScroll={handleScroll}
        >
          {content.testimonials.map((testimonial, index) => (
            <TestimonialCard
              active={index === activeIndex}
              testimonial={testimonial}
              key={testimonial.company}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
