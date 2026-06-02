import { useHistory } from "@docusaurus/router";
import bricksIcon from "@site/static/img/blog/search/bricks.svg";
import databaseIcon from "@site/static/img/blog/search/database.svg";
import docsIcon from "@site/static/img/blog/search/docs.svg";
import rocketIcon from "@site/static/img/blog/search/rocket.svg";
import { Search as SearchIcon } from "lucide-react";
import {
  type ComponentType,
  type CSSProperties,
  type ReactNode,
  type SVGProps,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import {
  filterBlogItems,
  getBlogItemHref,
  isLinkedBlogItem,
  type BlogItem,
} from "@/lib/blog/blog-items";
import { cn } from "@/lib/utils";

type BlogSearchProps = {
  items: BlogItem[];
};

type BlogSearchItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  external: boolean;
  source: string;
  category: string;
  icon: BlogSearchDialogIcon;
};

type BlogSearchResultGroupItems = {
  category: string;
  items: BlogSearchItem[];
};

const blogSearchDialogStyle = {
  "--blog-search-dialog-width": "51.5rem",
  "--blog-search-list-max-height": "36.25rem",
} as CSSProperties;

const BLOG_SEARCH_PREVIEW_LIMIT = 7;

type BlogSearchDialogIcon = ComponentType<
  SVGProps<SVGSVGElement> & { title?: string }
>;

const blogSearchCategoryIcons = [
  { category: "Launch", icon: rocketIcon },
  { category: "Developer Experience", icon: docsIcon },
  { category: "Updates", icon: docsIcon },
  { category: "Agent-Led Development", icon: docsIcon },
  { category: "Lakebase", icon: databaseIcon },
  { category: "Databricks Apps", icon: docsIcon },
  { category: "Agent Bricks", icon: bricksIcon },
] satisfies { category: string; icon: BlogSearchDialogIcon }[];

function getBlogSearchCategoryIcon(category: string): BlogSearchDialogIcon {
  return (
    blogSearchCategoryIcons.find(
      (categoryIcon) => categoryIcon.category === category,
    )?.icon ?? docsIcon
  );
}

