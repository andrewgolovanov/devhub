import Link from "@docusaurus/Link";

import { FallbackCardArt } from "@/components/examples/fallback-card-art";
import { TemplatePreviewImage } from "@/components/examples/template-preview-image";
import { Button } from "@/components/ui/button";
import { SliderArrowIcon } from "@/components/ui/slider-arrow-icon";
import { useScrollSlider } from "@/components/ui/use-scroll-slider";
import {
  getTemplateCardFields,
  type TemplateItem,
} from "@/components/templates/template-card";
import { cn } from "@/lib/utils";

function MoreTemplateCard({
  item,
  index,
}: {
  item: TemplateItem;
  index: number;
}) {
  const { name, description, href, lightUrl, darkUrl, label } =
    getTemplateCardFields(item);

  return (
    <article className="group w-[calc(100vw-4rem)] shrink-0 snap-start md:w-xl">
      <Link
        className="block no-underline hover:no-underline"
        to={href}
        aria-label={`Read ${name}`}
      >
        <div className="relative aspect-video w-full overflow-hidden border border-db-navy bg-db-oat-medium">
          <TemplatePreviewImage
            lightUrl={lightUrl}
            darkUrl={darkUrl}
            alt={`${name} preview`}
            fallback={<FallbackCardArt index={index} />}
          />
          <span className="absolute top-0 right-0 z-10 flex size-11 items-center justify-center bg-orange opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            <img
              className="size-6"
              src="/img/templates/arrow-right-up.svg"
              alt=""
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>

      <h3 className="mt-5 mb-0 line-clamp-3 text-xl leading-tight font-normal tracking-[-0.04em] text-black/30 md:text-2xl xl:text-[1.75rem] xl:line-clamp-4 2xl:line-clamp-5">
        <Link
          className="text-inherit no-underline hover:no-underline"
          to={href}
        >
          <span className="text-black">{name}.</span> [{description}]
        </Link>
      </h3>
      <p className="mt-6 flex items-center gap-1.5 font-mono text-sm leading-none font-medium tracking-tight text-black/30 uppercase">
        <span className="size-1.5 bg-orange" aria-hidden="true" />[{label}]
      </p>
    </article>
  );
}

export function MoreTemplatesSlider({ items }: { items: TemplateItem[] }) {
  const slider = useScrollSlider({ itemCount: items.length });

  if (items.length === 0) return null;

  const progress = `${Math.min(
    100,
    ((slider.currentIndex + 1) / items.length) * 100,
  )}%`;

  return (
    <section className="overflow-hidden pt-18 text-black md:pt-22 lg:pt-26 xl:pt-30">
      <div className="mx-auto w-full max-w-400 px-5 md:px-8">
        <h2 className="m-0 text-3xl leading-tight font-normal tracking-[-0.04em] md:text-5xl/[1.125] lg:text-[3.5rem]">
          Explore more templates
        </h2>

        <div className="mt-6 flex items-center gap-x-4 md:gap-8 lg:mt-14 xl:mt-18">
          <div
            className="h-1.5 grow bg-db-oat-medium lg:h-2"
            role="presentation"
            aria-hidden="true"
          >
            <div
              className="h-full bg-orange transition-[width] duration-300"
              style={{ width: progress }}
            />
          </div>
          <div className="flex shrink-0 items-center gap-x-3 md:gap-5">
            <Button
              className={cn(
                "static size-10 translate-0 rounded-none shadow-none transition-colors duration-150 disabled:opacity-100 md:size-11",
                slider.currentIndex === 0
                  ? "border border-grey-70 bg-transparent text-grey-70"
                  : "border border-orange bg-orange text-white hover:bg-db-lava",
                "focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-db-bg",
                "[&_svg]:size-6",
              )}
              type="button"
              onClick={() => slider.scrollToIndex(slider.currentIndex - 1)}
              disabled={slider.currentIndex === 0}
              aria-label="Previous template"
            >
              <SliderArrowIcon className="size-6 rotate-180" />
            </Button>
            <Button
              className={cn(
                "static size-10 translate-0 rounded-none shadow-none transition-colors duration-150 disabled:opacity-100 md:size-11",
                slider.currentIndex === slider.lastIndex
                  ? "border border-grey-70 bg-transparent text-grey-70"
                  : "border border-orange bg-orange text-white hover:bg-db-lava",
                "focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-db-bg",
                "[&_svg]:size-6",
              )}
              type="button"
              onClick={() => slider.scrollToIndex(slider.currentIndex + 1)}
              disabled={slider.currentIndex === slider.lastIndex}
              aria-label="Next template"
            >
              <SliderArrowIcon className="size-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 [--templates-slider-left:1.25rem] md:[--templates-slider-left:2rem] md:mt-10 2xl:[--templates-slider-left:max(2rem,calc((100vw-96rem)/2))]">
        <div
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 pl-(--templates-slider-left) pr-(--templates-slider-left) [scroll-padding-left:var(--templates-slider-left)] [scroll-padding-right:var(--templates-slider-left)] [scrollbar-width:none] md:gap-8 xl:gap-10 [&::-webkit-scrollbar]:hidden"
          ref={slider.trackRef}
          onScroll={slider.handleScroll}
        >
          {items.map((item, index) => (
            <MoreTemplateCard item={item} index={index} key={item.data.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
