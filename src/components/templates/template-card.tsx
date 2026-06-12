import Link from "@docusaurus/Link";
import type { Example, Recipe, Cookbook } from "@/lib/recipes/recipes";
import { FallbackCardArt } from "@/components/examples/fallback-card-art";
import { TemplatePreviewImage } from "@/components/examples/template-preview-image";

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
}: {
  item: TemplateItem;
  index: number;
}) {
  const { name, description, href, lightUrl, darkUrl, label } =
    getTemplateCardFields(item);

  return (
    <article className="min-w-0 text-black">
      <Link
        className="group flex min-w-0 flex-col gap-6 no-underline hover:no-underline"
        to={href}
        aria-label={`Read ${name}`}
      >
        <div className="relative aspect-video min-w-0 overflow-hidden border border-db-navy bg-db-oat-medium">
          <TemplatePreviewImage
            lightUrl={lightUrl}
            darkUrl={darkUrl}
            alt={`${name} preview`}
            fallback={<FallbackCardArt index={index} />}
          />
          <span className="absolute top-0 right-0 z-10 flex size-11 items-center justify-center bg-orange opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            <img
              className="size-6"
              src="/img/templates/arrow-right-up.svg"
              alt=""
              aria-hidden="true"
            />
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <p className="m-0 flex items-center gap-1.5 font-mono text-[13px] leading-none font-medium tracking-tight text-black/30 uppercase lg:text-sm">
            <span className="size-1.5 bg-orange" aria-hidden="true" />[{label}]
          </p>
          <h2 className="m-0 line-clamp-4 text-xl/tight text-black/30 font-normal tracking-[-0.04em] text-balance md:text-2xl/tight">
            <span className="text-black">{name}.</span> [{description}]
          </h2>
        </div>
      </Link>
    </article>
  );
}
