"use client";

import type { ProductPageContent } from "@/lib/products/product-page";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SliderArrowIcon } from "@/components/ui/slider-arrow-icon";
import { useScrollSlider } from "@/components/ui/use-scroll-slider";
import { SectionKicker } from "@/components/products/section-kicker";

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
  {
    match: "sae",
    src: "/img/products/testimonials/sae-international.svg",
    width: 158,
  },
  {
    match: "e.on",
    src: "/img/products/testimonials/eon.svg",
    width: 160,
  },
  {
    match: "addi",
    src: "/img/products/testimonials/addi.svg",
    width: 128,
  },
  {
    match: "astrazeneca",
    src: "/img/products/testimonials/astrazeneca.svg",
    width: 193,
  },
  {
    match: "flo health",
    src: "/img/products/testimonials/flo-health.svg",
    width: 104,
  },
  {
    match: "lippert",
    src: "/img/products/testimonials/lippert.svg",
    width: 160,
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

  return (
    <img
      alt={`${company} logo`}
      className="h-7 max-w-full self-start object-contain object-left brightness-0 invert md:h-8 lg:h-9 xl:h-12"
      decoding="async"
      height={36}
      loading="lazy"
      src={logo.src}
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
        "bg-db-navy-light flex min-h-76.5 w-[calc(100vw-2.5rem)] shrink-0 snap-start flex-col justify-between border border-white/18 p-6 md:w-lg md:px-8 md:py-10 lg:min-h-114.75 xl:min-h-143.5",
        active && "bg-db-cyan/20",
      )}
    >
      <TestimonialLogo company={testimonial.company} />
      <div>
        <blockquote className="mt-12 max-w-md text-base leading-normal tracking-normal text-white md:mt-13 md:text-lg lg:mt-5 lg:text-xl xl:mt-10 xl:text-2xl">
          "{testimonial.quote}"
        </blockquote>
        <p className="mt-auto pt-7 text-base tracking-normal text-white/80 md:pt-8 lg:pt-12">
          <span className="text-white">{testimonial.attributionName}</span>
          {testimonial.attributionTitle
            ? `, ${testimonial.attributionTitle}`
            : ""}
        </p>
      </div>
    </article>
  );
}

export function TestimonialsSlider({ content }: TestimonialsSliderProps) {
  const slider = useScrollSlider({ itemCount: content.testimonials.length });
  const { activeIndex, currentIndex, lastIndex } = slider;
  const progress = `${Math.min(
    100,
    ((currentIndex + 2) / (content.testimonials.length + 1)) * 100,
  )}%`;

  return (
    <section className="bg-db-navy overflow-hidden pb-18 text-white md:pb-20">
      <div className="mx-auto w-full max-w-304 px-5 md:px-8 xl:px-0">
        <SectionKicker className="text-grey-70">
          {content.testimonialsIntro.eyebrow}
        </SectionKicker>
        <h2 className="mt-6 max-w-304 font-sans text-4xl leading-tight font-normal tracking-normal text-balance md:text-[2.5rem] lg:text-[2.75rem]">
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
              className="bg-orange h-full transition-[width] duration-300"
              style={{ width: progress }}
            />
          </div>
          <div className="hidden shrink-0 items-center gap-5 md:flex">
            <Button
              className={cn(
                "static size-9 translate-0 rounded-none shadow-none transition-colors duration-150 disabled:opacity-30 md:size-10 lg:size-11",
                currentIndex === 0
                  ? "border border-white bg-transparent text-white"
                  : "border-db-lava-light bg-db-lava-light hover:border-db-lava hover:bg-db-lava border text-white",
                "focus-visible:ring-db-cyan focus-visible:ring-offset-grey-8 focus-visible:ring-2 focus-visible:ring-offset-2",
                "[&_svg]:size-6",
              )}
              type="button"
              onClick={() => slider.scrollToIndex(currentIndex - 1)}
              disabled={currentIndex === 0}
              aria-label="Previous testimonial"
            >
              <SliderArrowIcon className="size-6 rotate-180" />
            </Button>
            <Button
              className={cn(
                "static size-9 translate-0 rounded-none shadow-none transition-colors duration-150 disabled:opacity-30 md:size-10 lg:size-11",
                currentIndex === lastIndex
                  ? "border border-white bg-transparent text-white"
                  : "border-db-lava-light bg-db-lava-light hover:border-db-lava hover:bg-db-lava border text-white",
                "focus-visible:ring-db-cyan focus-visible:ring-offset-grey-8 focus-visible:ring-2 focus-visible:ring-offset-2",
                "[&_svg]:size-6",
              )}
              type="button"
              onClick={() => slider.scrollToIndex(currentIndex + 1)}
              disabled={currentIndex === lastIndex}
              aria-label="Next testimonial"
            >
              <SliderArrowIcon className="size-6" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className="mt-10 [--testimonial-left:max(1.25rem,calc((100vw-76rem)/2))] md:[--testimonial-left:max(2rem,calc((100vw-76rem)/2))]"
        aria-live="polite"
      >
        <div
          className="flex snap-x snap-mandatory [scroll-padding-right:var(--testimonial-left)] [scroll-padding-left:var(--testimonial-left)] [scrollbar-width:none] gap-8 overflow-x-auto scroll-smooth pr-[var(--testimonial-left)] pb-2 pl-[var(--testimonial-left)] [&::-webkit-scrollbar]:hidden"
          ref={slider.trackRef}
          onScroll={slider.handleScroll}
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
