import { Sparkles } from "lucide-react";

import { FeatureInfographicCard } from "@/components/ui/feature-card";

export function DatabricksAppsInfographic() {
  return (
    <div className="@container/infographic flex min-h-[360px] w-full flex-col items-center bg-white px-5 py-6 font-sans text-black md:aspect-square md:min-h-0 md:px-0 md:py-0 md:pt-[8.889%]">
      <FeatureInfographicCard className="w-[70%] max-w-[358px] p-3 font-mono text-[10px] leading-relaxed md:h-[18.44%] md:w-[37.5%] md:max-w-none @md/infographic:p-3 @md/infographic:text-xs @md/infographic:leading-4">
        <div className="text-black">$ dbx deploy</div>
        <div className="mt-4 text-black/45">Connecting to workspace...</div>
        <div className="text-black/45">Uploading app...</div>
        <div className="text-black/45">
          Linking data sources... <span className="text-black">█</span>
        </div>
      </FeatureInfographicCard>
      <div className="h-[8%] border-l border-dashed border-black md:h-[9.75%]" />
      <div className="flex h-7 w-32 shrink-0 items-center justify-center gap-1.5 border border-[#F3F1ED] bg-white text-[11px] font-medium shadow-[0_18px_40px_rgb(4_4_6/0.07)] md:h-[4.88%] md:w-[15.972%] @md/infographic:gap-2 @md/infographic:text-sm">
        <Sparkles
          className="size-4 fill-[#FF5F46] text-[#FF5F46] @md/infographic:size-5"
          aria-hidden="true"
        />
        Deploying...
      </div>
      <div className="h-[8%] border-l border-dashed border-black md:h-[9.75%]" />

      <FeatureInfographicCard className="h-[42%] min-h-40 w-[86%] max-w-[539px] overflow-hidden md:h-[47.4%] md:min-h-0 md:w-[71.111%] md:max-w-none">
        <div className="flex h-[10.8%] min-h-6 items-center border-b border-[#D4D2CF] bg-[#F2F0ED] px-3 @md/infographic:px-4">
          <span className="mr-1.5 size-2.5 rounded-full bg-[#FF5F46] @md/infographic:mr-2 @md/infographic:size-3" />
          <span className="mr-1.5 size-2.5 rounded-full bg-[#D4D2CF] @md/infographic:mr-2 @md/infographic:size-3" />
          <span className="mr-auto size-2.5 rounded-full bg-[#00A972] @md/infographic:size-3" />
          <span className="flex h-[72%] w-[44%] items-center justify-center bg-white text-[8px] text-black/70 @md/infographic:text-[11px]">
            https://app.databricks.com/my-app
          </span>
        </div>
        <div className="flex h-[89.2%] flex-col bg-white px-5 py-4 @md/infographic:px-7 @md/infographic:py-5">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2 @md/infographic:gap-3">
              <div className="h-2.5 w-28 rounded-full bg-[#E8E6E3] @md/infographic:h-3 @md/infographic:w-[172px]" />
              <div className="h-2 w-20 rounded-full bg-[#E8E6E3] @md/infographic:h-2.5 @md/infographic:w-[116px]" />
            </div>
            <div className="flex items-start gap-4 @md/infographic:gap-5">
              <div className="mt-1.5 h-2 w-12 rounded-full bg-[#E8E6E3] @md/infographic:mt-2 @md/infographic:h-2.5 @md/infographic:w-[72px]" />
              <div className="size-8 rounded-full bg-[#E8E6E3] @md/infographic:size-9" />
            </div>
          </div>
          <div className="mt-auto grid h-[62%] grid-cols-2 gap-4 @md/infographic:gap-5">
            <div className="border border-[#D4D2CF] bg-[#F7F6F4]">
              <div className="mt-4 ml-4 h-2 w-[30%] rounded-full bg-[#E2E0DD] @md/infographic:h-2.5" />
            </div>
            <div className="border border-[#D4D2CF] bg-[#F7F6F4]">
              <div className="mt-4 ml-4 h-2 w-[30%] rounded-full bg-[#E2E0DD] @md/infographic:h-2.5" />
            </div>
          </div>
        </div>
      </FeatureInfographicCard>
    </div>
  );
}
