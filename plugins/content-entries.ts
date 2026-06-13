import type { LoadContext, Plugin } from "@docusaurus/types";
import {
  getContentSlugs,
  readContentSections,
  readReplitPrompt,
} from "../src/lib/content-markdown";
import { goalOnly, type ContentSections } from "../src/lib/content-sections";
import { routePathWithBaseUrl } from "../src/lib/site-paths";
import {
  recipes,
  examples,
  cookbooks,
  filterPublished,
} from "../src/lib/recipes/recipes";
import { showDrafts } from "../src/lib/feature-flags-server";
import {
  filterPublishedSolutionItems,
  nativeSolutionItems,
} from "../src/lib/solutions/solutions";

function assertNoDuplicateSlugs(): void {
  const all: Array<{ id: string; type: string }> = [
    ...examples.map((e) => ({ id: e.id, type: "example" })),
    ...cookbooks.map((c) => ({ id: c.id, type: "cookbook" })),
    ...recipes.map((r) => ({ id: r.id, type: "recipe" })),
  ];
  const seen = new Map<string, string>();
  for (const { id, type } of all) {
    const existing = seen.get(id);
    if (existing) {
      throw new Error(
        `Duplicate slug "${id}" used by both ${existing} and ${type}. All content entries must have unique slugs.`,
      );
    }
    seen.set(id, type);
  }
}

type EntryType = "recipe" | "solution" | "example";

type ContentEntriesPluginOptions = {
  id: "recipes" | "solutions" | "examples";
  entryType: EntryType;
  routeBasePath: string;
  contentSection: "recipes" | "solutions" | "examples";
};

function createFolderRouteModuleSource(
  entryType: EntryType,
  slug: string,
  sections: ContentSections,
): string {
  const section =
    entryType === "recipe"
      ? "recipes"
      : entryType === "example"
        ? "examples"
        : "solutions";
  const hasPrereqs = sections.prerequisites !== undefined;

  const imports: string[] = [
    `import Goal from "@site/content/${section}/${slug}/goal.md";`,
  ];
  if (hasPrereqs) {
    imports.push(
      `import Prerequisites from "@site/content/${section}/${slug}/prerequisites.md";`,
    );
  }

  const prereqsBlock = hasPrereqs
    ? '      <h2 id="prerequisites">Prerequisites</h2>\n      <Prerequisites />'
    : null;

  const children = ["      <Goal />", prereqsBlock].filter(Boolean).join("\n");

  if (entryType === "recipe") {
    return `import type { ReactNode } from "react";
import { RecipeDetail } from "@/components/cookbooks/recipe-detail";
${imports.join("\n")}

export default function RecipeEntryPage(): ReactNode {
  return (
    <RecipeDetail recipeId="${slug}">
${children}
    </RecipeDetail>
  );
}
`;
  }

  if (entryType === "solution") {
    return `import type { ReactNode } from "react";
import { SolutionDetail } from "@/components/solutions/solution-detail-shell";
import { solutionItems, isNativeSolutionItem } from "@/lib/solutions/solutions";
${imports.join("\n")}

const solutionItem = solutionItems.find((item) => item.id === "${slug}");

export default function SolutionEntryPage(): ReactNode {
  if (!solutionItem || !isNativeSolutionItem(solutionItem)) {
    throw new Error("Solution item ${slug} not found");
  }
  return (
    <SolutionDetail item={solutionItem}>
${children}
    </SolutionDetail>
  );
}
`;
  }

  return `import type { ReactNode } from "react";
import { ExampleDetail } from "@/components/examples/example-detail";
import { examples } from "@/lib/recipes/recipes";
${imports.join("\n")}

const example = examples.find((e) => e.id === "${slug}");

export default function ExampleEntryPage(): ReactNode {
  if (!example) throw new Error("Example ${slug} not found");
  return (
    <ExampleDetail example={example}>
${children}
    </ExampleDetail>
  );
}
`;
}

