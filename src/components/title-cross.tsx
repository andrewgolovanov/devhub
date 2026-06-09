import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

export function TitleCross({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute hidden size-4 text-grey-60 md:block",
        className,
      )}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8 8V0M8 8H0M8 8H16M8 8V16" stroke="currentColor" />
    </svg>
  );
}
