import Link from "@docusaurus/Link";
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

export function getTemplateCardFields(item: TemplateItem) {
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
  const { name, description, href, lightUrl, darkUrl, label } =
    getTemplateCardFields(item);

  return (
    <article
      className={cn(
        "grid min-w-0 gap-5 text-black no-underline transition-colors hover:text-black hover:no-underline md:gap-8 md:grid-cols-[minmax(0,32rem)_minmax(0,36rem)] md:items-stretch xl:gap-16",
        index > 0 && "border-t border-grey-80 pt-8 md:pt-12",
        !isLast && "pb-8 md:pb-12",
      )}
    >
      <span className="mb-0 col-start-1 flex items-center gap-1.5 font-mono text-[13px] leading-none font-medium tracking-tight text-black/30 uppercase md:mb-4 md:self-start lg:text-sm">
        <span className="size-1.5 bg-orange" aria-hidden="true" />[{label}]
      </span>

      <h2 className="peer m-0 md:mt-auto col-start-1">
        <Link
          className="line-clamp-3 text-xl/tight text-black/30 font-normal tracking-[-0.04em] text-balance md:text-2xl/tight xl:text-[1.75rem] xl:line-clamp-4 2xl:line-clamp-5"
          to={href}
        >
          <span className="text-black">{name}.</span> [{description}]
        </Link>
      </h2>

      <div className="flex w-full items-center justify-center peer-hover:[&_span]:opacity-100 md:row-start-1 md:col-start-2 md:row-span-2">
        <Link className="block group w-full" to={href}>
          <div className="relative aspect-video min-w-0 max-w-full overflow-hidden border border-db-navy bg-db-oat-medium">
            <TemplatePreviewImage
              lightUrl={lightUrl}
              darkUrl={darkUrl}
              alt={`${name} preview`}
              fallback={<FallbackCardArt index={index} />}
            />
            <span className="absolute top-0 right-0 z-10 flex size-11 items-center justify-center bg-orange opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <img
                className="size-6"
                src="/img/templates/arrow-right-up.svg"
                alt=""
                aria-hidden="true"
              />
            </span>
          </div>
        </Link>
      </div>
    </article>
  );
}
