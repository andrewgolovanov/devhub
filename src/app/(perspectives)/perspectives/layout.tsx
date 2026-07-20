import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { COPYRIGHT_LINE, LEGAL_LINKS } from "@/lib/legal-links";

export default function PerspectivesLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 w-full items-center bg-black xl:h-auto xl:min-h-16 xl:py-3.5">
        <div className="relative mx-auto w-full max-w-4xl px-5 text-white md:px-8">
          <Link
            aria-label="Databricks Developer home"
            className="inline-flex max-w-48 rounded lg:mr-auto"
            href="/"
          >
            <Image
              alt=""
              className="h-7 w-auto"
              height={28}
              src="/img/databricks-logo.svg"
              width={177}
              loading="eager"
            />
          </Link>
        </div>
      </header>
      <main className="min-h-screen bg-black text-white">{children}</main>
      <footer className="relative mx-auto max-w-4xl bg-black px-5 text-white md:px-8">
        <div className="flex flex-col justify-between self-stretch border-t border-white/10 py-12">
          <p className="text-grey-40 max-w-md text-sm leading-normal font-medium tracking-tight md:text-[0.8125rem]">
            {COPYRIGHT_LINE}
          </p>
          <nav
            aria-label="Legal links"
            className="mt-5 flex flex-wrap gap-x-4 gap-y-3"
          >
            {LEGAL_LINKS.map((link) => (
              <Link
                className="text-grey-40 hover:text-grey-70 focus-visible:outline-db-cyan inline-flex w-fit items-center rounded-sm text-[0.8125rem] leading-none tracking-tight no-underline transition-colors hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4"
                key={link.label}
                rel="noopener noreferrer"
                target="_blank"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-grey-40 mt-8 space-y-2 border-t border-white/10 pt-4 text-xs leading-relaxed">
            <p className="m-0">
              This site contains AI-generated content, which may have errors,
              omissions or inaccuracies. Verify information before relying on
              it. Use at your own risk.
            </p>
            <p className="m-0">
              The AI-generated content may contain materials that others own.
              Except as permitted for agentic workflow assistance, do not copy,
              modify, distribute, display, license, or sell it without the
              owner&apos;s consent.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
