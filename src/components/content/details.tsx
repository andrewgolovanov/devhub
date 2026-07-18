import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function Details({
  children,
  summary,
}: {
  children: ReactNode;
  summary: ReactNode;
}): ReactNode {
  return (
    <details className="not-prose group border-grey-30 my-6 border bg-transparent">
      <summary className="hover:text-grey-90 flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base leading-snug font-medium tracking-normal text-white outline-offset-4 transition-colors [&::-webkit-details-marker]:hidden">
        {summary}
        <ChevronDown
          aria-hidden="true"
          className="text-grey-70 size-5 shrink-0 transition-transform group-open:rotate-180"
          strokeWidth={2.5}
        />
      </summary>
      <div className="prose-inside-content my-5 px-5">{children}</div>
    </details>
  );
}
