import { Rss } from "lucide-react";
import type { ReactNode } from "react";

import { SolutionCard } from "@/components/solutions/solution-card";
import { SolutionEmptyState } from "@/components/solutions/solution-empty-state";
import { SolutionFilters } from "@/components/solutions/solution-filters";
import { SolutionPagination } from "@/components/solutions/solution-pagination";
import { SolutionSearch } from "@/components/solutions/solution-search";
import {
  SOLUTION_ITEMS_SECTION_ID,
  type SolutionItem,
} from "@/lib/solutions/solutions";

type SolutionItemsPaginationState = {
  currentPage: number;
  pageCount: number;
  items: SolutionItem[];
};

type SolutionItemsSectionProps = {
  allItems: SolutionItem[];
  categories: string[];
  selectedCategory: string | null;
  pagination: SolutionItemsPaginationState;
  rssHref: string;
  onSelectCategory: (category: string | null) => void;
};

export function SolutionItemsSection({
  allItems,
  categories,
  selectedCategory,
  pagination,
  rssHref,
  onSelectCategory,
}: SolutionItemsSectionProps): ReactNode {
  return (
    <section
      className="posts-section mt-16 scroll-mt-24 md:mt-22 md:scroll-mt-28 lg:mt-26 xl:mt-31"
      id={SOLUTION_ITEMS_SECTION_ID}
      aria-labelledby="solution-items-heading"
    >
      <div className="mb-10 flex flex-col gap-4 lg:h-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="order-2 min-w-0 lg:order-0 lg:flex-1">
          <h2 className="sr-only" id="solution-items-heading">
            Solutions
          </h2>
          <SolutionFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>

        <div className="order-1 flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:order-0 lg:w-auto lg:shrink-0">
          <a
            className="hidden items-center gap-1.25 rounded-sm pr-2 text-sm leading-none font-medium tracking-normal text-white no-underline transition-colors hover:text-white/80 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan lg:inline-flex"
            href={rssHref}
            type="application/rss+xml"
            aria-label="Subscribe to the Databricks Developer Solutions RSS feed"
          >
            <Rss className="size-5" aria-hidden="true" />
            RSS
          </a>
          <SolutionSearch items={allItems} />
        </div>
      </div>

      {pagination.items.length === 0 ? (
        <SolutionEmptyState
          className="mt-66"
          onClearFilters={() => onSelectCategory(null)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-x-8.25 gap-y-10 md:grid-cols-2 md:gap-y-12 lg:gap-y-14 xl:grid-cols-3 xl:gap-y-16">
          {pagination.items.map((item) => (
            <SolutionCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <SolutionPagination
        currentPage={pagination.currentPage}
        pageCount={pagination.pageCount}
      />
    </section>
  );
}
