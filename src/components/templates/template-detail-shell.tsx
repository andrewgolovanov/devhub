import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ComponentProps, ReactNode } from "react";

import { CopyPromptButton } from "@/components/copy-prompt-button";
import CTA from "@/components/home/cta";
import { OpenPromptInButton } from "@/components/open-prompt-in-button";
import { HackathonTemplateDetail } from "@/components/templates/hackathon-template-detail";
import { MoreTemplatesSlider } from "@/components/templates/more-templates-slider";
import type { TemplateItem } from "@/components/templates/template-card";
import NewFooter from "@/components/theme/footer";
import { BackLink } from "@/components/ui/back-link";
import { siteUrlFromConfig } from "@/lib/site-url";
import { useReplitPrompt } from "@/lib/use-raw-content-markdown";

type TemplateUsageProps = ComponentProps<typeof CopyPromptButton> & {
  slug: string;
};

type TemplateDetailShellProps = {
  title: string;
  description: string;
  usage: TemplateUsageProps;
  children: ReactNode;
  contentRef: React.RefObject<HTMLDivElement | null>;
  services?: readonly string[];
  heroMedia?: ReactNode;
  belowContent?: ReactNode;
  relatedItems?: TemplateItem[];
  presentation?: "default" | "hackathon";
};

function TemplateAiBlock({
  usage,
  className = "",
  titleClassName = "text-2xl/snug",
  showDivider = false,
}: {
  usage: TemplateUsageProps;
  className?: string;
  titleClassName?: string;
  showDivider?: boolean;
}) {
  const { slug, ...copyPromptProps } = usage;
  const replitPrompt = useReplitPrompt(slug);

  return (
    <div className={className}>
      {showDivider ? (
        <div className="h-px w-full bg-grey-20" aria-hidden="true" />
      ) : (
        <span className="block size-1.5 bg-orange" aria-hidden="true" />
      )}
      <h2
        className={`mt-4.5 leading-tight font-normal tracking-tight text-white ${titleClassName}`}
      >
        Build with AI
      </h2>
      <ol className="mt-3 flex list-decimal flex-col gap-y-2 pl-4.5 text-sm/snug tracking-tight text-grey-70 marker:text-grey-60">
        <li className="pl-1">Copy the prompt below</li>
        <li className="pl-1">
          Paste into Cursor, Claude Code, Codex, or any coding agent
        </li>
        <li className="pl-1">
          Your agent builds it — asking questions along the way so the result is
          exactly what you want
        </li>
      </ol>
      <div className="mt-5 flex flex-wrap gap-2">
        <CopyPromptButton
          {...copyPromptProps}
          className="h-10 gap-x-2.5 rounded-none bg-orange pl-4 pr-4.5 font-mono text-sm/none font-medium tracking-tight text-black uppercase hover:bg-primary focus-visible:ring-orange/60 has-[>svg]:pl-4 has-[>svg]:pr-4.5 [&_svg:not([class*='size-'])]:size-4"
        />
        <OpenPromptInButton
          replitPrompt={replitPrompt}
          slug={slug}
          title={usage.title}
          permalink={usage.permalink}
          sideOffset={8}
          className="h-10 gap-2.5 rounded-none border border-grey-30 bg-transparent py-0 pl-4 pr-3.5 font-mono text-sm leading-none font-medium tracking-normal text-grey-70 uppercase shadow-none transition-colors hover:border-grey-70 hover:bg-transparent hover:text-grey-70 focus:bg-transparent focus:text-grey-70 focus-visible:border-grey-70 focus-visible:ring-db-cyan focus-visible:ring-offset-black data-[state=open]:border-grey-70 data-[state=open]:bg-transparent data-[state=open]:text-grey-70 data-[state=open]:hover:bg-transparent [&_svg]:size-3.5 [&_svg]:text-current"
          contentClassName="rounded-none border border-grey-30 bg-black p-0 text-white shadow-none"
          itemClassName="h-10 min-h-0 cursor-pointer gap-2.5 rounded-none bg-transparent px-4 py-0 font-mono text-sm leading-none font-medium tracking-normal text-grey-70 uppercase outline-none transition-colors hover:!bg-transparent hover:!text-white focus:!bg-transparent focus:!text-white data-[highlighted]:!bg-transparent data-[highlighted]:!text-white [&_svg]:size-3.5 [&_svg]:text-current"
        />
      </div>
      <p className="mt-4 text-sm tracking-tight text-grey-70">
        New to templates?{" "}
        <Link
          to="/docs/templates"
          className="font-medium text-orange no-underline hover:text-db-lava hover:no-underline"
        >
          Learn more here
        </Link>
      </p>
    </div>
  );
}

function TemplateDetailRail({ usage }: { usage: TemplateUsageProps }) {
  return (
    <aside className="sticky top-24">
      <TemplateAiBlock usage={usage} />
    </aside>
  );
}

export function TemplateDetailShell({
  title,
  description,
  usage,
  children,
  contentRef,
  services,
  heroMedia,
  belowContent,
  relatedItems = [],
  presentation = "default",
}: TemplateDetailShellProps): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  const pageUrl = `${siteUrl}${usage.permalink}`;

  return (
    <Layout title={title} description={description} noFooter>
      <Head>
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: title,
            description,
            url: pageUrl,
          })}
        </script>
      </Head>
      {presentation === "hackathon" ? (
        <HackathonTemplateDetail
          title={title}
          description={description}
          usage={usage}
          contentRef={contentRef}
          services={services}
        >
          {children}
        </HackathonTemplateDetail>
      ) : (
        <main className="bg-black text-white">
          <section className="">
            <article className="mx-auto w-full max-w-304 flex flex-col gap-y-9 px-5 pt-12 pb-24 md:px-8 md:pt-13 lg:pb-32">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex min-w-0 items-center" role="list">
                  <li className="flex items-center">
                    <BackLink
                      className="font-normal"
                      to="/templates"
                      aria-label="All templates"
                    >
                      Back
                    </BackLink>
                  </li>
                </ol>
              </nav>

              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-16">
                <div className="min-w-0">
                  <h1 className="font-sans text-balance text-[28px]/[1.125] font-normal tracking-[-0.04em] text-white md:text-4xl/[1.125] lg:text-[3.5rem]/[1.125]">
                    {title}
                  </h1>
                  <p className="mt-4 text-base/snug tracking-tight text-grey-90 md:text-xl/snug">
                    {description}
                  </p>

                  {heroMedia ? <div className="mt-8">{heroMedia}</div> : null}

                  <TemplateAiBlock
                    usage={usage}
                    className="mt-5 md:mt-6 lg:hidden"
                    titleClassName="text-xl/snug md:text-2xl/snug"
                    showDivider
                  />

                  <div
                    className="mt-10 recipe-content-card template-dark-prose md:mt-12"
                    ref={contentRef}
                  >
                    {children}
                  </div>

                  {belowContent}
                </div>

                <div className="hidden lg:block">
                  <TemplateDetailRail usage={usage} />
                </div>
              </div>
            </article>
          </section>

          <div className="bg-[#f9f7f4] text-black">
            <div className="h-12 bg-orange" aria-hidden="true" />
            <MoreTemplatesSlider items={relatedItems} />
            <CTA
              label="Start building"
              title="Ready to ship your next agentic app in minutes?"
              className="max-w-432 mx-auto mt-24 pt-1.5 md:mt-36 lg:mt-44 xl:mt-60 pb-16 lg:pb-22"
            />
            <NewFooter className="mx-auto max-w-432 border-t border-white/10 lg:px-8" />
          </div>
        </main>
      )}
    </Layout>
  );
}
