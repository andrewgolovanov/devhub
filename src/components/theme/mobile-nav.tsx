import { useEffect, useId } from "react";
import type { ComponentProps } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";

import {
  getActiveProductHref,
  isHeaderNavItemActive,
  PRODUCT_LINKS,
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
  const activeProductHref = getActiveProductHref(pathname);
  const isHomeActive = pathname === "/";
  const productItem = items.find(({ label }) => label === "Product");
  const sectionItems = items.filter(({ label }) => label !== "Product");

  useEffect(() => {
    onOpenChange(false);
  }, [onOpenChange, pathname]);

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

  if (!productItem || items.length === 0) {
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
          className="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto bg-grey-12 text-grey-80 xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          data-state="open"
        >
          <nav
            className="relative min-h-[610px] w-full font-mono text-[20px] leading-none font-normal tracking-[-0.4px]"
            aria-label="Main navigation"
          >
            <MobileTreeLine className="top-[38px] left-[23px] h-[226px] w-px" />
            <MobileTreeLine className="top-[58px] left-6 h-px w-[37px]" />
            <MobileTreeLine className="top-[90px] left-[63px] h-px w-[37px]" />
            <MobileTreeLine className="top-[124px] left-[63px] h-px w-[37px]" />
            <MobileTreeLine className="top-[158px] left-[63px] h-px w-[37px]" />
            <MobileTreeLine className="top-[194px] left-6 h-px w-[37px] md:w-[39px]" />
            <MobileTreeLine className="top-[228px] left-6 h-px w-[37px] md:w-[39px]" />
            <MobileTreeLine className="top-[264px] left-6 h-px w-[37px] md:w-[39px]" />
            <MobileTreeLine className="top-[72px] left-[63px] h-[86px] w-px md:top-[73px] md:h-[85px]" />

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

            <span
              className="absolute top-[46px] left-[61px] flex h-6 items-center text-grey-80 opacity-60"
              data-mobile-menu-product-label="true"
            >
              {productItem.label.toLowerCase()}
            </span>

            {PRODUCT_LINKS.map((product, index) => {
              const isActive = product.href === activeProductHref;

              return (
                <MobileTreeText
                  active={isActive}
                  activeFill="full"
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "left-[100px] right-5",
                    index === 0 && "top-[76px]",
                    index === 1 && "top-[110px]",
                    index === 2 && "top-36",
                  )}
                  data-mobile-menu-product-link="true"
                  key={product.href}
                  to={product.href}
                >
                  {product.label.toLowerCase()}
                </MobileTreeText>
              );
            })}

            {sectionItems.map((item, index) => {
              const isActive = isHeaderNavItemActive(item, pathname);

              return (
                <MobileTreeText
                  active={isActive}
                  activeFill="full"
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "left-[61px] right-5 md:left-[63px] md:right-[22px]",
                    index === 0 && "top-[180px]",
                    index === 1 && "top-[214px]",
                    index === 2 && "top-[248px]",
                  )}
                  data-mobile-menu-section-link="true"
                  key={item.href}
                  to={item.href}
                >
                  {item.label.toLowerCase()}
                </MobileTreeText>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
