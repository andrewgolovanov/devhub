"use client";

import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type TabValue = {
  attributes?: Record<string, unknown>;
  default?: boolean;
  label?: string;
  value: string;
};

export type TabItemProps = {
  children?: ReactNode;
  value: string;
};

const tabStoragePrefix = "devhub.tab.";
const tabsChangeEventName = "devhub-tabs-change";

export function sanitizeTabsChildren(children: ReactNode): ReactNode {
  return children;
}

function getFallbackValue(
  values: readonly TabValue[],
  defaultValue?: string | null,
): string {
  if (defaultValue && values.some((item) => item.value === defaultValue)) {
    return defaultValue;
  }

  return values.find((item) => item.default)?.value ?? values[0]?.value ?? "";
}

function getQueryStringParamName(
  queryString: boolean | string | undefined,
  groupId: string | undefined,
): string | null {
  if (!queryString) {
    return null;
  }

  if (
    typeof queryString === "string" &&
    queryString !== "true" &&
    queryString !== "false"
  ) {
    return queryString;
  }

  return groupId ?? "tab";
}

function getStorageKey(groupId: string | undefined): string | null {
  return groupId ? `${tabStoragePrefix}${groupId}` : null;
}

function isKnownValue(
  values: readonly TabValue[],
  value: string | null,
): value is string {
  return !!value && values.some((item) => item.value === value);
}

function getInitialBrowserValue({
  fallback,
  groupId,
  queryString,
  values,
}: {
  fallback: string;
  groupId?: string;
  queryString?: boolean | string;
  values: readonly TabValue[];
}): string {
  if (typeof window === "undefined") {
    return fallback;
  }

  const queryParamName = getQueryStringParamName(queryString, groupId);
  const queryValue = queryParamName
    ? new URLSearchParams(window.location.search).get(queryParamName)
    : null;

  if (isKnownValue(values, queryValue)) {
    return queryValue;
  }

  const storageKey = getStorageKey(groupId);
  const storedValue = storageKey
    ? window.localStorage.getItem(storageKey)
    : null;

  return isKnownValue(values, storedValue) ? storedValue : fallback;
}

function updateLocationQuery(paramName: string, value: string) {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set(paramName, value);
  window.history.replaceState(window.history.state, "", nextUrl);
}

function getTabsChangeDetail(
  event: Event,
): { groupId: string; value: string } | null {
  if (!(event instanceof CustomEvent)) {
    return null;
  }

  const detail = event.detail;
  if (typeof detail !== "object" || detail === null) {
    return null;
  }

  const record = detail as Partial<Record<"groupId" | "value", unknown>>;
  if (typeof record.groupId !== "string" || typeof record.value !== "string") {
    return null;
  }

  return {
    groupId: record.groupId,
    value: record.value,
  };
}

export function useTabs({
  defaultValue,
  groupId,
  queryString,
  values,
}: {
  children?: ReactNode;
  defaultValue?: string | null;
  groupId?: string;
  queryString?: boolean | string;
  values: readonly TabValue[];
}) {
  const valuesKey = values.map((item) => item.value).join("\u001F");
  const fallback = useMemo(
    () => getFallbackValue(values, defaultValue),
    [defaultValue, values],
  );
  const [selectedValue, setSelectedValue] = useState(fallback);

  useEffect(() => {
    setSelectedValue(
      getInitialBrowserValue({
        fallback,
        groupId,
        queryString,
        values,
      }),
    );
  }, [fallback, groupId, queryString, values, valuesKey]);

  useEffect(() => {
    if (!groupId) {
      return undefined;
    }

    const storageKey = getStorageKey(groupId);

    function handleTabsChange(event: Event) {
      const detail = getTabsChangeDetail(event);
      if (
        detail &&
        detail.groupId === groupId &&
        isKnownValue(values, detail.value)
      ) {
        setSelectedValue(detail.value);
      }
    }

    function handleStorage(event: StorageEvent) {
      if (event.key === storageKey && isKnownValue(values, event.newValue)) {
        setSelectedValue(event.newValue);
      }
    }

    window.addEventListener(tabsChangeEventName, handleTabsChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(tabsChangeEventName, handleTabsChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, [groupId, values, valuesKey]);

  const selectValue = useCallback(
    (value: string) => {
      if (!isKnownValue(values, value)) {
        return;
      }

      setSelectedValue(value);

      const storageKey = getStorageKey(groupId);
      if (storageKey) {
        window.localStorage.setItem(storageKey, value);
        window.dispatchEvent(
          new CustomEvent(tabsChangeEventName, {
            detail: {
              groupId,
              value,
            },
          }),
        );
      }

      const queryParamName = getQueryStringParamName(queryString, groupId);
      if (queryParamName) {
        updateLocationQuery(queryParamName, value);
      }
    },
    [groupId, queryString, values, valuesKey],
  );

  return {
    selectedValue,
    selectValue,
    tabValues: values,
  };
}

export function isSamePath(a: string, b: string): boolean {
  return a.replace(/\/$/, "") === b.replace(/\/$/, "");
}

export function findFirstCategoryLink(children: ReactNode): ReactNode {
  return Children.toArray(children).find(isValidElement) ?? null;
}
