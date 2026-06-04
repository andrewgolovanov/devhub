import { useHistory } from "@docusaurus/router";
import bricksIcon from "@site/static/img/solutions/search/bricks.svg";
import databaseIcon from "@site/static/img/solutions/search/database.svg";
import docsIcon from "@site/static/img/solutions/search/docs.svg";
import rocketIcon from "@site/static/img/solutions/search/rocket.svg";
import { type ReactNode, useMemo } from "react";

import {
  groupSearchDialogItems,
  SearchDialogContent,
  SearchDialogTriggerButton,
  type SearchDialogIcon,
  type SearchDialogItem,
  useSearchDialogState,
} from "@/components/search/dialog-search";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  filterSolutionItems,
  getSolutionItemHref,
  isLinkedSolutionItem,
  type SolutionItem,
} from "@/lib/solutions/solution-items";

type SolutionSearchProps = {
  items: SolutionItem[];
};

const SOLUTION_SEARCH_PREVIEW_LIMIT = 7;

const solutionSearchCategoryIcons = [
  { category: "Launch", icon: rocketIcon },
  { category: "Developer Experience", icon: docsIcon },
  { category: "Updates", icon: docsIcon },
  { category: "Agent-Led Development", icon: docsIcon },
  { category: "Lakebase", icon: databaseIcon },
  { category: "Databricks Apps", icon: docsIcon },
  { category: "Agent Bricks", icon: bricksIcon },
] satisfies { category: string; icon: SearchDialogIcon }[];

function getSolutionSearchCategoryIcon(category: string): SearchDialogIcon {
  return (
    solutionSearchCategoryIcons.find(
      (categoryIcon) => categoryIcon.category === category,
    )?.icon ?? docsIcon
  );
}

function buildSolutionSearchItems(items: SolutionItem[]): SearchDialogItem[] {
  return items.map((item) => {
    const category = item.tags.at(0) ?? "Solution";

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      href: getSolutionItemHref(item),
      external: isLinkedSolutionItem(item),
      group: category,
      icon: getSolutionSearchCategoryIcon(category),
      keywords: [item.title, item.description, item.source, category],
    };
  });
}

function getSolutionSearchResultItems(
  items: SolutionItem[],
  query: string,
): SolutionItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length === 0) {
    return items.slice(0, SOLUTION_SEARCH_PREVIEW_LIMIT);
  }

  return filterSolutionItems(items, {
    category: null,
    searchQuery: normalizedQuery,
  });
}

function SolutionSearchDialog({
  query,
  onQueryChange,
  onOpenChange,
  items,
}: {
  query: string;
  onQueryChange: (query: string) => void;
  onOpenChange: (open: boolean) => void;
  items: SolutionItem[];
}): ReactNode {
  const history = useHistory();
  const resultGroups = useMemo(() => {
    const resultItems = getSolutionSearchResultItems(items, query);
    return groupSearchDialogItems(buildSolutionSearchItems(resultItems));
  }, [items, query]);
  const hasQuery = query.trim().length > 0;

  function handleSelect(item: SearchDialogItem): void {
    onOpenChange(false);

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

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
      suggestedHeading="Suggested solutions"
      title="Search solutions"
    />
  );
}

export function SolutionSearch({ items }: SolutionSearchProps): ReactNode {
  const { open, query, setQuery, handleOpenChange } = useSearchDialogState();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <SearchDialogTriggerButton
          ariaLabel="Search solutions"
          className="h-8 w-full justify-start rounded-none border border-grey-60 bg-transparent pr-2.5 pl-2.5 text-[0.8125rem] leading-none font-normal tracking-normal text-grey-50 shadow-none hover:bg-transparent hover:text-grey-50 focus-visible:ring-db-cyan lg:w-69 lg:has-[>kbd]:!pr-1.5"
          kbdClassName="hidden h-5.5 w-8.75 min-w-0 rounded-none border border-grey-80 bg-transparent px-1.5 py-1 text-sm leading-none font-normal tracking-normal text-grey-50 lg:inline-flex"
          variant="outline"
        />
      </DialogTrigger>
      <SolutionSearchDialog
        query={query}
        onQueryChange={setQuery}
        onOpenChange={handleOpenChange}
        items={items}
      />
    </Dialog>
  );
}
