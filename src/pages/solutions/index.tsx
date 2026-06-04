import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";
import {
  SolutionIndexContent,
  useSolutionRssUrl,
} from "@/components/solutions/solution-index-content";
import { siteUrlFromConfig } from "@/lib/site-url";

export default function SolutionsPage(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  const { rssUrl } = useSolutionRssUrl();

  return (
    <Layout
      title="Solutions"
      description="Developer-first guides for building on Databricks."
      noFooter
    >
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Databricks Developer Solutions RSS Feed"
          href={rssUrl}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Databricks Developer Solutions",
            url: `${siteUrl}/solutions`,
            description: "Developer-first guides for building on Databricks.",
          })}
        </script>
      </Head>

      <SolutionIndexContent />
    </Layout>
  );
}
