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
        className="group h-auto min-h-10 w-full max-w-full rounded-none bg-transparent p-0 font-mono text-sm/none font-medium uppercase tracking-normal text-black shadow-none gap-x-0.5 hover:bg-transparent sm:w-auto lg:min-h-11 lg:text-base/none"
      >
        <Link
          className="inline-flex w-full max-w-full items-stretch no-underline gap-x-0.5 hover:no-underline sm:w-auto"
          to={action.href}
        >
          <span className="flex min-h-10 min-w-0 flex-1 items-center justify-center bg-white px-4 py-2 text-center leading-tight -tracking-[0.32px] whitespace-normal sm:flex-none sm:justify-start sm:text-left sm:whitespace-nowrap group-hover:bg-white/90 lg:min-h-11 lg:px-5 lg:py-3">
            {action.label}
          </span>
          <span className="grid min-h-10 w-10 shrink-0 place-items-center bg-white lg:min-h-11 lg:w-11">
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </span>
        </Link>
      </Button>
    );
  }

  return (
    <Button
      asChild
      className="h-auto min-h-10 w-full max-w-full gap-3 rounded-none border-0 bg-[#2e3038] px-0 font-mono text-sm/none font-medium uppercase tracking-normal text-white shadow-none pl-5 pr-4 hover:bg-[#343741] sm:w-fit lg:min-h-11 lg:gap-4.5 lg:text-base/none lg:pl-7 lg:pr-6"
    >
      <Link
        className="flex w-full items-center justify-between gap-4.5 no-underline hover:no-underline -tracking-[0.32px] sm:inline-flex sm:w-auto sm:justify-start"
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
      <div className="relative mx-auto flex w-full max-w-304 flex-col px-5 pb-24 pt-9 md:px-8 md:pb-32 xl:px-0 lg:pb-40">
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
          <div className="absolute -bottom-[72px] h-40 w-full bg-[linear-gradient(180deg,rgba(4,4,6,0.00)_0%,#040406_60%)] sm:-bottom-8 lg:h-71.5" />
        </div>

        <header className="lg:-mt-12.5 relative">
          <h1 className="max-w-241.5 font-heading text-[32px] font-normal leading-[0.95] tracking-normal text-white md:text-[40px] lg:text-5xl xl:text-[56px]">
            <HighlightedProductTitle
              highlight={content.hero.highlightedTitle}
              title={`${content.hero.highlightedTitle} ${content.hero.title}`}
            />
          </h1>
          <div className="mt-5 flex flex-col gap-7 border-t border-white/16 pt-5 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
              {content.hero.actions.map((action) => (
                <HeroActionLink action={action} key={action.label} />
              ))}
            </div>
            <p className="max-w-85 text-base/tight text-grey-70 lg:mt-1 lg:text-right lg:justify-self-end">
              {content.hero.description}
            </p>
          </div>
        </header>

        <section
          className="mt-24 md:mt-32 lg:mt-40"
          aria-labelledby="product-benefits"
        >
          <SectionKicker className="text-grey-60">
            {content.benefitsIntro.eyebrow}
          </SectionKicker>
          <h2
            className="mt-6 max-w-304 font-sans text-[28px]/tight font-normal tracking-normal md:mt-8 md:text-[32px] lg:mt-7 lg:text-[40px] 2xl:text-[44px]"
            id="product-benefits"
          >
            {content.benefitsIntro.title}{" "}
            <span className="text-grey-70">
              {content.benefitsIntro.description}
            </span>
          </h2>
          <div className="mt-11 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-3 lg:mt-12 lg:gap-8">
            {content.benefits.map(({ description, icon, title }) => (
              <article
                className="relative min-h-0 overflow-hidden border border-[#9194a1] bg-black p-[18px] md:min-h-64 md:p-5 lg:p-6"
                key={title}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,rgb(255_255_255/0.035)_0px,rgb(255_255_255/0.035)_1px,transparent_1px,transparent_8px)]"
                />
                <div className="relative">
                  <BenefitIcon icon={icon} />
                  <h3 className="mt-12 text-[18px]/tight font-medium tracking-normal text-white md:mt-[60px] md:text-xl lg:mt-18 lg:text-2xl xl:text-[28px] 2xl:mt-30">
                    {title}
                  </h3>
                  <p className="mt-[6px] max-w-80 text-base text-grey-70 -tracking-[0.5px] md:mt-2 md:max-w-[400px] md:text-[18px] lg:mt-2.5 lg:text-[18px] xl:mt-3 xl:text-xl text-pretty">
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
