import fs from "fs";
import path from "path";
import type { LoadContext, Plugin } from "@docusaurus/types";
import {
  composeTemplateAgentPrompt,
  getDetailMarkdown,
  resolveTemplateKind,
  type MarkdownSection,
} from "../api/content-markdown";
import { absolutizeMarkdown } from "../src/lib/copy-preamble";
import { showDrafts } from "../src/lib/feature-flags-server";
import {
  cookbooks,
  examples,
  filterPublished,
  recipesInOrder,
} from "../src/lib/recipes/recipes";
import {
  buildSolutionItems,
  isNativeSolutionItem,
} from "../src/lib/solutions/solutions";
import { siteUrlFromConfig } from "../src/lib/site-url";

type MarkdownRoute = {
  section: MarkdownSection;
  slug: string;
  outputPath: string;
};

const MARKDOWN_FILE_EXTENSIONS = new Set([".md", ".mdx"]);

function cleanGeneratedMarkdown(destDir: string): void {
  if (!fs.existsSync(destDir)) return;

  for (const entry of fs.readdirSync(destDir, { withFileTypes: true })) {
    const entryPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      cleanGeneratedMarkdown(entryPath);
      if (fs.readdirSync(entryPath).length === 0) {
        fs.rmdirSync(entryPath);
      }
    } else if (entry.name.endsWith(".md")) {
      fs.unlinkSync(entryPath);
    }
  }
}

function writeMarkdownFile(
  outputRoot: string,
  route: MarkdownRoute,
  body: string,
): void {
  const outputPath = path.join(outputRoot, route.outputPath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, body);
}

function docsSlugFromFile(docsDir: string, filePath: string): string | null {
  const relativePath = path.relative(docsDir, filePath).replace(/\\/g, "/");
  const parts = relativePath.split("/");
  if (parts.some((part) => part.startsWith("_"))) return null;

  const extension = path.extname(relativePath);
  if (!MARKDOWN_FILE_EXTENSIONS.has(extension)) return null;

  const withoutExtension = relativePath.slice(0, -extension.length);
  const slug = withoutExtension.endsWith("/index")
    ? withoutExtension.slice(0, -"/index".length)
    : withoutExtension;
  return slug === "" ? null : slug;
}

function findDocsSlugs(docsDir: string): string[] {
  const slugs: string[] = [];

  function walk(dir: string): void {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const filePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(filePath);
        continue;
      }

      const slug = docsSlugFromFile(docsDir, filePath);
      if (slug) slugs.push(slug);
    }
  }

  walk(docsDir);
  return [...new Set(slugs)].sort();
}

function buildMarkdownRoutes(siteDir: string): MarkdownRoute[] {
  const includeDrafts = showDrafts();
  const docsDir = path.join(siteDir, "docs");
  const templateSlugs = [
    ...filterPublished(cookbooks, includeDrafts).map((entry) => entry.id),
    ...filterPublished(recipesInOrder, includeDrafts).map((entry) => entry.id),
    ...filterPublished(examples, includeDrafts).map((entry) => entry.id),
  ];
  const nativeSolutionSlugs = buildSolutionItems(includeDrafts)
    .filter(isNativeSolutionItem)
    .map((entry) => entry.id);

  return [
    ...findDocsSlugs(docsDir).map((slug) => ({
      section: "docs" as const,
      slug,
      outputPath: `docs/${slug}.md`,
    })),
    { section: "templates", slug: "", outputPath: "templates.md" },
    ...templateSlugs.map((slug) => ({
      section: "templates" as const,
      slug,
      outputPath: `templates/${slug}.md`,
    })),
    { section: "solutions", slug: "", outputPath: "solutions.md" },
    ...nativeSolutionSlugs.map((slug) => ({
      section: "solutions" as const,
      slug,
      outputPath: `solutions/${slug}.md`,
    })),
  ];
}

function buildRouteBody(
  route: MarkdownRoute,
  siteDir: string,
  siteUrl: string,
): string {
  const markdown = getDetailMarkdown(
    route.section,
    route.slug,
    siteDir,
    siteUrl,
  );
  const templateKind = resolveTemplateKind(route.section, route.slug, siteDir);

  if (!templateKind) {
    return absolutizeMarkdown(markdown, siteUrl);
  }

  return composeTemplateAgentPrompt({
    body: markdown,
    section: route.section,
    slug: route.slug,
    siteOrigin: siteUrl,
    rootDir: siteDir,
  });
}

function writePrettyMarkdownRoutes(
  outputRoot: string,
  siteDir: string,
  siteUrl: string,
): void {
  cleanGeneratedMarkdown(path.join(outputRoot, "docs"));
  cleanGeneratedMarkdown(path.join(outputRoot, "templates"));
  cleanGeneratedMarkdown(path.join(outputRoot, "solutions"));

  for (const fileName of ["templates.md", "solutions.md"]) {
    const filePath = path.join(outputRoot, fileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  for (const route of buildMarkdownRoutes(siteDir)) {
    writeMarkdownFile(
      outputRoot,
      route,
      buildRouteBody(route, siteDir, siteUrl),
    );
  }
}

function resolvePublicSiteUrl(
  configUrl: string,
  configBaseUrl: string,
): string {
  return siteUrlFromConfig(configUrl, configBaseUrl);
}

export default function markdownStaticRoutesPlugin(
  context: LoadContext,
): Plugin {
  const staticDir = path.resolve(context.siteDir, "static");
  const siteUrl = resolvePublicSiteUrl(
    context.siteConfig.url,
    context.siteConfig.baseUrl,
  );

  writePrettyMarkdownRoutes(staticDir, context.siteDir, siteUrl);

  return {
    name: "docusaurus-markdown-static-routes",

    async postBuild({ siteConfig, outDir }) {
      writePrettyMarkdownRoutes(
        outDir,
        context.siteDir,
        resolvePublicSiteUrl(siteConfig.url, siteConfig.baseUrl),
      );
    },
  };
}
