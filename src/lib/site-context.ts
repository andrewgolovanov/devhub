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
      },
    },
    siteMetadata: {
      siteUrl: url,
    },
  };
}
