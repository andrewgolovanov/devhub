import { useDoc } from "@docusaurus/plugin-content-docs/client";
import ContentVisibility from "@theme/ContentVisibility";
import DocItemContent from "@theme/DocItem/Content";
import type { Props } from "@theme/DocItem/Layout";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocVersionBanner from "@theme/DocVersionBanner";
import type { ReactNode } from "react";
import { AIExportMenu } from "@/components/ai-export-menu";
import { DocsAside } from "@/components/docs/docs-aside";
import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs";
import { DocsFooter } from "@/components/docs/docs-footer";

type DocToc = {
  hidden: boolean;
};

function useDocToc(): DocToc {
  const { frontMatter } = useDoc();

  const hidden = frontMatter.hide_table_of_contents ?? false;

  return { hidden };
}

function deriveRawMarkdownUrl(source: string | undefined): string | undefined {
  if (!source) return undefined;
  const relative = source.replace(/^@site\/docs\//, "");
  if (relative === source) return undefined;
  return `/raw-docs/${relative}`;
}

function deriveSuggestEditsUrl(source: string | undefined): string | undefined {
  if (!source) return undefined;
  const relative = source.replace(/^@site\//, "");
  if (relative === source) return undefined;
  return `https://github.com/databricks/devhub/edit/main/${relative}`;
}

export default function DocItemLayout({ children }: Props): ReactNode {
  const docToc = useDocToc();
  const { frontMatter, metadata, toc } = useDoc();
  const source = (metadata as { source?: string }).source;
  const rawMarkdownUrl = deriveRawMarkdownUrl(source);
  const suggestEditsUrl = deriveSuggestEditsUrl(source);
  const exportInput = {
    kind: "doc" as const,
    rawMarkdownUrl,
    title: metadata.title,
    description: metadata.description,
    permalink: metadata.permalink,
  };

  return (
    <>
      <ContentVisibility metadata={metadata} />
      <DocVersionBanner />

      <article className="grid grid-cols-1 gap-x-8 xl:grid-cols-[minmax(0,44rem)_12rem]">
        <div className="min-w-0 pt-8 md:pt-9">
          <DocsBreadcrumbs title={metadata.title} />
          <DocVersionBadge />

          <div className="prose prose-docs relative mt-14 max-w-none">
            <div className="not-prose relative mb-5 md:absolute md:top-2 md:right-0 md:z-10">
              <AIExportMenu
                {...exportInput}
                appearance="article"
                align="end"
                label="Copy as"
                contentClassName="w-60 min-w-60"
              />
            </div>
            <DocItemContent>{children}</DocItemContent>
          </div>

          <DocsFooter
            className="mt-16 md:mt-24"
            previous={metadata.previous}
            next={metadata.next}
          />
        </div>

        <DocsAside
          className="inset-x-0 bottom-0 -mx-1 hidden overflow-auto px-1 py-8 leading-none xl:flex"
          toc={docToc.hidden ? [] : toc}
          minHeadingLevel={frontMatter.toc_min_heading_level}
          maxHeadingLevel={frontMatter.toc_max_heading_level}
          suggestEditsUrl={suggestEditsUrl}
          sticky
        />
      </article>
    </>
  );
}
