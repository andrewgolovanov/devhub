import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

import CTA from "@/components/home/cta";
import { Features } from "@/components/products/features";
import { Hero } from "@/components/products/hero";
import { TestimonialsSlider } from "@/components/products/testimonials-slider";
import { UseCases } from "@/components/products/use-cases";
import NewFooter from "@/components/theme/footer";
import { databricksAppsProduct } from "@/lib/products/databricks-apps";
import { siteUrlFromConfig } from "@/lib/site-url";

export default function DatabricksAppsProductPage(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const siteUrl = siteUrlFromConfig(siteConfig.url, siteConfig.baseUrl);
  const pageUrl = `${siteUrl}${databricksAppsProduct.canonicalPath}`;

  return (
    <Layout
      title={databricksAppsProduct.title}
      description={databricksAppsProduct.description}
      noFooter
      wrapperClassName="product-databricks-apps-layout"
    >
      <Head>
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: databricksAppsProduct.title,
            description: databricksAppsProduct.description,
            url: pageUrl,
            brand: {
              "@type": "Brand",
              name: "Databricks",
            },
          })}
        </script>
      </Head>
      <main>
        <Hero content={databricksAppsProduct} />
        <div className="h-8 bg-orange md:h-14" aria-hidden="true" />
        <Features content={databricksAppsProduct} />
        <div className="h-8 bg-orange md:h-14" aria-hidden="true" />
        <UseCases content={databricksAppsProduct} />
        <TestimonialsSlider content={databricksAppsProduct} />
        <div className="flow-root bg-db-navy">
          <CTA className="mx-auto mt-18 max-w-432 pt-1.5 pb-16 md:mt-24 lg:mt-32 lg:pb-22 xl:mt-38" />
          <NewFooter className="mx-auto max-w-432 border-t border-white/10 lg:px-8" />
        </div>
      </main>
    </Layout>
  );
}
