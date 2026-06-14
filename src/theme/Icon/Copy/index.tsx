import type { ReactNode } from "react";
import type { Props } from "@theme/Icon/Copy";

export default function IconCopy(props: Props): ReactNode {
  return (
    <svg viewBox="0 0 14 14" {...props}>
      <path
        d="M10.0625 0.4375H0.4375V10.0625H10.0625V0.4375Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.8125 3.9375H13.5625V13.5625H3.9375V11.8125"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
