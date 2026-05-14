import { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Icons } from "@/components/icons";
import Nav from "./nav";

interface NewHeaderProps {
  className?: string;
}

const HEADER_LINKS = [
  { label: "Product", href: "https://www.databricks.com/product" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/templates" },
  { label: "Docs", href: "/docs/start-here" },
] as const;

export function NewHeader({ className }: NewHeaderProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const logoSrc = useBaseUrl("/img/databricks-logo.svg");

  useEffect(() => {
    if (!triggerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(!entry.isIntersecting);
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
          "sticky top-0 z-50 flex min-h-16 items-center border-b border-transparent bg-black backdrop-blur py-3.5",
          isIntersecting && "border-white/4",
          className,
        )}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-400 items-center justify-between px-5 md:px-8 lg:justify-start">
          <Link
            to="/"
            className="flex shrink-0 items-center no-underline hover:no-underline"
            aria-label="Databricks Developer home"
          >
            <img
              src={logoSrc}
              alt=""
              className="block h-7 w-auto shrink-0"
              loading="eager"
              height={28}
              width={177}
            />
          </Link>
          <Nav className="ml-19.5 hidden xl:flex" items={HEADER_LINKS} />
          <div className="hidden grow items-center justify-end gap-x-6 md:flex">
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
                to="/docs/start-here"
                className="no-underline hover:no-underline"
              >
                Get started for free
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

export default NewHeader;
