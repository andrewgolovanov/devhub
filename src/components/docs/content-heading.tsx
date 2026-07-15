import useBrokenLinks from "@docusaurus/useBrokenLinks";
import { Check, Link } from "lucide-react";
import { type ComponentPropsWithoutRef, type ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

type ContentHeadingProps = ComponentPropsWithoutRef<"h2"> & {
  children?: ReactNode;
  tag: "h2" | "h3";
};

export function ContentHeading({
  tag: Tag,
  className,
  children,
  id,
  ...props
}: ContentHeadingProps) {
  useBrokenLinks().collectAnchor(id);

  const [copied, setCopied] = useState(false);

  async function copyHeadingLink() {
    if (!id) {
      return;
    }

    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    if (!(await copyText(url))) {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Tag
      id={id}
      className={cn(
        "group/content-heading !w-fit text-pretty",
        "!scroll-mt-[calc(var(--sticky-header-height,0px)+2rem)]",
        className,
      )}
      {...props}
    >
      {children}
      {id ? (
        <span className="inline-flex min-w-4 shrink-0 lg:min-w-14">
          <button
            type="button"
            className={cn(
              "ml-2 inline-flex translate-x-0 items-center gap-x-1 align-middle text-grey-70 opacity-0 transition duration-300 group-hover/content-heading:translate-x-1 group-hover/content-heading:opacity-100 focus-visible:translate-x-1 focus-visible:opacity-100",
              copied && "translate-x-1 opacity-100",
            )}
            aria-label="Copy link to section"
            title="Copy link"
            onClick={copyHeadingLink}
          >
            {copied ? (
              <>
                <Check className="size-4" />
                <span className="hidden text-xs leading-none font-medium lg:inline">
                  Copied
                </span>
              </>
            ) : (
              <Link className="size-4" />
            )}
          </button>
        </span>
      ) : null}
    </Tag>
  );
}

async function copyText(value: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Fall back to execCommand for browser contexts without clipboard access.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  return copied;
}
