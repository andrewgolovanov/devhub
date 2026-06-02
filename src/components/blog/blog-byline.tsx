import useBaseUrl from "@docusaurus/useBaseUrl";
import type { ReactNode } from "react";
import type { BlogAuthor } from "@/lib/blog/authors";
import { cn } from "@/lib/utils";

function BlogAuthorAvatar({
  author,
  compact,
}: {
  author: BlogAuthor;
  compact: boolean;
}): ReactNode {
  const photoSrc = useBaseUrl(author.photo);
  return (
    <img
      src={photoSrc}
      alt={author.name}
      loading="lazy"
      className={cn(
        "rounded-full object-cover",
        compact ? "size-7 ring-2 ring-black" : "size-10 ring-1 ring-white/15",
      )}
    />
  );
}

export function BlogByline({
  authors,
  publishedAt,
  compact = false,
}: {
  authors: BlogAuthor[];
  publishedAt: string;
  compact?: boolean;
}): ReactNode {
  const names = authors.map((author) => author.name).join(", ");
  const sharedRole =
    authors.length > 0 &&
    authors.every((author) => author.role === authors[0].role)
      ? authors[0].role
      : null;

  return (
    <div
      className={cn("flex items-center", compact ? "gap-2.5" : "mt-5 gap-3")}
    >
      <div className={cn("flex", compact ? "-space-x-2.5" : "-space-x-2")}>
        {authors.map((author) => (
          <BlogAuthorAvatar key={author.id} author={author} compact={compact} />
        ))}
      </div>
      <div
        className={cn(
          "flex min-w-0 flex-col",
          compact ? "text-sm leading-5" : "gap-0.5 text-sm leading-tight",
        )}
      >
        <span
          className={cn(
            "truncate",
            compact ? "font-normal text-grey-90" : "font-medium text-white",
          )}
        >
          {names}
        </span>
        {!compact && sharedRole ? (
          <span className="truncate text-grey-70">{sharedRole}</span>
        ) : null}
        <time className="sr-only" dateTime={publishedAt}>
          {publishedAt}
        </time>
      </div>
    </div>
  );
}
