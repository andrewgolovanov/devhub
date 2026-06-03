import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function BrandStrip({
  className,
  ...props
}: ComponentProps<"div">): ReactNode {
  return (
    <div
      className={cn("h-[3.4375rem] w-full bg-orange", className)}
      aria-hidden="true"
      {...props}
    />
  );
}
