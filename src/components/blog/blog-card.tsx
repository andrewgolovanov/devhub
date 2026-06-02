import type { ReactNode } from "react";
import {
  BlogArrowIcon,
  BlogItemLink,
  BlogItemVisual,
  formatBlogDate,
} from "@/components/blog/blog-item-shared";
import { isDatabricksBlogItem, type BlogItem } from "@/lib/blog/blog-items";

function BlogDatabricksBadge(): ReactNode {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 font-mono text-base leading-snug font-normal tracking-normal text-orange">
      <span>Databricks blog</span>
      <span
        className="relative size-3.5 shrink-0 overflow-visible"
        aria-hidden="true"
      >
        <span className="absolute top-[-0.081875rem] left-[-0.101875rem] flex h-[1.0745625rem] w-[1.0745625rem] items-center justify-center">
          <BlogArrowIcon className="h-[0.9521875rem] w-[0.5675rem] rotate-45" />
        </span>
      </span>
    </span>
  );
}

function BlogCardMeta({ item }: { item: BlogItem }): ReactNode {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <time
        className="shrink-0 font-mono text-base leading-none font-medium text-grey-60 uppercase"
        dateTime={item.publishedAt}
      >
        {formatBlogDate(item.publishedAt)}
      </time>
      {isDatabricksBlogItem(item) ? <BlogDatabricksBadge /> : null}
    </div>
  );
}

function BlogCardVisualLink({ item }: { item: BlogItem }): ReactNode {
  return (
    <BlogItemLink
      className="group block no-underline outline-none focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-black"
      item={item}
      ariaLabel={`Read ${item.title}`}
    >
      <div className="relative aspect-490/257 overflow-hidden bg-grey-20">
        <BlogItemVisual item={item} variant="card" />
      </div>
    </BlogItemLink>
  );
}

function BlogCardBody({ item }: { item: BlogItem }): ReactNode {
  return (
    <div className="w-full max-w-105 pt-3">
      <BlogCardMeta item={item} />
      <h2 className="m-0 mt-5 text-2xl leading-tight font-normal tracking-normal">
        <BlogItemLink
          className="line-clamp-2 text-white no-underline outline-none transition-colors hover:text-white/80 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan"
          item={item}
        >
          {item.title}
        </BlogItemLink>
      </h2>
      <p className="m-0 mt-3 line-clamp-3 text-base leading-6 tracking-normal text-grey-60">
        {item.description}
      </p>
    </div>
  );
}

export function BlogCard({ item }: { item: BlogItem }): ReactNode {
  return (
    <article className="h-full">
      <BlogCardVisualLink item={item} />
      <BlogCardBody item={item} />
    </article>
  );
}
