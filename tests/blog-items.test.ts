import { describe, expect, test } from "vitest";
import {
  BLOG_FEATURED_ITEM_ID,
  buildBlogPaginationTestItems,
  buildBlogItems,
  filterBlogItems,
  getBlogPageFromPathname,
  getBlogPagePath,
  getBlogCategories,
  getFeaturedBlogItem,
  isDatabricksBlogItem,
  paginateBlogItems,
  type BlogItem,
} from "../src/lib/blog/blog-items";
import {
  BLOG_RSS_PATH,
  buildBlogRssFeed,
  getBlogRssUrl,
} from "../src/lib/blog/rss-feed";

describe("blog items", () => {
  test("builds blog items newest-first", () => {
    const items = buildBlogItems();
    expect(items.length).toBeGreaterThan(0);

    for (let index = 1; index < items.length; index++) {
      expect(items[index - 1].publishedAt >= items[index].publishedAt).toBe(
        true,
      );
    }
  });

  test("does not mutate the source entries while sorting", () => {
    const entries: BlogItem[] = [
      {
        type: "native",
        id: "older-entry",
        title: "Older entry",
        description: "Older test entry",
        tags: ["Updates"],
        authors: ["andre-landgraf"],
        publishedAt: "2026-01-01",
        source: "DevHub",
      },
      {
        type: "native",
        id: "newer-entry",
        title: "Newer entry",
        description: "Newer test entry",
        tags: ["Updates"],
        authors: ["andre-landgraf"],
        publishedAt: "2026-02-01",
        source: "DevHub",
      },
    ];

    const sorted = buildBlogItems(true, entries);

    expect(sorted.map((item) => item.id)).toEqual([
      "newer-entry",
      "older-entry",
    ]);
    expect(entries.map((item) => item.id)).toEqual([
      "older-entry",
      "newer-entry",
    ]);
  });

  test("uses the configured featured blog item when available", () => {
    const items = buildBlogItems();
    const featured = getFeaturedBlogItem(items);

    expect(featured?.id).toBe(BLOG_FEATURED_ITEM_ID);
  });

  test("filters by category and search query", () => {
    const items = buildBlogItems();
    const filtered = filterBlogItems(items, {
      category: "Lakebase",
      searchQuery: "Postgres",
    });

    expect(filtered.length).toBeGreaterThan(0);
    for (const item of filtered) {
      expect(item.tags).toContain("Lakebase");
      expect(
        [item.title, item.description, ...item.tags].join(" ").toLowerCase(),
      ).toContain("postgres");
    }
  });

  test("returns only categories with matching blog items", () => {
    const categories = getBlogCategories(buildBlogItems());

    expect(categories).toContain("Launch");
    expect(categories).not.toContain("Updates");
  });

  test("identifies items linked to the Databricks Blog", () => {
    const items = buildBlogItems();
    const databricksBlogItem = items.find(
      (item) => item.id === "blog-lakebase-database-branching",
    );
    const devhubItem = items.find((item) => item.id === BLOG_FEATURED_ITEM_ID);

    expect(databricksBlogItem).toBeDefined();
    expect(devhubItem).toBeDefined();
    expect(isDatabricksBlogItem(databricksBlogItem!)).toBe(true);
    expect(isDatabricksBlogItem(devhubItem!)).toBe(false);
    expect(
      isDatabricksBlogItem({
        href: "https://docs.databricks.com/blog/example",
        type: "linked",
      }),
    ).toBe(false);
  });

  test("paginates within valid page bounds", () => {
    const items = buildBlogPaginationTestItems(5);

    const firstPage = paginateBlogItems(items, 1, 2);
    const secondPage = paginateBlogItems(items, 2, 2);
    const overflowPage = paginateBlogItems(items, 999, 2);
    const underflowPage = paginateBlogItems(items, 0, 2);

    expect(firstPage).toMatchObject({
      currentPage: 1,
      pageCount: 3,
      items: [items[0], items[1]],
    });
    expect(secondPage).toMatchObject({
      currentPage: 2,
      pageCount: 3,
      items: [items[2], items[3]],
    });
    expect(overflowPage).toMatchObject({
      currentPage: 3,
      pageCount: 3,
      items: [items[4]],
    });
    expect(underflowPage).toMatchObject({
      currentPage: 1,
      pageCount: 3,
      items: [items[0], items[1]],
    });
  });

  test("maps blog page numbers to canonical paths", () => {
    expect(getBlogPagePath(1)).toBe("/blog");
    expect(getBlogPagePath(0)).toBe("/blog");
    expect(getBlogPagePath(2)).toBe("/blog/page/2");
  });

  test("reads blog page numbers from pathnames", () => {
    expect(getBlogPageFromPathname("/blog")).toBe(1);
    expect(getBlogPageFromPathname("/blog/")).toBe(1);
    expect(getBlogPageFromPathname("/blog/page/2")).toBe(2);
    expect(getBlogPageFromPathname("/devhub/blog/page/3/")).toBe(3);
    expect(getBlogPageFromPathname("/blog/page/0")).toBe(1);
  });

  test("builds an RSS feed from blog items", () => {
    const siteUrl = "https://dev.databricks.com/devhub";
    const items = buildBlogItems();
    const feed = buildBlogRssFeed(items, siteUrl);

    expect(getBlogRssUrl(siteUrl)).toBe(`${siteUrl}${BLOG_RSS_PATH}`);
    expect(feed).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(feed).toContain('<rss version="2.0"');
    expect(feed).toContain(
      `<atom:link href="${siteUrl}${BLOG_RSS_PATH}" rel="self" type="application/rss+xml" />`,
    );
    expect(feed).toContain("<title>Introducing dev.databricks.com</title>");
    expect(feed).toContain(
      "<link>https://dev.databricks.com/devhub/blog/devhub-launch</link>",
    );
  });

  test("escapes XML-sensitive RSS fields", () => {
    const feed = buildBlogRssFeed(
      [
        {
          id: "mock-rss-item",
          type: "linked",
          title: "Lakebase & Apps",
          description: "Use <Postgres> safely",
          tags: ["Lakebase > Apps"],
          authors: ["DevHub <Team>"],
          publishedAt: "2026-01-02",
          href: "https://www.databricks.com/blog/mock-rss-item",
          source: "DevHub",
          previewImage: "/img/blog/mock.png",
          previewImageAlt: "Mock image",
        },
      ],
      "https://dev.databricks.com",
    );

    expect(feed).toContain("<title>Lakebase &amp; Apps</title>");
    expect(feed).toContain(
      "<description>Use &lt;Postgres&gt; safely</description>",
    );
    expect(feed).toContain("<category>Lakebase &gt; Apps</category>");
    expect(feed).toContain("<dc:creator>DevHub &lt;Team&gt;</dc:creator>");
  });
});
