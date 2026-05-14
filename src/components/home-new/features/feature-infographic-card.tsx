import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function FeatureInfographicCard({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border border-[#D4D2CF] bg-white shadow-[0_24px_56px_rgb(4_4_6/0.08)]",
        className,
      )}
      {...props}
    />
  );
}
