import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function BrandStrip({
  className,
  ...props
}: ComponentProps<"div">): ReactNode {
  return (
    <div
      className={cn("bg-orange h-8 w-full md:h-14", className)}
      aria-hidden="true"
      {...props}
    />
  );
}
