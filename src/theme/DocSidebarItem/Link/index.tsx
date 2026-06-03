import { type ReactNode } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { isActiveSidebarItem } from "@docusaurus/plugin-content-docs/client";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";
import type { Props } from "@theme/DocSidebarItem/Link";

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  ...props
}: Props): ReactNode {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        "menu__list-item my-0",
        className,
      )}
      key={label}
    >
      <Link
        className={clsx(
          "menu__link",
          "relative !rounded-none !border-none !px-2 !py-1.5 !text-[13px] !font-normal !leading-snug transition-colors duration-150",
          "!bg-transparent !text-grey-70 hover:!bg-transparent hover:!text-white",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          !isInternalLink && "items-center",
          isActive && [
            "menu__link--active",
            "!font-normal !text-orange hover:!text-orange",
            "!bg-transparent hover:!bg-transparent",
          ],
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? "page" : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        <span title={label} className="overflow-hidden line-clamp-2">
          {label}
        </span>
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
