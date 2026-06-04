import Link from "@docusaurus/Link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import {
  SOLUTION_ITEMS_SCROLL_STORAGE_KEY,
  getSolutionPagePath,
} from "@/lib/solutions/solution-items";
import { cn } from "@/lib/utils";

type SolutionPaginationProps = {
  currentPage: number;
  pageCount: number;
};

function requestSolutionItemsScroll(): void {
  window.sessionStorage.setItem(SOLUTION_ITEMS_SCROLL_STORAGE_KEY, "true");
}

function handlePaginationClick(event: MouseEvent<HTMLAnchorElement>): void {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.altKey ||
    event.ctrlKey ||
    event.shiftKey
  ) {
    return;
  }

  requestSolutionItemsScroll();
}

function getVisiblePages(pageCount: number): Array<number | "..."> {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  return [1, 2, 3, "...", pageCount];
}

export function SolutionPagination({
  currentPage,
  pageCount,
}: SolutionPaginationProps): ReactNode {
  if (pageCount <= 1) return null;

  const pages = getVisiblePages(pageCount);
  const previousDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= pageCount;

  return (
    <nav
      className="mx-auto mt-16 flex w-full max-w-104 items-center justify-between"
      aria-label="Solution pagination"
    >
      <Link
        className={cn(
          "inline-flex items-center gap-0.75 text-sm leading-none font-medium tracking-normal text-grey-40 no-underline transition-colors hover:text-white",
          previousDisabled && "pointer-events-none opacity-40",
        )}
        to={getSolutionPagePath(currentPage - 1)}
        aria-disabled={previousDisabled}
        tabIndex={previousDisabled ? -1 : undefined}
        onClick={handlePaginationClick}
      >
        <ArrowLeft className="size-3.5 shrink-0" aria-hidden="true" />
        Previous
      </Link>

      <div className="flex items-center gap-1">
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              className="flex h-9 min-w-9 items-center justify-center px-1.5 text-center text-sm leading-none font-medium tracking-normal text-white"
              key={`ellipsis-${index}`}
            >
              ...
            </span>
          ) : (
            <Link
              className={cn(
                "flex size-9 items-center justify-center text-center text-sm leading-none font-medium tracking-normal text-white no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-db-cyan",
                page === currentPage ? "bg-orange" : "hover:bg-white/8",
              )}
              key={page}
              to={getSolutionPagePath(page)}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={handlePaginationClick}
            >
              {page}
            </Link>
          ),
        )}
      </div>

      <Link
        className={cn(
          "inline-flex items-center gap-0.75 text-sm leading-none font-medium tracking-normal text-grey-40 no-underline transition-colors hover:text-white",
          nextDisabled && "pointer-events-none opacity-40",
        )}
        to={getSolutionPagePath(currentPage + 1)}
        aria-disabled={nextDisabled}
        tabIndex={nextDisabled ? -1 : undefined}
        onClick={handlePaginationClick}
      >
        Next
        <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
      </Link>
    </nav>
  );
}
