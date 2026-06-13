import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { MDXProvider } from "@mdx-js/react";
import { useRef, type ReactNode } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { RecipePre } from "@/components/cookbooks/recipe-code-block";
import {
  buildFullPrompt,
  buildAdditionalMarkdown,
} from "@/lib/examples/build-example-markdown";
import type { Cookbook, Example, Recipe } from "@/lib/recipes/recipes";
import { cookbooks, recipes } from "@/lib/recipes/recipes";
import { useExampleSections } from "@/lib/use-raw-content-markdown";
import { goalOnly } from "@/lib/content-sections";
import { TemplateImageCarousel } from "@/components/examples/template-image-carousel";
import { TemplatePreviewImage } from "@/components/examples/template-preview-image";
import { FallbackCardArt } from "@/components/examples/fallback-card-art";
import { siteUrlFromConfig } from "@/lib/site-url";
import { BaseUrlAnchor } from "@/components/base-url-anchor";
import { MarkdownProse } from "@/components/markdown-prose";
import { TemplateDetailShell } from "@/components/templates/template-detail-shell";
import type { TemplateItem } from "@/components/templates/template-card";

const mdxComponents = { a: BaseUrlAnchor, pre: RecipePre };

type ExampleDetailProps = {
  example: Example;
  children: ReactNode;
};

function StarterCodeCard({ templateUrl }: { templateUrl: string }) {
  const displayPath =
    templateUrl
      .replace(/^https:\/\/github\.com\//, "")
      .replace(/\/tree\/[^/]+\//, "/") + "/";

  return (
    <div className="mt-10 py-2 md:mt-12">
      <div className="flex flex-col gap-5 border border-grey-30 bg-black px-6 py-[25px]">
        <div className="flex flex-col gap-4">
          <p className="m-0 text-xl leading-[1.375] font-medium tracking-[-0.5px] text-white">
            Includes a working starter app
          </p>
          <p className="m-0 text-lg leading-normal tracking-[-0.45px] text-grey-90">
            Real, runnable code lives on GitHub. When you copy the prompt above,
            your coding agent clones it as the starting point and adapts it to
            your data and use case.
          </p>
        </div>
        <div className="h-px w-full bg-grey-30" aria-hidden="true" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex min-w-0 items-center gap-2.5 text-grey-70">
            <GitBranch className="size-4 shrink-0" />
            <span className="min-w-0 truncate font-mono text-base leading-normal tracking-[-0.4px] text-grey-70">
              {displayPath}
            </span>
          </div>
          <a
            href={templateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit max-w-full shrink-0 items-stretch gap-x-0.5 text-white no-underline hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-db-cyan"
          >
            <span className="inline-flex h-9 min-w-0 items-center justify-center bg-grey-20 px-[18px] font-mono text-sm leading-none font-medium tracking-[-0.28px] uppercase transition-colors group-hover:bg-grey-30">
              View on GitHub
            </span>
            <span
              className="grid size-9 shrink-0 place-items-center bg-grey-20 transition-colors group-hover:bg-grey-30"
              aria-hidden="true"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function IncludedTemplateCard({
  name,
  description,
  href,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      aria-label={`View ${name}`}
      className="group relative flex flex-col gap-14 border border-grey-30 bg-[#0b0c0e] p-6 text-white no-underline hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-db-cyan"
    >
      <p className="m-0 flex items-center gap-1.5 font-mono text-sm leading-none font-medium tracking-normal text-[#5e616e] uppercase">
        <span className="size-1.5 bg-[#ff6038]" aria-hidden="true" />
        [TEMPLATES]
      </p>
      <div className="flex flex-col gap-2">
        <h3 className="m-0 text-xl leading-[1.375] font-medium tracking-[-0.5px] text-white">
          {name}
        </h3>
        <p className="m-0 text-base leading-normal tracking-[-0.4px] text-[#9194a1]">
          {description}
        </p>
      </div>
      <span
        className="absolute top-0 right-0 flex size-9 items-center justify-center bg-orange text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      >
        <img
          className="size-5"
          src="/img/templates/arrow-right-up.svg"
          alt=""
        />
      </span>
    </Link>
  );
}

export function ExampleDetail({
  example,
  children,
}: ExampleDetailProps): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  const contentRef = useRef<HTMLDivElement>(null);
  const permalink = `/templates/${example.id}`;
  const githubUrl = example.templateUrl;

  const sections = useExampleSections(example.id) ?? {};
  const rawMarkdown = goalOnly(sections);

  const includedCookbooks = example.cookbookIds
    .map((id) => cookbooks.find((c) => c.id === id))
    .filter((c): c is Cookbook => c !== undefined);

  const includedRecipes = example.recipeIds
    .map((id) => recipes.find((r) => r.id === id))
    .filter((r): r is Recipe => r !== undefined);

  const mdOpts = {
    example,
    githubUrl,
    includedCookbooks,
    includedRecipes,
    baseUrl: siteUrl,
  };
  const additionalMarkdown = buildAdditionalMarkdown(mdOpts);
  const fullPrompt = buildFullPrompt({ ...mdOpts, sections });
  const relatedItems: TemplateItem[] = [
    ...includedCookbooks.map((data) => ({ kind: "cookbook" as const, data })),
    ...includedRecipes.map((data) => ({ kind: "recipe" as const, data })),
  ];

  return (
    <TemplateDetailShell
      title={example.name}
      description={example.description}
      contentRef={contentRef}
      eyebrow="Solution Apps"
      usage={{
        kind: "example",
        slug: example.id,
        rawMarkdown,
        additionalMarkdown,
        customTemplateBody: fullPrompt,
        title: example.name,
        description: example.description,
        permalink,
      }}
      heroMedia={
        example.galleryImages && example.galleryImages.length > 0 ? (
          <TemplateImageCarousel
            images={example.galleryImages}
            exampleName={example.name}
          />
        ) : (
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-black/12 bg-black/4 dark:border-white/15 dark:bg-white/5">
            <TemplatePreviewImage
              lightUrl={example.previewImageLightUrl}
              darkUrl={example.previewImageDarkUrl}
              alt={`${example.name} preview`}
              fallback={<FallbackCardArt index={0} />}
            />
          </div>
        )
      }
      relatedItems={relatedItems}
      belowContent={
        <>
          <StarterCodeCard templateUrl={example.templateUrl} />
          {relatedItems.length > 0 && (
            <div className="mt-12 flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                <h2 className="m-0 text-2xl leading-normal font-medium tracking-[-0.6px] text-white">
                  Built on these templates
                </h2>
                <p className="m-0 text-lg leading-normal tracking-[-0.45px] text-grey-90">
                  This example's codebase and the agent prompt above both build
                  on top of the templates below. Open one to dive into a
                  specific technique on its own or apply it to a different
                  project.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {relatedItems.map(({ data }) => (
                  <IncludedTemplateCard
                    key={data.id}
                    name={data.name}
                    description={data.description}
                    href={`/templates/${data.id}`}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      }
    >
      <MDXProvider components={mdxComponents}>
        <MarkdownProse variant="dark">{children}</MarkdownProse>
      </MDXProvider>
    </TemplateDetailShell>
  );
}
