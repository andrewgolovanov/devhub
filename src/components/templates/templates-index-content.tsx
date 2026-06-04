import { FilterIcon } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { ActiveFilters } from "@/components/templates/active-filters";
import { TemplateCard } from "@/components/templates/template-card";
import { TemplateFilters } from "@/components/templates/template-filters";
import { TemplateSearch } from "@/components/templates/template-search";
import { Pagination } from "@site/src/components/templates/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFeatureFlags } from "@/lib/feature-flags";
import { matchesTemplateFilter, type Service } from "@/lib/recipes/recipes";
import { buildTemplateItems } from "@/lib/templates/template-items";
import { useReplitTemplateIds } from "@/lib/use-raw-content-markdown";

const ITEMS_PER_PAGE = 6;

export function TemplatesIndexContent(): ReactNode {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState<Set<Service>>(
    new Set(),
  );
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [replitOnly, setReplitOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { showDrafts: includeDrafts } = useFeatureFlags();
  const replitTemplateIds = useReplitTemplateIds();

  const allItems = useMemo(
    () => buildTemplateItems(includeDrafts),
    [includeDrafts],
  );

  const filteredItems = useMemo(
    () =>
      allItems.filter((item) => {
        if (replitOnly && !replitTemplateIds.has(item.data.id)) return false;
        return matchesTemplateFilter(item.data, {
          searchQuery,
          selectedServices,
          activeTags,
        });
      }),
    [
      searchQuery,
      selectedServices,
      activeTags,
      replitOnly,
      replitTemplateIds,
      allItems,
    ],
  );

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    activeTags.size > 0 ||
    selectedServices.size > 0 ||
    replitOnly;
  const hasSelectedFilters =
    activeTags.size > 0 || selectedServices.size > 0 || replitOnly;
  const visibleItemsPerPage = hasActiveFilters
    ? Math.max(filteredItems.length, 1)
    : ITEMS_PER_PAGE;
  const pageCount = Math.max(
    1,
    Math.ceil(filteredItems.length / visibleItemsPerPage),
  );
  const visibleItems = useMemo(
    () =>
      filteredItems.slice(
        (currentPage - 1) * visibleItemsPerPage,
        currentPage * visibleItemsPerPage,
      ),
    [filteredItems, currentPage, visibleItemsPerPage],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedServices, activeTags, replitOnly]);

  const handleToggleService = useCallback((service: Service) => {
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(service)) next.delete(service);
      else next.add(service);
      return next;
    });
  }, []);

  const handleRemoveTag = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.delete(tag);
      return next;
    });
  }, []);

  const handleClearAllFilters = useCallback(() => {
    setSelectedServices(new Set());
    setActiveTags(new Set());
    setSearchQuery("");
    setReplitOnly(false);
  }, []);

  const handleToggleReplitOnly = useCallback(() => {
    setReplitOnly((prev) => !prev);
  }, []);

  return (
    <>
      <section className="pt-12 md:pt-16" id="templates-list">
        <h2 className="sr-only">Templates</h2>
        <div className="mx-auto grid w-full max-w-400 gap-12 px-5 md:px-8 lg:grid-cols-[16rem_minmax(0,1fr)] xl:gap-x-20 2xl:gap-32">
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-y-8">
              <TemplateSearch value={searchQuery} onChange={setSearchQuery} />
              <TemplateFilters
                selectedServices={selectedServices}
                onToggleService={handleToggleService}
                replitOnly={replitOnly}
                onToggleReplitOnly={handleToggleReplitOnly}
              />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-8 flex flex-col gap-4 lg:hidden">
              <TemplateSearch value={searchQuery} onChange={setSearchQuery} />
              <Button
                className="w-fit gap-1.5 rounded-none"
                variant="outline"
                size="sm"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FilterIcon className="size-3.5" />
                Filters
                {hasSelectedFilters && (
                  <Badge className="ml-0.5 size-5 justify-center rounded-full p-0 text-[10px]">
                    {selectedServices.size +
                      activeTags.size +
                      (replitOnly ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </div>

            {hasSelectedFilters ? (
              <div className="mb-8">
                <ActiveFilters
                  activeTags={activeTags}
                  onRemoveTag={handleRemoveTag}
                  selectedServices={selectedServices}
                  onRemoveService={handleToggleService}
                  replitOnly={replitOnly}
                  onRemoveReplitOnly={handleToggleReplitOnly}
                  onClearAll={handleClearAllFilters}
                />
              </div>
            ) : null}

            {filteredItems.length === 0 ? (
              <TemplateEmptyState onClearAll={handleClearAllFilters} />
            ) : (
              <>
                {visibleItems.map((item, index) => (
                  <TemplateCard
                    key={item.data.id}
                    item={item}
                    index={(currentPage - 1) * visibleItemsPerPage + index}
                    isLast={index === visibleItems.length - 1}
                  />
                ))}
                {pageCount > 1 ? (
                  <Pagination
                    className="mt-20 w-full max-w-104 md:mt-30"
                    currentPage={currentPage}
                    pageCount={pageCount}
                    onPageChange={setCurrentPage}
                  />
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>

      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[80vh] overflow-y-auto p-6"
        >
          <SheetHeader className="p-0 pb-4">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <TemplateFilters
            selectedServices={selectedServices}
            onToggleService={handleToggleService}
            replitOnly={replitOnly}
            onToggleReplitOnly={handleToggleReplitOnly}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}

function TemplateEmptyState({
  onClearAll,
}: {
  onClearAll: () => void;
}): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-77.5 mx-auto mt-14 lg:-translate-x-4 lg:mt-29">
      <h3 className="text-xl/normal tracking-[-0.04em] font-normal text-black">
        No templates match your filters.
      </h3>
      <p className="mt-2 text-base tracking-[-0.04em] text-black/30">
        Browse by category above, or try a different search term.
      </p>
      <Button
        className="rounded-none mt-8 uppercase text-base font-mono font-medium tracking-tight"
        variant="orange"
        size="xl"
        onClick={onClearAll}
      >
        Clear filters
      </Button>
    </div>
  );
}
