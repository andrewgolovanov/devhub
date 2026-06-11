import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { MDXProvider } from "@mdx-js/react";
import Layout from "@theme/Layout";
import { ArrowLeft } from "lucide-react";
import { useMemo, useRef, type ReactNode } from "react";

import { AIExportMenu } from "@/components/ai-export-menu";
import { BaseUrlAnchor } from "@/components/base-url-anchor";
import { SolutionByline } from "@/components/solutions/solution-byline";
import {
  SolutionItemLink,
  SolutionItemVisual,
  formatSolutionDate,
} from "@/components/solutions/solution-item-shared";
import { RecipePre } from "@/components/cookbooks/recipe-code-block";
import CTA from "@/components/home/cta";
import { MarkdownProse } from "@/components/markdown-prose";
import NewFooter from "@/components/theme/footer";
import { Toc } from "@/components/templates/toc";
import { AnimatedArrowLink } from "@/components/ui/animated-arrow-link";
import { BrandStrip } from "@/components/ui/brand-strip";
import { Button } from "@/components/ui/button";
import {
  getSolutionAuthor,
  type SolutionAuthor,
} from "@/lib/solutions/authors";
import {
  buildSolutionItems,
  getSolutionItemHref,
  isLinkedSolutionItem,
  type SolutionItem,
  type NativeSolutionItem,
} from "@/lib/solutions/solution-items";
import { siteUrlFromConfig } from "@/lib/site-url";

const solutionComponents = { a: BaseUrlAnchor, pre: RecipePre };
const defaultSocialImagePath = "/img/databricks-social-card.svg";

