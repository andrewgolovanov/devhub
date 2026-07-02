import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AdmonitionProps = {
  type: string;
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
};

const ADMONITION_ICON_TYPES = new Set(["warning", "caution", "danger"]);

function DefaultAdmonitionIcon() {
  return (
    <svg viewBox="0 0 16 16">
      <path d="M8 0 16 15H0L8 0Zm0 5.2c-.44 0-.8.36-.8.8v3.6c0 .44.36.8.8.8s.8-.36.8-.8V6c0-.44-.36-.8-.8-.8Zm0 7.2a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" />
    </svg>
  );
}

function AdmonitionHeading({
  type,
  icon,
  title,
}: Pick<AdmonitionProps, "type" | "icon" | "title">) {
  if (!title && !icon) {
    return null;
  }

  const shouldShowIcon = ADMONITION_ICON_TYPES.has(type);

  return (
    <span className="not-prose flex items-center gap-1.5 pt-4">
      {shouldShowIcon ? (
        <span
          className={cn(
            "flex size-4 shrink-0 items-center justify-center [&_svg]:size-4 [&_svg]:fill-current [&_svg]:stroke-current [&_svg_*]:fill-current [&_svg_*]:stroke-current",
            type === "danger" ? "text-db-lava" : "text-yellow-400",
          )}
        >
          {icon ?? <DefaultAdmonitionIcon />}
        </span>
      ) : null}
      {title ? (
        <span className="not-prose text-grey-90 flex text-[0.8125rem] leading-none font-semibold tracking-tight">
          {title}
        </span>
      ) : null}
    </span>
  );
}

export function Admonition({ type, icon, title, children }: AdmonitionProps) {
  return (
    <figure className="not-prose admonition border-grey-30 my-8 flex flex-col rounded-none border bg-transparent px-5">
      <AdmonitionHeading type={type} icon={icon} title={title} />
      {children ? (
        <div className="prose-inside-content prose border-grey-30 mt-3.5 mb-5 max-w-none border-t pt-3.5">
          {children}
        </div>
      ) : null}
    </figure>
  );
}
