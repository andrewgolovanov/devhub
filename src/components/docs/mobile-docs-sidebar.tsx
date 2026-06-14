import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "@docusaurus/router";
import type { PropSidebarItem } from "@docusaurus/plugin-content-docs";
import { ChevronDown, CornerDownRight } from "lucide-react";
import {
  DocsSidebarTree,
  findFirstHref,
  hasActiveDescendant,
} from "@/components/docs/sidebar-tree";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

type MobileDocsSidebarProps = {
  items: readonly PropSidebarItem[];
  title?: string;
};

export function MobileDocsSidebar({
  items,
  title = "Documentation",
}: MobileDocsSidebarProps): ReactNode {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (items.length === 0) {
    return null;
  }

  const anyActive = items.some((node) => hasActiveDescendant(node, pathname));
  const fallbackActiveHref = anyActive ? undefined : findFirstHref(items);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      shouldScaleBackground={false}
      preventScrollRestoration
    >
      <DrawerTrigger
        className="fixed inset-x-0 bottom-0 z-30 flex h-14 items-center border-0 border-t border-prose-border bg-black px-5 text-base leading-none font-medium tracking-tight text-white lg:hidden"
        data-slot="documentation-menu-trigger"
      >
        <CornerDownRight className="mr-2.5 size-3.5" aria-hidden="true" />
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "ml-auto size-5 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </DrawerTrigger>

      <DrawerContent className="flex h-[75dvh] flex-col rounded-t-xl border-prose-border bg-black p-0 text-white lg:hidden">
        <DrawerTitle className="sr-only">Documentation menu</DrawerTitle>

        <div className="flex-1 overflow-y-auto px-5 pt-6 pb-12">
          <DocsSidebarTree
            activePath={pathname}
            fallbackActiveHref={fallbackActiveHref}
            items={items}
            mode="mobile"
            onItemClick={() => {
              setOpen(false);
            }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full bg-linear-to-b from-transparent to-black"
          aria-hidden="true"
        />
      </DrawerContent>
    </Drawer>
  );
}
