import { useEffect, type ReactNode } from "react";
import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client";
import { useLocation } from "@docusaurus/router";
import DocSidebarDesktopContent from "@theme/DocSidebar/Desktop/Content";
import type { Props } from "@theme/DocRoot/Layout";
import { MobileDocsSidebar } from "@/components/docs/mobile-docs-sidebar";

import CTA from "@/components/home-new/cta";
import NewFooter from "@/components/theme/footer";

export default function DocRootLayout({ children }: Props): ReactNode {
  const sidebar = useDocsSidebar();
  const { pathname } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const previousTheme = root.getAttribute("data-theme");
    const previousChoice = root.getAttribute("data-theme-choice");

    root.setAttribute("data-theme", "dark");
    root.setAttribute("data-theme-choice", "dark");

    return () => {
      if (previousTheme === null) {
        root.removeAttribute("data-theme");
      } else {
        root.setAttribute("data-theme", previousTheme);
      }

      if (previousChoice === null) {
        root.removeAttribute("data-theme-choice");
      } else {
        root.setAttribute("data-theme-choice", previousChoice);
      }
    };
  }, []);

  return (
    <div className="flex flex-col bg-black text-white">
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-8 px-5 md:px-8 lg:grid-cols-[14rem_minmax(0,1fr)] xl:gap-x-16">
        {sidebar && (
          <aside className="relative hidden lg:block">
            <DocSidebarDesktopContent
              path={pathname}
              sidebar={sidebar.items}
              className="sticky top-16 max-h-[calc(100svh-4rem)] flex flex-col gap-y-8.5 border-r-0 bg-black px-1 pt-7 pb-10"
            />
          </aside>
        )}
        <main className="relative min-w-0 bg-black">{children}</main>
        {sidebar ? <MobileDocsSidebar items={sidebar.items} /> : null}
      </div>

      <div className="mx-auto mt-18 w-full max-w-432 border-x border-grey-20 bg-black md:mt-26">
        <CTA
          className="pt-0 pb-16 lg:pb-22"
          theme="outline"
          label="Start building"
          title="Ready to ship your next agentic app in minutes?"
        />
        <NewFooter className="border-t border-white/10 bg-black lg:px-8" />
      </div>
    </div>
  );
}
