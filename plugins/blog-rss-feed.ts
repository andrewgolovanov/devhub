import fs from "fs";
import path from "path";
import type { LoadContext, Plugin } from "@docusaurus/types";
import { buildBlogPosts } from "../src/lib/blog/blog-posts";
import { BLOG_RSS_PATH, buildBlogRssFeed } from "../src/lib/blog/rss-feed";
import { siteUrlFromConfig } from "../src/lib/site-url";

function writeBlogRssFeed(baseDir: string, siteUrl: string): void {
  const filePath = path.join(baseDir, BLOG_RSS_PATH.replace(/^\//, ""));
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buildBlogRssFeed(buildBlogPosts(), siteUrl));
}

export default function blogRssFeedPlugin(context: LoadContext): Plugin {
  const siteUrl = siteUrlFromConfig(
    context.siteConfig.url,
    context.siteConfig.baseUrl,
  );
  writeBlogRssFeed(path.resolve(__dirname, "..", "static"), siteUrl);

  return {
    name: "docusaurus-blog-rss-feed",

    async postBuild({ siteConfig, outDir }) {
      const buildSiteUrl = siteUrlFromConfig(
        siteConfig.url,
        siteConfig.baseUrl,
      );
      writeBlogRssFeed(outDir, buildSiteUrl);
    },
  };
}
