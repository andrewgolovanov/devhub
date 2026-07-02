import type { ReactNode } from "react";

import { HeadingCopyButton } from "@/components/content/heading-copy-button";

export function Heading({
  children,
  depth,
  id,
  isProse,
  showAnchor,
}: {
  children: ReactNode;
  depth: number;
  id: string;
  isProse: boolean;
  showAnchor: boolean;
}): ReactNode {
  const Component =
    isProse && depth === 1
      ? "h1"
      : depth === 2
        ? "h2"
        : depth === 3
          ? "h3"
          : "h4";
  const showHeadingAnchor = showAnchor && depth > 1 && depth <= 3;

  if (isProse) {
    return (
      <Component
        className={
          showHeadingAnchor
            ? "group/content-heading !w-fit scroll-mt-8 text-pretty"
            : undefined
        }
        id={id}
      >
        {children}
        {showHeadingAnchor ? (
          <span className="inline-flex min-w-4 shrink-0 lg:min-w-14">
            <HeadingCopyButton id={id} />
          </span>
        ) : null}
      </Component>
    );
  }

  return (
    <Component
      className="mt-10 scroll-mt-28 text-2xl leading-tight font-medium tracking-normal text-white first:mt-0"
      id={id}
    >
      {children}
    </Component>
  );
}
