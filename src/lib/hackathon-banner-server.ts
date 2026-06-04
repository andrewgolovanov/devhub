/**
 * Server-side resolution of the site-wide hackathon banner.
 *
 * The banner is purely env-driven (strict string matching, like the `showDrafts`
 * flag — no implicit dev/CI handling and no date windows):
 *
 *   - `HACKATHON_BANNER_ENABLED="true"` → banner on. Any other value (including
 *     unset) → off.
 *   - `HACKATHON_EVENT_SLUG` → which event the banner points at. The link
 *     targets `/hackathon/<slug>`; with no slug it falls back to `/hackathon`,
 *     which itself redirects to the active event.
 *   - `HACKATHON_BANNER_TEXT` → optional override of the lead-in copy. The "See
 *     resources" link is always appended so a misconfigured override can never
 *     strand visitors on a banner with no way in.
 *
 * The resolver is a pure function so it can be unit-tested with synthetic envs.
 * The config builder is the thin imperative shell consumed by
 * `docusaurus.config.ts` at build time.
 */

type HackathonBannerEnv = {
  HACKATHON_BANNER_ENABLED?: string;
  HACKATHON_BANNER_TEXT?: string;
  HACKATHON_EVENT_SLUG?: string;
};

type HackathonBannerConfig = {
  id: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  isCloseable: boolean;
};

export function resolveHackathonBannerActive(env: HackathonBannerEnv): boolean {
  return env.HACKATHON_BANNER_ENABLED === "true";
}

const DEFAULT_BANNER_LEAD_TEXT = "Databricks Developer Hackathon is live.";

function bannerLinkHtml(slug: string): string {
  const target = slug ? `/hackathon/${slug}` : "/hackathon";
  return `<a href="${target}"><b>See resources &rarr;</b></a>`;
}

export function getHackathonBannerConfig(
  env: HackathonBannerEnv = process.env as HackathonBannerEnv,
): HackathonBannerConfig | undefined {
  if (!resolveHackathonBannerActive(env)) return undefined;
  const slug = (env.HACKATHON_EVENT_SLUG ?? "").trim();
  const leadText = (
    env.HACKATHON_BANNER_TEXT ?? DEFAULT_BANNER_LEAD_TEXT
  ).trim();
  return {
    // Non-dismissible by design: the banner is the only on-site entry point to
    // the event during its window, so we don't want visitors to close it and
    // lose the way in. `id` is namespaced per event so any future re-enabling
    // of dismissals resets cleanly between events.
    id: `hackathon-${slug || "event"}`,
    // HACKATHON_BANNER_TEXT overrides only the lead-in copy; the "See
    // resources" link is always appended so visitors can never end up on a
    // banner with no way to reach the event.
    content: `${leadText} ${bannerLinkHtml(slug)}`,
    backgroundColor: "var(--db-lava)",
    textColor: "#ffffff",
    isCloseable: false,
  };
}
