import { describe, expect, test } from "vitest";
import {
  BLOG_FEATURED_POST_ID,
  buildBlogPaginationTestPosts,
  buildBlogPosts,
  filterBlogPosts,
  getBlogPageFromPathname,
  getBlogPagePath,
  getBlogCategories,
  getFeaturedBlogPost,
  isDatabricksBlogPost,
  paginateBlogPosts,
} from "../src/lib/blog/blog-posts";
import {
  BLOG_RSS_PATH,
  buildBlogRssFeed,
  getBlogRssUrl,
} from "../src/lib/blog/rss-feed";

describe("blog posts", () => {
  test("builds posts from solutions newest-first", () => {
    const posts = buildBlogPosts();
    expect(posts.length).toBeGreaterThan(0);

    for (let index = 1; index < posts.length; index++) {
      expect(posts[index - 1].publishedAt >= posts[index].publishedAt).toBe(
        true,
      );
    }
  });

  test("uses the configured featured post when available", () => {
    const posts = buildBlogPosts();
    const featured = getFeaturedBlogPost(posts);

    expect(featured?.id).toBe(BLOG_FEATURED_POST_ID);
  });

  test("filters by category and search query", () => {
    const posts = buildBlogPosts();
    const filtered = filterBlogPosts(posts, {
      category: "Lakebase",
      searchQuery: "Postgres",
    });

    expect(filtered.length).toBeGreaterThan(0);
    for (const post of filtered) {
      expect(post.tags).toContain("Lakebase");
      expect(
        [post.title, post.description, ...post.tags].join(" ").toLowerCase(),
      ).toContain("postgres");
    }
  });

  test("returns only categories with matching posts", () => {
    const categories = getBlogCategories(buildBlogPosts());

    expect(categories).toContain("Launch");
    expect(categories).not.toContain("Updates");
  });

  test("identifies posts linked to the Databricks Blog", () => {
    const posts = buildBlogPosts();
    const databricksBlogPost = posts.find(
      (post) => post.id === "blog-lakebase-database-branching",
    );
    const devhubPost = posts.find((post) => post.id === BLOG_FEATURED_POST_ID);

    expect(databricksBlogPost).toBeDefined();
    expect(devhubPost).toBeDefined();
    expect(isDatabricksBlogPost(databricksBlogPost!)).toBe(true);
    expect(isDatabricksBlogPost(devhubPost!)).toBe(false);
    expect(
      isDatabricksBlogPost({
        href: "https://docs.databricks.com/blog/example",
        external: true,
      }),
    ).toBe(false);
  });

  test("paginates within valid page bounds", () => {
    const posts = buildBlogPaginationTestPosts(5);

    const firstPage = paginateBlogPosts(posts, 1, 2);
    const secondPage = paginateBlogPosts(posts, 2, 2);
    const overflowPage = paginateBlogPosts(posts, 999, 2);
    const underflowPage = paginateBlogPosts(posts, 0, 2);

    expect(firstPage).toMatchObject({
      currentPage: 1,
      pageCount: 3,
      posts: [posts[0], posts[1]],
    });
    expect(secondPage).toMatchObject({
      currentPage: 2,
      pageCount: 3,
      posts: [posts[2], posts[3]],
    });
    expect(overflowPage).toMatchObject({
      currentPage: 3,
      pageCount: 3,
      posts: [posts[4]],
    });
    expect(underflowPage).toMatchObject({
      currentPage: 1,
      pageCount: 3,
      posts: [posts[0], posts[1]],
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

  test("builds an RSS feed from blog posts", () => {
    const siteUrl = "https://dev.databricks.com/devhub";
    const posts = buildBlogPosts();
    const feed = buildBlogRssFeed(posts, siteUrl);

    expect(getBlogRssUrl(siteUrl)).toBe(`${siteUrl}${BLOG_RSS_PATH}`);
    expect(feed).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(feed).toContain('<rss version="2.0"');
    expect(feed).toContain(
      `<atom:link href="${siteUrl}${BLOG_RSS_PATH}" rel="self" type="application/rss+xml" />`,
    );
    expect(feed).toContain("<title>Introducing DevHub</title>");
    expect(feed).toContain(
      "<link>https://dev.databricks.com/devhub/solutions/devhub-launch</link>",
    );
  });

  test("escapes XML-sensitive RSS fields", () => {
    const feed = buildBlogRssFeed(
      [
        {
          id: "mock-rss-post",
          title: "Lakebase & Apps",
          description: "Use <Postgres> safely",
          tags: ["Lakebase > Apps"],
          authors: ["DevHub <Team>"],
          publishedAt: "2026-01-02",
          href: "/blog/mock-rss-post",
          source: "DevHub",
          external: false,
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
