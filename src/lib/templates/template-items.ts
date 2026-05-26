import type { TemplateItem } from "@/components/templates/template-card";
import {
  cookbooks,
  examples,
  filterPublished,
  recipesInOrder,
} from "@/lib/recipes/recipes";

export function buildTemplateItems(includeDrafts: boolean): TemplateItem[] {
  const publishedExamples = filterPublished(examples, includeDrafts);
  const publishedCookbooks = filterPublished(cookbooks, includeDrafts);
  const publishedRecipes = filterPublished(
    recipesInOrder,
    includeDrafts,
  ).filter((r) => !r.unlisted);

  const exampleItems: TemplateItem[] = publishedExamples.map((e) => ({
    kind: "example",
    data: e,
  }));
  const cookbookItems: TemplateItem[] = publishedCookbooks.map((c) => ({
    kind: "cookbook",
    data: c,
  }));
  const recipeItems: TemplateItem[] = publishedRecipes.map((r) => ({
    kind: "recipe",
    data: r,
  }));

  return [...cookbookItems, ...recipeItems, ...exampleItems];
}
