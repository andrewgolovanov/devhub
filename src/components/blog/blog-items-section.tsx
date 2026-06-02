import { Rss } from "lucide-react";
import type { ReactNode } from "react";

import { BlogCard } from "@/components/blog/blog-card";
import { BlogEmptyState } from "@/components/blog/blog-empty-state";
import { BlogFilters } from "@/components/blog/blog-filters";
import { BlogPagination } from "@/components/blog/blog-pagination";
import { BlogSearch } from "@/components/blog/blog-search";
import { BLOG_ITEMS_SECTION_ID, type BlogItem } from "@/lib/blog/blog-items";

type BlogItemsPaginationState = {
  currentPage: number;
  pageCount: number;
  items: BlogItem[];
};

type BlogItemsSectionProps = {
  allItems: BlogItem[];
  categories: string[];
  selectedCategory: string | null;
  pagination: BlogItemsPaginationState;
  rssHref: string;
  onSelectCategory: (category: string | null) => void;
};

export function BlogItemsSection({
  allItems,
  categories,
  selectedCategory,
  pagination,
  rssHref,
  onSelectCategory,
}: BlogItemsSectionProps): ReactNode {
  return (
    <section
      className="mt-31 scroll-mt-24 md:scroll-mt-28"
      id={BLOG_ITEMS_SECTION_ID}
      aria-labelledby="blog-items-heading"
    >
      <div className="mb-10 flex flex-col gap-4 lg:h-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="order-2 min-w-0 lg:order-0 lg:flex-1">
          <h2 className="sr-only" id="blog-items-heading">
            Blog articles
          </h2>
          <BlogFilters
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
            aria-label="Subscribe to the Databricks Developer Blog RSS feed"
          >
            <Rss className="size-5" aria-hidden="true" />
            RSS
          </a>
          <BlogSearch items={allItems} />
        </div>
      </div>

      {pagination.items.length === 0 ? (
        <BlogEmptyState
          className="mt-66"
          onClearFilters={() => onSelectCategory(null)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-x-8.25 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
          {pagination.items.map((item) => (
            <BlogCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <BlogPagination
        currentPage={pagination.currentPage}
        pageCount={pagination.pageCount}
      />
    </section>
  );
}
