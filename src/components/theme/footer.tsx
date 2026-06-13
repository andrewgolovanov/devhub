import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import type { ReactNode } from "react";

import { Icons } from "@/components/icons";
import { COPYRIGHT_LINE } from "@/lib/legal-links";
import { cn } from "@/lib/utils";
import SystemStatus from "./system-status";

type FooterItem = {
  label: string;
  to?: string;
  href?: string;
};

type FooterSection = {
  label: string;
  items: FooterItem[];
};

const FOOTER_SECTIONS: FooterSection[] = [
  {
    label: "Products",
    items: [
      {
        label: "Databricks Apps",
        href: "https://www.databricks.com/product/databricks-apps",
      },
      {
        label: "Lakebase",
        href: "https://www.databricks.com/product/lakebase",
      },
      {
        label: "Agent Bricks",
        href: "https://www.databricks.com/product/artificial-intelligence/agent-bricks",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Docs", to: "/docs/start-here" },
      { label: "Templates", to: "/templates" },
      { label: "Solutions", to: "/solutions" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/databricks/devhub",
    icon: "github",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@Databricks",
    icon: "youtube",
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/r/databricks/",
    icon: "reddit",
  },
  {
    label: "Databricks.com",
    href: "https://www.databricks.com",
    icon: "databricks",
  },
] as const;

const LEGAL_LINKS: FooterItem[] = [
  {
    label: "Privacy Notice",
    href: "https://www.databricks.com/legal/privacynotice",
  },
  {
    label: "Terms of Use",
    href: "https://www.databricks.com/legal/terms-of-use",
  },
  {
    label: "Modern Slavery Statement",
    href: "https://www.databricks.com/legal/modern-slavery-policy-statement",
  },
  {
    label: "California Privacy",
    href: "https://www.databricks.com/legal/supplemental-privacy-notice-california-residents",
  },
];

type SocialIcon = keyof typeof Icons;

function resolveSocialLabel(label: string): string {
  const normalized = label.replace(/^follow us on\s+/i, "").trim();
  return normalized.length > 0 ? normalized : label;
}

const linkClassName = cn(
  "inline-flex items-center gap-1.5 w-fit font-sans text-[15px] leading-none tracking-tight no-underline transition-colors hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan",
  "text-grey-60 hover:text-white",
);

const SocialItem = ({
  href,
  icon,
  label,
}: FooterItem & { icon: SocialIcon }) => {
  const Icon = Icons[icon];
  const resolvedLabel = resolveSocialLabel(label);

  return (
    <Link
      className={cn(linkClassName, "group inline-flex gap-2.5 font-normal")}
      to={href as string}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="size-4" size={14} aria-hidden="true" />
      <span>{resolvedLabel}</span>
    </Link>
  );
};

function ExternalLinkArrow({ className }: { className?: string }): ReactNode {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 15L15 5M8.5 5H15V11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FooterLink({ item }: { item: FooterItem }): ReactNode {
  return (
    <Link
      to={item.to ?? (item.href as string)}
      target={item.href ? "_blank" : undefined}
      rel={item.href ? "noopener noreferrer" : undefined}
      className={linkClassName}
    >
      {item.label}
      {item.href ? <ExternalLinkArrow className="size-3.5 shrink-0" /> : null}
    </Link>
  );
}

function FooterLegalLinks({ className }: { className?: string }): ReactNode {
  return (
    <nav
      className={cn("mt-2.5 flex flex-wrap gap-x-4 gap-y-3", className)}
      aria-label="Legal links"
    >
      {LEGAL_LINKS.map((item) => (
        <Link
          key={item.label}
          to={item.to ?? (item.href as string)}
          target="_blank"
          className={cn(
            "inline-flex items-center w-fit text-[0.8125rem] leading-none tracking-tight no-underline transition-colors hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-db-cyan",
            "text-grey-40 hover:text-grey-70",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function NewFooter({ className }: { className?: string }) {
  const logoSrc = useBaseUrl("/img/databricks-logo.svg");

  return (
    <footer className={cn("relative bg-black text-white py-12", className)}>
      <div className="mx-auto w-full max-w-400 px-5 md:px-8">
        <div className="flex flex-col items-start gap-x-16 gap-y-10 lg:flex-row lg:flex-wrap lg:justify-between xl:gap-x-20">
          <div className="self-stretch flex flex-col justify-between">
            <Link
              className="inline-flex max-w-48 rounded lg:mr-auto"
              aria-label="Databricks Developer home"
              to="/"
            >
              <img
                src={logoSrc}
                alt=""
                className="h-7 w-auto"
                width={177}
                height={28}
                loading="lazy"
              />
            </Link>
            <div className="flex-col hidden lg:flex">
              <SystemStatus />
              <p className="mt-5 max-w-md text-sm leading-normal font-medium tracking-tight text-grey-40 lg:text-[.8125rem] lg:font-normal">
                {COPYRIGHT_LINE}
              </p>
              <FooterLegalLinks />
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-12 md:grid-cols-3 md:gap-8 lg:flex lg:w-fit lg:flex-wrap xl:gap-22">
            {FOOTER_SECTIONS.map((column, columnIndex) => (
              <div
                className="flex flex-1 flex-col gap-7 min-w-0 md:min-w-37"
                key={`${column.label}-${columnIndex}`}
              >
                <span className="font-sans tracking-normal leading-none text-white uppercase text-[.625rem]">
                  {column.label}
                </span>
                <div className="flex flex-col gap-5">
                  {column.items.map((item) => (
                    <FooterLink item={item} key={item.label} />
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-1 flex-col gap-7 min-w-0 md:min-w-37">
              <span className="font-sans tracking-normal leading-none text-white uppercase text-[.625rem]">
                COMMUNITY
              </span>
              <div className="flex flex-col gap-5">
                {SOCIAL_LINKS.map((link, index) => (
                  <SocialItem key={index} {...link} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-5 lg:hidden">
            <SystemStatus />
            <p className="mt-5 text-sm leading-normal font-medium tracking-tight text-grey-40">
              {COPYRIGHT_LINE}
            </p>
            <FooterLegalLinks className="mt-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default NewFooter;
