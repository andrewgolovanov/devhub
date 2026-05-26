import type { ReactNode } from "react";

import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationProps {
  className?: string;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  className,
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps): ReactNode {
  const pageItems = Array.from(
    { length: Math.min(pageCount, 3) },
    (_, index) => index + 1,
  );

  return (
    <PaginationWrapper className={cn(className)}>
      <PaginationContent className="gap-x-0 w-full">
        <PaginationItem className="mr-auto">
          <PaginationPrevious
            href="#templates-list"
            aria-disabled={currentPage === 1}
            onClick={(event) => {
              event.preventDefault();
              onPageChange(Math.max(1, currentPage - 1));
            }}
            className="rounded-none bg-transparent px-0 has-[>svg]:px-0 text-sm text-grey-50 hover:bg-transparent hover:text-black"
          />
        </PaginationItem>
        {pageItems.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#templates-list"
              isActive={page === currentPage}
              onClick={(event) => {
                event.preventDefault();
                onPageChange(page);
              }}
              className="mx-0.5 size-9 rounded-none border-0 bg-transparent text-base text-black shadow-none hover:bg-transparent data-[active=true]:bg-orange data-[active=true]:text-white"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pageCount > 4 ? (
          <PaginationItem>
            <PaginationEllipsis className="mx-0.5 size-9 text-grey-50 [&_svg]:hidden before:content-['...']" />
          </PaginationItem>
        ) : null}
        {pageCount > 3 ? (
          <PaginationItem>
            <PaginationLink
              href="#templates-list"
              isActive={pageCount === currentPage}
              onClick={(event) => {
                event.preventDefault();
                onPageChange(pageCount);
              }}
              className="mx-0.5 size-9 rounded-none border-0 bg-transparent text-base text-black shadow-none hover:bg-transparent data-[active=true]:bg-orange data-[active=true]:text-white"
            >
              {pageCount}
            </PaginationLink>
          </PaginationItem>
        ) : null}
        <PaginationItem className="ml-auto">
          <PaginationNext
            href="#templates-list"
            aria-disabled={currentPage === pageCount}
            onClick={(event) => {
              event.preventDefault();
              onPageChange(Math.min(pageCount, currentPage + 1));
            }}
            className="rounded-none bg-transparent px-0 has-[>svg]:px-0 text-sm text-grey-50 hover:bg-transparent hover:text-black"
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  );
}
