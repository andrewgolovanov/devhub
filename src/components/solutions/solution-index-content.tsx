import { useHistory, useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { SolutionCtaFooter } from "@/components/solutions/solution-cta-footer";
import { SolutionFeaturedItem } from "@/components/solutions/solution-featured-item";
import { SolutionHero } from "@/components/solutions/solution-hero";
import { SolutionItemsSection } from "@/components/solutions/solution-items-section";
import {
  buildSolutionItems,
  SOLUTION_ITEMS_SCROLL_STORAGE_KEY,
  SOLUTION_ITEMS_SECTION_ID,
  filterSolutionItems,
  getSolutionPageFromPathname,
  getSolutionPagePath,
  getSolutionCategories,
  getFeaturedSolutionItem,
  paginateSolutionItems,
} from "@/lib/solutions/solutions";
import { SOLUTION_RSS_PATH, getSolutionRssUrl } from "@/lib/solutions/rss-feed";
import { useFeatureFlags } from "@/lib/feature-flags";
import { siteUrlFromConfig } from "@/lib/site-url";

export function useSolutionRssUrl(): { rssHref: string; rssUrl: string } {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  return {
    rssHref: useBaseUrl(SOLUTION_RSS_PATH),
    rssUrl: getSolutionRssUrl(siteUrl),
  };
}

export function SolutionIndexContent(): ReactNode {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const history = useHistory();
  const { pathname } = useLocation();
  const page = getSolutionPageFromPathname(pathname);
  const { rssHref } = useSolutionRssUrl();
  const { showDrafts: includeDrafts } = useFeatureFlags();

  const allItems = useMemo(
    () => buildSolutionItems(includeDrafts),
    [includeDrafts],
  );

  const featuredItem = getFeaturedSolutionItem(allItems);
  const categories = useMemo(() => getSolutionCategories(allItems), [allItems]);

  const listItems = useMemo(
    () =>
      featuredItem
        ? allItems.filter((item) => item.id !== featuredItem.id)
        : allItems,
    [allItems, featuredItem],
  );

  const categoryItems = useMemo(
    () =>
      filterSolutionItems(listItems, {
        category: selectedCategory,
        searchQuery: "",
      }),
    [listItems, selectedCategory],
  );

  const pagination = useMemo(
    () => paginateSolutionItems(categoryItems, page),
    [categoryItems, page],
  );

  useEffect(() => {
    if (page !== pagination.currentPage) {
      history.replace(getSolutionPagePath(pagination.currentPage));
    }
  }, [history, page, pagination.currentPage]);

  useEffect(() => {
    if (
      window.sessionStorage.getItem(SOLUTION_ITEMS_SCROLL_STORAGE_KEY) !==
      "true"
    ) {
      return;
    }

    window.sessionStorage.removeItem(SOLUTION_ITEMS_SCROLL_STORAGE_KEY);
    document.getElementById(SOLUTION_ITEMS_SECTION_ID)?.scrollIntoView({
      block: "start",
    });
  }, [pathname]);

  function handleSelectCategory(category: string | null): void {
    setSelectedCategory(category);
    if (page !== 1) {
      window.sessionStorage.setItem(SOLUTION_ITEMS_SCROLL_STORAGE_KEY, "true");
      history.push(getSolutionPagePath(1));
    }
  }

  return (
    <main className="border-t border-white/10 bg-black text-white">
      <div className="container px-5 py-16 md:px-8 md:pt-20 md:pb-24 lg:pt-24 xl:px-4 xl:pt-28 2xl:px-0">
        <div className="mx-auto max-w-384">
          <SolutionHero />
          {featuredItem ? <SolutionFeaturedItem item={featuredItem} /> : null}
          <SolutionItemsSection
            allItems={allItems}
            categories={categories}
            selectedCategory={selectedCategory}
            pagination={pagination}
            rssHref={rssHref}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      </div>
      <SolutionCtaFooter />
    </main>
  );
}
