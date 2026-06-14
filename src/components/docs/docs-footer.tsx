import type { ReactNode } from "react";
import Link from "@docusaurus/Link";

import { cn } from "@/lib/utils";

type FooterLink = {
  permalink: string;
  title: string;
};

type DocsFooterProps = {
  className?: string;
  next?: FooterLink | null;
  previous?: FooterLink | null;
};

export function DocsFooter({
  className,
  next,
  previous,
}: DocsFooterProps): ReactNode {
  return (
    <footer className={cn("footer mt-16 bg-transparent md:mt-22", className)}>
      {previous || next ? (
        <>
          <div className="mb-7 h-px w-full bg-[#27272A]" aria-hidden="true" />
          <div className="flex justify-between gap-x-6">
            {previous ? (
              <p className="flex flex-col gap-y-3">
                <span className="relative z-10 inline-flex whitespace-nowrap text-[0.8125rem]/none text-[#A1A1AA]">
                  Previous
                </span>
                <Link
                  className="text-sm leading-none text-orange no-underline hover:text-db-lava hover:no-underline"
                  to={previous.permalink}
                >
                  {previous.title}
                </Link>
              </p>
            ) : (
              <span aria-hidden="true" />
            )}
            {next ? (
              <p className="ml-auto flex flex-col gap-y-3 text-right items-end">
                <span className="relative z-10 inline-flex whitespace-nowrap text-[0.8125rem]/none text-[#A1A1AA]">
                  Next
                </span>
                <Link
                  className="text-sm leading-none text-orange no-underline hover:text-db-lava hover:no-underline"
                  to={next.permalink}
                >
                  {next.title}
                </Link>
              </p>
            ) : null}
          </div>
        </>
      ) : null}
    </footer>
  );
}
