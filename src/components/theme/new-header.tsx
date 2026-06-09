import { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import { HEADER_LINKS } from "@/lib/header-navigation";
import { MobileNav } from "./mobile-nav";
import Nav from "./nav";

interface NewHeaderProps {
  className?: string;
}

export function NewHeader({ className }: NewHeaderProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const logoSrc = useBaseUrl("/img/databricks-logo.svg");
  const { pathname } = useLocation();
  const isHomepage = pathname === "/";

  useEffect(() => {
    if (!triggerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      },
    );

    observer.observe(triggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none -mt-px h-px w-full"
        ref={triggerRef}
        aria-hidden="true"
      />
      <header
        className={cn(
          "sticky top-0 z-50 flex h-14 items-center xl:h-auto xl:min-h-16 xl:border-b xl:border-transparent xl:py-3.5",
          mobileMenuOpen
            ? "bg-grey-80"
            : (!isHomepage || hasScrolled) && "bg-black backdrop-blur",
          hasScrolled && !mobileMenuOpen && "xl:border-white/4",
          className,
        )}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-400 items-center justify-between px-5 xl:justify-start xl:px-8">
          <Link
            to="/"
            className="flex shrink-0 items-center no-underline hover:no-underline"
            aria-label="Databricks Developer home"
          >
            <img
              src={logoSrc}
              alt=""
              className={cn(
                "block h-6 w-auto shrink-0 xl:h-7",
                mobileMenuOpen && "brightness-0",
              )}
              loading="eager"
              height={28}
              width={177}
            />
          </Link>
          <Nav className="ml-19.5 hidden xl:flex" items={HEADER_LINKS} />
          <div className="hidden grow items-center justify-end gap-x-6 xl:flex">
            <Link
              to="https://discord.com/invite/databricks"
              className="hidden items-center gap-1.5 font-mono text-sm leading-tight font-medium tracking-tight text-white no-underline hover:text-white/85 hover:no-underline xl:inline-flex"
            >
              <Icons.discord className="size-4" aria-hidden="true" />
              Discord
            </Link>
            <Link
              to="https://github.com/databricks/devhub"
              className="hidden items-center gap-1.5 font-mono text-sm leading-tight font-medium tracking-tight text-white no-underline hover:text-white/85 hover:no-underline xl:inline-flex"
            >
              <Icons.github className="size-4" aria-hidden="true" />
              11,7k
            </Link>
            <Button
              asChild
              className="h-9 rounded-none bg-white px-4.5 font-mono text-sm font-medium tracking-tight text-black shadow-none hover:bg-white/90"
            >
              <Link
                className="no-underline uppercase hover:no-underline"
                to="https://databricks.com/signup"
                target="_blank"
              >
                Try Databricks
              </Link>
            </Button>
          </div>
          <MobileNav
            items={HEADER_LINKS}
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
          />
        </div>
      </header>
    </>
  );
}
