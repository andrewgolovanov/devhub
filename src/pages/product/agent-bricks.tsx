import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

import CTA from "@/components/home-new/cta";
import { Features } from "@/components/products/features";
import { Hero } from "@/components/products/hero";
import { TestimonialsSlider } from "@/components/products/testimonials-slider";
import { UseCases } from "@/components/products/use-cases";
import NewFooter from "@/components/theme/footer";
import { agentBricksProduct } from "@/lib/products/agent-bricks";
import { siteUrlFromConfig } from "@/lib/site-url";

export default function AgentBricksProductPage(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  const pageUrl = `${siteUrl}${agentBricksProduct.canonicalPath}`;

  return (
    <Layout
      title={agentBricksProduct.title}
      description={agentBricksProduct.description}
      noFooter
      wrapperClassName="product-agent-bricks-layout"
    >
      <Head>
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: agentBricksProduct.title,
            description: agentBricksProduct.description,
            url: pageUrl,
            brand: {
              "@type": "Brand",
              name: "Databricks",
            },
          })}
        </script>
      </Head>
      <main>
        <Hero content={agentBricksProduct} />
        <div className="h-8 bg-orange md:h-14" aria-hidden="true" />
        <Features content={agentBricksProduct} />
        <div className="h-8 bg-orange md:h-14" aria-hidden="true" />
        <UseCases content={agentBricksProduct} />
        <TestimonialsSlider content={agentBricksProduct} />
        <div className="flow-root bg-db-navy">
          <CTA className="mx-auto mt-18 max-w-432 pb-16 md:mt-24 lg:mt-32 lg:pb-22 xl:mt-38" />
          <NewFooter className="mx-auto max-w-432 border-t border-white/10 lg:px-8" />
        </div>
      </main>
    </Layout>
  );
}
