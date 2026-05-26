import { MDXProvider } from "@mdx-js/react";
import { useRef, type ReactNode } from "react";
import { RecipePre } from "@/components/cookbooks/recipe-code-block";
import { recipes } from "@/lib/recipes/recipes";
import { useRawRecipeMarkdown } from "@/lib/use-raw-content-markdown";
import { BaseUrlAnchor } from "@/components/base-url-anchor";
import { MarkdownProse } from "@/components/markdown-prose";
import { TemplateDetailShell } from "@/components/templates/template-detail-shell";
import type { TemplateItem } from "@/components/templates/template-card";
import { Toc } from "@site/src/components/templates/toc";

const recipeComponents = { a: BaseUrlAnchor, pre: RecipePre };

type RecipeDetailProps = {
  recipeId: string;
  children: ReactNode;
};

export function RecipeDetail({
  recipeId,
  children,
}: RecipeDetailProps): ReactNode {
  const contentRef = useRef<HTMLDivElement>(null);
  const recipe = recipes.find((item) => item.id === recipeId);
  const rawMarkdown = useRawRecipeMarkdown(recipeId);

  if (!recipe) {
    throw new Error(`Recipe ${recipeId} not found`);
  }

  const relatedItems: TemplateItem[] = recipes
    .filter(
      (item) =>
        item.id !== recipe.id &&
        !item.unlisted &&
        item.services.some((service) => recipe.services.includes(service)),
    )
    .slice(0, 3)
    .map((data) => ({ kind: "recipe" as const, data }));

  return (
    <TemplateDetailShell
      title={recipe.name}
      description={recipe.description}
      contentRef={contentRef}
      eyebrow={recipe.services[0] ?? "Template"}
      usage={{
        kind: "recipe",
        rawMarkdown,
        title: recipe.name,
        description: recipe.description,
        permalink: `/templates/${recipe.id}`,
      }}
      toc={<Toc className="mt-6" contentRef={contentRef} />}
      relatedItems={relatedItems}
    >
      <MDXProvider components={recipeComponents}>
        <MarkdownProse variant="dark">{children}</MarkdownProse>
      </MDXProvider>
    </TemplateDetailShell>
  );
}
