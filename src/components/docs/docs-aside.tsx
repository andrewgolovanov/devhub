import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import type { TOCItem } from "@docusaurus/mdx-loader";
import { Separator } from "@/components/ui/separator";
import { BackToTop } from "@/components/docs/back-to-top";
import { Icons } from "@/components/icons";
import {
  TableOfContents,
  type DocsTableOfContentsItem,
} from "@/components/docs/table-of-contents";
import { cn } from "@/lib/utils";

type DocsAsideProps = {
  className?: string;
  maxHeadingLevel?: number;
  minHeadingLevel?: number;
  suggestEditsUrl?: string;
  sticky?: boolean;
  toc: readonly TOCItem[];
};

function getTableOfContentsItems(
  items: readonly TOCItem[],
): DocsTableOfContentsItem[] {
  return items.map((item) => ({
    anchor: item.id,
    depth: item.level,
    title: item.value,
  }));
}

export function DocsAside({
  className,
  maxHeadingLevel,
  minHeadingLevel,
  suggestEditsUrl,
  sticky = false,
  toc,
}: DocsAsideProps): ReactNode {
  const tableOfContents = getTableOfContentsItems(toc).filter(
    (item) =>
      item.depth === 2 &&
      (!minHeadingLevel || item.depth >= minHeadingLevel) &&
      (!maxHeadingLevel || item.depth <= maxHeadingLevel),
  );

  return (
    <aside
      className={cn(
        "aside flex flex-col py-8 -my-8 leading-none",
        sticky && "sticky top-16 h-fit max-h-[calc(100svh-4rem)]",
        className,
      )}
      data-sticky={sticky ? "true" : undefined}
    >
      {tableOfContents.length > 0 ? (
        <>
          <TableOfContents title="On this page" items={tableOfContents} />
          <Separator className="my-3.5 bg-prose-border" />
        </>
      ) : null}

      {suggestEditsUrl ? (
        <Link
          className="inline-flex items-center gap-x-2 py-1.5 text-sm leading-none font-normal tracking-tight text-grey-70 no-underline hover:text-white hover:no-underline [&_svg]:size-5"
          href={suggestEditsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icons.github className="size-4" aria-hidden="true" />
          Suggest edits <span className="sr-only">on GitHub</span>
        </Link>
      ) : null}

      <BackToTop className="mt-3.5 leading-none" />
    </aside>
  );
}
