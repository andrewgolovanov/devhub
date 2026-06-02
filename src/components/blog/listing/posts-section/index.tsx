import { Rss } from "lucide-react";
import type { ReactNode } from "react";

import { BLOG_POSTS_SECTION_ID, type BlogPost } from "@/lib/blog/blog-posts";
import { CategoryFilter } from "./category-filter";
import { EmptyState } from "./empty-state";
import { Pagination } from "./pagination";
import { PostCard } from "./post-card";
import { Search } from "./search";

type PostsPagination = {
  currentPage: number;
  pageCount: number;
  posts: BlogPost[];
};

type PostsSectionProps = {
  allPosts: BlogPost[];
  categories: string[];
  selectedCategory: string | null;
  pagination: PostsPagination;
  rssHref: string;
  onSelectCategory: (category: string | null) => void;
};

export function PostsSection({
  allPosts,
  categories,
  selectedCategory,
  pagination,
  rssHref,
  onSelectCategory,
}: PostsSectionProps): ReactNode {
  return (
    <section
      className="posts-section mt-16 scroll-mt-24 md:mt-22 md:scroll-mt-28 lg:mt-26 xl:mt-31"
      id={BLOG_POSTS_SECTION_ID}
      aria-labelledby="blog-posts-heading"
    >
      <div className="mb-10 flex flex-col gap-4 lg:h-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="order-2 min-w-0 lg:order-0 lg:flex-1">
          <h2 className="sr-only" id="blog-posts-heading">
            Blog posts
          </h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>

        <div className="order-1 flex w-full flex-col gap-4 sm:flex-row sm:items-center lg:order-0 lg:w-auto lg:shrink-0">
          <a
            className="hidden items-center gap-1.25 rounded-sm pr-2 text-sm leading-none font-medium tracking-[-0.025em] text-white no-underline transition-colors hover:text-white/80 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan lg:inline-flex"
            href={rssHref}
            type="application/rss+xml"
            aria-label="Subscribe to the Databricks Developer Blog RSS feed"
          >
            <Rss className="size-5" aria-hidden="true" />
            RSS
          </a>
          <Search posts={allPosts} />
        </div>
      </div>

      {pagination.posts.length === 0 ? (
        <EmptyState
          className="mt-66"
          onClearFilters={() => onSelectCategory(null)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-x-8.25 gap-y-10 md:grid-cols-2 md:gap-y-12 lg:gap-y-14 xl:grid-cols-3 xl:gap-y-16">
          {pagination.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={pagination.currentPage}
        pageCount={pagination.pageCount}
      />
    </section>
  );
}
