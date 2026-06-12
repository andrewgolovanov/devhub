import Link from "@docusaurus/Link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BackLinkProps = ComponentProps<typeof Link> & {
  iconClassName?: string;
};

function BackIcon({ className }: { className?: string }): ReactNode {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("size-3.5 shrink-0", className)}
    >
      <path
        d="M13.5625 7.01562H1.3125"
        stroke="currentColor"
        strokeWidth="1.3125"
        strokeMiterlimit="10"
      />
      <path
        d="M5.25 3.07812L1.3125 7.01562L5.25 10.9531"
        stroke="currentColor"
        strokeWidth="1.3125"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function BackLink({
  children,
  className,
  iconClassName,
  ...props
}: BackLinkProps): ReactNode {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-xs font-medium text-grey-60 uppercase no-underline hover:text-white hover:no-underline",
        className,
      )}
      {...props}
    >
      <BackIcon className={iconClassName} />
      {children}
    </Link>
  );
}
