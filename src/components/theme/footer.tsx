import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import type { ReactNode } from "react";

import { Icons } from "@/components/icons";
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
        label: "Lakebase",
        href: "https://www.databricks.com/product/lakebase",
      },
      {
        label: "AgentBricks",
        href: "https://www.databricks.com/product/artificial-intelligence/agent-bricks",
      },
      {
        label: "Databricks Apps",
        href: "https://www.databricks.com/product/databricks-apps",
      },
      {
        label: "Contact Sales",
        href: "https://www.databricks.com/company/contact",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Docs", to: "/docs/start-here" },
      { label: "Templates", to: "/templates" },
      { label: "Solutions", to: "/solutions" },
      {
        label: "Changelog",
        href: "https://docs.databricks.com/release-notes/",
      },
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
    label: "Discord",
    href: "https://discord.com/invite/databricks",
    icon: "discord",
  },
  {
    label: "Reddit",
    href: "https://www.reddit.com/r/databricks",
    icon: "reddit",
  },
  {
    label: "Databricks.com",
    href: "https://www.databricks.com",
    icon: "databricks",
  },
] as const;

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

function FooterLink({ item }: { item: FooterItem }): ReactNode {
  return (
    <Link
      to={item.to ?? (item.href as string)}
      target={item.href ? "_blank" : undefined}
      rel={item.href ? "noopener noreferrer" : undefined}
      className={linkClassName}
    >
      {item.label}
    </Link>
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
            <div className="flex-col gap-5 hidden lg:flex">
              <SystemStatus />
              <p className="text-[.8125rem] leading-none tracking-tight text-grey-40">
                © Databricks, Inc. All rights reserved
              </p>
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

          <div className="flex flex-col mt-5 gap-5 lg:hidden">
            <SystemStatus />
            <p className="text-sm leading-none font-medium tracking-tight text-grey-40">
              © Databricks, Inc. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default NewFooter;