function buildBlogSearchItems(items: BlogItem[]): BlogSearchItem[] {
  return items.map((item) => {
    const category = item.tags.at(0) ?? "Blog";

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      href: getBlogItemHref(item),
      external: isLinkedBlogItem(item),
      source: item.source,
      category,
      icon: getBlogSearchCategoryIcon(category),
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

function groupBlogSearchItemsByCategory(
  items: BlogSearchItem[],
): BlogSearchResultGroupItems[] {
  const groups = new Map<string, BlogSearchItem[]>();

  for (const item of items) {
    const groupItems = groups.get(item.category) ?? [];
    groupItems.push(item);
    groups.set(item.category, groupItems);
  }

  return Array.from(groups, ([category, groupItems]) => ({
    category,
    items: groupItems,
  }));
}

function BlogSearchResultItem({
  item,
  showDescription,
  highlighted,
  onSelect,
}: {
  item: BlogSearchItem;
  showDescription: boolean;
  highlighted?: boolean;
  onSelect: () => void;
}): ReactNode {
  const Icon = item.icon;

  return (
    <CommandItem
      className={cn(
        "group flex cursor-pointer items-center gap-x-3 rounded-none px-4 py-3 text-left font-normal text-white no-underline outline-none transition-colors duration-150 hover:bg-white/8 data-[selected=true]:bg-white/6 data-[selected=true]:hover:bg-white/8",
        highlighted && "bg-white/6",
        !showDescription && "py-2.5",
      )}
      value={item.id}
      keywords={[item.title, item.description, item.source, item.category]}
      onSelect={onSelect}
    >
      <Icon
        className="size-4 shrink-0 overflow-visible text-grey-70 transition-colors duration-150 group-data-[selected=true]:text-white group-hover:text-white"
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-col gap-y-1">
        <p className="m-0 line-clamp-1 max-w-full text-base leading-tight font-normal tracking-normal text-white">
          {item.title}
        </p>
        {showDescription ? (
          <p className="m-0 line-clamp-1 max-w-full text-base leading-snug font-normal tracking-normal text-grey-60">
            {item.description}
          </p>
        ) : null}
      </div>
    </CommandItem>
  );
}

function BlogSearchResultGroup({
  group,
  items,
  showDescription = false,
  highlightFirst = false,
  onSelect,
}: {
  group: string;
  items: BlogSearchItem[];
  showDescription?: boolean;
  highlightFirst?: boolean;
  onSelect: (item: BlogSearchItem) => void;
}): ReactNode {
  if (items.length === 0) return null;

  return (
    <CommandGroup
      className="p-0 text-white **:[[cmdk-group-heading]]:px-0 **:[[cmdk-group-heading]]:pb-3"
      heading={
        <h3 className="m-0 font-mono text-base leading-none font-normal tracking-normal text-grey-60">
          {group}
        </h3>
      }
    >
      <div className="flex flex-col gap-y-2">
        {items.map((item, index) => (
          <BlogSearchResultItem
            key={item.id}
            item={item}
            showDescription={showDescription}
            highlighted={highlightFirst && index === 0}
            onSelect={() => onSelect(item)}
          />
        ))}
      </div>
    </CommandGroup>
  );
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
    return groupBlogSearchItemsByCategory(buildBlogSearchItems(resultItems));
  }, [items, query]);
  const hasQuery = query.trim().length > 0;

  function handleSelect(item: BlogSearchItem): void {
    onOpenChange(false);

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    history.push(item.href);
  }

  return (
    <DialogContent
      className="top-auto bottom-0 h-[75dvh] w-full max-w-[calc(100%-2rem)] translate-y-0 overflow-hidden rounded-none border-grey-20 bg-black p-0 text-white shadow-none outline-none data-[state=closed]:slide-out-to-bottom-1/2 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-bottom-1/2 data-[state=open]:zoom-in-100 sm:top-[19dvh] sm:bottom-auto sm:h-auto sm:max-w-(--blog-search-dialog-width) sm:data-[state=closed]:slide-out-to-bottom-1 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:slide-in-from-bottom-1 sm:data-[state=open]:zoom-in-95"
      overlayClassName="bg-black/85"
      onCloseAutoFocus={(event) => event.preventDefault()}
      showCloseButton={false}
      style={blogSearchDialogStyle}
    >
      <DialogTitle className="sr-only">Search blog articles</DialogTitle>
      <Command
        className={cn(
          "relative rounded-none bg-black font-normal text-white",
          "**:data-[slot=command-input-wrapper]:h-16 **:data-[slot=command-input-wrapper]:border-grey-20 **:data-[slot=command-input-wrapper]:px-5",
          "[&_[data-slot=command-input-wrapper]_svg]:hidden",
          "**:data-[slot=command-input]:h-16 **:data-[slot=command-input]:pr-16 **:data-[slot=command-input]:text-xl **:data-[slot=command-input]:leading-snug **:data-[slot=command-input]:font-normal **:data-[slot=command-input]:tracking-normal **:data-[slot=command-input]:text-white **:data-[slot=command-input]:placeholder:text-grey-60",
        )}
        shouldFilter={false}
      >
        <header className="relative">
          <CommandInput
            value={query}
            onValueChange={onQueryChange}
            placeholder="What are you searching for?"
          />
          <DialogClose asChild>
            <Button
              className="absolute top-5 right-5 rounded-none border border-grey-20 bg-transparent px-3 font-normal text-white hover:bg-grey-12 hover:text-white"
              variant="outline"
              size="xs"
            >
              <span className="sr-only">Close search dialog</span>
              <span className="text-xs leading-none font-normal tracking-normal">
                Esc
              </span>
            </Button>
          </DialogClose>
        </header>

        <section aria-labelledby="blog-search-results-heading">
          <h2 className="sr-only" id="blog-search-results-heading">
            {hasQuery ? "Search results" : "Suggested articles"}
          </h2>
          <CommandList className="max-h-[calc(75dvh-4rem)] overflow-y-auto px-5 py-6 sm:max-h-(--blog-search-list-max-height)">
            <CommandEmpty className="py-3 text-center text-base leading-tight font-normal tracking-normal text-grey-60">
              No results found.
            </CommandEmpty>
            <div className="flex flex-col gap-y-6">
              {resultGroups.map((group, groupIndex) => (
                <BlogSearchResultGroup
                  key={group.category}
                  group={group.category}
                  items={group.items}
                  showDescription={hasQuery}
                  highlightFirst={groupIndex === 0}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </CommandList>
        </section>
      </Command>
    </DialogContent>
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

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        handleOpenChange(!open);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="h-8 w-full justify-start rounded-none border-grey-60 bg-transparent pr-2.5 pl-2.5 text-[0.8125rem] leading-none font-normal tracking-normal text-grey-50 shadow-none hover:bg-transparent hover:text-grey-50 focus-visible:ring-db-cyan lg:w-69 lg:has-[>kbd]:!pr-1.5"
          type="button"
          variant="outline"
          size="sm"
          aria-label="Search blog articles"
        >
          <SearchIcon
            className="size-3.5"
            aria-hidden="true"
            data-icon="inline-start"
          />
          <span className="mr-auto min-w-0 truncate">Search...</span>
          <Kbd className="hidden h-5.5 w-8.75 min-w-0 rounded-none border border-grey-80 bg-transparent px-1.5 py-1 text-sm leading-none font-normal tracking-normal text-grey-50 lg:inline-flex">
            ⌘K
          </Kbd>
        </Button>
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
