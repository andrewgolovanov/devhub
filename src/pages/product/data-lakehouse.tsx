import Head from "@docusaurus/Head";
import { Redirect } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import type { ReactNode } from "react";

export default function LakebaseLegacyProductPage(): ReactNode {
  const target = useBaseUrl("/product/lakebase");

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
        <link rel="canonical" href={target} />
      </Head>
      <Redirect to={target} />
    </>
  );
}
