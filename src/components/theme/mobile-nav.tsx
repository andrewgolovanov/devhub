import { useEffect, useId, useState } from "react";
import type { ComponentProps } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { ChevronUp } from "lucide-react";

import {
  getActiveProductHref,
  isHrefActive,
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
} & ComponentProps<"button">;

function MobileMenuButton({
  className,
  label,
  ...props
}: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "-mr-2 inline-flex size-10 items-center justify-center text-white transition-colors hover:text-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-db-cyan",
        className,
      )}
      {...props}
    >
      <span className="flex flex-col gap-1.75">
        <span className="h-px w-6 bg-white" />
        <span className="h-px w-6 bg-white" />
        <span className="h-px w-6 bg-white" />
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}

function MobileSectionLabel({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-lg leading-none font-normal tracking-[-0.36px] text-white md:text-xl md:tracking-[-0.4px]",
        className,
      )}
    >
      [{children}]
    </span>
  );
}

export function MobileNav({ items, open, onOpenChange }: MobileNavProps) {
  const [productOpen, setProductOpen] = useState(true);
  const menuId = useId();
  const { pathname } = useLocation();
  const activeProductHref = getActiveProductHref(pathname);
  const highlightedProductHref = activeProductHref ?? PRODUCT_LINKS[0]?.href;
  const productItem = items.find(({ label }) => label === "Product");
  const sectionItems = items.filter(({ label }) => label !== "Product");

  useEffect(() => {
    onOpenChange(false);
  }, [onOpenChange, pathname]);

  useEffect(() => {
    if (activeProductHref) {
      setProductOpen(true);
    }
  }, [activeProductHref]);

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
        aria-controls={menuId}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      />
      {open && (
        <div
          id={menuId}
          className="fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col overflow-y-auto bg-black px-5 pt-8 pb-12 text-white md:gap-7 xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          data-state="open"
        >
          <nav
            className="flex w-full flex-col gap-6 md:gap-7"
            aria-label="Main navigation"
          >
            <section className="flex w-full flex-col gap-6 md:gap-7">
              <button
                type="button"
                className="flex h-6 w-full items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan"
                aria-expanded={productOpen}
                onClick={() => setProductOpen((current) => !current)}
              >
                <MobileSectionLabel>{productItem.label}</MobileSectionLabel>
                <ChevronUp
                  className={cn(
                    "size-6 shrink-0 text-grey-70 transition-transform duration-200",
                    !productOpen && "rotate-180",
                  )}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </button>
              {productOpen && (
                <ul className="flex list-none flex-col gap-6 p-0 font-sans text-sm leading-none font-normal tracking-[-0.28px] md:text-base md:tracking-[-0.32px]">
                  {PRODUCT_LINKS.map((product) => {
                    const isActive = product.href === activeProductHref;
                    const isHighlighted =
                      product.href === highlightedProductHref;

                    return (
                      <li key={product.href} className="m-0 p-0">
                        <Link
                          to={product.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "block no-underline transition-colors hover:text-white hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan",
                            isHighlighted ? "text-grey-70" : "text-grey-60",
                          )}
                        >
                          {product.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
            <div className="flex w-full flex-col gap-6 md:gap-7">
              {sectionItems.map((item) => {
                const isActive = isHrefActive(item.href, pathname);

                return (
                  <section
                    className="flex w-full flex-col gap-6 md:gap-7"
                    key={item.href}
                  >
                    <div className="h-px w-full bg-grey-20" aria-hidden />
                    <Link
                      to={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className="block w-fit no-underline hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan"
                    >
                      <MobileSectionLabel>{item.label}</MobileSectionLabel>
                    </Link>
                  </section>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
