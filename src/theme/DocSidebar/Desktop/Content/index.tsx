import { useState, type ReactNode } from "react";
import clsx from "clsx";
import {
  useAnnouncementBar,
  useScrollPosition,
} from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import type { Props } from "@theme/DocSidebar/Desktop/Content";
import {
  DocsSidebarTree,
  findFirstHref,
  hasActiveDescendant,
} from "@/components/docs/sidebar-tree";

function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);
  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

export default function DocSidebarDesktopContent({
  path,
  sidebar,
  className,
}: Props): ReactNode {
  const showAnnouncementBar = useShowAnnouncementBar();

  const anyActive = sidebar.some((node) => hasActiveDescendant(node, path));
  const fallbackActiveHref = anyActive ? undefined : findFirstHref(sidebar);

  return (
    <nav
      aria-label={translate({
        id: "theme.docs.sidebar.navAriaLabel",
        message: "Docs sidebar",
        description: "The ARIA label for the sidebar navigation",
      })}
      className={clsx(
        "thin-scrollbar",
        "sticky top-16 grow overflow-y-auto border-r-0 bg-black px-1 pt-6 pb-10 [scrollbar-gutter:stable]",
        showAnnouncementBar && "mb-[var(--docusaurus-announcement-bar-height)]",
        className,
      )}
    >
      <div className="flex flex-col gap-y-0 pb-10">
        <DocsSidebarTree
          activePath={path}
          fallbackActiveHref={fallbackActiveHref}
          items={sidebar}
        />
      </div>
    </nav>
  );
}
