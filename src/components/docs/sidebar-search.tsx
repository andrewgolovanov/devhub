import docsIcon from "@site/static/img/solutions/search/docs.svg";
import type {
  PropSidebarItem,
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs";
import { useHistory } from "@docusaurus/router";
import { type ReactNode, useMemo } from "react";

import {
  groupSearchDialogItems,
  SearchDialogContent,
  SearchDialogTriggerButton,
  type SearchDialogItem,
  useSearchDialogState,
} from "@/components/search/dialog-search";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

type DocsSearchItem = SearchDialogItem;

type DocsSidebarSearchProps = {
  items: readonly PropSidebarItem[];
};

const SEARCH_PREVIEW_LIMIT = 8;

function isCategory(item: PropSidebarItem): item is PropSidebarItemCategory {
  return item.type === "category";
}

function isLink(item: PropSidebarItem): item is PropSidebarItemLink {
  return item.type === "link";
}

function collectSearchItems(
  items: readonly PropSidebarItem[],
  parents: string[] = [],
): DocsSearchItem[] {
  return items.flatMap((item) => {
    if (isLink(item)) {
      const group = parents[0] ?? "Docs";
      const trail = parents.length > 0 ? parents.join(" / ") : "Docs";

      return [
        {
          id: item.href,
          title: item.label,
          description: trail,
          href: item.href,
          group,
          icon: docsIcon,
        },
      ];
    }

    if (isCategory(item)) {
      const categoryItem =
        item.href && item.label
          ? [
              {
                id: item.href,
                title: item.label,
                description: parents.length > 0 ? parents.join(" / ") : "Docs",
                href: item.href,
                group: parents[0] ?? item.label,
                icon: docsIcon,
              },
            ]
          : [];

      return [
        ...categoryItem,
        ...collectSearchItems(item.items, [...parents, item.label]),
      ];
    }

    return [];
  });
}

function getSearchResults(
  items: readonly DocsSearchItem[],
  query: string,
): DocsSearchItem[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return items.slice(0, SEARCH_PREVIEW_LIMIT);
  }

  return items.filter((item) =>
    [item.title, item.description, item.group, item.href].some((value) =>
      value.toLocaleLowerCase().includes(normalizedQuery),
    ),
  );
}

function DocsSearchDialog({
  items,
  onOpenChange,
  onQueryChange,
  query,
}: {
  items: readonly DocsSearchItem[];
  onOpenChange: (open: boolean) => void;
  onQueryChange: (query: string) => void;
  query: string;
}): ReactNode {
  const history = useHistory();
  const resultGroups = useMemo(
    () => groupSearchDialogItems(getSearchResults(items, query)),
    [items, query],
  );
  const hasQuery = query.trim().length > 0;

  function handleSelect(item: DocsSearchItem): void {
    onOpenChange(false);
    history.push(item.href);
  }

  return (
    <SearchDialogContent
      onOpenChange={onOpenChange}
      onQueryChange={onQueryChange}
      onSelect={handleSelect}
      query={query}
      resultGroups={resultGroups}
      resultsHeading="Search results"
      showDescription={hasQuery}
      suggestedHeading="Suggested docs"
      title="Search documentation"
    />
  );
}

export function DocsSidebarSearch({
  items,
}: DocsSidebarSearchProps): ReactNode {
  const { open, query, setQuery, handleOpenChange } = useSearchDialogState();
  const searchItems = useMemo(() => collectSearchItems(items), [items]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <SearchDialogTriggerButton
          ariaLabel="Search documentation"
          className="h-8 w-full justify-start rounded-none border border-[#27272A] bg-[#27272A]/50 pr-2.5 pl-2.5 text-[0.8125rem] leading-none font-normal tracking-tight text-[#A1A1AA] shadow-none hover:bg-[#27272A]/50 hover:text-grey-90 focus-visible:ring-db-cyan lg:has-[>kbd]:!pr-1.5"
          kbdClassName="hidden h-5.5 w-8.75 min-w-0 rounded-none border border-[#27272A] shadow-none bg-transparent px-1 py-0.5 text-xs leading-none font-normal tracking-normal text-[#A1A1AA] lg:inline-flex"
        />
      </DialogTrigger>
      <DocsSearchDialog
        items={searchItems}
        onOpenChange={handleOpenChange}
        onQueryChange={setQuery}
        query={query}
      />
    </Dialog>
  );
}
