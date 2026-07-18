import type { ComponentProps, ReactNode, SVGProps } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type AnimatedArrowLinkBaseProps = {
  children: ReactNode;
  className?: string;
  href: string;
  size?: string;
  target?: ComponentProps<"a">["target"];
  rel?: ComponentProps<"a">["rel"];
  underlineClassName?: string;
  ariaLabel?: string;
};

function AnimatedLinkArrowIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn("shrink-0 overflow-visible", className)}
      fill="none"
      viewBox="0 0 28 29"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.16406 26.8438L24.1641 5.84375"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="3"
      />
      <path
        className="opacity-0 transition-[opacity,stroke-dashoffset] duration-300 ease-out [stroke-dasharray:5.66] [stroke-dashoffset:5.66] group-hover/animated-link:opacity-100 group-hover/animated-link:[stroke-dashoffset:0] group-focus-visible/animated-link:opacity-100 group-focus-visible/animated-link:[stroke-dashoffset:0]"
        d="M24.1641 5.84375L28.1641 1.84375"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="3"
      />
      <g className="transition-transform duration-300 ease-out group-hover/animated-link:translate-x-1 group-hover/animated-link:-translate-y-1 group-focus-visible/animated-link:translate-x-1 group-focus-visible/animated-link:-translate-y-1">
        <path
          d="M24.7109 18.1328V5.29154H11.8697"
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

function AnimatedArrowLinkContent({
  children,
  size,
  underlineClassName,
}: Pick<
  AnimatedArrowLinkBaseProps,
  "children" | "size" | "underlineClassName"
>): ReactNode {
  return (
    <>
      {underlineClassName ? (
        <span className={underlineClassName} aria-hidden="true" />
      ) : null}
      <span>{children}</span>
      <AnimatedLinkArrowIcon className={size} />
    </>
  );
}

export function AnimatedArrowLink({
  children,
  className,
  href,
  size,
  target,
  rel,
  underlineClassName,
  ariaLabel,
}: AnimatedArrowLinkBaseProps): ReactNode {
  const linkClassName = cn("group/animated-link", className);

  return (
    <Link
      className={linkClassName}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      <AnimatedArrowLinkContent
        size={size}
        underlineClassName={underlineClassName}
      >
        {children}
      </AnimatedArrowLinkContent>
    </Link>
  );
}
