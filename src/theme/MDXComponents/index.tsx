import MDXComponents from "@theme-original/MDXComponents";
import type { MDXComponentsObject } from "@theme/MDXComponents";
import CodeBlock from "@theme/CodeBlock";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import Heading from "@theme/Heading";
import React, { type ComponentPropsWithoutRef } from "react";

import { BaseUrlAnchor } from "@/components/base-url-anchor";
import { ContentHeading } from "@/components/docs/content-heading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Custom heading components must register their anchors with the broken link
// checker, otherwise every heading is reported as a false-positive broken anchor.
// See: https://github.com/facebook/docusaurus/issues/9880
// Docs: https://docusaurus.io/docs/docusaurus-core#useBrokenLinks
function useAnchor(id: string | undefined) {
  useBrokenLinks().collectAnchor(id);
}

function H1({ className, id, ...props }: ComponentPropsWithoutRef<"h1">) {
  useAnchor(id);
  return <h1 id={id} className={cn(className)} {...props} />;
}

function H2({ className, ...props }: ComponentPropsWithoutRef<"h2">) {
  return <ContentHeading tag="h2" className={className} {...props} />;
}

function H3({ className, ...props }: ComponentPropsWithoutRef<"h3">) {
  return <ContentHeading tag="h3" className={className} {...props} />;
}

function H4({ className, ...props }: ComponentPropsWithoutRef<"h4">) {
  return <Heading as="h4" className={cn(className)} {...props} />;
}

function H5({ className, ...props }: ComponentPropsWithoutRef<"h5">) {
  return <Heading as="h5" className={cn(className)} {...props} />;
}

function H6({ className, ...props }: ComponentPropsWithoutRef<"h6">) {
  return <Heading as="h6" className={cn(className)} {...props} />;
}

function P({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn(className)} {...props} />;
}

function A({ className, href, ...props }: ComponentPropsWithoutRef<"a">) {
  return <BaseUrlAnchor className={cn(className)} href={href} {...props} />;
}

function Ul({ className, ...props }: ComponentPropsWithoutRef<"ul">) {
  return <ul className={cn(className)} {...props} />;
}

function Ol({ className, ...props }: ComponentPropsWithoutRef<"ol">) {
  return <ol className={cn(className)} {...props} />;
}

