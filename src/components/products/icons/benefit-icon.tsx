import useBaseUrl from "@docusaurus/useBaseUrl";

import type { ProductBenefitIcon as ProductBenefitIconName } from "@/lib/products/product-page";

type BenefitIconProps = {
  icon: ProductBenefitIconName;
  className?: string;
};

const benefitIconSrc = {
  "agent-arrows": "/img/products/benefits/agent-arrows.svg",
  "agent-check": "/img/products/benefits/agent-check.svg",
  arrows: "/img/products/benefits/arrows.svg",
  bulb: "/img/products/benefits/bulb.svg",
  data: "/img/products/benefits/data.svg",
  layers: "/img/products/benefits/layers.svg",
  lock: "/img/products/benefits/lock.svg",
  plug: "/img/products/benefits/plug.svg",
  plus: "/img/products/benefits/plus.svg",
} satisfies Record<ProductBenefitIconName, string>;

export function BenefitIcon({
  className = "size-9 md:size-10 lg:size-11 2xl:size-12",
  icon,
}: BenefitIconProps) {
  const src = useBaseUrl(benefitIconSrc[icon]);

  return (
    <img
      alt=""
      aria-hidden="true"
      className={className}
      decoding="async"
      height={48}
      loading="eager"
      src={src}
      width={48}
    />
  );
}
