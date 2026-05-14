import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, Code2, Lock } from "lucide-react";
import type { ComponentProps } from "react";

function TimelineStep({ children, className }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid size-7 place-items-center border border-[#D4D2CF] bg-white font-mono text-[11px] shadow-[0_18px_40px_rgb(4_4_6/0.07)] md:aspect-square md:size-9.5 @md/infographic:text-base",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FeatureInfographicCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border border-[#D4D2CF] bg-white shadow-[0_10px_20px_0_rgba(0,0,0,.06)]",
        className,
      )}
      {...props}
    />
  );
}

export function AgentBricksInfographic() {
  return (
    <div className="@container/infographic px-4 pt-22 pb-23 font-sans text-black max-w-lg mx-auto my-auto">
      <div className="grid grid-cols-[2.375rem_1fr] gap-x-10 pb-5">
        <div className="">
          <TimelineStep>01</TimelineStep>
        </div>
        <FeatureInfographicCard className="shrink-0 p-2 @md/infographic:p-3">
          <div className="flex items-start gap-2.5 @md/infographic:gap-3">
            <div className="size-6 shrink-0 bg-[linear-gradient(135deg,#232323,#666)] @md/infographic:size-9" />
            <div>
              <div className="text-[10px] leading-tight font-medium @md/infographic:text-sm">
                Israel Grant
              </div>
              <div className="text-[8px] leading-tight text-black/60 @md/infographic:text-[11px]">
                grant@hotmail.com
              </div>
            </div>
            <div className="ml-auto text-[7px] whitespace-nowrap text-black/70 @md/infographic:text-[11px]">
              Today · 11:56 AM
            </div>
          </div>
          <p className="mt-1.5 max-w-[344px] text-[9px] leading-snug @md/infographic:mt-3 @md/infographic:max-w-[346px] @md/infographic:text-sm">
            Analyze sales data and forecast based on trends, history, and market
            indicators.
          </p>
        </FeatureInfographicCard>
      </div>

      <div className="grid grid-cols-[2.375rem_1fr] gap-x-10 pb-5">
        <TimelineStep>02</TimelineStep>
        <FeatureInfographicCard className="shrink-0 p-2 @md/infographic:p-3">
          <div className="flex items-start">
            <div className="grid size-6 shrink-0 grid-cols-2 gap-0.5 border border-[#D4D2CF]/60 bg-white p-1 @md/infographic:size-9 @md/infographic:gap-1 @md/infographic:p-1.5">
              <span className="bg-[#FF5F46]" />
              <span className="bg-[#FFB2A6]" />
              <span className="bg-[#FF5F46]" />
              <span className="bg-[#E7E5E1]" />
            </div>
            <h4 className="mt-1.5 ml-2 text-[11px] leading-[1.15] font-medium @md/infographic:mt-2.5 @md/infographic:ml-4 @md/infographic:text-[15px]">
              Agent Bricks
            </h4>
            <Badge className="ml-auto gap-1 rounded-full border border-[#78DDBB] bg-white px-1.5 py-0.5 text-[8px] font-normal text-black @md/infographic:gap-1.5 @md/infographic:px-3 @md/infographic:py-1 @md/infographic:text-[11px]">
              <Lock
                className="size-2.5 text-[#00A972] @md/infographic:size-3.5"
                aria-hidden="true"
              />
              Secure
            </Badge>
          </div>
          <div className="mt-2 flex flex-col gap-1 text-[8.5px] leading-tight text-black/65 @md/infographic:mt-4 @md/infographic:gap-2 @md/infographic:text-[13px]">
            <div className="flex items-start gap-2">
              <Check
                className="mt-px size-2.5 shrink-0 @md/infographic:size-3"
                strokeWidth={1.5}
              />
              <span>Selecting best-fit LLM</span>
            </div>
            <div className="flex items-start gap-2">
              <Check
                className="mt-px size-2.5 shrink-0 @md/infographic:size-3"
                strokeWidth={1.5}
              />
              <div className="flex flex-col gap-1 @md/infographic:gap-1.5">
                <span>Loading data</span>
                <span className="text-black">
                  <span className="mr-2 inline-block size-1.5 bg-[#FF5F46]" />
                  Lakehouse{" "}
                  <span className="text-black/60">(sales_fact_table)</span>
                </span>
                <span className="text-black">
                  <span className="mr-2 inline-block size-1.5 bg-[#FF5F46]" />
                  SQL Warehouse <span className="text-black/60">(KPIs)</span>
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Check
                className="mt-px size-2.5 shrink-0 @md/infographic:size-3"
                strokeWidth={1.5}
              />
              <div className="flex flex-col gap-1 @md/infographic:gap-1.5">
                <span>Running tools</span>
                <span className="text-black">
                  <span className="mr-2 inline-block size-1.5 bg-[#FF5F46]" />
                  Python analytics{" "}
                  <span className="text-black/60">(trends, anomalies)</span>
                </span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Check
                className="mt-px size-2.5 shrink-0 @md/infographic:size-3"
                strokeWidth={1.5}
              />
              <span>Generating output</span>
            </div>
          </div>
        </FeatureInfographicCard>
      </div>

      <div className="grid grid-cols-[2.375rem_1fr] gap-x-10">
        <TimelineStep>03</TimelineStep>
        <FeatureInfographicCard className="shrink-0 overflow-hidden">
          <div className="flex h-7 items-center gap-2 border-b border-[#D4D2CF] bg-[#F2F0ED] px-3 @md/infographic:h-11 @md/infographic:gap-3 @md/infographic:px-4">
            <Code2
              className="size-4 @md/infographic:size-5"
              aria-hidden="true"
            />
            <span className="text-xs font-medium @md/infographic:text-[15px]">
              Python
            </span>
          </div>
          <pre className="m-0 whitespace-pre-wrap p-2 font-mono text-[6px] leading-relaxed @md/infographic:p-3 @md/infographic:text-[11px]">
            <span className="text-black/45">output</span>{" "}
            <span className="text-[#00A972]">=</span>{" "}
            <span className="text-[#FF5F46]">{"{"}</span>
            {"\n  "}
            "forecast"
            <span className="text-[#FF5F46]">:</span> "+13% (10-17%)",
            {"\n  "}
            "drivers"
            <span className="text-[#FF5F46]">:</span>{" "}
            <span className="text-[#FF5F46]">[</span>"demand", "history",
            "market"
            <span className="text-[#FF5F46]">]</span>,{"\n  "}
            "actions"
            <span className="text-[#FF5F46]">:</span>{" "}
            <span className="text-[#FF5F46]">[</span>"scale SKUs", "optimize
            pricing"<span className="text-[#FF5F46]">]</span>
            {"\n"}
            <span className="text-[#FF5F46]">{"}"}</span>
          </pre>
        </FeatureInfographicCard>
      </div>
    </div>
  );
}