function Li({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return <li className={cn(className)} {...props} />;
}

function Blockquote({
  className,
  ...props
}: ComponentPropsWithoutRef<"blockquote">) {
  return <blockquote className={cn(className)} {...props} />;
}

function Hr({ className, ...props }: ComponentPropsWithoutRef<"hr">) {
  return <hr className={cn("my-8 border-db-border", className)} {...props} />;
}

function Img({ className, ...props }: ComponentPropsWithoutRef<"img">) {
  return <img className={cn(className)} {...props} />;
}

function InlineCode({
  className,
  children,
  title,
  metastring,
  ...props
}: ComponentPropsWithoutRef<"code"> & { metastring?: string }) {
  const languageMatch = className?.match(/language-(\w+)/);

  if (languageMatch) {
    const code =
      typeof children === "string" ? children.replace(/\n$/, "") : children;
    return (
      <CodeBlock
        language={languageMatch[1]}
        title={title}
        metastring={metastring}
      >
        {code}
      </CodeBlock>
    );
  }

  return (
    <code
      className={cn(
        "rounded-md border border-db-border bg-db-bg px-1.5 py-0.5 font-mono text-[0.88em] text-db-navy dark:bg-db-navy/35 dark:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <figure className="not-prose -mx-5 my-8 md:mx-0">
      <ScrollArea className="w-full">
        <table
          className={cn(
            "mx-5 table w-184 border-separate border-spacing-0 text-sm md:mx-0 md:w-full",
            className,
          )}
          {...props}
        />
        <ScrollBar className="invisible" orientation="horizontal" />
      </ScrollArea>
    </figure>
  );
}

function Thead({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead className={cn("bg-transparent", className)} {...props} />;
}

function Tbody({ className, ...props }: ComponentPropsWithoutRef<"tbody">) {
  return (
    <tbody
      className={cn("[&_tr:last-child_td]:border-b-0", className)}
      {...props}
    />
  );
}

function Tr({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
  return <tr className={cn("bg-transparent", className)} {...props} />;
}

function Th({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className={cn(
        "min-w-36 border-b border-prose-border pb-3 text-left align-top text-sm leading-snug font-medium tracking-tight text-white",
        className,
      )}
      {...props}
    />
  );
}

function Td({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return (
    <td
      className={cn(
        "min-w-36 border-b border-prose-border pt-3 pr-10 pb-3 text-left align-top text-sm leading-snug tracking-tight text-grey-90 last:pr-0 [&_code:first-child]:ml-0",
        className,
      )}
      {...props}
    />
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Details({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"details">) {
  const items = React.Children.toArray(children);
  const summaryItem = items.find(
    (child) =>
      React.isValidElement(child) &&
      (child.type === "summary" ||
        (child.type as { name?: string })?.name === "Summary"),
  );
  const rest = items.filter((child) => child !== summaryItem);

  return (
    <details className={cn("group/details my-8", className)} {...props}>
      {summaryItem && (
        <Summary>
          {React.isValidElement<{ children?: React.ReactNode }>(summaryItem)
            ? summaryItem.props.children
            : null}
          <ChevronDown className="size-5 shrink-0 text-grey-70 transition-transform group-open/details:rotate-180" />
        </Summary>
      )}
      {rest.length > 0 ? (
        <div className="prose-inside-content my-5 px-5">{rest}</div>
      ) : null}
    </details>
  );
}

function Summary({ className, ...props }: ComponentPropsWithoutRef<"summary">) {
  return (
    <summary
      className={cn(
        "not-prose w-fit cursor-pointer rounded text-base leading-snug font-medium tracking-tight text-foreground normal-case outline-offset-4 transition-colors duration-300 hover:text-secondary-foreground/85",
        className,
      )}
      {...props}
    />
  );
}

function Kbd({ className, ...props }: ComponentPropsWithoutRef<"kbd">) {
  return (
    <kbd
      className={cn(
        "mx-0.5 inline-flex min-h-[1.5rem] items-center rounded-md border border-db-border bg-db-bg px-1.5 font-mono text-xs text-db-navy shadow-sm dark:bg-db-navy/35 dark:text-white",
        className,
      )}
      {...props}
    />
  );
}

function Mark({ className, ...props }: ComponentPropsWithoutRef<"mark">) {
  return (
    <mark
      className={cn(
        "rounded-sm bg-db-lava/20 px-1 text-db-navy dark:bg-db-lava/35 dark:text-white",
        className,
      )}
      {...props}
    />
  );
}

function Strong({ className, ...props }: ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      className={cn("font-extrabold text-db-navy dark:text-white", className)}
      {...props}
    />
  );
}

function Em({ className, ...props }: ComponentPropsWithoutRef<"em">) {
  return (
    <em
      className={cn(
        "font-medium text-db-navy/90 italic decoration-db-lava/45 dark:text-white/90",
        className,
      )}
      {...props}
    />
  );
}

function Del({ className, ...props }: ComponentPropsWithoutRef<"del">) {
  return (
    <del
      className={cn(
        "text-db-navy/60 decoration-db-navy/50 dark:text-white/60 dark:decoration-white/50",
        className,
      )}
      {...props}
    />
  );
}

function Sup({ className, ...props }: ComponentPropsWithoutRef<"sup">) {
  return (
    <sup className={cn("align-super text-[0.7em]", className)} {...props} />
  );
}

function Sub({ className, ...props }: ComponentPropsWithoutRef<"sub">) {
  return <sub className={cn("align-sub text-[0.7em]", className)} {...props} />;
}

const components: MDXComponentsObject = {
  ...MDXComponents,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  a: A,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockquote,
  hr: Hr,
  img: Img,
  code: InlineCode,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
  details: Details,
  Details: Details,
  summary: Summary,
  kbd: Kbd,
  mark: Mark,
  strong: Strong,
  em: Em,
  del: Del,
  sup: Sup,
  sub: Sub,
};

export default components;
