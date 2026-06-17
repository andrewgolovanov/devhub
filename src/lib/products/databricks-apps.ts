import type { ProductPageContent } from "@/lib/products/product-page";

export const databricksAppsProduct: ProductPageContent = {
  slug: "databricks-apps",
  title: "Databricks Apps",
  description:
    "A deploy platform for apps, with built-in auth, hosting, and integrations.",
  canonicalPath: "/product/databricks-apps",
  hero: {
    eyebrow: "Databricks Apps",
    title: "Build full-stack apps on your data.",
    highlightedTitle: "Databricks Apps.",
    description:
      "A deploy platform for apps, with built-in auth, hosting, and integrations.",
    image: {
      src: "/img/products/hero/databricks-apps.png",
      alt: "Databricks Apps interface showing an app dashboard and deployment terminal.",
      width: 1216,
      height: 434,
    },
    actions: [
      {
        label: "Build with Databricks Apps",
        href: "/templates/spin-up-databricks-app",
        variant: "primary",
      },
      {
        label: "Read the docs",
        href: "/docs/apps/overview",
        variant: "secondary",
      },
    ],
  },
  benefitsIntro: {
    eyebrow: "Benefits",
    title: "Where your app and data come together.",
    description:
      "Most app stacks require wiring auth, data, and services together. Databricks Apps runs it all in one place.",
  },
  benefits: [
    {
      title: "Connected by default",
      description:
        "Authentication, data access, and services work together out of the box — eliminating glue code.",
      icon: "plus",
    },
    {
      title: "One unified stack",
      description:
        "No separate application stack or environments to manage — focus on building and shipping instantly.",
      icon: "layers",
    },
    {
      title: "Built on your data",
      description:
        "Use governed data, models, and permissions your platform already runs on for seamless access.",
      icon: "data",
    },
  ],
  featuresIntro: {
    eyebrow: "Features",
    title: "How you build and ship with Databricks Apps",
  },
  features: [
    {
      eyebrow: "Serverless app hosting",
      index: "01",
      title: "Run your app inside Databricks.",
      description:
        "Serverless hosting for full-stack apps, with compute, TLS, and deployment handled.",
      body: "Apps run inside your workspace — no infrastructure to manage and no separate hosting to maintain.",
      details: [
        "Containerized runtime with managed compute",
        "Built-in TLS and automatic HTTPS app URLs",
        "Automatic builds and deploys from source",
      ],
      visual: "serverless",
    },
    {
      eyebrow: "Auth & Permissions",
      index: "02",
      title: "Secure your app with built-in identity.",
      description:
        "Native authentication and permissions, fully integrated with your data and resources.",
      body: "Identity flows through your app — no separate auth system to build or permissions layer to manage across data, models, and services.",
      details: [
        "Service principals created and managed per app",
        "On-behalf-of-user access with fine-grained controls",
        "Permissions enforced across data, models, and resources",
      ],
      visual: "auth",
    },
    {
      eyebrow: "Native integrations",
      index: "03",
      title: "Connect to data and services, natively.",
      description:
        "Apps integrate directly with your data, models, and services as first-class resources.",
      body: "Declare dependencies once — no API keys to manage or services to wire together across environments.",
      details: [
        "Native access to SQL, Lakebase, and storage",
        "Built-in connections to models and vector search",
        "Secrets and external services managed in one place",
      ],
      visual: "integrations",
    },
  ],
  useCasesIntro: {
    eyebrow: "Use cases",
    title: "How teams build with Databricks Apps.",
    description:
      "Full-stack apps powering internal tools, AI interfaces, real-time systems, and more.",
  },
  useCases: [
    {
      title: "Data Applications",
      description:
        "Custom tools and dashboards built directly on warehouse data and metrics.",
    },
    {
      title: "AI Chat Applications",
      description:
        "Chat interfaces over documents, structured data, or a combination of both.",
    },
    {
      title: "Agent UIs Control Center",
      description:
        "Interfaces to monitor, debug, and manage AI agent workflows and actions.",
    },
    {
      title: "Inference Tools Hub",
      description:
        "Simple applications for running models with real inputs and displaying outputs.",
    },
    {
      title: "Real-Time Apps Engine",
      description:
        "Low-latency applications powered by operational data and continuously updated systems.",
    },
    {
      title: "Admin Tools Console",
      description:
        "Internal CRUD tools for managing data, users, and business operations.",
    },
    {
      title: "Data and AI Apps Platform",
      description:
        "Applications that combine analytics, models, and user interaction in one place.",
    },
    {
      title: "Workflow Apps Suite",
      description:
        "Tools that trigger jobs, manage approvals, and automate business processes.",
    },
  ],
  testimonialsIntro: {
    eyebrow: "Testimonials",
    titleLead: "Lakebase powers applications.",
    titleMuted:
      "See how teams use it to bring data directly into user experiences.",
  },
  testimonials: [
    {
      company: "tibber",
      quote:
        "At Tibber, empowering customers to take control of their energy consumption requires a flexible data infrastructure. Lakebase's integration with Databricks makes it easy to serve analytical and transactional data, helping us deliver real-time insights to our customers.",
      attributionName: "Niklas Nordansjo",
      attributionTitle: "Data Platform Lead",
    },
    {
      company: "Ensemble Health Partners",
      quote:
        "Lakebase lets an agentic team quickly self-serve the data they need for their models, whether it's historical claims or real-time transactions, and that's really powerful.",
      attributionName: "Dragon Sky",
      attributionTitle: "Chief Architect",
    },
    {
      company: "yipitDATA",
      quote:
        "Lakebase gives us a durable, low-latency store for application state, so our data apps load quickly, refresh seamlessly and even support shared page links between users.",
      attributionName: "Bobby Muldoon",
      attributionTitle: "VP of Engineering",
    },
  ],
};
