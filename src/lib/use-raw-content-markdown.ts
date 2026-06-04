import { usePluginData } from "@docusaurus/useGlobalData";
import type { ContentSections } from "@/lib/content-sections";

type ContentEntriesGlobalData = {
  entryType: string;
  routeBasePath: string;
  slugs: string[];
  rawMarkdownBySlug: Record<string, string>;
  sectionsBySlug: Record<string, ContentSections>;
  replitPromptsBySlug: Record<string, string>;
};

export function useRawRecipeMarkdown(slug: string): string | undefined {
  const data = usePluginData(
    "docusaurus-plugin-content-entries",
    "recipes",
  ) as ContentEntriesGlobalData;
  return data.rawMarkdownBySlug[slug];
}

export function useAllRecipeSections(): Record<string, ContentSections> {
  const data = usePluginData(
    "docusaurus-plugin-content-entries",
    "recipes",
  ) as ContentEntriesGlobalData;
  return data.sectionsBySlug;
}

type CookbooksGlobalData = {
  goalsBySlug: Record<string, string>;
  introsBySlug: Record<string, string>;
  replitPromptsBySlug: Record<string, string>;
};

export function useCookbookGoal(slug: string): string | undefined {
  const data = usePluginData(
    "docusaurus-plugin-cookbooks",
  ) as CookbooksGlobalData;
  return data.goalsBySlug[slug];
}

export function useExampleSections(slug: string): ContentSections | undefined {
  const data = usePluginData(
    "docusaurus-plugin-content-entries",
    "examples",
  ) as ContentEntriesGlobalData;
  return data.sectionsBySlug[slug];
}

/**
 * Returns the raw `replit-prompt.md` body for a template, regardless of
 * tier. Aggregates across the three plugin sources so detail pages don't
 * have to know whether the slug is an example, recipe, or cookbook.
 */
export function useReplitPrompt(slug: string): string | undefined {
  const examples = usePluginData(
    "docusaurus-plugin-content-entries",
    "examples",
  ) as ContentEntriesGlobalData;
  const recipes = usePluginData(
    "docusaurus-plugin-content-entries",
    "recipes",
  ) as ContentEntriesGlobalData;
  const cookbooks = usePluginData(
    "docusaurus-plugin-cookbooks",
  ) as CookbooksGlobalData;
  return (
    examples.replitPromptsBySlug?.[slug] ??
    recipes.replitPromptsBySlug?.[slug] ??
    cookbooks.replitPromptsBySlug?.[slug]
  );
}

/**
 * Set of every template slug that ships a `replit-prompt.md`. Powers the
 * "Build with > Replit Apps" filter on /templates. Derived from plugin
 * data so authors only need to drop a `replit-prompt.md` next to their
 * `goal.md` — no separate registry flag to maintain.
 */
export function useReplitTemplateIds(): ReadonlySet<string> {
  const examples = usePluginData(
    "docusaurus-plugin-content-entries",
    "examples",
  ) as ContentEntriesGlobalData;
  const recipes = usePluginData(
    "docusaurus-plugin-content-entries",
    "recipes",
  ) as ContentEntriesGlobalData;
  const cookbooks = usePluginData(
    "docusaurus-plugin-cookbooks",
  ) as CookbooksGlobalData;
  const ids = new Set<string>();
  for (const slug of Object.keys(examples.replitPromptsBySlug ?? {})) {
    ids.add(slug);
  }
  for (const slug of Object.keys(recipes.replitPromptsBySlug ?? {})) {
    ids.add(slug);
  }
  for (const slug of Object.keys(cookbooks.replitPromptsBySlug ?? {})) {
    ids.add(slug);
  }
  return ids;
}
