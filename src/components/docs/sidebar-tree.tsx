import { useEffect, useState, type ReactNode } from "react";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import type {
  PropSidebarItem,
  PropSidebarItemCategory,
  PropSidebarItemHtml,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs";
import IconExternalLink from "@theme/Icon/ExternalLink";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type DocsSidebarTreeProps = {
  activePath: string;
  depth?: number;
  className?: string;
  fallbackActiveHref?: string;
  items: readonly PropSidebarItem[];
  mode?: "desktop" | "mobile";
  onItemClick?: () => void;
};

function normalizePathSlug(path?: string): string {
  if (!path) {
    return "";
  }

  return path.replace(/\/$/, "");
}

function isSameHref(a?: string, b?: string): boolean {
  return normalizePathSlug(a) === normalizePathSlug(b);
}

function isCategory(item: PropSidebarItem): item is PropSidebarItemCategory {
  return item.type === "category";
}

function isLink(item: PropSidebarItem): item is PropSidebarItemLink {
  return item.type === "link";
}

function isHtml(item: PropSidebarItem): item is PropSidebarItemHtml {
  return item.type === "html";
}

function getItemHref(item: PropSidebarItem): string | undefined {
  if (isCategory(item)) {
    return item.href;
  }

  if (isLink(item)) {
    return item.href;
  }

  return undefined;
}

export function hasActiveDescendant(
  item: PropSidebarItem,
  currentPath: string,
): boolean {
  if (isSameHref(getItemHref(item), currentPath)) {
    return true;
  }

  if (isCategory(item)) {
    return item.items.some((child) => hasActiveDescendant(child, currentPath));
  }

  return false;
}

function hasHrefDescendant(item: PropSidebarItem, href: string): boolean {
  if (isSameHref(getItemHref(item), href)) {
    return true;
  }

  if (!isCategory(item)) {
    return false;
  }

  return item.items.some((child) => hasHrefDescendant(child, href));
}

export function findFirstHref(
  items: readonly PropSidebarItem[],
): string | undefined {
  for (const item of items) {
    const href = getItemHref(item);
    if (href) {
      return href;
    }

    if (isCategory(item)) {
      const nested = findFirstHref(item.items);
      if (nested) {
        return nested;
      }
    }
  }

  return undefined;
}

function SidebarItemLabel({
  label,
  mode,
}: {
  label: string;
  mode: "desktop" | "mobile";
}): ReactNode {
  return (
    <span
      title={label}
      className={cn(
        "line-clamp-2 min-w-0 text-pretty",
        mode === "desktop"
          ? "text-sm leading-snug font-medium tracking-tight"
          : "text-base leading-snug font-medium tracking-tight",
      )}
    >
      {label}
    </span>
  );
}

type RecursiveSidebarItemProps = {
  activePath: string;
  depth: number;
  fallbackActiveHref?: string;
  item: PropSidebarItem;
  mode: "desktop" | "mobile";
  onItemClick?: () => void;
};

function RecursiveSidebarItem({
  activePath,
  depth,
  fallbackActiveHref,
  item,
  mode,
  onItemClick,
}: RecursiveSidebarItemProps): ReactNode {
  if (isHtml(item)) {
    return <li dangerouslySetInnerHTML={{ __html: item.value }} />;
  }

  const href = getItemHref(item);
  const pathActive = isSameHref(href, activePath);
  const fallbackActive =
    !!fallbackActiveHref && isSameHref(href, fallbackActiveHref);
  const exactActive = pathActive || fallbackActive;
  const branchActive =
    hasActiveDescendant(item, activePath) ||
    (!!fallbackActiveHref && hasHrefDescendant(item, fallbackActiveHref));

  if (isCategory(item)) {
    const hasChildren = item.items.length > 0;
    const [isOpen, setIsOpen] = useState(
      hasChildren && (branchActive || exactActive || item.collapsed === false),
    );

    useEffect(() => {
      if (hasChildren && (branchActive || exactActive)) {
        setIsOpen(true);
      }
    }, [activePath, branchActive, exactActive, hasChildren]);

    if (!hasChildren && !href) {
      return null;
    }

    return (
      <li className={cn(item.className)}>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div
            className={cn(
              "group relative flex w-full items-center justify-between rounded-none border-0 bg-transparent px-0 text-left transition-colors",
              mode === "desktop" ? "min-h-8 py-1.5 text-sm" : "h-9 text-base",
              exactActive ? "text-orange" : "text-grey-70 hover:text-orange",
            )}
          >
            {depth >= 1 && exactActive ? (
              <span
                className="absolute top-1.5 bottom-1.5 w-px -translate-x-px bg-orange"
                style={{
                  left: `calc(-${depth} * 0.0625rem - ${depth} * 0.6875rem)`,
                }}
                aria-hidden="true"
              />
            ) : null}
            {href ? (
              <Link
                className={cn(
                  "relative min-w-0 flex-1 text-inherit no-underline outline-hidden hover:text-inherit hover:no-underline",
                  exactActive && "text-orange",
                )}
                href={href}
                aria-current={exactActive ? "page" : undefined}
                onClick={(event) => {
                  if (exactActive) {
                    event.preventDefault();
                    setIsOpen((value) => !value);
                  } else {
                    setIsOpen(true);
                    onItemClick?.();
                  }
                }}
              >
                <SidebarItemLabel label={item.label} mode={mode} />
              </Link>
            ) : (
              <CollapsibleTrigger className="flex min-w-0 flex-1 items-center rounded-none border-0 bg-transparent p-0 text-inherit">
                <SidebarItemLabel label={item.label} mode={mode} />
              </CollapsibleTrigger>
            )}

            {hasChildren ? (
              <CollapsibleTrigger
                className="ml-auto inline-flex size-6 shrink-0 items-center justify-end rounded-none border-0 bg-transparent p-0 text-inherit"
                aria-label={
                  isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`
                }
              >
                <ChevronRight
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    isOpen && "rotate-90",
                  )}
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </CollapsibleTrigger>
            ) : null}
          </div>

          <CollapsibleContent className="py-0.5">
            <DocsSidebarTree
              activePath={activePath}
              className={cn("pl-3", depth < 1 && "border-l border-grey-12")}
              depth={depth + 1}
              fallbackActiveHref={fallbackActiveHref}
              items={item.items}
              mode={mode}
              onItemClick={onItemClick}
            />
          </CollapsibleContent>
        </Collapsible>
      </li>
    );
  }

  if (isLink(item)) {
    const isInternalLink = isInternalUrl(item.href);

    return (
      <li className={cn("my-0", item.className)}>
        <Link
          className={cn(
            "relative flex min-w-0 flex-1 items-center rounded-none border-none bg-transparent text-grey-70 no-underline outline-hidden transition-colors hover:bg-transparent hover:text-orange hover:no-underline",
            mode === "desktop"
              ? "min-h-8 px-0 py-1.5 text-sm leading-snug font-medium tracking-tight"
              : "h-9 text-base leading-snug font-medium tracking-tight",
            exactActive && "font-medium text-orange hover:text-orange",
            !isInternalLink && "gap-1.5",
          )}
          autoAddBaseUrl={item.autoAddBaseUrl}
          aria-current={exactActive ? "page" : undefined}
          to={item.href}
          onClick={isInternalLink ? onItemClick : undefined}
        >
          {depth >= 1 && exactActive ? (
            <span
              className="absolute top-0 h-full w-px -translate-x-px bg-orange"
              style={{
                left: `calc(-0.0625rem - ${depth} * 0.6875rem)`,
              }}
              aria-hidden="true"
            />
          ) : null}
          <SidebarItemLabel label={item.label} mode={mode} />
          {!isInternalLink ? <IconExternalLink /> : null}
        </Link>
      </li>
    );
  }

  return null;
}

export function DocsSidebarTree({
  activePath,
  className,
  depth = 0,
  fallbackActiveHref,
  items,
  mode = "desktop",
  onItemClick,
}: DocsSidebarTreeProps): ReactNode {
  return (
    <ul
      className={cn(
        "m-0 flex list-none flex-col p-0",
        mode === "desktop" ? "gap-y-0" : "gap-y-0",
        className,
      )}
    >
      {items.map((item, index) => (
        <RecursiveSidebarItem
          key={getItemHref(item) ?? `${item.type}-${index}`}
          activePath={activePath}
          depth={depth}
          fallbackActiveHref={fallbackActiveHref}
          item={item}
          mode={mode}
          onItemClick={onItemClick}
        />
      ))}
    </ul>
  );
}
