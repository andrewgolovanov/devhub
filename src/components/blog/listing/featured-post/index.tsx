import type { ReactNode } from "react";
import {
  ArrowIcon,
  PostLink,
  PostVisual,
  formatPostDate,
} from "@/components/blog/listing/shared";
import type { BlogPost } from "@/lib/blog/blog-posts";

function ReadArrowIcon(): ReactNode {
  return (
    <span
      className="relative flex size-8 shrink-0 items-center justify-center overflow-visible transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
      aria-hidden="true"
    >
      <span className="absolute top-[-0.070625rem] left-[0.1rem] flex h-[2.1494375rem] w-[2.1494375rem] items-center justify-center">
        <ArrowIcon className="h-[2.1rem] w-5 rotate-45" />
      </span>
    </span>
  );
}

function FeaturedCta({ post }: { post: BlogPost }): ReactNode {
  const content = (
    <>
      <span>Read</span>
      <ReadArrowIcon />
    </>
  );
  const className =
    "group mt-12 flex w-full items-center justify-between border-b-3 border-orange pb-2.5 text-[2rem] leading-snug font-normal tracking-[-0.04em] text-orange no-underline transition-colors duration-200 hover:text-db-lava-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan 2xl:absolute 2xl:bottom-0 2xl:left-0 2xl:mt-0";

  return (
    <PostLink className={className} post={post}>
      {content}
    </PostLink>
  );
}

export function FeaturedPost({ post }: { post: BlogPost }): ReactNode {
  return (
    <article className="feature-post grid gap-8 lg:grid-cols-[30rem_minmax(0,1fr)] lg:gap-10.75">
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
            dateTime={post.publishedAt}
          >
            {formatPostDate(post.publishedAt)}
          </time>
        </div>

        <div className="mt-14 2xl:absolute 2xl:top-55.25 2xl:mt-0">
          <h2 className="m-0 max-w-120 text-[2.5rem] leading-[1.125] font-normal tracking-[-0.04em]">
            <PostLink
              className="line-clamp-2 text-white no-underline outline-none transition-colors hover:text-white/80 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan"
              post={post}
            >
              {post.title}
            </PostLink>
          </h2>
          <p className="m-0 mt-4.5 line-clamp-3 max-w-md text-base leading-6 tracking-[-0.04em] text-grey-60">
            {post.description}
          </p>
        </div>

        <FeaturedCta post={post} />
      </div>

      <PostLink
        className="group block self-start no-underline outline-none focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        post={post}
        ariaLabel={`Read ${post.title}`}
      >
        <div className="relative aspect-490/257 overflow-hidden bg-grey-20">
          <PostVisual post={post} variant="featured" />
        </div>
      </PostLink>
    </article>
  );
}
