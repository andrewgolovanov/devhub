import { useHistory } from "@docusaurus/router";
import bricksIcon from "@site/static/img/blog/search/bricks.svg";
import databaseIcon from "@site/static/img/blog/search/database.svg";
import docsIcon from "@site/static/img/blog/search/docs.svg";
import rocketIcon from "@site/static/img/blog/search/rocket.svg";
import { type ReactNode, useMemo, useState } from "react";

import {
  groupSearchDialogItems,
  SearchDialogContent,
  SearchDialogTriggerButton,
  type SearchDialogIcon,
  type SearchDialogItem,
  useSearchDialogShortcut,
} from "@/components/search/dialog-search";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  filterBlogItems,
  getBlogItemHref,
  isLinkedBlogItem,
  type BlogItem,
} from "@/lib/blog/blog-items";

type BlogSearchProps = {
  items: BlogItem[];
};

const BLOG_SEARCH_PREVIEW_LIMIT = 7;

const blogSearchCategoryIcons = [
  { category: "Launch", icon: rocketIcon },
  { category: "Developer Experience", icon: docsIcon },
  { category: "Updates", icon: docsIcon },
  { category: "Agent-Led Development", icon: docsIcon },
  { category: "Lakebase", icon: databaseIcon },
  { category: "Databricks Apps", icon: docsIcon },
  { category: "Agent Bricks", icon: bricksIcon },
] satisfies { category: string; icon: SearchDialogIcon }[];

function getBlogSearchCategoryIcon(category: string): SearchDialogIcon {
  return (
    blogSearchCategoryIcons.find(
      (categoryIcon) => categoryIcon.category === category,
    )?.icon ?? docsIcon
  );
}

function buildBlogSearchItems(items: BlogItem[]): SearchDialogItem[] {
  return items.map((item) => {
    const category = item.tags.at(0) ?? "Blog";

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      href: getBlogItemHref(item),
      external: isLinkedBlogItem(item),
      group: category,
      icon: getBlogSearchCategoryIcon(category),
      keywords: [item.title, item.description, item.source, category],
    };
  });
}

function getBlogSearchResultItems(
  items: BlogItem[],
  query: string,
): BlogItem[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length === 0) {
    return items.slice(0, BLOG_SEARCH_PREVIEW_LIMIT);
  }

  return filterBlogItems(items, {
    category: null,
    searchQuery: normalizedQuery,
  });
}

function BlogSearchDialog({
  query,
  onQueryChange,
  onOpenChange,
  items,
}: {
  query: string;
  onQueryChange: (query: string) => void;
  onOpenChange: (open: boolean) => void;
  items: BlogItem[];
}): ReactNode {
  const history = useHistory();
  const resultGroups = useMemo(() => {
    const resultItems = getBlogSearchResultItems(items, query);
    return groupSearchDialogItems(buildBlogSearchItems(resultItems));
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
      suggestedHeading="Suggested articles"
      title="Search blog articles"
    />
  );
}

export function BlogSearch({ items }: BlogSearchProps): ReactNode {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  function handleOpenChange(nextOpen: boolean): void {
    setOpen(nextOpen);

    if (!nextOpen) {
      setQuery("");
    }
  }

  useSearchDialogShortcut({ onOpenChange: handleOpenChange, open });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <SearchDialogTriggerButton
          ariaLabel="Search blog articles"
          className="h-8 w-full justify-start rounded-none border border-grey-60 bg-transparent pr-2.5 pl-2.5 text-[0.8125rem] leading-none font-normal tracking-normal text-grey-50 shadow-none hover:bg-transparent hover:text-grey-50 focus-visible:ring-db-cyan lg:w-69 lg:has-[>kbd]:!pr-1.5"
          kbdClassName="hidden h-5.5 w-8.75 min-w-0 rounded-none border border-grey-80 bg-transparent px-1.5 py-1 text-sm leading-none font-normal tracking-normal text-grey-50 lg:inline-flex"
          variant="outline"
        />
      </DialogTrigger>
      <BlogSearchDialog
        query={query}
        onQueryChange={setQuery}
        onOpenChange={handleOpenChange}
        items={items}
      />
    </Dialog>
  );
}
