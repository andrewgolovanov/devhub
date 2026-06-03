import {
  Fragment,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  sanitizeTabsChildren,
  useTabs,
  type TabItemProps,
  type TabValue,
} from "@docusaurus/theme-common/internal";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tabs as TabsUI,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

function processChildren(node: ReactNode): ReactNode {
  if (node == null || typeof node === "boolean") {
    return null;
  }

  if (Array.isArray(node)) {
    return node.map((child, index) => (
      <Fragment key={index}>{processChildren(child)}</Fragment>
    ));
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (node.type === Fragment) {
      return <Fragment>{processChildren(node.props.children)}</Fragment>;
    }

    return node;
  }

  if (typeof node === "string" || typeof node === "number") {
    return node;
  }

  return <Fragment>{node}</Fragment>;
}

type ContentTabProps = {
  attributes?: Record<string, unknown>;
  children: ReactNode;
  className?: string;
  contentProps?: Omit<ComponentPropsWithoutRef<typeof TabsContent>, "value">;
  default?: boolean;
  hidden?: boolean;
  label?: string;
  value: string;
};

type ContentTabElement = ReactElement<ContentTabProps>;

function getTabLabel(tab: ContentTabElement): string {
  const label = tab.props.label ?? tab.props.value;
  return typeof label === "string" ? label : String(label ?? "");
}

function getTabValue(tab: ContentTabElement): string {
  return tab.props.value ?? getTabLabel(tab);
}

function getTabsFromChildren(children: ReactNode): ContentTabElement[] {
  return flattenChildren(children).filter(
    (child): child is ContentTabElement =>
      isValidElement<ContentTabProps>(child) &&
      Boolean(child.props.label ?? child.props.value),
  );
}

function flattenChildren(children: ReactNode): ReactNode[] {
  return FragmentChildren(children).flatMap((child) => {
    if (isValidElement<{ children?: ReactNode }>(child)) {
      if (child.type === Fragment) {
        return flattenChildren(child.props.children);
      }
    }

    return child;
  });
}

function FragmentChildren(children: ReactNode): ReactNode[] {
  if (children == null || typeof children === "boolean") {
    return [];
  }

  return Array.isArray(children) ? children : [children];
}

export function ContentTab({
  children,
  className,
  contentProps = {},
  label,
  value,
}: ContentTabProps) {
  const processedChildren = processChildren(children);
  if (processedChildren == null) {
    return null;
  }

  return (
    <TabsContent
      className={cn("prose-inside-content mt-4 mb-0", className)}
      value={value}
      {...contentProps}
    >
      {processedChildren}
    </TabsContent>
  );
}

type ContentTabsProps = {
  children?: ReactNode;
  className?: string;
  defaultValue?: string | null;
  groupId?: string;
  labels?: string[];
  queryString?: boolean | string;
  values?: readonly TabValue[];
};

export function ContentTabs({
  children,
  className,
  defaultValue,
  groupId,
  labels,
  queryString,
  values,
}: ContentTabsProps) {
  const tabs = getTabsFromChildren(children);

  if (tabs.length === 0) {
    return <>{children}</>;
  }

  const tabValues =
    labels?.map((label) => ({ label, value: label })) ??
    values ??
    tabs.map((tab) => ({
      attributes: tab.props.attributes,
      default: tab.props.default,
      label: getTabLabel(tab),
      value: getTabValue(tab),
    }));

  return (
    <ContentTabsRoot
      className={className}
      defaultValue={defaultValue}
      groupId={groupId}
      queryString={queryString}
      tabValues={tabValues}
    >
      {sanitizeTabsChildren(tabs)}
    </ContentTabsRoot>
  );
}

type ContentTabsRootProps = {
  children: ReactElement<TabItemProps>[];
  className?: string;
  defaultValue?: string | null;
  groupId?: string;
  queryString?: boolean | string;
  tabValues: readonly TabValue[];
};

function ContentTabsRoot({
  children,
  className,
  defaultValue,
  groupId,
  queryString,
  tabValues,
}: ContentTabsRootProps) {
  const tabsState = useTabs({
    children,
    defaultValue,
    groupId,
    queryString,
    values: tabValues,
  });

  return (
    <div className={cn("w-full max-w-full overflow-hidden", className)}>
      <TabsUI
        className="w-full gap-0"
        onValueChange={tabsState.selectValue}
        value={tabsState.selectedValue}
      >
        <TabsList className="h-11 w-full rounded-none border-b border-grey-30 bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-11">
          <ScrollArea className="w-full">
            <div className="flex w-fit gap-x-5">
              {tabsState.tabValues.map(({ attributes, label, value }) => (
                <TabsTrigger
                  className={cn(
                    "group relative h-11 px-0 leading-none font-semibold tracking-tight text-grey-70 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:transition-none",
                    "hover:text-white/80",
                    "after:absolute after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:-bottom-px after:h-0.5 after:bg-white after:opacity-0 after:transition-opacity after:duration-300 after:ease-in-out after:content-['']",
                    "data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:after:opacity-100 dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent",
                    attributes?.className as string | undefined,
                  )}
                  value={value}
                  key={value}
                >
                  <span className="rounded group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background">
                    {label ?? value}
                  </span>
                </TabsTrigger>
              ))}
            </div>
            <ScrollBar className="invisible" orientation="horizontal" />
          </ScrollArea>
        </TabsList>
        {children}
      </TabsUI>
    </div>
  );
}
