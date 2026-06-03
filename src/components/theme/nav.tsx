import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import type { ReactNode } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  getActiveProductHref,
  isHrefActive,
  PRODUCT_LINKS,
  type HeaderNavItem,
} from "@/lib/header-navigation";
import { cn } from "@/lib/utils";

interface HeaderNavProps {
  className?: string;
  items: readonly HeaderNavItem[];
}

function NavItemChrome({
  active,
  children,
  className,
}: {
  active: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      data-active={active ? "true" : undefined}
      className={cn(
        "group/nav-item relative inline-flex px-3 py-2 font-mono text-[15px] leading-none text-white no-underline hover:no-underline",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 overflow-hidden bg-grey-12 opacity-0 transition-opacity duration-300 group-hover/nav-item:opacity-100 group-data-[state=open]/product-trigger:opacity-100 group-data-[active=true]/nav-item:opacity-100"
        aria-hidden="true"
      >
        <span className="absolute top-0 right-0 size-3 translate-x-1/2 -translate-y-1/2 rotate-45 overflow-hidden border-2 border-black bg-orange" />
      </span>
      <span className="relative z-10">{children}</span>
    </span>
  );
}

function Nav({ className, items }: HeaderNavProps) {
  const { pathname } = useLocation();
  const activeProductHref = getActiveProductHref(pathname);

  return (
    <NavigationMenu
      viewport={false}
      delayDuration={0}
      className={cn("flex max-w-none flex-none justify-start", className)}
    >
      <NavigationMenuList className="flex justify-start gap-0">
        {items.map(({ href, label }) => {
          if (label === "Product") {
            const isActive = Boolean(activeProductHref);

            return (
              <NavigationMenuItem key={href}>
                <NavigationMenuTrigger className="group/product-trigger h-auto rounded-none bg-transparent! p-0 font-mono text-white shadow-none hover:bg-transparent! hover:text-white! focus:bg-transparent! focus:text-white! focus-visible:ring-0! focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-db-cyan data-[state=open]:bg-transparent! data-[state=open]:text-white! [&>svg]:hidden">
                  <NavItemChrome active={isActive}>[{label}]</NavItemChrome>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="z-60 mt-0! w-[165px]! rounded-none! border-0! bg-grey-12! p-4! font-sans shadow-none!">
                  <div className="flex flex-col gap-[18px]">
                    {PRODUCT_LINKS.map((product) => {
                      const isProductActive =
                        product.href === activeProductHref;

                      return (
                        <NavigationMenuLink
                          active={isProductActive}
                          asChild
                          className="block rounded-none! bg-transparent! p-0! font-sans text-sm leading-none tracking-tight text-grey-60 no-underline outline-none transition-colors hover:bg-transparent! hover:text-white hover:no-underline focus:bg-transparent! focus:text-white data-active:bg-transparent! data-active:text-orange data-active:hover:text-orange data-active:focus:text-orange"
                          key={product.href}
                        >
                          <Link
                            aria-current={isProductActive ? "page" : undefined}
                            to={product.href}
                          >
                            {product.label}
                          </Link>
                        </NavigationMenuLink>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          const isActive = isHrefActive(href, pathname);

          return (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink
                active={isActive}
                asChild
                className="block !rounded-none !bg-transparent !p-0 !text-white no-underline hover:!bg-transparent hover:!text-white hover:no-underline focus:!bg-transparent focus:!text-white data-[active=true]:!bg-transparent"
              >
                <Link to={href}>
                  <NavItemChrome active={isActive}>[{label}]</NavItemChrome>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Nav;
