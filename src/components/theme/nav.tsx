import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

type HeaderNavItem = {
  label: string;
  href: string;
};

interface HeaderNavProps {
  className?: string;
  items: readonly HeaderNavItem[];
}

function normalizePath(path: string) {
  if (path === "/") return path;

  return path.replace(/\/$/, "");
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

function Nav({ className, items }: HeaderNavProps) {
  const { pathname } = useLocation();

  const activeIndex = useMemo(
    () =>
      items.findIndex(({ href }) => {
        if (isExternalHref(href)) return false;

        const hrefPath = normalizePath(href);
        const currentPath = normalizePath(pathname);

        return hrefPath === "/"
          ? currentPath === "/"
          : currentPath === hrefPath || currentPath.startsWith(`${hrefPath}/`);
      }),
    [items, pathname],
  );

  return (
    <nav className={cn("flex", className)}>
      {items.map(({ href, label }, index) => {
        const isActive = index === activeIndex;

        return (
          <Link
            key={href}
            to={href}
            data-active={isActive ? "true" : undefined}
            className={cn(
              "group relative inline-flex px-3 py-2 font-mono text-[15px] leading-none text-white no-underline hover:no-underline",
              isActive && "text-white",
            )}
          >
            <span
              className="pointer-events-none absolute inset-0 bg-grey-8 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-data-[active=true]:opacity-100"
              aria-hidden="true"
            >
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 size-3 rotate-45 overflow-hidden border-2 border-black bg-orange"></span>
            </span>
            <span className="relative z-10">[{label}]</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default Nav;