function getRegistrySlugs(entryType: EntryType): string[] {
  const includeDrafts = showDrafts();
  if (entryType === "recipe") {
    return filterPublished(recipes, includeDrafts)
      .map((recipe) => recipe.id)
      .sort();
  }
  if (entryType === "example") {
    return filterPublished(examples, includeDrafts)
      .map((example) => example.id)
      .sort();
  }
  if (entryType === "solution") {
    return filterPublishedSolutionItems(nativeSolutionItems, includeDrafts)
      .map((item) => item.id)
      .sort();
  }
  return [];
}

function getAllRegistrySlugs(entryType: EntryType): string[] {
  if (entryType === "recipe") {
    return recipes.map((recipe) => recipe.id).sort();
  }
  if (entryType === "example") {
    return examples.map((example) => example.id).sort();
  }
  if (entryType === "solution") {
    return nativeSolutionItems.map((item) => item.id).sort();
  }
  return [];
}

function assertSlugParity(entryType: EntryType, contentSlugs: string[]): void {
  const allSlugs = getAllRegistrySlugs(entryType);

  const onlyInContent = contentSlugs.filter((slug) => !allSlugs.includes(slug));
  const onlyInRegistry = allSlugs.filter(
    (slug) => !contentSlugs.includes(slug),
  );

  if (onlyInContent.length === 0 && onlyInRegistry.length === 0) {
    return;
  }

  const sections: string[] = [];
  if (onlyInContent.length > 0) {
    sections.push(`only in markdown: ${onlyInContent.join(", ")}`);
  }
  if (onlyInRegistry.length > 0) {
    sections.push(`only in registry: ${onlyInRegistry.join(", ")}`);
  }

  throw new Error(
    `Slug mismatch for ${entryType} entries (${sections.join(" | ")}). Keep content markdown and registry metadata in sync.`,
  );
}

export default function contentEntriesPlugin(
  context: LoadContext,
  options: ContentEntriesPluginOptions,
): Plugin<void> {
  return {
    name: "docusaurus-plugin-content-entries",
    async contentLoaded({ actions }) {
      const { addRoute, createData, setGlobalData } = actions;
      assertNoDuplicateSlugs();

      const folderSection: "recipes" | "examples" | "solutions" =
        options.entryType === "recipe"
          ? "recipes"
          : options.entryType === "example"
            ? "examples"
            : "solutions";

      const contentSlugs = getContentSlugs(context.siteDir, folderSection);
      assertSlugParity(options.entryType, contentSlugs);

      const publishedSlugs = getRegistrySlugs(options.entryType);

      const sectionsBySlug: Record<string, ContentSections> = {};
      const rawMarkdownBySlug: Record<string, string> = {};
      const replitPromptsBySlug: Record<string, string> = {};

      for (const slug of publishedSlugs) {
        if (folderSection) {
          const sections = readContentSections(
            context.siteDir,
            folderSection,
            slug,
          );
          sectionsBySlug[slug] = sections;
          rawMarkdownBySlug[slug] = goalOnly(sections);
          if (folderSection === "recipes" || folderSection === "examples") {
            const replitPrompt = readReplitPrompt(
              context.siteDir,
              folderSection,
              slug,
            );
            if (replitPrompt) {
              replitPromptsBySlug[slug] = replitPrompt;
            }
          }
        }
      }

      setGlobalData({
        entryType: options.entryType,
        routeBasePath: options.routeBasePath,
        slugs: publishedSlugs,
        rawMarkdownBySlug,
        sectionsBySlug,
        replitPromptsBySlug,
      });

      for (const slug of publishedSlugs) {
        const sections = sectionsBySlug[slug];
        if (!sections) {
          throw new Error(
            `Missing content sections for ${options.entryType} "${slug}"`,
          );
        }

        const source = createFolderRouteModuleSource(
          options.entryType,
          slug,
          sections,
        );

        const modulePath = await createData(
          `${options.id}-${slug}-route.tsx`,
          source,
        );

        addRoute({
          path: routePathWithBaseUrl(
            context.siteConfig.baseUrl,
            `${options.routeBasePath}/${slug}`,
          ),
          component: modulePath,
          exact: true,
        });
      }
    },
  };
}
