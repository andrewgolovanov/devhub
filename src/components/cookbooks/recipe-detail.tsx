import { MDXProvider } from "@mdx-js/react";
import { useRef, type ReactNode } from "react";
import { RecipePre } from "@/components/cookbooks/recipe-code-block";
import { FallbackCardArt } from "@/components/examples/fallback-card-art";
import { TemplatePreviewImage } from "@/components/examples/template-preview-image";
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
        slug: recipe.id,
        rawMarkdown,
        title: recipe.name,
        description: recipe.description,
        permalink: `/templates/${recipe.id}`,
      }}
      heroMedia={
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-black/12 bg-black/4 dark:border-white/15 dark:bg-white/5">
          <TemplatePreviewImage
            lightUrl={recipe.previewImageLightUrl}
            darkUrl={recipe.previewImageDarkUrl}
            alt={`${recipe.name} preview`}
            fallback={<FallbackCardArt index={0} />}
          />
        </div>
      }
      toc={<Toc className="mt-6" contentRef={contentRef} />}
      relatedItems={relatedItems}
    >
      <MDXProvider components={recipeComponents}>
        <MarkdownProse variant="dark">{children}</MarkdownProse>
      </MDXProvider>
    </TemplateDetailShell>
  );
}
