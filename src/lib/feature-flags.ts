import { useSiteContext } from "@/lib/site-context";

export function useFeatureFlags() {
  const { siteConfig } = useSiteContext();
  const fields = siteConfig.customFields as Record<string, unknown>;
  return {
    showDrafts: fields.showDrafts === true,
  };
}
