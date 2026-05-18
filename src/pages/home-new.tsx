import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

import CTA from "@/components/home-new/cta";
import Features from "@/components/home-new/features";
import Hero from "@/components/home-new/hero";
import LovedByDevelopers from "@/components/home-new/loved-by-developers";
import Templates from "@/components/home-new/templates";
import NewFooter from "@/components/theme/footer";
import { siteUrlFromConfig } from "@/lib/site-url";

export default function HomeNew(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  const pageUrl = `${siteUrl}/home-new`;

  return (
    <Layout
      title="Databricks Developer"
      description="Build and deploy data apps and AI agents on Databricks."
      noFooter
      wrapperClassName="home-new-layout"
    >
      <Head>
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Databricks Developer",
            description:
              "Build and deploy data apps and AI agents on Databricks.",
            url: pageUrl,
          })}
        </script>
      </Head>
      <main>
        <Hero />
        <Templates />
        <Features />
        <div className="bg-linear-to-b from-[#1A2E2F] from-35% to-[#2A4647]">
          <LovedByDevelopers />
          <CTA
            className="max-w-432 mx-auto mt-18 md:mt-24 lg:mt-32 xl:mt-38 pb-16 lg:pb-22"
            label="Start building"
            title="Ready to ship your next agentic app in minutes?"
            description="Start from Databricks templates, connect your data, and deploy with the tools your team already uses."
            actions={null}
          />
          <NewFooter className="mx-auto max-w-432 border-t border-white/10 lg:px-8" />
        </div>
      </main>
    </Layout>
  );
}
