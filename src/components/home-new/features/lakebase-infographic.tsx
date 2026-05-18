import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Database } from "lucide-react";

import { FeatureInfographicCard } from "@/components/ui/feature-card";

const autoScaleGraphSrc = "/img/home-new/features/auto-scale-compute.jpg";

function DatabaseGlyph({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-block size-2.5 rounded-[50%] border border-current before:absolute before:top-[3px] before:left-0 before:h-1 before:w-full before:border-t before:border-current after:absolute after:top-1.5 after:left-0 after:h-1 after:w-full after:border-t after:border-current @md/infographic:size-3",
        className,
      )}
      aria-hidden="true"
    />
  );
}

export function LakebaseInfographic() {
  return (
    <div className="@container/infographic flex min-h-[430px] w-full flex-col items-center px-3 pt-4 font-sans text-black md:aspect-square md:min-h-0 md:px-0 md:pt-[8.2%]">
      <FeatureInfographicCard className="flex h-9 w-56 shrink-0 items-center gap-2 px-3 md:h-[9.08%] md:w-[35.556%] @md/infographic:gap-2.5 @md/infographic:px-3">
        <div className="grid size-6 shrink-0 place-items-center border border-[#D4D2CF]/50 @md/infographic:size-8">
          <Database
            className="size-3.5 @md/infographic:size-5"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </div>
        <div className="min-w-0">
          <div className="text-[11px] leading-tight font-medium whitespace-nowrap @md/infographic:text-sm">
            Managed Postgres
          </div>
          <div className="text-[9px] leading-tight whitespace-nowrap text-black/60 @md/infographic:text-[11px]">
            Colocated with your Lakehouse
          </div>
        </div>
      </FeatureInfographicCard>

      <div className="border-l border-dashed border-black" />
      <div className="grid w-[70%] grid-cols-[1fr_auto_1fr] grid-rows-[auto_1fr] md:w-[66.1%]">
        <div className="col-span-3 row-start-1 border-t border-dashed border-black" />
        <div className="col-start-1 row-span-2 row-start-1 border-l border-dashed border-black" />
        <div className="col-start-2 row-span-2 row-start-1 border-l border-dashed border-black" />
        <div className="col-start-3 row-span-2 row-start-1 justify-self-end border-l border-dashed border-black" />
      </div>

      <FeatureInfographicCard className="relative w-[82%] max-w-[426px] shrink-0 p-2.5 md:w-[44.444%] md:max-w-none @md/infographic:p-5">
        <h4 className="m-0 text-xs leading-[1.15] font-medium @md/infographic:text-[15px]">
          Instant branching
        </h4>
        <div className="mt-2 flex justify-center @md/infographic:mt-4">
          <FeatureInfographicCard className="w-[60%] min-w-40 p-2 shadow-none @md/infographic:w-[212px] @md/infographic:p-2.5">
            <div className="flex items-center justify-between text-[9px] @md/infographic:text-[11px]">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <DatabaseGlyph className="text-black/70" />
                main
              </span>
              <Badge className="rounded-full border-0 bg-[#DDF5ED] px-2 py-1 text-[9px] font-normal text-[#00A972] @md/infographic:text-[10px]">
                production
              </Badge>
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-[9px] whitespace-nowrap text-black/60 @md/infographic:mt-3 @md/infographic:text-[11px]">
              <span>Size: 120 GB</span>
              <span>/</span>
              <span>Tables: 240</span>
            </div>
          </FeatureInfographicCard>
        </div>
        <div className="mx-auto h-[8%] w-px bg-[#B9B8B5]" />
        <div className="mx-auto h-[9%] w-1/2 rounded-t-md border-t border-r border-l border-[#B9B8B5]" />
        <div className="grid grid-cols-2 gap-[10%]">
          {["dev", "staging"].map((branch) => (
            <FeatureInfographicCard
              key={branch}
              className="p-2 shadow-none @md/infographic:p-2.5"
            >
              <div className="flex items-center justify-between text-[9px] @md/infographic:text-[11px]">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <DatabaseGlyph className="text-black/70" />
                  {branch}
                </span>
                <Badge className="rounded-full border-0 bg-[#F2F0ED] px-2 py-1 text-[9px] font-normal text-black @md/infographic:text-[10px]">
                  branch
                </Badge>
              </div>
              <div className="mt-2 text-[9px] text-black/60 @md/infographic:mt-3 @md/infographic:text-[11px]">
                Size: 120 GB
              </div>
            </FeatureInfographicCard>
          ))}
        </div>
      </FeatureInfographicCard>

      <div className="mt-2 grid w-full grid-cols-2 gap-2 md:mt-[6.5%] md:h-[29.63%] md:w-[93.333%] md:gap-[4.444%] @md/infographic:gap-[4.444%]">
        <FeatureInfographicCard className="flex h-32 flex-col p-2 md:h-full @md/infographic:p-3">
          <div className="flex items-start justify-between gap-2">
            <h4 className="m-0 max-w-24 text-[11px] leading-[1.05] font-medium @md/infographic:max-w-32 @md/infographic:text-[15px]">
              Auto-scale compute
            </h4>
            <p className="m-0 text-[8px] leading-tight text-black/70 @md/infographic:text-[11px]">
              Currect load: <span className="font-medium text-black">23%</span>
            </p>
          </div>
          <img
            src={autoScaleGraphSrc}
            alt=""
            className="mt-1 block min-h-0 flex-1 object-contain object-bottom @md/infographic:mt-3"
            width={565}
            height={259}
            loading="lazy"
            decoding="async"
          />
        </FeatureInfographicCard>

        <FeatureInfographicCard className="flex h-32 flex-col overflow-hidden p-2 md:h-full @md/infographic:p-3">
          <h4 className="m-0 text-[11px] leading-[1.15] font-medium @md/infographic:text-[15px]">
            Database change log
          </h4>
          <div className="mt-2 grid grid-cols-[0.9fr_1.15fr_1.35fr_1fr] bg-[#F7F5F2] px-1.5 py-1 text-[6px] leading-none text-black/55 uppercase @md/infographic:mt-5 @md/infographic:px-2.5 @md/infographic:py-2 @md/infographic:text-[9px]">
            <span>Time</span>
            <span>Operation</span>
            <span>Entity</span>
            <span>Change</span>
          </div>
          <div className="min-h-0 flex-1">
            {[
              ["10:01", "insert", "order #101", "created"],
              ["10:02", "update", "customer #4", "paid"],
              ["10:03", "delete", "order #102", "removed"],
            ].map(([time, operation, entity, change]) => (
              <div
                key={time}
                className="grid grid-cols-[0.9fr_1.15fr_1.35fr_1fr] border-b border-[#ECEBE8] px-1.5 py-1 font-mono text-[7px] leading-none @md/infographic:px-2.5 @md/infographic:py-2.5 @md/infographic:text-[10px]"
              >
                <span>{time}</span>
                <span>
                  <span
                    className={cn(
                      "rounded px-1 py-0.5 @md/infographic:px-1.5 @md/infographic:py-1",
                      operation === "insert" && "bg-[#DDF5ED] text-[#00A972]",
                      operation === "update" && "bg-[#FFE3DE] text-[#FF5F46]",
                      operation === "delete" && "bg-[#ECEBE8] text-black/70",
                    )}
                  >
                    {operation}
                  </span>
                </span>
                <span>{entity}</span>
                <span>{change}</span>
              </div>
            ))}
          </div>
        </FeatureInfographicCard>
      </div>
    </div>
  );
}
