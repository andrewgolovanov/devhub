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
 * the app environment at build time.
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

const ARROW_SVG = `<svg class="banner-arrow" aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 8.01562H14.5" stroke="#040406" stroke-width="2" stroke-miterlimit="10"/><path d="M10 3.51562L14.5 8.01562L10 12.5156" stroke="#040406" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/></svg>`;

function bannerLinkHtml(slug: string, hidden = false): string {
  const target = slug ? `/hackathon/${slug}` : "/hackathon";
  const hiddenAttributes = hidden ? ' tabindex="-1" aria-hidden="true"' : "";
  return `<a href="${target}"${hiddenAttributes}><span class="banner-link-text">See resources</span>${ARROW_SVG}</a>`;
}

function bannerMarqueeItemHtml(
  leadText: string,
  slug: string,
  duplicate = false,
): string {
  const itemClasses = duplicate
    ? "banner-marquee-item banner-marquee-copy"
    : "banner-marquee-item";
  const hiddenAttributes = duplicate ? ' aria-hidden="true"' : "";
  return `<span class="${itemClasses}"${hiddenAttributes}><span class="banner-lead-text">${leadText}</span>${bannerLinkHtml(slug, duplicate)}</span>`;
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
    content: `<span class="banner-marquee-track">${bannerMarqueeItemHtml(leadText, slug)}${bannerMarqueeItemHtml(leadText, slug, true)}</span>`,
    backgroundColor: "#FF5F46",
    textColor: "#040406",
    isCloseable: false,
  };
}
