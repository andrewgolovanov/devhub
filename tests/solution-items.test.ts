import { describe, expect, test } from "vitest";
import {
  SOLUTION_FEATURED_ITEM_ID,
  buildSolutionPaginationTestItems,
  buildSolutionItems,
  filterSolutionItems,
  getSolutionPageFromPathname,
  getSolutionPagePath,
  getSolutionCategories,
  getFeaturedSolutionItem,
  isDatabricksSolutionItem,
  paginateSolutionItems,
  type SolutionItem,
} from "../src/lib/solutions/solution-items";
import {
  SOLUTION_RSS_PATH,
  buildSolutionRssFeed,
  getSolutionRssUrl,
} from "../src/lib/solutions/rss-feed";

describe("solution items", () => {
  test("builds solution items newest-first", () => {
    const items = buildSolutionItems();
    expect(items.length).toBeGreaterThan(0);

    for (let index = 1; index < items.length; index++) {
      expect(items[index - 1].publishedAt >= items[index].publishedAt).toBe(
        true,
      );
    }
  });

  test("does not mutate the source entries while sorting", () => {
    const entries: SolutionItem[] = [
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

    const sorted = buildSolutionItems(true, entries);

    expect(sorted.map((item) => item.id)).toEqual([
      "newer-entry",
      "older-entry",
    ]);
    expect(entries.map((item) => item.id)).toEqual([
      "older-entry",
      "newer-entry",
    ]);
  });

  test("uses the configured featured solution item when available", () => {
    const items = buildSolutionItems();
    const featured = getFeaturedSolutionItem(items);

    expect(featured?.id).toBe(SOLUTION_FEATURED_ITEM_ID);
  });

  test("filters by category and search query", () => {
    const items = buildSolutionItems();
    const filtered = filterSolutionItems(items, {
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

  test("returns only categories with matching solution items", () => {
    const categories = getSolutionCategories(buildSolutionItems());

    expect(categories).toContain("Launch");
    expect(categories).not.toContain("Updates");
  });

  test("identifies items linked to the Databricks Blog", () => {
    const items = buildSolutionItems();
    const databricksSolutionItem = items.find(
      (item) => item.id === "lakebase-database-branching",
    );
    const devhubItem = items.find(
      (item) => item.id === SOLUTION_FEATURED_ITEM_ID,
    );

    expect(databricksSolutionItem).toBeDefined();
    expect(devhubItem).toBeDefined();
    expect(isDatabricksSolutionItem(databricksSolutionItem!)).toBe(true);
    expect(isDatabricksSolutionItem(devhubItem!)).toBe(false);
    expect(
      isDatabricksSolutionItem({
        href: "https://docs.databricks.com/solution/example",
        type: "linked",
      }),
    ).toBe(false);
  });

  test("paginates within valid page bounds", () => {
    const items = buildSolutionPaginationTestItems(5);

    const firstPage = paginateSolutionItems(items, 1, 2);
    const secondPage = paginateSolutionItems(items, 2, 2);
    const overflowPage = paginateSolutionItems(items, 999, 2);
    const underflowPage = paginateSolutionItems(items, 0, 2);

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

  test("maps solution page numbers to canonical paths", () => {
    expect(getSolutionPagePath(1)).toBe("/solutions");
    expect(getSolutionPagePath(0)).toBe("/solutions");
    expect(getSolutionPagePath(2)).toBe("/solutions/page/2");
  });

  test("reads solution page numbers from pathnames", () => {
    expect(getSolutionPageFromPathname("/solutions")).toBe(1);
    expect(getSolutionPageFromPathname("/solutions/")).toBe(1);
    expect(getSolutionPageFromPathname("/solutions/page/2")).toBe(2);
    expect(getSolutionPageFromPathname("/devhub/solutions/page/3/")).toBe(3);
    expect(getSolutionPageFromPathname("/solutions/page/0")).toBe(1);
  });

  test("builds an RSS feed from solution items", () => {
    const siteUrl = "https://dev.databricks.com/devhub";
    const items = buildSolutionItems();
    const feed = buildSolutionRssFeed(items, siteUrl);

    expect(getSolutionRssUrl(siteUrl)).toBe(`${siteUrl}${SOLUTION_RSS_PATH}`);
    expect(feed).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(feed).toContain('<rss version="2.0"');
    expect(feed).toContain(
      `<atom:link href="${siteUrl}${SOLUTION_RSS_PATH}" rel="self" type="application/rss+xml" />`,
    );
    expect(feed).toContain("<title>Introducing DevHub</title>");
    expect(feed).toContain(
      "<link>https://dev.databricks.com/devhub/solutions/devhub-launch</link>",
    );
  });

  test("escapes XML-sensitive RSS fields", () => {
    const feed = buildSolutionRssFeed(
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
          previewImage: "/img/solutions/mock.png",
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
