import {
  Children,
  Fragment,
  isValidElement,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

import { resolveSiteUrl } from "@/lib/site-url";
import { Admonition } from "@/components/content/admonition";
import CodeBlock from "@/components/content/code-block";
import { DocExample } from "@/components/content/doc-example";
import { Tabs as ContentTabs, type Tab } from "@/components/content/tabs";

const DEVHUB_SITE_URL_PLACEHOLDER = "__DEVHUB_SITE_URL__";

type CodeTab = {
  code: string;
  label: string;
  language?: string;
  meta?: string | null;
};

type TabItemProps = {
  children?: ReactNode;
  default?: boolean;
  label?: string;
  value: string;
};

type TabValue = {
  default?: boolean;
  label?: string;
  value: string;
};

type TabsProps = {
  children?: ReactNode;
  className?: string;
  defaultValue?: string | null;
  groupId?: string;
  labels?: string[];
  queryString?: boolean | string;
  values?: readonly TabValue[];
};

function substituteDevhubSiteUrl(value: string): string {
  return value.includes(DEVHUB_SITE_URL_PLACEHOLDER)
    ? value.replaceAll(DEVHUB_SITE_URL_PLACEHOLDER, resolveSiteUrl())
    : value;
}

function substituteDevhubSiteUrlChildren(children: ReactNode): ReactNode {
  return Children.map(children, (child) =>
    typeof child === "string" ? substituteDevhubSiteUrl(child) : child,
  );
}

function extractText(node: ReactNode): string {
  if (typeof node === "string") {
    return substituteDevhubSiteUrl(node);
  }

  if (typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }

  return "";
}

function Anchor({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (href?.startsWith("/")) {
    return (
      <Link
        className="text-db-lava-light underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      className="text-db-lava-light underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
      href={href}
      rel="noreferrer"
      target={href?.startsWith("http") ? "_blank" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

function Code({ children, ...props }: HTMLAttributes<HTMLElement>) {
  const rawCode = extractText(children);
  const rawCodeProps = rawCode.includes(resolveSiteUrl())
    ? { "data-raw-code": rawCode }
    : {};

  return (
    <code {...props} {...rawCodeProps}>
      {substituteDevhubSiteUrlChildren(children)}
    </code>
  );
}

function Paragraph({
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p {...props}>{substituteDevhubSiteUrlChildren(children)}</p>;
}

function Span({ children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props}>{substituteDevhubSiteUrlChildren(children)}</span>;
}

function AdmonitionComponent({
  children,
  title,
  type = "note",
}: {
  children?: ReactNode;
  title?: ReactNode;
  type?: string;
}): ReactNode {
  return (
    <Admonition title={title} type={type}>
      {children}
    </Admonition>
  );
}

function parseCodeTabs(tabs: CodeTab[] | string): CodeTab[] {
  if (typeof tabs !== "string") {
    return tabs;
  }

  try {
    const parsed = JSON.parse(tabs) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((tab): tab is CodeTab => {
      if (tab === null || typeof tab !== "object") {
        return false;
      }

      const candidate = tab as Partial<CodeTab>;
      return (
        typeof candidate.code === "string" &&
        typeof candidate.label === "string"
      );
    });
  } catch {
    return [];
  }
}

function CodeTabs({ tabs }: { tabs: CodeTab[] | string }) {
  const markdownTabs: Tab[] = parseCodeTabs(tabs).map((tab, index) => ({
    content: (
      <CodeBlock
        language={tab.language ?? "text"}
        title={tab.meta ?? undefined}
      >
        {tab.code}
      </CodeBlock>
    ),
    label: tab.label,
    value: `${tab.label}-${index}`,
  }));

  return markdownTabs.length > 0 ? <ContentTabs tabs={markdownTabs} /> : null;
}

function flattenChildren(children: ReactNode): ReactNode[] {
  if (children == null || typeof children === "boolean") {
    return [];
  }

  if (Array.isArray(children)) {
    return children.flatMap(flattenChildren);
  }

  if (isValidElement<{ children?: ReactNode }>(children)) {
    if (children.type === Fragment) {
      return flattenChildren(children.props.children);
    }
  }

  return [children];
}

function isTabItem(child: ReactNode): child is ReactElement<TabItemProps> {
  return (
    isValidElement<TabItemProps>(child) &&
    typeof child.props.value === "string" &&
    child.props.value !== ""
  );
}

function TabItem({ children }: TabItemProps) {
  return <>{children}</>;
}

function Tabs({
  children,
  className,
  defaultValue,
  groupId,
  labels,
  queryString,
  values,
}: TabsProps) {
  const tabItems = flattenChildren(children).filter(isTabItem);

  if (tabItems.length === 0) {
    return <>{children}</>;
  }

  const tabs: Tab[] = tabItems.map((tab, index) => {
    const value = values?.[index]?.value ?? tab.props.value;

    return {
      content: tab.props.children,
      default: values?.[index]?.default ?? tab.props.default,
      label:
        values?.[index]?.label ?? labels?.[index] ?? tab.props.label ?? value,
      value,
    };
  });

  const element = (
    <ContentTabs
      defaultValue={defaultValue ?? undefined}
      groupId={groupId}
      queryString={queryString}
      tabs={tabs}
    />
  );

  return className ? <div className={className}>{element}</div> : element;
}

const devhubMdxComponents = {
  Admonition: AdmonitionComponent,
  CodeTabs,
  DocExample,
  code: Code,
  p: Paragraph,
  span: Span,
  TabItem,
  Tabs,
} satisfies MDXComponents;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...devhubMdxComponents,
    a: Anchor,
    ...components,
  };
}
