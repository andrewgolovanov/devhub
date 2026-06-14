export const HEADER_LINKS = [
  // Temporarily hidden while product pages are unpublished.
  // { label: "Product", href: "/product/data-lakehouse" },
  { label: "Solutions", href: "/solutions" },
  { label: "Templates", href: "/templates" },
  { label: "Docs", href: "/docs/start-here", activePath: "/docs" },
] as const;

export type HeaderNavItem = (typeof HEADER_LINKS)[number];

export const PRODUCT_LINKS = [
  { label: "Lakebase", href: "/product/data-lakehouse" },
  { label: "Agent Bricks", href: "/product/agent-bricks" },
  { label: "Databricks Apps", href: "/product/databricks-apps" },
] as const;

function normalizePath(path: string) {
  if (path === "/") return path;

  return path.replace(/\/$/, "");
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function isHrefActive(href: string, pathname: string) {
  if (isExternalHref(href)) return false;

  const hrefPath = normalizePath(href);
  const currentPath = normalizePath(pathname);

  return hrefPath === "/"
    ? currentPath === "/"
    : currentPath === hrefPath || currentPath.startsWith(`${hrefPath}/`);
}

export function isHeaderNavItemActive(item: HeaderNavItem, pathname: string) {
  return isHrefActive(
    "activePath" in item ? item.activePath : item.href,
    pathname,
  );
}

export function getActiveProductHref(pathname: string) {
  return PRODUCT_LINKS.find(({ href }) => isHrefActive(href, pathname))?.href;
}
