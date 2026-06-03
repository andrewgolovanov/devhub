import { getBlogAuthor } from "./authors";

type BlogItemBase = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  authors: string[];
  publishedAt: string;
  previewImage?: string;
  previewImageAlt?: string;
  isDraft?: boolean;
};

export type NativeBlogItem = BlogItemBase & {
  type: "native";
  source: "DevHub";
};

type LinkedBlogItem = BlogItemBase & {
  type: "linked";
  href: string;
  source: string;
  previewImage: string;
  previewImageAlt: string;
};

export type BlogItem = NativeBlogItem | LinkedBlogItem;

type BlogItemFilter = {
  category: string | null;
  searchQuery: string;
};

export const BLOG_FEATURED_ITEM_ID = "devhub-launch";
export const BLOG_ITEMS_SECTION_ID = "blog-items";
export const BLOG_ITEMS_SCROLL_STORAGE_KEY = "devhub:blog-scroll-to-items";
const BLOG_ITEMS_PER_PAGE = 9;
const BLOG_PAGINATION_TEST_ITEM_COUNT = 18;

const PREFERRED_BLOG_CATEGORIES = [
  "Launch",
  "Developer Experience",
  "Updates",
  "Agent-Led Development",
  "Lakebase",
  "Databricks Apps",
  "Agent Bricks",
];

const BLOG_PAGINATION_TEST_CATEGORIES = [
  "Updates",
  "Developer Experience",
  "Lakebase",
  "Databricks Apps",
  "Agent Bricks",
];
const DATABRICKS_BLOG_HREF_PATTERN =
  /^https:\/\/(?:www\.)?databricks\.com\/blog(?:\/|$)/;

export const blogItems: BlogItem[] = [
  {
    type: "native",
    id: "devhub-launch",
    title: "Introducing dev.databricks.com",
    description:
      "A new developer hub for building on Databricks: opinionated guides, copy-pasteable recipes, and agent-ready documentation for software engineers.",
    tags: ["Launch", "Developer Experience", "Agent-Led Development"],
    authors: ["andre-landgraf"],
    publishedAt: "2026-04-14",
    source: "DevHub",
    previewImage: "/img/blog/blog-devhub-launch.png",
    previewImageAlt:
      "Cover graphic for Introducing dev.databricks.com with a grid, launch tags, and developer hub label",
  },
  {
    type: "linked",
    id: "blog-apps-lakebase-production",
    title:
      "How to Build Production-Ready Data and AI Apps with Databricks Apps and Lakebase",
    description:
      "Build full-stack data apps on Databricks Apps with Lakebase synced tables that replicate Unity Catalog data in seconds, and ship everything as code with Databricks Asset Bundles.",
    tags: ["Apps", "Lakebase", "Synced Tables", "Asset Bundles"],
    href: "https://www.databricks.com/blog/how-build-production-ready-data-and-ai-apps-databricks-apps-and-lakebase",
    source: "Databricks Blog",
    authors: ["Pascal Vogel", "Evan Pandya", "Christopher Pries"],
    publishedAt: "2025-11-19",
    previewImage: "/img/blog/blog-apps-lakebase-production.png",
    previewImageAlt:
      "Cover graphic for building production-ready data and AI apps with Databricks Apps and Lakebase",
  },
  {
    type: "linked",
    id: "blog-agent-bricks-apps-business-users",
    title:
      "Ship quality enterprise AI agents to business users with Agent Bricks and Databricks Apps",
    description:
      "Build domain-specific AI agents with Agent Bricks, deploy them through a chat UI on Databricks Apps, and distribute them to business users via Databricks One.",
    tags: ["Agent Bricks", "Apps", "AI Agents", "Databricks One"],
    href: "https://www.databricks.com/blog/ship-quality-enterprise-ai-agents-business-users-agent-bricks-and-databricks-apps",
    source: "Databricks Blog",
    authors: ["Pascal Vogel", "Evan Pandya"],
    publishedAt: "2026-03-16",
    previewImage: "/img/blog/blog-agent-bricks-apps-business-users.png",
    previewImageAlt:
      "Cover graphic for shipping quality enterprise AI agents with Agent Bricks and Databricks Apps",
  },
  {
    type: "linked",
    id: "blog-lakebase-transactional-layer",
    title:
      "How to use Lakebase as a transactional data layer for Databricks Apps",
    description:
      "Walk through a holiday request app that uses Lakebase as the operational Postgres tier behind Databricks Apps, from database setup to a fully connected frontend.",
    tags: ["Lakebase", "Apps", "Postgres", "Tutorial"],
    href: "https://www.databricks.com/blog/how-use-lakebase-transactional-data-layer-databricks-apps",
    source: "Databricks Blog",
    authors: ["Jasper Puts", "Antonio Javier Samaniego Jurado"],
    publishedAt: "2025-08-28",
    previewImage: "/img/blog/blog-lakebase-transactional-layer.png",
    previewImageAlt:
      "Cover graphic for using Lakebase as a transactional data layer for Databricks Apps",
  },
  {
    type: "linked",
    id: "blog-lakebase-database-branching",
    title:
      "Database Branching in Postgres: Git-Style Workflows with Databricks Lakebase",
    description:
      "Use Lakebase copy-on-write branches to give every developer, pull request, and CI run an isolated Postgres environment, and power instant point-in-time recovery and ephemeral databases for AI agents.",
    tags: [
      "Lakebase",
      "Branching",
      "Developer Experience",
      "Agent-Led Development",
    ],
    href: "https://www.databricks.com/blog/database-branching-postgres-git-style-workflows-databricks-lakebase",
    source: "Databricks Blog",
    authors: ["Susan Pierce"],
    publishedAt: "2026-04-10",
    previewImage: "/img/blog/blog-lakebase-database-branching.png",
    previewImageAlt:
      "Cover graphic for database branching in Postgres with Databricks Lakebase",
  },
];

