import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { MDXProvider } from "@mdx-js/react";
import Layout from "@theme/Layout";
import { ArrowLeft } from "lucide-react";
import { useMemo, useRef, type ReactNode } from "react";

import { AIExportMenu } from "@/components/ai-export-menu";
import { BaseUrlAnchor } from "@/components/base-url-anchor";
import { BlogByline } from "@/components/blog/blog-byline";
import {
  BlogArrowIcon,
  BlogItemLink,
  BlogItemVisual,
  formatBlogDate,
} from "@/components/blog/blog-item-shared";
import { RecipePre } from "@/components/cookbooks/recipe-code-block";
import CTA from "@/components/home-new/cta";
import { MarkdownProse } from "@/components/markdown-prose";
import NewFooter from "@/components/theme/footer";
import { Toc } from "@/components/templates/toc";
import { BrandStrip } from "@/components/ui/brand-strip";
import { Button } from "@/components/ui/button";
import { getBlogAuthor, type BlogAuthor } from "@/lib/blog/authors";
import {
  buildBlogItems,
  type BlogItem,
  type NativeBlogItem,
} from "@/lib/blog/blog-items";
import { siteUrlFromConfig } from "@/lib/site-url";

const blogComponents = { a: BaseUrlAnchor, pre: RecipePre };

