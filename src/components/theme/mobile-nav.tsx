import { useEffect, useId } from "react";
import type { ComponentProps } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { DocsSidebarSearch } from "@/components/docs/sidebar-search";

import {
  isHeaderNavItemActive,
  type HeaderNavItem,
} from "@/lib/header-navigation";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: readonly HeaderNavItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type MobileMenuButtonProps = {
  className?: string;
  label: string;
  open: boolean;
} & ComponentProps<"button">;

const MOBILE_CLOSE_DOT_POSITIONS = [
  [15.37, 7],
  [13.98, 8.38],
  [12.6, 9.77],
  [11.18, 11.18],
  [9.83, 12.54],
  [8.44, 13.92],
  [7.06, 15.31],
  [7, 7.06],
  [8.38, 8.44],
  [9.77, 9.83],
  [12.54, 12.6],
  [13.92, 13.98],
  [15.31, 15.37],
] as const;

function MobileMenuButton({
  className,
  label,
  open,
  ...props
}: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "-mr-2 inline-flex size-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-db-cyan",
        open
          ? "text-grey-12 hover:text-grey-12"
          : "text-white hover:text-white/85",
        className,
      )}
      {...props}
    >
      {open ? (
        <span className="relative size-6" aria-hidden="true">
          <span className="absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-current" />
          {MOBILE_CLOSE_DOT_POSITIONS.map(([left, top]) => (
            <span
              className="absolute size-[1.632px] bg-current"
              key={`${left}-${top}`}
              style={{ left, top }}
            />
          ))}
        </span>
      ) : (
        <span className="flex flex-col gap-1.75" aria-hidden="true">
          <span className="h-px w-6 bg-current" />
          <span className="h-px w-6 bg-current" />
          <span className="h-px w-6 bg-current" />
        </span>
      )}
      <span className="sr-only">{label}</span>
    </button>
  );
}

function MobileTreeLine({ className }: { className: string }) {
  return <span className={cn("absolute bg-grey-80", className)} aria-hidden />;
}

function MobileTreeText({
  active = false,
  activeFill = "content",
  children,
  className,
  to,
  ...props
}: {
  active?: boolean;
  activeFill?: "content" | "full";
  children: string;
  className?: string;
  to: string;
} & Omit<ComponentProps<typeof Link>, "children" | "className" | "to">) {
  return (
    <Link
      to={to}
      className={cn(
        "absolute block font-mono text-[20px] leading-none font-normal tracking-[-0.4px] whitespace-nowrap no-underline hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-db-cyan",
        active
          ? "text-grey-12 hover:text-grey-12"
          : "text-grey-80 hover:text-grey-80",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-block px-0.5 py-1",
          active && "bg-grey-80",
          activeFill === "full" && "block w-full",
        )}
        data-mobile-menu-item-label="true"
      >
        {children}
      </span>
    </Link>
  );
}

export function MobileNav({ items, open, onOpenChange }: MobileNavProps) {
  const menuId = useId();
  const { pathname } = useLocation();
  const isHomeActive = pathname === "/";

  useEffect(() => {
    onOpenChange(false);
  }, [onOpenChange, pathname]);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const updateMenuTop = () => {
      const header = document.querySelector("header");
      if (!header) return;
      root.style.setProperty(
        "--devhub-mobile-menu-top",
        `${Math.round(header.getBoundingClientRect().bottom)}px`,
      );
    };

    updateMenuTop();
    window.addEventListener("resize", updateMenuTop);
    window.addEventListener("scroll", updateMenuTop, { passive: true });

    return () => {
      window.removeEventListener("resize", updateMenuTop);
      window.removeEventListener("scroll", updateMenuTop);
      root.style.removeProperty("--devhub-mobile-menu-top");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const inertElements = Array.from(
      document.body.querySelectorAll<HTMLElement>(".main-wrapper, footer"),
    );
    const previousInertStates = inertElements.map((element) => ({
      element,
      ariaHidden: element.getAttribute("aria-hidden"),
      inert: element.inert,
    }));

    document.body.style.overflow = "hidden";

    inertElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousInertStates.forEach(({ element, ariaHidden, inert }) => {
        element.inert = inert;

        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });
    };
  }, [onOpenChange, open]);

  useEffect(() => {
    if (!open) return;

    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    function closeOnDesktop() {
      if (mediaQuery.matches) {
        onOpenChange(false);
      }
    }

    closeOnDesktop();
    mediaQuery.addEventListener("change", closeOnDesktop);

    return () => {
      mediaQuery.removeEventListener("change", closeOnDesktop);
    };
  }, [onOpenChange, open]);

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <MobileMenuButton
        className="ml-auto xl:hidden"
        label={open ? "Close menu" : "Open menu"}
        open={open}
        aria-controls={menuId}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      />
      {open && (
        <div
          id={menuId}
          className="fixed inset-x-0 top-[var(--devhub-mobile-menu-top)] bottom-0 z-40 overflow-y-auto bg-grey-12 text-grey-80 xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          data-state="open"
        >
          <nav
            className="relative w-full h-full flex justify-between font-mono text-[20px] leading-none font-normal tracking-[-0.4px]"
            aria-label="Main navigation"
          >
            {/*
              Product nav section temporarily removed while product pages are
              unpublished. This menu was reflowed (tree-line positions retuned)
              for the shorter HOME + Solutions/Templates/Docs list. To restore
              Product, revert this file to its pre-PR-114 version and uncomment
              the Product entry in header-navigation.ts.
            */}
            <MobileTreeLine className="top-[38px] left-[23px] h-[102px] w-px" />
            <MobileTreeLine className="top-[72px] left-6 h-px w-[37px] md:w-[39px]" />
            <MobileTreeLine className="top-[106px] left-6 h-px w-[37px] md:w-[39px]" />
            <MobileTreeLine className="top-[140px] left-6 h-px w-[37px] md:w-[39px]" />

            <MobileTreeText
              active={isHomeActive}
              activeFill="full"
              aria-current={isHomeActive ? "page" : undefined}
              className="top-3.5 left-5 right-5"
              to="/"
              data-mobile-menu-home="true"
            >
              ~/HOME
            </MobileTreeText>

            {items.map((item, index) => {
              const isActive = isHeaderNavItemActive(item, pathname);

              return (
                <MobileTreeText
                  active={isActive}
                  activeFill="full"
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "left-[61px] right-5 md:left-[63px] md:right-[22px]",
                    index === 0 && "top-[58px]",
                    index === 1 && "top-[92px]",
                    index === 2 && "top-[126px]",
                  )}
                  data-mobile-menu-section-link="true"
                  key={item.href}
                  to={item.href}
                >
                  {item.label.toLowerCase()}
                </MobileTreeText>
              );
            })}
            <div className="mt-auto w-full px-5 pb-5.5 md:px-6 md:pb-6">
              <DocsSidebarSearch
                iconClassName="size-4.5"
                triggerClassName="h-10 w-full justify-start rounded-none border border-grey-80 bg-transparent px-3 text-lg/tight font-mono font-normal tracking-tight text-grey-80 shadow-none hover:bg-white/5 hover:text-grey-80 focus-visible:border-db-cyan focus-visible:ring-0 lg:has-[>kbd]:!pr-1.5"
                triggerKbdClassName="hidden"
              />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
