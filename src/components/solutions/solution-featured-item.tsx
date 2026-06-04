import type { ReactNode } from "react";
import {
  SolutionItemLink,
  SolutionItemVisual,
  formatSolutionDate,
} from "@/components/solutions/solution-item-shared";
import { AnimatedArrowLink } from "@/components/ui/animated-arrow-link";
import {
  getSolutionItemHref,
  isLinkedSolutionItem,
  type SolutionItem,
} from "@/lib/solutions/solution-items";

export function SolutionFeaturedItem({
  item,
}: {
  item: SolutionItem;
}): ReactNode {
  return (
    <article className="feature-post grid gap-0 lg:grid-cols-[2fr_3fr] lg:gap-10.75 xl:grid-cols-[30rem_minmax(0,1fr)]">
      <div className="relative flex min-h-82 flex-col md:min-h-92 lg:min-h-0 lg:[contain:size] lg:overflow-hidden xl:[contain:none] xl:overflow-visible 2xl:h-132.75">
        <div className="border-t border-grey-20 pt-4.75 lg:shrink-0">
          <div className="flex items-center gap-2">
            <span className="size-1.5 bg-orange" aria-hidden="true" />
            <span className="font-mono text-base leading-none font-medium text-grey-40 uppercase">
              [Featured]
            </span>
          </div>
          <time
            className="mt-3.5 block font-mono text-base leading-none font-medium text-grey-60 uppercase"
            dateTime={item.publishedAt}
          >
            {formatSolutionDate(item.publishedAt)}
          </time>
        </div>

        <div className="mt-14 lg:mt-4 lg:min-h-0 lg:overflow-hidden xl:mt-14 xl:overflow-visible 2xl:absolute 2xl:top-55.25 2xl:mt-0">
          <h2 className="m-0 max-w-120 text-[28px] leading-[1.125] font-normal tracking-[-0.04em] md:text-[2rem] lg:text-[36px] xl:text-[2.5rem]">
            <SolutionItemLink
              className="line-clamp-2 text-white no-underline outline-none transition-colors hover:text-white/80 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan"
              item={item}
            >
              {item.title}
            </SolutionItemLink>
          </h2>
          <p className="m-0 mt-3 line-clamp-3 max-w-md text-base leading-6 tracking-[-0.04em] text-grey-60 md:mt-3.5 lg:mt-4 lg:line-clamp-2 xl:mt-4.5 xl:line-clamp-3">
            {item.description}
          </p>
        </div>

        <AnimatedArrowLink
          to={getSolutionItemHref(item)}
          target={isLinkedSolutionItem(item) ? "_blank" : undefined}
          rel={isLinkedSolutionItem(item) ? "noopener noreferrer" : undefined}
          className="mt-8 flex w-full items-center justify-between border-b-3 border-orange pb-2.5 text-xl leading-snug font-normal tracking-[-0.04em] text-orange no-underline transition-colors duration-200 hover:text-db-lava-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan md:mt-9 md:text-2xl lg:mt-auto lg:shrink-0 lg:text-[28px] xl:mt-12 xl:text-[2rem] 2xl:absolute 2xl:bottom-0 2xl:left-0 2xl:mt-0"
          size="size-5 md:size-6 lg:size-7 xl:size-8"
        >
          Read
        </AnimatedArrowLink>
      </div>

      <SolutionItemLink
        className="group block self-start no-underline outline-none focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        item={item}
        ariaLabel={`Read ${item.title}`}
      >
        <div className="relative aspect-490/257 overflow-hidden bg-grey-20">
          <SolutionItemVisual item={item} variant="featured" />
        </div>
      </SolutionItemLink>
    </article>
  );
}
