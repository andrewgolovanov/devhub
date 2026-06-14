import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import type { CSSProperties, ReactNode } from "react";
import {
  getSolutionItemHref,
  isLinkedSolutionItem,
  type SolutionItem,
} from "@/lib/solutions/solutions";
import { cn } from "@/lib/utils";

export function SolutionArrowIcon({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}): ReactNode {
  return (
    <svg
      className={cn("overflow-visible", className)}
      viewBox="0 0 22.4029 34.097"
      fill="none"
      style={style}
      aria-hidden="true"
    >
      <path
        d="M20.2816 11.2015L11.2015 2.12132L2.12132 11.2015"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
      <path
        d="M11.2052 32.597V2.89849"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function formatSolutionDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function SolutionItemLink({
  className,
  item,
  ariaLabel,
  children,
}: {
  className: string;
  item: SolutionItem;
  ariaLabel?: string;
  children: ReactNode;
}): ReactNode {
  const href = getSolutionItemHref(item);

  if (isLinkedSolutionItem(item)) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={href} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function SolutionItemVisual({
  item,
  variant,
  width,
  height,
}: {
  item: SolutionItem;
  variant: "card" | "featured";
  width?: number;
  height?: number;
}): ReactNode {
  const imageUrl = useBaseUrl(item.previewImage ?? "");

  if (item.previewImage) {
    return (
      <img
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          variant === "card" &&
            "transition-transform duration-300 group-hover:scale-102",
        )}
        src={imageUrl}
        alt={item.previewImageAlt ?? ""}
        width={width}
        height={height}
        loading={variant === "card" ? "lazy" : "eager"}
      />
    );
  }

  if (variant === "featured") {
    return (
      <div className="absolute inset-0 bg-linear-to-b from-db-navy-light to-grey-40" />
    );
  }

  return <div className="absolute inset-0 bg-grey-20" />;
}
