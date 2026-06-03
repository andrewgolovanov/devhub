import {
  getBlogItemAuthorNames,
  getBlogItemHref,
  type BlogItem,
} from "./blog-items";

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

export function buildBlogRssFeed(items: BlogItem[], siteUrl: string): string {
  const normalizedSiteUrl = stripTrailingSlash(siteUrl);
  const feedUrl = getBlogRssUrl(normalizedSiteUrl);
  const blogUrl = `${normalizedSiteUrl}/blog`;
  const lastBuildDate = items[0]
    ? toRfc822Date(items[0].publishedAt)
    : new Date().toUTCString();

  const rssItems = items.flatMap((item) => {
    const itemUrl = toAbsoluteUrl(normalizedSiteUrl, getBlogItemHref(item));

    return [
      "    <item>",
      `      <title>${escapeXml(item.title)}</title>`,
      `      <link>${escapeXml(itemUrl)}</link>`,
      `      <guid isPermaLink="false">${escapeXml(item.id)}</guid>`,
      `      <description>${escapeXml(item.description)}</description>`,
      `      <pubDate>${toRfc822Date(item.publishedAt)}</pubDate>`,
      `      <dc:creator>${escapeXml(getBlogItemAuthorNames(item).join(", "))}</dc:creator>`,
      ...item.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`),
      `      <source url="${escapeXml(blogUrl)}">${escapeXml(item.source)}</source>`,
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
    ...rssItems,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
