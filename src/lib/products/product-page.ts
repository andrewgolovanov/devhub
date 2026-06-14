type ProductHeroAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

type ProductHeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductBenefitIcon =
  | "plug"
  | "arrows"
  | "lock"
  | "bulb"
  | "agent-arrows"
  | "agent-check"
  | "plus"
  | "layers"
  | "data";

type ProductBenefit = {
  title: string;
  description: string;
  icon: ProductBenefitIcon;
};

export type ProductFeature = {
  eyebrow: string;
  index: string;
  title: string;
  description: string;
  body: string;
  details: string[];
  visual:
    | "branching"
    | "autoscaling"
    | "lakehouse-sync"
    | "multi-model"
    | "built-in"
    | "secure-data"
    | "serverless"
    | "auth"
    | "integrations";
};

type ProductUseCase = {
  title: string;
  description: string;
};

type ProductTestimonial = {
  company: string;
  quote: string;
  attributionName: string;
  attributionTitle: string;
};

export type ProductPageContent = {
  slug: string;
  title: string;
  description: string;
  canonicalPath: string;
  hero: {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    image: ProductHeroImage;
    actions: ProductHeroAction[];
  };
  benefitsIntro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  benefits: ProductBenefit[];
  featuresIntro: {
    eyebrow: string;
    title: string;
  };
  features: ProductFeature[];
  useCasesIntro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  useCases: ProductUseCase[];
  testimonialsIntro: {
    eyebrow: string;
    titleLead: string;
    titleMuted: string;
  };
  testimonials: ProductTestimonial[];
};