export function isNativeBlogItem(item: BlogItem): item is NativeBlogItem {
  return item.type === "native";
}

export function isLinkedBlogItem(item: BlogItem): item is LinkedBlogItem {
  return item.type === "linked";
}

export const nativeBlogItems: NativeBlogItem[] =
  blogItems.filter(isNativeBlogItem);

type Draftable = { isDraft?: boolean };

export function filterPublishedBlogItems<T extends Draftable>(
  items: T[],
  includeDrafts: boolean,
): T[] {
  if (includeDrafts) return items;
  return items.filter((item) => !item.isDraft);
}

export function buildBlogItems(
  includeDrafts = false,
  entries: BlogItem[] = blogItems,
): BlogItem[] {
  return [...filterPublishedBlogItems(entries, includeDrafts)].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getBlogItemHref(item: BlogItem): string {
  return isLinkedBlogItem(item) ? item.href : `/blog/${item.id}`;
}

export function getBlogItemAuthorNames(item: BlogItem): string[] {
  if (isLinkedBlogItem(item)) return item.authors;
  return item.authors.map((id) => getBlogAuthor(id).name);
}

export function isDatabricksBlogItem(
  item: Pick<BlogItem, "type"> & { href?: string },
): boolean {
  return (
    item.type === "linked" &&
    item.href !== undefined &&
    DATABRICKS_BLOG_HREF_PATTERN.test(item.href)
  );
}

export function buildBlogPaginationTestItems(
  count = BLOG_PAGINATION_TEST_ITEM_COUNT,
): BlogItem[] {
  return Array.from({ length: count }, (_, index) => {
    const itemNumber = index + 1;
    const category =
      BLOG_PAGINATION_TEST_CATEGORIES[
        index % BLOG_PAGINATION_TEST_CATEGORIES.length
      ];

    return {
      type: "native",
      id: `mock-pagination-blog-item-${itemNumber}`,
      title: `Mock pagination blog item ${String(itemNumber).padStart(2, "0")}`,
      description:
        "Development-only item used to verify blog pagination, category filtering, and search dialog grouping.",
      tags: [category],
      authors: ["andre-landgraf"],
      publishedAt: `2026-02-${String(itemNumber).padStart(2, "0")}`,
      source: "DevHub",
    };
  });
}

export function getFeaturedBlogItem(items: BlogItem[]): BlogItem | undefined {
  return items.find((item) => item.id === BLOG_FEATURED_ITEM_ID) ?? items.at(0);
}

export function getBlogCategories(items: BlogItem[]): string[] {
  const availableTags = new Set(items.flatMap((item) => item.tags));
  return PREFERRED_BLOG_CATEGORIES.filter((category) =>
    availableTags.has(category),
  );
}

export function filterBlogItems(
  items: BlogItem[],
  filter: BlogItemFilter,
): BlogItem[] {
  const query = filter.searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory =
      filter.category === null || item.tags.includes(filter.category);
    if (!matchesCategory) return false;

    if (query.length === 0) return true;

    const searchable = [
      item.title,
      item.description,
      item.source,
      ...item.tags,
      ...getBlogItemAuthorNames(item),
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(query);
  });
}

export function paginateBlogItems(
  items: BlogItem[],
  page: number,
  pageSize = BLOG_ITEMS_PER_PAGE,
): {
  currentPage: number;
  pageCount: number;
  items: BlogItem[];
} {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const start = (currentPage - 1) * pageSize;

  return {
    currentPage,
    pageCount,
    items: items.slice(start, start + pageSize),
  };
}

export function getBlogPagePath(page: number): string {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

export function getBlogPageFromPathname(pathname: string): number {
  const match = pathname.match(/(?:^|\/)blog(?:\/page\/(\d+))?\/?$/);
  const page = Number(match?.[1] ?? "1");

  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
