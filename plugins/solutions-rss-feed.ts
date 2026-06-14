import fs from "fs";
import path from "path";
import type { LoadContext, Plugin } from "@docusaurus/types";
import { buildSolutionItems } from "../src/lib/solutions/solutions";
import {
  SOLUTION_RSS_PATH,
  buildSolutionRssFeed,
} from "../src/lib/solutions/rss-feed";
import { siteUrlFromConfig } from "../src/lib/site-url";

function writeSolutionRssFeed(baseDir: string, siteUrl: string): void {
  const filePath = path.join(baseDir, SOLUTION_RSS_PATH.replace(/^\//, ""));
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(
    filePath,
    buildSolutionRssFeed(buildSolutionItems(), siteUrl),
  );
}

export default function solutionRssFeedPlugin(context: LoadContext): Plugin {
  const siteUrl = siteUrlFromConfig(
    context.siteConfig.url,
    context.siteConfig.baseUrl,
  );
  writeSolutionRssFeed(path.resolve(__dirname, "..", "static"), siteUrl);

  return {
    name: "docusaurus-solution-rss-feed",

    async postBuild({ siteConfig, outDir }) {
      const buildSiteUrl = siteUrlFromConfig(
        siteConfig.url,
        siteConfig.baseUrl,
      );
      writeSolutionRssFeed(outDir, buildSiteUrl);
    },
  };
}
