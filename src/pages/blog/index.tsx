import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";
import {
  BlogIndexContent,
  useBlogRssUrl,
} from "@/components/blog/blog-index-content";
import { siteUrlFromConfig } from "@/lib/site-url";

export default function BlogPage(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  const { rssUrl } = useBlogRssUrl();

  return (
    <Layout
      title="Blog"
      description="Developer-first guides for building on Databricks."
      noFooter
    >
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Databricks Developer Blog RSS Feed"
          href={rssUrl}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Databricks Developer Blog",
            url: `${siteUrl}/blog`,
            description: "Developer-first guides for building on Databricks.",
          })}
        </script>
      </Head>

      <BlogIndexContent />
    </Layout>
  );
}