function BlogCtaActions(): ReactNode {
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

function BlogHeroMedia({ item }: { item: NativeBlogItem }): ReactNode {
  return (
    <div className="relative aspect-416/238 w-full overflow-hidden bg-grey-20 md:aspect-[832/476]">
      <BlogItemVisual item={item} variant="featured" width={832} height={476} />
    </div>
  );
}

function BlogBackLink(): ReactNode {
  return (
    <Link
      className="inline-flex self-start items-center gap-1.5 font-mono text-xs leading-none font-medium text-grey-50 no-underline uppercase hover:text-white hover:no-underline"
      to="/blog"
      aria-label="All blog articles"
    >
      <ArrowLeft className="size-3.5" aria-hidden="true" />
      Back
    </Link>
  );
}

function BlogDetailHeader({
  item,
  authors,
  rawMarkdownUrl,
}: {
  item: NativeBlogItem;
  authors: BlogAuthor[];
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
          [{formatBlogDate(item.publishedAt)}]
        </time>
      </div>

      <h1 className="m-0 mt-6 text-[2.75rem]/[1.125] font-normal tracking-[-0.04em] wrap-break-word text-white md:text-[3.5rem]/[1.125]">
        {item.title}
      </h1>
      <p className="m-0 mt-4 max-w-208 text-lg leading-snug tracking-[-0.04em] text-grey-90 md:text-xl">
        {item.description}
      </p>

      <div className="mt-6 flex flex-col gap-5 border-t border-grey-30 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <BlogByline authors={authors} publishedAt={item.publishedAt} compact />
        <AIExportMenu
          appearance="article"
          kind="blog"
          contentClassName="w-[15.5625rem] min-w-[15.5625rem]"
          rawMarkdownUrl={rawMarkdownUrl}
          title={item.title}
          description={item.description}
          permalink={`/blog/${item.id}`}
        />
      </div>
    </header>
  );
}

function BlogDetailRail({ toc }: { toc: ReactNode }): ReactNode {
  return (
    <aside className="hidden h-full w-55 min-w-0 min-[90rem]:block">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-x-hidden overflow-y-auto">
        <p className="m-0 font-mono text-xs leading-none font-medium text-grey-50 uppercase">
          On this page
        </p>
        {toc}
      </div>
    </aside>
  );
}

function BlogReadMoreArrowIcon(): ReactNode {
  return (
    <span
      className="relative size-[1.125rem] shrink-0 overflow-visible transition-transform duration-200 ease-out group-hover/link:translate-x-1"
      aria-hidden="true"
    >
      <span className="absolute top-[-0.014375rem] left-[-0.130625rem] flex size-[1.3816875rem] items-center justify-center">
        <BlogArrowIcon className="h-[1.224375rem] w-[0.729625rem] rotate-45" />
      </span>
    </span>
  );
}

function BlogReadMore({ currentItem }: { currentItem: BlogItem }): ReactNode {
  const items = useMemo(
    () =>
      buildBlogItems()
        .filter((item) => item.id !== currentItem.id)
        .slice(0, 3),
    [currentItem.id],
  );

  if (items.length === 0) return null;

  return (
    <>
      <BrandStrip />
      <section className="bg-db-oat-light px-5 py-24 font-sans text-black md:px-8 lg:px-0 lg:pb-60">
        <div className="mx-auto w-full max-w-208">
          <h2 className="m-0 text-[2.25rem]/[1.125] font-normal tracking-[-0.09rem] text-black wrap-break-word">
            Read more
          </h2>
          <div className="mt-[2.625rem] flex flex-col gap-[2.625rem]">
            {items.map((item) => (
              <article
                key={item.id}
                className="grid gap-6 md:min-h-[12.625rem] md:grid-cols-[minmax(0,24.0625rem)_minmax(0,1fr)] md:gap-[1.625rem]"
              >
                <BlogItemLink
                  className="group block self-end no-underline outline-none focus-visible:ring-2 focus-visible:ring-db-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-db-oat-light"
                  item={item}
                  ariaLabel={`Read ${item.title}`}
                >
                  <div className="relative aspect-[385/202] overflow-hidden border border-db-navy bg-db-oat-medium md:aspect-auto md:h-[12.625rem]">
                    <BlogItemVisual
                      item={item}
                      variant="card"
                      width={383}
                      height={200}
                    />
                  </div>
                </BlogItemLink>
                <div className="flex min-w-0 flex-col justify-between gap-2 md:h-[12.625rem]">
                  <div className="min-w-0">
                    <time
                      className="block font-mono text-[0.875rem]/none font-medium tracking-normal text-grey-40 uppercase"
                      dateTime={item.publishedAt}
                    >
                      [{formatBlogDate(item.publishedAt).toUpperCase()}]
                    </time>
                    <h3 className="m-0 mt-4 text-[1.5rem]/[1.25] font-medium tracking-[-0.0375rem] text-black wrap-break-word">
                      <BlogItemLink
                        className="line-clamp-1 text-black no-underline outline-none transition-colors hover:text-black/70 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan"
                        item={item}
                      >
                        {item.title}
                      </BlogItemLink>
                    </h3>
                    <p className="m-0 mt-2.5 line-clamp-3 text-[1rem]/[1.5] font-normal tracking-[-0.025rem] text-grey-50">
                      {item.description}
                    </p>
                  </div>
                  <BlogItemLink
                    className="group/link flex items-center justify-between border-b-[0.1875rem] border-orange pb-2.5 text-[1.5rem]/[1.375] font-normal tracking-[-0.06rem] text-orange no-underline outline-none transition-colors hover:border-primary hover:text-primary hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan"
                    item={item}
                    ariaLabel={`Learn more about ${item.title}`}
                  >
                    <span>Learn more</span>
                    <BlogReadMoreArrowIcon />
                  </BlogItemLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function BlogDetail({
  item,
  children,
}: {
  item: NativeBlogItem;
  children: ReactNode;
}): ReactNode {
  const contentRef = useRef<HTMLDivElement>(null);
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  const pageUrl = `${siteUrl}/blog/${item.id}`;
  const authors = item.authors.map(getBlogAuthor);

  return (
    <Layout title={item.title} description={item.description} noFooter>
      <Head>
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: item.title,
            description: item.description,
            url: pageUrl,
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
        <article className="w-full px-5 pt-12 pb-24 md:px-8 md:pt-13 xl:px-0 xl:pt-19.5 lg:pb-32">
          <div className="ml-auto mr-auto flex w-full max-w-208 flex-col gap-y-8 min-[90rem]:ml-[calc((100%-52rem)/2+0.25rem)] min-[90rem]:max-w-279">
            <BlogBackLink />

            <div className="grid gap-14 min-[90rem]:grid-cols-[minmax(0,52rem)_13.75rem] min-[90rem]:gap-16">
              <div className="min-w-0">
                <BlogDetailHeader
                  item={item}
                  authors={authors}
                  rawMarkdownUrl={`/blog/${item.id}.md`}
                />

                <div className="mt-5">
                  <div>
                    <BlogHeroMedia item={item} />
                  </div>

                  <div
                    className="mt-12 recipe-content-card template-dark-prose"
                    ref={contentRef}
                  >
                    <MDXProvider components={blogComponents}>
                      <MarkdownProse variant="dark">{children}</MarkdownProse>
                    </MDXProvider>
                  </div>
                </div>
              </div>

              <BlogDetailRail
                toc={
                  <Toc
                    ariaLabel="Blog article sections"
                    className="mt-6 [&_a]:max-w-full [&_a]:wrap-break-word [&_a]:py-0 [&_a]:text-sm/snug [&_ul]:gap-y-3.5"
                    contentRef={contentRef}
                  />
                }
              />
            </div>
          </div>
        </article>

        <BlogReadMore currentItem={item} />

        <div className="bg-white px-5 pb-0 md:px-8">
          <div className="mx-auto max-w-432 bg-black">
            <CTA
              label="Start building"
              title="Ready to ship your next agentic app in minutes?"
              actions={<BlogCtaActions />}
              className="mx-auto max-w-432 border-x border-white/10 pt-1.5 pb-18 lg:pb-24"
            />
            <NewFooter className="mx-auto max-w-432 border-x border-t border-white/10 lg:px-8" />
          </div>
        </div>
      </main>
    </Layout>
  );
}
