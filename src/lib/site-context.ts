import { resolveSiteUrl } from "@/lib/site-url";

export function useSiteContext() {
  const url = resolveSiteUrl();
  return {
    siteConfig: {
      title: "Databricks Developer",
      tagline:
        "Build intelligent data and AI applications in minutes, not months",
      url,
      customFields: {
        showDrafts: process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true",
        hackathonEventSlug: process.env.NEXT_PUBLIC_HACKATHON_EVENT_SLUG,
        showAllResources:
          process.env.NEXT_PUBLIC_HACKATHON_SHOW_ALL_RESOURCES !== "false",
      },
    },
    siteMetadata: {
      siteUrl: url,
    },
  };
}