function absoluteSiteAssetUrl(siteUrl: string, assetPath: string): string {
  if (/^https?:\/\//i.test(assetPath)) return assetPath;
  return `${siteUrl}/${assetPath.replace(/^\/+/, "")}`;
}

function SolutionCtaActions(): ReactNode {
  return (
    <div className="flex w-full flex-col gap-y-3 gap-x-5 sm:w-auto sm:flex-row sm:items-center lg:justify-end">
      <Button
        className="h-10 rounded-none pl-7 pr-6 font-mono text-base leading-none font-medium tracking-tight uppercase shadow-none lg:h-11"
        asChild
        size="xl"
        variant="orange"
      >
        <Link
          className="text-black no-underline hover:no-underline"
          to="/templates"
        >
          Explore templates
        </Link>
      </Button>
      <Button
        className="h-10 rounded-none bg-white pl-7 pr-6 font-mono text-base leading-none font-medium tracking-tight text-black uppercase shadow-none hover:bg-white/90 lg:h-11"
        asChild
      >
        <Link className="no-underline hover:no-underline" to="/docs/start-here">
          Read docs
        </Link>
      </Button>
    </div>
  );
}

function SolutionHeroMedia({ item }: { item: NativeSolutionItem }): ReactNode {
  return (
    <div className="relative aspect-416/238 w-full overflow-hidden bg-grey-20 md:aspect-[832/476]">
      <SolutionItemVisual
        item={item}
        variant="featured"
        width={832}
        height={476}
      />
    </div>
  );
}

function SolutionBackLink(): ReactNode {
  return (
    <Link
      className="inline-flex self-start items-center gap-1.5 font-mono text-xs leading-none font-medium text-grey-50 no-underline uppercase hover:text-white hover:no-underline"
      to="/solutions"
      aria-label="All solutions"
    >
      <ArrowLeft className="size-3.5" aria-hidden="true" />
      Back
    </Link>
  );
}

function SolutionDetailHeader({
  item,
  authors,
  rawMarkdownUrl,
}: {
  item: NativeSolutionItem;
  authors: SolutionAuthor[];
  rawMarkdownUrl: string;
}): ReactNode {
  return (
    <header className="max-w-208">
      <div className="flex items-center gap-2">
        <span className="size-2 bg-orange" aria-hidden="true" />
        <time
          className="font-mono text-base leading-none font-medium text-grey-50 uppercase"
          dateTime={item.publishedAt}
        >
          [{formatSolutionDate(item.publishedAt)}]
        </time>
      </div>

      <h1 className="m-0 mt-6 text-[2rem]/[1.125] font-normal tracking-[-0.04em] wrap-break-word text-white md:text-[2.5rem]/[1.125] lg:text-[3rem]/[1.125] xl:text-[3.5rem]/[1.125]">
        {item.title}
      </h1>
      <p className="m-0 mt-2.5 max-w-208 text-lg leading-snug tracking-[-0.04em] text-grey-90 md:mt-3 md:text-xl lg:mt-3.5 xl:mt-4">
        {item.description}
      </p>

      <div className="mt-4 flex flex-row items-center justify-between gap-5 border-t border-grey-30 pt-3.5 md:mt-4.5 md:pt-4 lg:mt-5 lg:pt-4.5 xl:mt-6 xl:pt-5">
        <SolutionByline
          authors={authors}
          publishedAt={item.publishedAt}
          compact
        />
        <AIExportMenu
          appearance="article"
          kind="solution"
          mobileLabel="COPY"
          contentClassName="w-[15.5625rem] min-w-[15.5625rem]"
          rawMarkdownUrl={rawMarkdownUrl}
          title={item.title}
          description={item.description}
          permalink={`/solutions/${item.id}`}
        />
      </div>
    </header>
  );
}

function SolutionDetailRail({ toc }: { toc: ReactNode }): ReactNode {
  return (
    <aside className="sticky top-16 hidden max-h-[calc(100svh-4rem)] w-55 min-w-0 shrink-0 self-start overflow-x-hidden overflow-y-auto pt-8 pb-10 -mt-8 -mb-10 lg:block xl:hidden min-[90rem]:block">
      <p className="m-0 font-mono text-xs leading-none font-medium text-grey-50 uppercase">
        On this page
      </p>
      {toc}
    </aside>
  );
}

function SolutionReadMore({
  currentItem,
}: {
  currentItem: SolutionItem;
}): ReactNode {
  const items = useMemo(
    () =>
      buildSolutionItems()
        .filter((item) => item.id !== currentItem.id)
        .slice(0, 3),
    [currentItem.id],
  );

  if (items.length === 0) return null;

  return (
    <section className="px-5 pb-24 pt-16 font-sans text-black md:px-8 md:pt-18 lg:px-0 lg:pb-60 lg:pt-22">
      <div className="mx-auto w-full max-w-208">
        <h2 className="m-0 text-[1.75rem]/[1.125] font-normal tracking-[-0.09rem] text-black wrap-break-word md:text-[2rem]/[1.125] lg:text-[2.25rem]/[1.125]">
          Read more
        </h2>
        <div className="mt-[2.625rem] flex flex-col gap-[2.625rem]">
          {items.map((item) => (
            <article
              key={item.id}
              className="grid gap-6 md:min-h-[12.625rem] md:grid-cols-[minmax(0,24.0625rem)_minmax(0,1fr)] md:gap-[1.625rem]"
            >
              <SolutionItemLink
                className="group block self-end no-underline outline-none focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-db-oat-light"
                item={item}
                ariaLabel={`Read ${item.title}`}
              >
                <div className="relative aspect-[385/202] overflow-hidden border border-db-navy bg-db-oat-medium md:aspect-auto md:h-[12.625rem]">
                  <SolutionItemVisual
                    item={item}
                    variant="card"
                    width={383}
                    height={200}
                  />
                </div>
              </SolutionItemLink>
              <div className="flex min-w-0 flex-col justify-between gap-2 md:h-[12.625rem]">
                <div className="min-w-0">
                  <time
                    className="block font-mono text-[0.875rem]/none font-medium tracking-normal text-grey-40 uppercase"
                    dateTime={item.publishedAt}
                  >
                    [{formatSolutionDate(item.publishedAt).toUpperCase()}]
                  </time>
                  <h3 className="m-0 mt-4 text-[1.125rem]/[1.25] font-medium tracking-[-0.0375rem] text-black wrap-break-word md:text-[1.25rem]/[1.25] lg:text-[1.5rem]/[1.25]">
                    <SolutionItemLink
                      className="line-clamp-1 text-black no-underline outline-none transition-colors hover:text-black/70 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan"
                      item={item}
                    >
                      {item.title}
                    </SolutionItemLink>
                  </h3>
                  <p className="m-0 mt-2.5 line-clamp-3 text-[1rem]/[1.5] font-normal tracking-[-0.025rem] text-grey-50">
                    {item.description}
                  </p>
                </div>
                <AnimatedArrowLink
                  to={getSolutionItemHref(item)}
                  target={isLinkedSolutionItem(item) ? "_blank" : undefined}
                  rel={
                    isLinkedSolutionItem(item)
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-center justify-between border-b-2 border-orange pb-2.5 text-[1.125rem]/[1.375] font-normal tracking-[-0.06rem] text-orange no-underline outline-none transition-colors hover:border-primary hover:text-primary hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan md:text-[1.25rem]/[1.375] lg:text-[1.5rem]/[1.375]"
                  ariaLabel={`Learn more about ${item.title}`}
                  size="size-4.5 md:size-5 lg:size-6"
                >
                  Learn more
                </AnimatedArrowLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionDetail({
  item,
  children,
}: {
  item: NativeSolutionItem;
  children: ReactNode;
}): ReactNode {
  const contentRef = useRef<HTMLDivElement>(null);
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  const pageUrl = `${siteUrl}/solutions/${item.id}`;
  const ogImageUrl = absoluteSiteAssetUrl(
    siteUrl,
    item.previewImage ?? defaultSocialImagePath,
  );
  const authors = item.authors.map(getSolutionAuthor);

  return (
    <Layout title={item.title} description={item.description} noFooter>
      <Head>
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: item.title,
            description: item.description,
            url: pageUrl,
            image: ogImageUrl,
            datePublished: item.publishedAt,
            author: authors.map((author) => ({
              "@type": "Person",
              name: author.name,
              jobTitle: author.role,
            })),
          })}
        </script>
      </Head>
      <main className="bg-black text-white">
        <article className="w-full px-5 pt-9 pb-24 md:px-8 md:pt-12 xl:px-0 xl:pt-19.5 lg:pb-44">
          <div className="ml-auto mr-auto flex w-full max-w-208 flex-col gap-y-8 lg:max-w-none xl:max-w-208 min-[90rem]:ml-[calc((100%-52rem)/2+0.25rem)] min-[90rem]:max-w-279">
            <SolutionBackLink />

            <div className="flex flex-col gap-14 lg:flex-row lg:gap-8 xl:flex-col xl:gap-14 min-[90rem]:flex-row min-[90rem]:gap-16">
              <div className="min-w-0 lg:flex-1 xl:flex-none min-[90rem]:flex-1">
                <SolutionDetailHeader
                  item={item}
                  authors={authors}
                  rawMarkdownUrl={`/solutions/${item.id}.md`}
                />

                <div className="mt-5">
                  <div>
                    <SolutionHeroMedia item={item} />
                  </div>

                  <div
                    className="mt-12 recipe-content-card template-dark-prose"
                    ref={contentRef}
                  >
                    <MDXProvider components={solutionComponents}>
                      <MarkdownProse variant="dark">{children}</MarkdownProse>
                    </MDXProvider>
                  </div>
                </div>
              </div>

              <SolutionDetailRail
                toc={
                  <Toc
                    ariaLabel="Solution sections"
                    className="mt-6 [&_a]:max-w-full [&_a]:wrap-break-word [&_a]:py-0 [&_a]:text-sm/snug [&_ul]:gap-y-3.5"
                    contentRef={contentRef}
                  />
                }
              />
            </div>
          </div>
        </article>

        <BrandStrip />
        <div className="bg-[#F9F7F4]">
          <SolutionReadMore currentItem={item} />
          <div className="mx-auto max-w-432 bg-black">
            <CTA
              label="Start building"
              title="Ready to ship your next agentic app in minutes?"
              actions={<SolutionCtaActions />}
              className="mx-auto max-w-432 border-x border-white/10 pt-1.5 pb-18 lg:pb-24"
            />
            <NewFooter className="mx-auto max-w-432 border-x border-t border-white/10 lg:px-8" />
          </div>
        </div>
      </main>
    </Layout>
  );
}
