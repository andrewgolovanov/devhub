import { type ReactNode } from "react";
import Link from "@docusaurus/Link";
import { useSidebarBreadcrumbs } from "@docusaurus/plugin-content-docs/client";
import { ArrowLeft } from "lucide-react";

type DocsBreadcrumbsProps = {
  title: string;
};

const DOCS_ROOT_HREF = "/docs/start-here";

function getBackHref(
  breadcrumbs: ReturnType<typeof useSidebarBreadcrumbs>,
): string {
  if (!breadcrumbs || breadcrumbs.length <= 1) {
    return DOCS_ROOT_HREF;
  }

  for (let index = breadcrumbs.length - 2; index >= 0; index -= 1) {
    const item = breadcrumbs[index];

    if (!(item.type === "category" && item.linkUnlisted)) {
      return item.href ?? DOCS_ROOT_HREF;
    }
  }

  return DOCS_ROOT_HREF;
}

export function DocsBreadcrumbs({ title }: DocsBreadcrumbsProps): ReactNode {
  const breadcrumbs = useSidebarBreadcrumbs();
  const backHref = getBackHref(breadcrumbs);
  const currentTitle = breadcrumbs?.at(-1)?.label ?? title;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex min-w-0 items-center" role="list">
        <li className="flex items-center">
          <Link
            className="inline-flex items-center gap-1.5 font-mono text-xs text-grey-60 uppercase no-underline hover:text-white hover:no-underline"
            to={backHref}
            aria-label="Back to previous docs level"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Back
          </Link>
        </li>
        <li className="flex min-w-0 items-center font-mono">
          <span
            className="mx-2.5 font-mono text-sm leading-none font-medium tracking-tight text-grey-70"
            aria-hidden="true"
          >
            /
          </span>
          <span className="truncate text-xs text-white uppercase">
            {currentTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
