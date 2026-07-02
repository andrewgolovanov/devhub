"use client";

import { useId, useMemo, type ReactNode } from "react";

import { useTabs, type TabValue } from "@/lib/content-tabs-state";

export type Tab = {
  content: ReactNode;
  default?: boolean;
  label: string;
  value: string;
};

export function Tabs({
  defaultValue,
  groupId,
  queryString,
  tabs,
}: {
  defaultValue?: string;
  groupId?: string;
  queryString?: boolean | string;
  tabs: Tab[];
}) {
  if (tabs.length === 0) {
    return null;
  }

  const tabsId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const tabValues = useMemo<TabValue[]>(
    () =>
      tabs.map((tab) => ({
        default: tab.default,
        label: tab.label,
        value: tab.value,
      })),
    [tabs],
  );
  const tabsState = useTabs({
    defaultValue,
    groupId,
    queryString,
    values: tabValues,
  });

  return (
    <div className="markdown-tabs mt-5 mb-6 w-full max-w-full overflow-hidden">
      <div
        aria-label="Content tabs"
        className="border-grey-30 flex h-11 w-full gap-x-5 overflow-x-auto border-b"
        role="tablist"
      >
        {tabs.map((tab) => {
          const selected = tabsState.selectedValue === tab.value;
          const triggerId = `${tabsId}-${tab.value}-trigger`;
          const panelId = `${tabsId}-${tab.value}-panel`;
          return (
            <button
              aria-controls={panelId}
              aria-selected={selected}
              className={`relative h-11 shrink-0 px-0 text-sm leading-none font-semibold tracking-tight transition-colors ${
                selected ? "text-white" : "text-grey-70 hover:text-white/80"
              } after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-white after:transition-opacity after:content-[''] ${
                selected ? "after:opacity-100" : "after:opacity-0"
              }`}
              id={triggerId}
              key={tab.value}
              onClick={() => tabsState.selectValue(tab.value)}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => {
        const selected = tabsState.selectedValue === tab.value;
        return (
          <div
            aria-labelledby={`${tabsId}-${tab.value}-trigger`}
            className="prose-inside-content mt-4 mb-0 [&_.theme-code-block]:!mt-0 [&_.theme-code-block]:!mb-0"
            hidden={!selected}
            id={`${tabsId}-${tab.value}-panel`}
            key={tab.value}
            role="tabpanel"
          >
            {selected ? tab.content : null}
          </div>
        );
      })}
    </div>
  );
}
