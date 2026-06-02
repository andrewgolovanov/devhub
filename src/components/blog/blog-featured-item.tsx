import type { ReactNode } from "react";
import {
  BlogArrowIcon,
  BlogItemLink,
  BlogItemVisual,
  formatBlogDate,
} from "@/components/blog/blog-item-shared";
import type { BlogItem } from "@/lib/blog/blog-items";

function BlogReadArrowIcon(): ReactNode {
  return (
    <span
      className="relative flex size-8 shrink-0 items-center justify-center overflow-visible transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
      aria-hidden="true"
    >
      <span className="absolute top-[-0.070625rem] left-[0.1rem] flex h-[2.1494375rem] w-[2.1494375rem] items-center justify-center">
        <BlogArrowIcon className="h-[2.1rem] w-5 rotate-45" />
      </span>
    </span>
  );
}

function BlogFeaturedItemCta({ item }: { item: BlogItem }): ReactNode {
  const content = (
    <>
      <span>Read</span>
      <BlogReadArrowIcon />
    </>
  );
  const className =
    "group mt-12 flex w-full items-center justify-between border-b-3 border-orange pb-2.5 text-[2rem] leading-snug font-normal tracking-normal text-orange no-underline transition-colors duration-200 hover:text-db-lava-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan 2xl:absolute 2xl:bottom-0 2xl:left-0 2xl:mt-0";

  return (
    <BlogItemLink className={className} item={item}>
      {content}
    </BlogItemLink>
  );
}

export function BlogFeaturedItem({ item }: { item: BlogItem }): ReactNode {
  return (
    <article className="grid gap-8 lg:grid-cols-[30rem_minmax(0,1fr)] lg:gap-10.75">
      <div className="relative flex min-h-105 flex-col lg:min-h-0 2xl:h-132.75">
        <div className="border-t border-grey-20 pt-4.75">
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
            {formatBlogDate(item.publishedAt)}
          </time>
        </div>

        <div className="mt-14 2xl:absolute 2xl:top-55.25 2xl:mt-0">
          <h2 className="m-0 max-w-120 text-[2.5rem] leading-[1.125] font-normal tracking-normal">
            <BlogItemLink
              className="line-clamp-2 text-white no-underline outline-none transition-colors hover:text-white/80 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan"
              item={item}
            >
              {item.title}
            </BlogItemLink>
          </h2>
          <p className="m-0 mt-4.5 line-clamp-3 max-w-md text-base leading-6 tracking-normal text-grey-60">
            {item.description}
          </p>
        </div>

        <BlogFeaturedItemCta item={item} />
      </div>

      <BlogItemLink
        className="group block self-start no-underline outline-none focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        item={item}
        ariaLabel={`Read ${item.title}`}
      >
        <div className="relative aspect-490/257 overflow-hidden bg-grey-20">
          <BlogItemVisual item={item} variant="featured" />
        </div>
      </BlogItemLink>
    </article>
  );
}
