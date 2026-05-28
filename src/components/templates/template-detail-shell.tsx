import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { ArrowLeft } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { CopyPromptButton } from "@/components/copy-prompt-button";
import CTA from "@/components/home-new/cta";
import { MoreTemplatesSlider } from "@/components/templates/more-templates-slider";
import type { TemplateItem } from "@/components/templates/template-card";
import NewFooter from "@/components/theme/footer";
import { siteUrlFromConfig } from "@/lib/site-url";

type TemplateUsageProps = ComponentProps<typeof CopyPromptButton>;

type TemplateDetailShellProps = {
  title: string;
  description: string;
  usage: TemplateUsageProps;
  children: ReactNode;
  contentRef: React.RefObject<HTMLDivElement | null>;
  toc: ReactNode;
  eyebrow?: string;
  heroMedia?: ReactNode;
  belowContent?: ReactNode;
  relatedItems?: TemplateItem[];
};

function TemplateDetailRail({
  usage,
  toc,
}: {
  usage: TemplateUsageProps;
  toc: ReactNode;
}) {
  return (
    <aside className="sticky top-24 flex flex-col gap-y-7">
      <div className="border-b border-grey-20 pb-7">
        <span className="block size-1.5 bg-orange" aria-hidden="true" />
        <h2 className="mt-4.5 text-2xl/snug leading-tight font-normal tracking-tight text-white">
          Build with AI
        </h2>
        <p className="mt-1 text-base tracking-tight text-grey-70">
          [Agent asks questions and ships the app.]
        </p>
        <CopyPromptButton
          {...usage}
          className="mt-5 h-10 gap-x-2.5 rounded-none bg-orange pl-4 pr-4.5 font-mono text-sm/none font-medium tracking-tight text-black uppercase hover:bg-primary focus-visible:ring-orange/60 has-[>svg]:pl-4 has-[>svg]:pr-4.5 [&_svg:not([class*='size-'])]:size-4"
        />
      </div>

      <div>
        <span className="block size-1.5 bg-orange" aria-hidden="true" />
        <h2 className="mt-4.5 text-2xl/snug leading-tight font-normal tracking-tight text-white">
          Build manually
        </h2>
        <p className="mt-1 text-base tracking-tight text-grey-70">
          [Follow the steps below.]
        </p>
        {toc}
      </div>
    </aside>
  );
}

export function TemplateDetailShell({
  title,
  description,
  usage,
  children,
  contentRef,
  toc,
  eyebrow,
  heroMedia,
  belowContent,
  relatedItems = [],
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
      <main className="bg-black text-white">
        <section className="">
          <article className="mx-auto w-full max-w-304 flex flex-col gap-y-9 px-5 pt-12 pb-24 md:px-8 md:pt-13 lg:pb-32">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex min-w-0 items-center" role="list">
                <li className="flex items-center">
                  <Link
                    className="inline-flex text-xs font-mono items-center gap-1.5 text-grey-60 no-underline uppercase hover:text-white hover:no-underline"
                    to="/templates"
                    aria-label="All templates"
                  >
                    <ArrowLeft className="size-3.5" aria-hidden="true" />
                    Back
                  </Link>
                </li>
                <li className="flex items-center font-mono">
                  <span
                    className="mx-2.5 text-sm font-mono leading-none font-medium tracking-tight text-grey-70"
                    aria-hidden="true"
                  >
                    /
                  </span>
                  <span className="text-white uppercase text-xs">
                    {eyebrow ?? title}
                  </span>
                </li>
              </ol>
            </nav>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-16">
              <div className="min-w-0">
                <h1 className="font-sans text-balance text-3xl/[1.125] md:text-4xl/[1.125] font-normal tracking-[-0.04em] text-white lg:text-[3.5rem]/[1.125]">
                  {title}
                </h1>
                <p className="mt-4 text-lg/snug tracking-tight text-grey-90 md:text-xl/snug">
                  {description}
                </p>

                {heroMedia ? <div className="mt-8">{heroMedia}</div> : null}

                <div
                  className="mt-12 recipe-content-card template-dark-prose"
                  ref={contentRef}
                >
                  {children}
                </div>

                {belowContent}
              </div>

              <div>
                <TemplateDetailRail usage={usage} toc={toc} />
              </div>
            </div>
          </article>
        </section>

        <div className="bg-[#f9f7f4] text-black">
          <div className="h-13.5 bg-orange" aria-hidden="true" />
          <MoreTemplatesSlider items={relatedItems} />
          <CTA
            label="Start building"
            title="Ready to ship your next agentic app in minutes?"
            className="max-w-432 mx-auto mt-24 pt-1.5 md:mt-36 lg:mt-44 xl:mt-60 pb-16 lg:pb-22"
          />
          <NewFooter className="mx-auto max-w-432 border-t border-white/10 lg:px-8" />
        </div>
      </main>
    </Layout>
  );
}
