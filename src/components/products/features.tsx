import { SectionKicker } from "@/components/products/section-kicker";
import type {
  ProductFeature,
  ProductPageContent,
} from "@/lib/products/product-page";

type ProductFeaturesProps = {
  content: ProductPageContent;
};

const featureVisualSrc = {
  branching: "/img/products/features/branching.png",
  autoscaling: "/img/products/features/autoscaling.png",
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
    <article className="mx-auto grid grid-cols-1 w-full max-w-184 gap-6 md:gap-12 lg:max-w-none lg:grid-cols-2 lg:items-stretch lg:gap-16 xl:max-w-none xl:grid-cols-2 2xl:max-w-384 2xl:grid-cols-[minmax(0,672px)_minmax(0,736px)] 2xl:gap-32">
      <div className="flex h-full flex-col">
        <SectionKicker index={feature.index}>{feature.eyebrow}</SectionKicker>
        <div className="mt-5 flex flex-1 flex-col justify-between gap-6 md:gap-8 md:mt-6 lg:gap-12 lg:mt-7 lg:pl-8">
          <h3 className="max-w-152 text-[28px] leading-tight font-normal -tracking-[1.6px] text-black md:max-w-none md:text-[32px] lg:max-w-152 lg:text-[36px] 2xl:text-[40px] text-balance">
            {feature.title}{" "}
            <span className="text-black/35">[{feature.description}]</span>
          </h3>
          <div>
            <p className="max-w-152 text-base tracking-[-0.025em] text-black">
              {feature.body}
            </p>
            <ul className="mt-5 max-w-152 grid grid-cols-1 grid-rows-3 divide-y divide-black/10 border-y border-black/10 md:mt-6 md:max-w-none lg:mt-7 lg:max-w-152">
              {feature.details.map((detail) => (
                <li
                  className="py-3 min-w-0 flex items-center gap-2.5 text-base tracking-[-0.025em] text-black"
                  key={detail}
                >
                  <span
                    className="size-2 shrink-0 bg-orange"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="relative aspect-square w-full overflow-hidden border border-black bg-[#F2F0ED] lg:aspect-auto lg:h-full">
        {src ? (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className="block h-full w-full object-cover lg:object-contain lg:object-center"
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
    <section className="bg-[#F9F7F4] pt-14 pb-18 text-black md:pt-18 md:pb-28 lg:pt-26 lg:pb-50 xl:pt-40">
      <div className="mx-auto w-full max-w-384 px-5 md:px-8 2xl:px-0">
        <SectionKicker className="text-grey-40">
          {content.featuresIntro.eyebrow}
        </SectionKicker>
        <h2 className="mt-4 whitespace-pre-line font-sans text-[32px] tracking-[-0.04em] text-balance md:mt-4.5 md:text-[40px] lg:mt-5 lg:text-[52px] lg:max-w-4xl xl:text-[64px] 2xl:max-w-384 2xl:text-[96px] 2xl:leading-[1.125]">
          {content.featuresIntro.title}
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-16 md:gap-28 md:mt-24 lg:mt-[120px] xl:mt-[200px] lg:gap-50">
          {content.features.map((feature) => (
            <FeatureRow feature={feature} key={feature.index} />
          ))}
        </div>
      </div>
    </section>
  );
}
