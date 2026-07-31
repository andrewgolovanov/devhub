/**
 * Server-side resolution of the reusable site announcement banner.
 *
 * Campaign content and timing are env-driven (strict string matching, like the
 * hackathon banner — no date windows, so the banner server-renders and never
 * shifts layout after hydration):
 *
 *   - `SITE_BANNER_ENABLED="true"` → banner on. Any other value (including
 *     unset) → off.
 *   - `SITE_BANNER_TEXT` / `SITE_BANNER_LINK` / `SITE_BANNER_LINK_TEXT` —
 *     required. No defaults; incomplete content keeps the banner off.
 *
 * Turning the banner on or off is a redeploy, which is the tradeoff for
 * shipping it in the initial HTML.
 *
 * The resolvers are pure functions so they can be unit-tested with synthetic
 * envs. The config builder is the thin imperative shell.
 */

type SiteBannerEnv = {
  SITE_BANNER_ENABLED?: string;
  SITE_BANNER_TEXT?: string;
  SITE_BANNER_LINK?: string;
  SITE_BANNER_LINK_TEXT?: string;
};

type SiteBannerConfig = {
  id: string;
  content: string;
  backgroundColor: string;
  textColor: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isSafeHref(href: string): boolean {
  // `//host` is protocol-relative and browsers read `/\host` the same way, so
  // neither is an internal path and neither may pass the leading-slash check.
  return (
    (href.startsWith("/") && !/^\/[/\\]/.test(href)) ||
    href.startsWith("https://") ||
    href.startsWith("http://")
  );
}

function isExternalHref(href: string): boolean {
  return href.startsWith("https://") || href.startsWith("http://");
}

export function resolveSiteBannerActive(env: SiteBannerEnv): boolean {
  return env.SITE_BANNER_ENABLED === "true";
}

export function resolveSiteBannerContent(env: SiteBannerEnv):
  | {
      text: string;
      link: string;
      linkText: string;
    }
  | undefined {
  const text = (env.SITE_BANNER_TEXT ?? "").trim();
  const link = (env.SITE_BANNER_LINK ?? "").trim();
  const linkText = (env.SITE_BANNER_LINK_TEXT ?? "").trim();
  if (!text || !link || !linkText) return undefined;
  if (!isSafeHref(link)) return undefined;
  return { text, link, linkText };
}

function bannerCtaHtml(
  href: string,
  linkText: string,
  isExternal: boolean,
): string {
  const externalAttributes = isExternal
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
  return `<a href="${escapeHtml(href)}"${externalAttributes}><span class="banner-link-text">${escapeHtml(linkText)}</span></a>`;
}

/** Returns banner config when the banner is enabled and its content is complete. */
export function getSiteBannerConfig(
  env: SiteBannerEnv = process.env as SiteBannerEnv,
): SiteBannerConfig | undefined {
  if (!resolveSiteBannerActive(env)) return undefined;

  const content = resolveSiteBannerContent(env);
  if (!content) return undefined;

  return {
    // Non-dismissible by design, matching the hackathon banner: the campaign
    // window is controlled by deploys, not by the visitor.
    id: "site-banner",
    // Only the CTA is clickable; the surrounding bar is not a link target.
    content: `<span class="banner-lead-text">${content.text}</span>${bannerCtaHtml(content.link, content.linkText, isExternalHref(content.link))}`,
    backgroundColor: "#FF5F46",
    textColor: "#040406",
  };
}
