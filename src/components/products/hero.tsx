import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { ArrowUpRight, FileText } from "lucide-react";

import { BenefitIcon } from "@/components/products/icons/benefit-icon";
import { SectionKicker } from "@/components/products/section-kicker";
import { Button } from "@/components/ui/button";
import type { ProductPageContent } from "@/lib/products/product-page";

type HeroProps = {
  content: ProductPageContent;
};

type HeroAction = ProductPageContent["hero"]["actions"][number];

function HighlightedProductTitle({
  highlight,
  title,
}: {
  highlight: string;
  title: string;
}) {
  const remainder = title.startsWith(highlight)
    ? title.slice(highlight.length)
    : title;

  return (
    <>
      {title.startsWith(highlight) ? (
        <span className="text-db-lava-light">{highlight}</span>
      ) : null}
      {remainder}
    </>
  );
}

function HeroActionLink({ action }: { action: HeroAction }) {
  if (action.variant === "primary") {
    return (
      <Button
        asChild
        className="group h-auto min-h-11 max-w-full rounded-none bg-transparent p-0 font-mono text-base/none font-medium uppercase tracking-normal text-black shadow-none gap-x-0.5 hover:bg-transparent"
      >
        <Link
          className="inline-flex max-w-full items-stretch no-underline gap-x-0.5 hover:no-underline"
          to={action.href}
        >
          <span className="flex min-h-11 min-w-0 items-center bg-white px-5 py-3 leading-tight -tracking-[0.32px] whitespace-normal sm:whitespace-nowrap group-hover:bg-white/90">
            {action.label}
          </span>
          <span className="grid min-h-11 w-11 shrink-0 place-items-center bg-white">
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </span>
        </Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      className="h-auto min-h-11 w-fit max-w-full gap-4.5 rounded-none border-0 bg-[#2e3038] px-0 font-mono text-base/none font-medium uppercase tracking-normal text-white shadow-none pl-7 pr-6 hover:bg-[#343741]"
    >
      <Link
        className="inline-flex items-center gap-4.5 no-underline hover:no-underline -tracking-[0.32px]"
        to={action.href}
      >
        {action.label}
        <span className="grid size-4 place-items-center">
          <FileText className="size-4" aria-hidden="true" />
        </span>
      </Link>
    </Button>
  );
}

export function Hero({ content }: HeroProps) {
  const image = content.hero.image;
  const src = useBaseUrl(image.src);
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="relative mx-auto flex w-full max-w-304 flex-col px-5 pb-20 pt-9 md:px-8 md:pb-28 xl:px-0 lg:pb-60">
        <div className="relative w-full">
          <img
            alt={image.alt}
            className="block h-auto w-full"
            decoding="async"
            fetchPriority="high"
            height={image.height}
            loading="eager"
            src={src}
            width={image.width}
          />
          <div className="absolute -bottom-8 h-40 lg:h-71.5 w-full bg-[linear-gradient(180deg,rgba(4,4,6,0.00)_0%,#040406_60%)]" />
        </div>

        <header className="lg:-mt-12.5 relative">
          <h1 className="max-w-241.5 font-heading text-4xl font-normal tracking-normal text-white md:text-6xl lg:text-[56px] leading-none">
            <HighlightedProductTitle
              highlight={content.hero.highlightedTitle}
              title={`${content.hero.highlightedTitle} ${content.hero.title}`}
            />
          </h1>
          <div className="mt-5 flex flex-col lg:flex-row gap-7 border-t border-white/16 pt-5 lg:items-start lg:justify-between">
            <div className="flex flex-col gap-4 items-start sm:flex-row sm:items-center sm:gap-5">
              {content.hero.actions.map((action) => (
                <HeroActionLink action={action} key={action.label} />
              ))}
            </div>
            <p className="max-w-85 text-base/tight text-grey-70 lg:mt-1 lg:justify-self-end">
              {content.hero.description}
            </p>
          </div>
        </header>

        <section
          className="mt-36 md:mt-[194px]"
          aria-labelledby="product-benefits"
        >
          <SectionKicker className="text-grey-60">
            {content.benefitsIntro.eyebrow}
          </SectionKicker>
          <h2
            className="mt-8 max-w-304 font-sans text-3xl/tight font-normal tracking-normal md:text-[44px]"
            id="product-benefits"
          >
            {content.benefitsIntro.title}{" "}
            <span className="text-grey-70">
              {content.benefitsIntro.description}
            </span>
          </h2>
          <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {content.benefits.map(({ description, icon, title }) => (
              <article
                className="relative min-h-64 overflow-hidden border border-[#9194a1] bg-black p-7"
                key={title}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgb(255_255_255/0.035)_0px,rgb(255_255_255/0.035)_1px,transparent_1px,transparent_8px)]"
                />
                <div className="relative">
                  <BenefitIcon icon={icon} />
                  <h3 className="mt-30 text-2xl/tight font-medium tracking-normal text-white md:text-[28px]">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-80 text-base text-grey-70 -tracking-[0.5px] md:text-xl text-pretty">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
