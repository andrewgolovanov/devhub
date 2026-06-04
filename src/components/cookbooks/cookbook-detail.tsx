import { MDXProvider } from "@mdx-js/react";
import { useRef, type ReactNode } from "react";
import { RecipePre } from "@/components/cookbooks/recipe-code-block";
import { FallbackCardArt } from "@/components/examples/fallback-card-art";
import { TemplatePreviewImage } from "@/components/examples/template-preview-image";
import { recipes, type Cookbook } from "@/lib/recipes/recipes";
import { BaseUrlAnchor } from "@/components/base-url-anchor";
import { MarkdownProse } from "@/components/markdown-prose";
import { TemplateDetailShell } from "@/components/templates/template-detail-shell";
import type { TemplateItem } from "@/components/templates/template-card";
import { Toc } from "@site/src/components/templates/toc";

const recipeComponents = { a: BaseUrlAnchor, pre: RecipePre };

type CookbookDetailProps = {
  cookbook: Cookbook;
  rawMarkdown: string;
  children: ReactNode;
};

export function CookbookDetail({
  cookbook,
  rawMarkdown,
  children,
}: CookbookDetailProps): ReactNode {
  const contentRef = useRef<HTMLDivElement>(null);
  const permalink = `/templates/${cookbook.id}`;
  const relatedItems: TemplateItem[] = cookbook.recipeIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(
      (recipe): recipe is (typeof recipes)[number] => recipe !== undefined,
    )
    .map((data) => ({ kind: "recipe" as const, data }));

  return (
    <TemplateDetailShell
      title={cookbook.name}
      description={cookbook.description}
      contentRef={contentRef}
      eyebrow="Template"
      usage={{
        kind: "cookbook",
        slug: cookbook.id,
        rawMarkdown,
        title: cookbook.name,
        description: cookbook.description,
        permalink,
      }}
      heroMedia={
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-black/12 bg-black/4 dark:border-white/15 dark:bg-white/5">
          <TemplatePreviewImage
            lightUrl={cookbook.previewImageLightUrl}
            darkUrl={cookbook.previewImageDarkUrl}
            alt={`${cookbook.name} preview`}
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
