import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { Redirect } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

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
      <main className="border-t border-db-cyan/30 bg-db-bg dark:border-db-cyan/25 dark:bg-[#0d1a1f]">
        <section className="container px-4 pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-medium tracking-tight text-black dark:text-white md:text-4xl">
              No active hackathon right now
            </h1>
            <p className="mb-8 text-base text-black/68 dark:text-white/68">
              There isn&rsquo;t a hackathon running at the moment. In the
              meantime, explore templates to jumpstart your next Databricks app.
            </p>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 rounded-full bg-db-lava px-5 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-db-lava/90"
            >
              Browse templates
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
