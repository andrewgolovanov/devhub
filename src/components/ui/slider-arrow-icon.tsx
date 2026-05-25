import type { SVGProps } from "react";

export function SliderArrowIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="24"
      height="13"
      viewBox="0 0 24 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.4982 0.707034L21.9982 6.20704L16.4982 11.707M21.9982 6.20704L9.61651e-07 6.20703"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
