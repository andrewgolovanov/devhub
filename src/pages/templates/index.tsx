import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

import { Hero } from "@/components/templates/hero";
import { TemplatesIndexContent } from "@/components/templates/templates-index-content";
import { siteUrlFromConfig } from "@/lib/site-url";
import CTA from "@site/src/components/home-new/cta";
import NewFooter from "@site/src/components/theme/footer";

export default function TemplatesPage(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  const pageUrl = `${siteUrl}/templates`;

  return (
    <Layout
      title="Templates"
      description="Templates to jumpstart your next Databricks app"
      noFooter
    >
      <Head>
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Databricks Templates",
            description: "Templates to jumpstart your next Databricks app.",
            url: pageUrl,
          })}
        </script>
      </Head>
      <main className="bg-black text-white">
        <Hero />

        <div className="bg-[#f9f7f4] text-black">
          <div className="h-12 bg-orange" aria-hidden="true" />
          <TemplatesIndexContent />
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
