import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Prose({
  children,
  variant = "default",
  as = "div",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "dark";
  as?: "article" | "div";
  className?: string;
}): ReactNode {
  const Component = as;

  return (
    <Component
      className={cn(
        "prose prose-clear-first-child max-w-none min-w-0",
        variant === "dark" ? "prose-dark" : null,
        className,
      )}
    >
      {children}
    </Component>
  );
}
