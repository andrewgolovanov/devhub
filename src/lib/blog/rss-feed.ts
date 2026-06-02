import type { BlogPost } from "./blog-posts";

export const BLOG_RSS_PATH = "/blog/rss.xml";

const FEED_TITLE = "Databricks Developer Blog";
const FEED_DESCRIPTION = "Developer-first guides for building on Databricks.";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function toAbsoluteUrl(siteUrl: string, href: string): string {
  if (/^https?:\/\//i.test(href)) return href;
  return `${stripTrailingSlash(siteUrl)}${href.startsWith("/") ? href : `/${href}`}`;
}

function toRfc822Date(date: string): string {
  return new Date(`${date}T00:00:00.000Z`).toUTCString();
}

export function getBlogRssUrl(siteUrl: string): string {
  return `${stripTrailingSlash(siteUrl)}${BLOG_RSS_PATH}`;
}

export function buildBlogRssFeed(posts: BlogPost[], siteUrl: string): string {
  const normalizedSiteUrl = stripTrailingSlash(siteUrl);
  const feedUrl = getBlogRssUrl(normalizedSiteUrl);
  const blogUrl = `${normalizedSiteUrl}/blog`;
  const lastBuildDate = posts[0]
    ? toRfc822Date(posts[0].publishedAt)
    : new Date().toUTCString();

  const items = posts.flatMap((post) => {
    const postUrl = toAbsoluteUrl(normalizedSiteUrl, post.href);

    return [
      "    <item>",
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${escapeXml(postUrl)}</link>`,
      `      <guid isPermaLink="false">${escapeXml(post.id)}</guid>`,
      `      <description>${escapeXml(post.description)}</description>`,
      `      <pubDate>${toRfc822Date(post.publishedAt)}</pubDate>`,
      `      <dc:creator>${escapeXml(post.authors.join(", "))}</dc:creator>`,
      ...post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
      `      <source url="${escapeXml(blogUrl)}">${escapeXml(post.source)}</source>`,
      "    </item>",
    ];
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${FEED_TITLE}</title>`,
    `    <link>${escapeXml(blogUrl)}</link>`,
    `    <description>${FEED_DESCRIPTION}</description>`,
    "    <language>en</language>",
    `    <lastBuildDate>${lastBuildDate}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
