import { goalOnly, type ContentSections } from "./content-sections";

export type CookbookRecipeInput = {
  id: string;
  name: string;
  sections: ContentSections;
};

type CookbookCompositionInput = {
  cookbookName: string;
  cookbookDescription: string;
  goal?: string;
  recipes: CookbookRecipeInput[];
};

type CookbookMarkdownDocumentInput = CookbookCompositionInput & {
  cookbookUrl: string;
};

/**
 * Composes a cookbook from its constituent recipes.
 *
 * Cookbook goal/intro → each recipe's goal under a
 * "## Component: <Name>" heading.
 */
export function composeCookbookMarkdown(
  input: CookbookCompositionInput,
): string {
  const { recipes } = input;
  const parts: string[] = [];

  if (input.goal && input.goal.trim()) {
    parts.push(input.goal.trim());
  }

  for (const recipe of recipes) {
    const recipeGoal = goalOnly(recipe.sections);
    if (recipeGoal.trim()) {
      parts.push(`## Component: ${recipe.name}\n\n${recipeGoal.trim()}`);
    }
  }

  return parts.join("\n\n");
}

/**
 * Wraps the composed body with YAML frontmatter, matching the API markdown
 * shape expected by `/templates/<template>.md` consumers.
 */
export function buildCookbookMarkdownDocument(
  input: CookbookMarkdownDocumentInput,
): string {
  const body = composeCookbookMarkdown(input);
  const escape = (value: string) => value.replace(/"/g, '\\"');

  const header = [
    "---",
    `title: "${escape(input.cookbookName)}"`,
    `url: ${input.cookbookUrl}`,
    `summary: "${escape(input.cookbookDescription)}"`,
    "---",
    "",
  ].join("\n");

  return body ? `${header}\n${body}\n` : `${header}\n`;
}
