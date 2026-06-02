import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import type { CSSProperties, ReactNode } from "react";
import type { BlogPost } from "@/lib/blog/blog-posts";
import { cn } from "@/lib/utils";

export function ArrowIcon({
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

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function PostLink({
  className,
  post,
  ariaLabel,
  children,
}: {
  className: string;
  post: BlogPost;
  ariaLabel?: string;
  children: ReactNode;
}): ReactNode {
  if (post.external) {
    return (
      <a
        className={className}
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to={post.href} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function PostVisual({
  post,
  variant,
}: {
  post: BlogPost;
  variant: "card" | "featured";
}): ReactNode {
  const imageUrl = useBaseUrl(post.previewImage ?? "");

  if (post.previewImage) {
    return (
      <img
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          variant === "card" &&
            "transition-transform duration-300 group-hover:scale-102",
        )}
        src={imageUrl}
        alt={post.previewImageAlt ?? ""}
        loading={variant === "card" ? "lazy" : undefined}
      />
    );
  }

  if (variant === "featured") {
    return (
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(26, 46, 47) 0%, rgb(74, 116, 119) 100%)",
        }}
      />
    );
  }

  return <div className="absolute inset-0 bg-grey-20" />;
}
