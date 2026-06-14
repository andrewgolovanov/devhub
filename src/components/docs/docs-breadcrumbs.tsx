import { type ReactNode } from "react";
import { useSidebarBreadcrumbs } from "@docusaurus/plugin-content-docs/client";

type DocsBreadcrumbsProps = {
  title: string;
};

export function DocsBreadcrumbs({ title }: DocsBreadcrumbsProps): ReactNode {
  const breadcrumbs = useSidebarBreadcrumbs();
  const currentTitle = breadcrumbs?.at(-1)?.label ?? title;

  return (
    <p className="m-0 flex min-w-0 items-center truncate font-mono text-xs leading-none text-white uppercase">
      {currentTitle}
    </p>
  );
}
