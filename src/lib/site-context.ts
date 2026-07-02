import {
  resolveSiteBaseUrl,
  resolveSiteOrigin,
  siteUrlFromConfig,
} from "@/lib/site-url";

export function useSiteContext() {
  const url = resolveSiteOrigin();
  const baseUrl = resolveSiteBaseUrl();
  return {
    siteConfig: {
      title: "Databricks Developer",
      tagline:
        "Build intelligent data and AI applications in minutes, not months",
      url,
      baseUrl,
      customFields: {
        showDrafts: process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true",
        hackathonEventSlug: process.env.NEXT_PUBLIC_HACKATHON_EVENT_SLUG,
        showAllResources:
          process.env.NEXT_PUBLIC_HACKATHON_SHOW_ALL_RESOURCES !== "false",
      },
    },
    siteMetadata: {
      siteUrl: siteUrlFromConfig(url, baseUrl),
    },
  };
}
