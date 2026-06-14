import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

import CTA from "@/components/home/cta";
import Features from "@/components/home/features";
import Hero from "@/components/home/hero";
import LovedByDevelopers from "@/components/home/loved-by-developers";
import Templates from "@/components/home/templates";
import NewFooter from "@/components/theme/footer";
import { siteUrlFromConfig } from "@/lib/site-url";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);

  return (
    <Layout
      title="Databricks Developer"
      description="Build and deploy data apps and AI agents on Databricks."
      noFooter
      wrapperClassName="home-layout"
    >
      <Head>
        <link rel="canonical" href={siteUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Databricks",
            url: siteUrl,
            logo: `${siteUrl}/img/databricks-logo.svg`,
            sameAs: ["https://www.linkedin.com/company/databricks"],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Databricks Developer",
            url: siteUrl,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Databricks Developer",
            description:
              "Build and deploy data apps and AI agents on Databricks.",
            url: siteUrl,
          })}
        </script>
      </Head>
      <main>
        <Hero />
        <Templates />
        {/* <Features /> */}
        <div className="bg-linear-to-b from-[#1A2E2F] from-65% to-[#2A4647]">
          <LovedByDevelopers />
          <CTA
            className="max-w-432 mx-auto mt-18 pt-1.5 md:mt-24 lg:mt-32 xl:mt-38 pb-16 lg:pb-22"
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
