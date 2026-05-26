import Link from "@docusaurus/Link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Example, Recipe, Cookbook } from "@/lib/recipes/recipes";
import { FallbackCardArt } from "@/components/examples/fallback-card-art";
import { TemplatePreviewImage } from "@/components/examples/template-preview-image";
import { cn } from "@site/src/lib/utils";

export type TemplateItem =
  | { kind: "example"; data: Example }
  | { kind: "cookbook"; data: Cookbook }
  | { kind: "recipe"; data: Recipe };

function getTemplateHref(item: TemplateItem): string {
  return `/templates/${item.data.id}`;
}

function getTemplateLabel(item: TemplateItem): string {
  if (item.kind === "example") return "Solution Apps";
  if (item.kind === "cookbook") return "Template";
  return item.data.services[0] ?? "Template";
}

function getTemplateCardFields(item: TemplateItem) {
  return {
    name: item.data.name,
    description: item.data.description,
    href: getTemplateHref(item),
    lightUrl: item.data.previewImageLightUrl,
    darkUrl: item.data.previewImageDarkUrl,
    label: getTemplateLabel(item),
  };
}

export function TemplateCard({
  item,
  index,
  isLast,
}: {
  item: TemplateItem;
  index: number;
  isLast: boolean;
}) {
  const { name, description, href, label } = getTemplateCardFields(item);

  return (
    <article
      className={cn(
        "grid min-w-0 gap-8 text-black no-underline transition-colors hover:text-black hover:no-underline md:grid-cols-[minmax(0,36rem)_36rem] md:items-stretch md:gap-20",
        index > 0 && "pt-14 border-t border-grey-80",
        !isLast && "pb-14",
      )}
    >
      <div className="flex min-h-70 flex-col justify-between">
        <p className="font-mono text-sm flex items-center gap-1.5 leading-none font-medium tracking-tight text-black/30 uppercase">
          <span className="size-1.5 bg-orange" aria-hidden="true" />[{label}]
        </p>

        <h2 className="m-0 mt-20 md:mt-auto">
          <Link
            className="text-2xl leading-tight font-normal tracking-[-0.04em] text-balance md:text-[1.75rem]"
            to={href}
          >
            {name}. <span className="text-black/30">[{description}]</span>
          </Link>
        </h2>
      </div>

      <Link className="block" to={href}>
        <div className="relative aspect-video min-w-0 max-w-full overflow-hidden border border-db-navy bg-db-oat-medium transition-colors group-hover:border-orange dark:border-white/15 dark:bg-white/5 md:h-[324px] md:w-[576px] md:aspect-auto">
          {/* TODO: add graphcs */}
          <span className="absolute top-0 right-0 flex size-11 items-center justify-center bg-orange text-black opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function TemplateCompactCard({
  item,
  index,
}: {
  item: TemplateItem;
  index: number;
}) {
  const { name, description, href, lightUrl, darkUrl, label } =
    getTemplateCardFields(item);

  return (
    <Link
      className="group flex w-full min-w-0 flex-col text-black no-underline hover:text-black hover:no-underline dark:text-white dark:hover:text-white"
      to={href}
    >
      <div className="h-16 w-full aspect-video"></div>
      <h3 className="mt-5 mb-0 text-2xl leading-tight font-normal tracking-tight">
        {name}.{" "}
        <span className="text-black/55 dark:text-grey-70">{description}</span>
      </h3>
      <div className="mt-5 flex items-center gap-1.5">
        <span className="size-1.5 bg-orange" aria-hidden="true" />
        <p className="m-0 font-mono text-sm leading-none font-medium tracking-normal text-grey-40 uppercase dark:text-grey-60">
          [{label}]
        </p>
      </div>
    </Link>
  );
}
