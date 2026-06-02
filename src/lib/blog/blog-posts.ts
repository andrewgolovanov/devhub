import { getAuthor } from "../solutions/authors";
import {
  isLinkedSolution,
  isNativeSolution,
  solutions,
  type Solution,
} from "../solutions/solutions";

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  authors: string[];
  publishedAt: string;
  href: string;
  source: string;
  external: boolean;
  previewImage?: string;
  previewImageAlt?: string;
};

type BlogPostFilter = {
  category: string | null;
  searchQuery: string;
};

export const BLOG_FEATURED_POST_ID = "devhub-launch";
export const BLOG_POSTS_SECTION_ID = "blog-posts";
export const BLOG_POSTS_SCROLL_STORAGE_KEY = "devhub:blog-scroll-to-posts";
const BLOG_POSTS_PER_PAGE = 9;
const BLOG_PAGINATION_TEST_POST_COUNT = 18;

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

function solutionToBlogPost(solution: Solution): BlogPost {
  if (isNativeSolution(solution)) {
    return {
      id: solution.id,
      title: solution.title,
      description: solution.description,
      tags: solution.tags,
      authors: solution.authors.map((id) => getAuthor(id).name),
      publishedAt: solution.publishedAt,
      href: `/solutions/${solution.id}`,
      source: "DevHub",
      external: false,
    };
  }

  return {
    id: solution.id,
    title: solution.title,
    description: solution.description,
    tags: solution.tags,
    authors: solution.authors,
    publishedAt: solution.publishedAt,
    href: solution.url,
    source: solution.source,
    external: true,
    previewImage: solution.previewImage,
    previewImageAlt: solution.previewImageAlt,
  };
}

export function buildBlogPosts(entries: Solution[] = solutions): BlogPost[] {
  return entries
    .map(solutionToBlogPost)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function isDatabricksBlogPost(
  post: Pick<BlogPost, "external" | "href">,
): boolean {
  return post.external && DATABRICKS_BLOG_HREF_PATTERN.test(post.href);
}

export function buildBlogPaginationTestPosts(
  count = BLOG_PAGINATION_TEST_POST_COUNT,
): BlogPost[] {
  return Array.from({ length: count }, (_, index) => {
    const postNumber = index + 1;
    const category =
      BLOG_PAGINATION_TEST_CATEGORIES[
        index % BLOG_PAGINATION_TEST_CATEGORIES.length
      ];

    return {
      id: `mock-pagination-post-${postNumber}`,
      title: `Mock pagination post ${String(postNumber).padStart(2, "0")}`,
      description:
        "Development-only post used to verify blog pagination, category filtering, and search dialog grouping.",
      tags: [category],
      authors: ["DevHub"],
      publishedAt: `2026-02-${String(postNumber).padStart(2, "0")}`,
      href: "/blog",
      source: "Pagination test",
      external: false,
    };
  });
}

export function getFeaturedBlogPost(posts: BlogPost[]): BlogPost | undefined {
  return posts.find((post) => post.id === BLOG_FEATURED_POST_ID) ?? posts.at(0);
}

export function getBlogCategories(posts: BlogPost[]): string[] {
  const availableTags = new Set(posts.flatMap((post) => post.tags));
  return PREFERRED_BLOG_CATEGORIES.filter((category) =>
    availableTags.has(category),
  );
}

export function filterBlogPosts(
  posts: BlogPost[],
  filter: BlogPostFilter,
): BlogPost[] {
  const query = filter.searchQuery.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesCategory =
      filter.category === null || post.tags.includes(filter.category);
    if (!matchesCategory) return false;

    if (query.length === 0) return true;

    const searchable = [
      post.title,
      post.description,
      post.source,
      ...post.tags,
      ...post.authors,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(query);
  });
}

export function paginateBlogPosts(
  posts: BlogPost[],
  page: number,
  pageSize = BLOG_POSTS_PER_PAGE,
): {
  currentPage: number;
  pageCount: number;
  posts: BlogPost[];
} {
  const pageCount = Math.max(1, Math.ceil(posts.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), pageCount);
  const start = (currentPage - 1) * pageSize;

  return {
    currentPage,
    pageCount,
    posts: posts.slice(start, start + pageSize),
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
