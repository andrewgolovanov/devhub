import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function MarkdownProse({
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
        "prose max-w-none min-w-0 prose-clear-first-child",
        variant === "dark" ? "prose-dark" : null,
        className,
      )}
    >
      {children}
    </Component>
  );
}
