import { SectionKicker } from "@/components/products/section-kicker";
import type {
  ProductFeature,
  ProductPageContent,
} from "@/lib/products/product-page";

type ProductFeaturesProps = {
  content: ProductPageContent;
};

const featureVisualSrc = {
  branching: "/img/products/features/branching.svg",
  autoscaling: "/img/products/features/autoscaling.svg",
  "lakehouse-sync": "/img/products/features/lakehouse-sync.svg",
  "multi-model": "/img/products/features/multi-model.png",
  "built-in": "/img/products/features/built-in.png",
  "secure-data": "/img/products/features/secure-data.png",
  serverless: "/img/products/features/serverless.svg",
  auth: "/img/products/features/auth.svg",
  integrations: "/img/products/features/integrations.svg",
} satisfies Partial<Record<ProductFeature["visual"], string>>;

function FeatureRow({ feature }: { feature: ProductFeature }) {
  const src = featureVisualSrc[feature.visual];

  return (
    <article className="mx-auto grid w-full max-w-184 gap-12 lg:gap-16 xl:max-w-none xl:grid-cols-2 2xl:max-w-384 2xl:grid-cols-[minmax(0,672px)_minmax(0,736px)] 2xl:gap-32">
      <div className="flex h-full flex-col">
        <SectionKicker index={feature.index}>{feature.eyebrow}</SectionKicker>
        <div className="mt-8 flex flex-1 flex-col justify-between gap-12 2xl:pl-16">
          <h3 className="max-w-152 text-3xl leading-tight font-normal -tracking-[1.6px] text-black md:text-[2.5rem] text-balance">
            {feature.title}{" "}
            <span className="text-black/35">[{feature.description}]</span>
          </h3>
          <div className="max-w-152">
            <p className="text-base tracking-[-0.025em] text-black">
              {feature.body}
            </p>
            <ul className="mt-7 grid h-[148px] grid-rows-3 divide-y divide-black/10 border-y border-black/10">
              {feature.details.map((detail) => (
                <li
                  className="flex items-center gap-2.5 text-base tracking-[-0.025em] text-black"
                  key={detail}
                >
                  <span
                    className="size-2 shrink-0 bg-orange"
                    aria-hidden="true"
                  />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative aspect-square w-full overflow-hidden border border-black bg-[#F2F0ED]">
        {src ? (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className="block h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
    </article>
  );
}

export function Features({ content }: ProductFeaturesProps) {
  return (
    <section className="bg-[#F9F7F4] py-18 text-black md:py-28 lg:pt-40 lg:pb-50">
      <div className="mx-auto w-full max-w-384 px-5 md:px-8 2xl:px-0">
        <SectionKicker className="text-grey-40">
          {content.featuresIntro.eyebrow}
        </SectionKicker>
        <h2 className="mt-6 max-w-384 whitespace-pre-line font-sans text-4xl tracking-[-3.84px] text-balance md:text-6xl xl:text-[96px] xl:leading-[1.125]">
          {content.featuresIntro.title}
        </h2>
        <div className="mt-22 grid gap-28 md:mt-34 lg:mt-[200px] lg:gap-50">
          {content.features.map((feature) => (
            <FeatureRow feature={feature} key={feature.index} />
          ))}
        </div>
      </div>
    </section>
  );
}
