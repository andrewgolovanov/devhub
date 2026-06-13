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
  const isHackathonTemplate = recipe.id === "hackathon-app-with-synced-dataset";

  return (
    <TemplateDetailShell
      title={recipe.name}
      description={recipe.description}
      contentRef={contentRef}
      services={recipe.services}
      usage={{
        kind: "recipe",
        slug: recipe.id,
        rawMarkdown,
        title: recipe.name,
        description: recipe.description,
        permalink: `/templates/${recipe.id}`,
      }}
      heroMedia={
        isHackathonTemplate ? undefined : (
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-black/12 bg-black/4 dark:border-white/15 dark:bg-white/5">
            <TemplatePreviewImage
              lightUrl={recipe.previewImageLightUrl}
              darkUrl={recipe.previewImageDarkUrl}
              alt={`${recipe.name} preview`}
              fallback={<FallbackCardArt index={0} />}
            />
          </div>
        )
      }
      relatedItems={relatedItems}
      presentation={isHackathonTemplate ? "hackathon" : "default"}
    >
      <MDXProvider components={recipeComponents}>
        <MarkdownProse
          className={
            isHackathonTemplate
              ? "mt-10 max-w-[46rem] recipe-content-card template-dark-prose md:mt-12"
              : undefined
          }
          variant="dark"
        >
          {children}
        </MarkdownProse>
      </MDXProvider>
    </TemplateDetailShell>
  );
}
