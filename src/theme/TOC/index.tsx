import { type ReactNode } from "react";
import clsx from "clsx";
import TOCItems from "@theme/TOCItems";
import type { Props } from "@theme/TOC";

const LINK_CLASS_NAME =
  "toc-link -ml-px block border-l-2 border-transparent py-1 pl-3 text-[13px] leading-snug text-grey-70 no-underline transition-colors hover:border-db-navy hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-[rgb(245_247_248/0.55)] dark:hover:border-white dark:hover:text-white [&.toc-link-active]:!border-l-orange [&.toc-link-active]:!text-orange [&.toc-link-active]:font-normal";

const LINK_ACTIVE_CLASS_NAME = "toc-link-active";

function TOC({ className, ...props }: Props): ReactNode {
  return (
    <div
      className={clsx(
        "sticky top-0 overflow-y-auto text-sm thin-scrollbar max-[996px]:static",
        className,
      )}
    >
      <p className="m-0 mb-3 text-xs/none font-mono font-semibold uppercase tracking-normal text-grey-50">
        On this page
      </p>
      <TOCItems
        {...props}
        className="m-0 list-none space-y-0.5 border-l-2 border-db-border p-0 dark:border-[rgb(245_247_248/0.12)]"
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}

export default TOC;
