import { useHistory, useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { BlogCtaFooter } from "@/components/blog/blog-cta-footer";
import { BlogFeaturedItem } from "@/components/blog/blog-featured-item";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogItemsSection } from "@/components/blog/blog-items-section";
import {
  buildBlogItems,
  BLOG_ITEMS_SCROLL_STORAGE_KEY,
  BLOG_ITEMS_SECTION_ID,
  filterBlogItems,
  getBlogPageFromPathname,
  getBlogPagePath,
  getBlogCategories,
  getFeaturedBlogItem,
  paginateBlogItems,
} from "@/lib/blog/blog-items";
import { BLOG_RSS_PATH, getBlogRssUrl } from "@/lib/blog/rss-feed";
import { useFeatureFlags } from "@/lib/feature-flags";
import { siteUrlFromConfig } from "@/lib/site-url";

export function useBlogRssUrl(): { rssHref: string; rssUrl: string } {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  return {
    rssHref: useBaseUrl(BLOG_RSS_PATH),
    rssUrl: getBlogRssUrl(siteUrl),
  };
}

export function BlogIndexContent(): ReactNode {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const history = useHistory();
  const { pathname } = useLocation();
  const page = getBlogPageFromPathname(pathname);
  const { rssHref } = useBlogRssUrl();
  const { showDrafts: includeDrafts } = useFeatureFlags();

  const allItems = useMemo(
    () => buildBlogItems(includeDrafts),
    [includeDrafts],
  );

  const featuredItem = getFeaturedBlogItem(allItems);
  const categories = useMemo(() => getBlogCategories(allItems), [allItems]);

  const listItems = useMemo(
    () =>
      featuredItem
        ? allItems.filter((item) => item.id !== featuredItem.id)
        : allItems,
    [allItems, featuredItem],
  );

  const categoryItems = useMemo(
    () =>
      filterBlogItems(listItems, {
        category: selectedCategory,
        searchQuery: "",
      }),
    [listItems, selectedCategory],
  );

  const pagination = useMemo(
    () => paginateBlogItems(categoryItems, page),
    [categoryItems, page],
  );

  useEffect(() => {
    if (page !== pagination.currentPage) {
      history.replace(getBlogPagePath(pagination.currentPage));
    }
  }, [history, page, pagination.currentPage]);

  useEffect(() => {
    if (
      window.sessionStorage.getItem(BLOG_ITEMS_SCROLL_STORAGE_KEY) !== "true"
    ) {
      return;
    }

    window.sessionStorage.removeItem(BLOG_ITEMS_SCROLL_STORAGE_KEY);
    document.getElementById(BLOG_ITEMS_SECTION_ID)?.scrollIntoView({
      block: "start",
    });
  }, [pathname]);

  function handleSelectCategory(category: string | null): void {
    setSelectedCategory(category);
    if (page !== 1) {
      window.sessionStorage.setItem(BLOG_ITEMS_SCROLL_STORAGE_KEY, "true");
      history.push(getBlogPagePath(1));
    }
  }

  return (
    <main className="border-t border-white/10 bg-black text-white">
      <div className="container px-4 py-16 md:pt-28 md:pb-24 2xl:px-0">
        <div className="mx-auto max-w-384">
          <BlogHero />
          {featuredItem ? <BlogFeaturedItem item={featuredItem} /> : null}
          <BlogItemsSection
            allItems={allItems}
            categories={categories}
            selectedCategory={selectedCategory}
            pagination={pagination}
            rssHref={rssHref}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      </div>
      <BlogCtaFooter />
    </main>
  );
}
