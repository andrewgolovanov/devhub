import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { Redirect } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

import NewFooter from "@/components/theme/footer";
import { Button } from "@/components/ui/button";

/**
 * `/hackathon` redirects to the active event named by the `HACKATHON_EVENT_SLUG`
 * env var (exposed via `customFields` in `docusaurus.config.ts`). Each event
 * lives at `/hackathon/<slug>`. When no slug is configured, a minimal,
 * non-indexed placeholder is shown instead of redirecting nowhere.
 *
 * The client-side `<Redirect>` handles SPA navigation; the `<meta refresh>`
 * covers no-JS visitors. The page is `noindex` either way.
 */

export default function HackathonIndex(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const fields = siteConfig.customFields as Record<string, unknown>;
  const slug = (
    typeof fields.hackathonEventSlug === "string"
      ? fields.hackathonEventSlug
      : ""
  ).trim();
  const target = useBaseUrl(`/hackathon/${slug}`);

  if (slug) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex, nofollow" />
          <meta httpEquiv="refresh" content={`0; url=${target}`} />
        </Head>
        <Redirect to={target} />
      </>
    );
  }

  return (
    <Layout title="Hackathon" description="Databricks developer hackathons.">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="bg-black text-white">
        <section className="mx-auto flex min-h-[60vh] w-full max-w-400 flex-col items-center justify-center gap-8 px-5 py-24 text-center md:px-8 md:py-32">
          <div className="flex flex-col items-center gap-5">
            <h1 className="font-sans text-3xl/[1.125] font-normal tracking-normal text-balance text-white md:text-5xl/[1.125] md:whitespace-nowrap">
              No active hackathon right now
            </h1>
            <p className="max-w-md text-base leading-tight tracking-normal text-grey-80 md:text-lg">
              There isn&rsquo;t a hackathon running at the moment. In the
              meantime, explore templates to jumpstart your next Databricks app.
            </p>
          </div>
          <Button
            asChild
            variant="orange"
            size="xl"
            className="font-mono text-base leading-none font-medium tracking-tight text-black uppercase shadow-none"
          >
            <Link to="/templates" className="no-underline hover:no-underline">
              Browse templates
            </Link>
          </Button>
        </section>
        <NewFooter className="mx-auto max-w-432 border-t border-white/10 lg:px-8" />
      </main>
    </Layout>
  );
}
