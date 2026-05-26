import useBaseUrl from "@docusaurus/useBaseUrl";
import { MDXProvider } from "@mdx-js/react";
import { useRef, type ReactNode } from "react";
import { RecipePre } from "@/components/cookbooks/recipe-code-block";
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
  const heroImageUrl = useBaseUrl("/img/template-detail-hero.svg");
  const permalink = `/templates/${cookbook.id}`;
  const relatedItems: TemplateItem[] = cookbook.recipeIds
    .map((id) => recipes.find((recipe) => recipe.id === id))
    .filter(Boolean)
    .map((data) => ({ kind: "recipe" as const, data }));

  return (
    <TemplateDetailShell
      title={cookbook.name}
      description={cookbook.description}
      contentRef={contentRef}
      eyebrow="Template"
      usage={{
        kind: "cookbook",
        rawMarkdown,
        title: cookbook.name,
        description: cookbook.description,
        permalink,
      }}
      heroMedia={
        <div className="overflow-hidden border border-black/12 bg-[#0f172a] dark:border-white/15">
          <img
            src={heroImageUrl}
            alt="Template architecture preview"
            className="h-auto w-full object-cover"
            loading="lazy"
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
