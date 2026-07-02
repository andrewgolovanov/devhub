import type { ReactNode } from "react";

import { getDocsSidebarItems } from "@/lib/docs-content";
import {
  DocsDesktopSidebar,
  DocsMobileSidebar,
} from "@/components/docs/docs-sidebar";
import Footer from "@/components/footer";
import CTA from "@/components/home/cta";

export default function DocsLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const sidebarItems = getDocsSidebarItems();

  return (
    <div className="flex flex-col bg-black text-white">
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-8 px-5 md:px-8 lg:grid-cols-[14rem_minmax(0,1fr)] xl:gap-x-16">
        <aside className="relative hidden lg:block">
          <DocsDesktopSidebar items={sidebarItems} />
        </aside>
        <main className="relative min-w-0 bg-black">{children}</main>
        <DocsMobileSidebar items={sidebarItems} />
      </div>

      <div className="border-grey-20 mx-auto mt-18 w-full max-w-432 border-x bg-black md:mt-26">
        <CTA
          className="pt-0 pb-16 lg:pb-22"
          label="Start building"
          theme="outline"
          title="Ready to ship your next agentic app in minutes?"
        />
        <Footer className="border-t border-white/10 bg-black lg:px-8" />
      </div>
    </div>
  );
}
