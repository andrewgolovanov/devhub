import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";

type AdmonitionLayoutProps = {
  type: string;
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
};

const ADMONITION_ICON_TYPES = new Set(["warning", "caution", "danger"]);

function AdmonitionHeading({
  type,
  icon,
  title,
}: Pick<AdmonitionLayoutProps, "type" | "icon" | "title">) {
  if (!title && !icon) {
    return null;
  }

  const shouldShowIcon = ADMONITION_ICON_TYPES.has(type);

  return (
    <span className="not-prose flex items-center gap-1.5 pt-4">
      {shouldShowIcon && icon ? (
        <span
          className={cn(
            "flex size-4 shrink-0 items-center justify-center [&_svg]:size-4 [&_svg_*]:fill-current [&_svg_*]:stroke-current [&_svg]:fill-current [&_svg]:stroke-current",
            type === "danger" ? "text-db-lava" : "text-yellow-400",
          )}
        >
          {icon}
        </span>
      ) : null}
      {title ? (
        <span className="not-prose flex text-[0.8125rem] leading-none font-semibold tracking-tight text-grey-90">
          {title}
        </span>
      ) : null}
    </span>
  );
}

export default function AdmonitionLayout({
  type,
  icon,
  title,
  children,
}: AdmonitionLayoutProps) {
  return (
    <figure className="not-prose admonition my-8 flex flex-col rounded-none border border-grey-30 bg-transparent px-5">
      <AdmonitionHeading type={type} icon={icon} title={title} />
      {children ? (
        <div className="prose-inside-content prose mt-3.5 pt-3.5 mb-5 max-w-none border-t border-grey-30">
          {children}
        </div>
      ) : null}
    </figure>
  );
}
