import type { ProductPageContent } from "@/lib/products/product-page";

export const lakebaseProduct: ProductPageContent = {
  slug: "lakebase",
  title: "Lakebase",
  description:
    "Managed Postgres with branching, autoscaling, and Lakehouse sync for modern operational workloads.",
  canonicalPath: "/product/data-lakehouse",
  hero: {
    eyebrow: "Lakebase",
    title: "Managed Postgres, built for modern operational workloads.",
    highlightedTitle: "Lakebase.",
    description:
      "The operational database with branching, autoscaling, and your Lakehouse data.",
    image: {
      src: "/img/products/hero/lakebase.png",
      alt: "Lakebase dashboard showing monitoring, branches, and project settings.",
      width: 1216,
      height: 450,
    },
    actions: [
      {
        label: "Build apps with Lakebase",
        href: "/templates/app-with-lakebase",
        variant: "primary",
      },
      {
        label: "Read the docs",
        href: "/docs/lakebase/overview",
        variant: "secondary",
      },
    ],
  },
  benefitsIntro: {
    eyebrow: "Benefits",
    title: "Built for shipping, not provisioning.",
    description:
      "No infrastructure to stand up, no reverse-ETL to wire, no credentials to rotate. Just the database and your app.",
  },
  benefits: [
    {
      title: "Real Postgres",
      description:
        "Wire-compatible with standard Postgres. Same drivers, extensions, and ORMs you already use.",
      icon: "plug",
    },
    {
      title: "Lakehouse-native",
      description:
        "Two-way Postgres-Lakehouse sync. Curated data for Lakebase app reads.",
      icon: "arrows",
    },
    {
      title: "Auth, handled",
      description:
        "Postgres roles linked to Databricks identities with short-lived secure tokens in apps.",
      icon: "lock",
    },
  ],
  featuresIntro: {
    eyebrow: "Features",
    title: "How Lakebase powers\nthe apps you ship day to day",
  },
  features: [
    {
      eyebrow: "Branching",
      index: "01",
      title: "Branch your database instantly.",
      description:
        "A full-fidelity copy, regardless of size, fully isolated from its parent.",
      body: "Branches are copy-on-write — they share storage with their parent and only consume new space for the bytes you change.",
      details: [
        "Per-PR preview environments",
        "Schema migration sandboxes",
        "Branch from any point in time",
      ],
      visual: "branching",
    },
    {
      eyebrow: "Autoscaling",
      index: "02",
      title: "Right-size your compute automatically.",
      description:
        "Demand-driven, scaled to zero on idle, milliseconds to wake.",
      body: "Lakebase tracks load in real time and adjusts capacity within the range you set, with no compute cost while idle.",
      details: [
        "Non-disruptive scaling within range",
        "Independent autoscaling per replica",
        "Configurable idle timeout per branch",
      ],
      visual: "autoscaling",
    },
    {
      eyebrow: "Lakehouse sync",
      index: "03",
      title: "Connect your app to your Lakehouse.",
      description:
        "Inbound and outbound, fully managed, governed by Unity Catalog.",
      body: "Both directions are managed by Databricks, no external pipelines, no jobs you have to operate, no glue code to maintain.",
      details: [
        "Snapshot, triggered, or continuous sync",
        "Schema-level config for outbound replication",
        "Federated queries across both sides",
      ],
      visual: "lakehouse-sync",
    },
  ],
  useCasesIntro: {
    eyebrow: "Use cases",
    title: "How teams use Lakebase in production.",
    description:
      "Lakebase powers the operational layer between apps, agents, and your Lakehouse.",
  },
  useCases: [
    {
      title: "Shipping Full-Stack Apps",
      description:
        "Use Lakebase as your app database for users, sessions, and logic, no external Postgres needed.",
    },
    {
      title: "Powering Stateful AI Agents",
      description:
        "Store conversations, tool outputs, and state so agents persist across sessions.",
    },
    {
      title: "Serving Product Data",
      description:
        "Bring Lakehouse data into Postgres for low-latency reads across APIs, ORMs, and apps.",
    },
    {
      title: "Closing the Data Loop",
      description:
        "Capture app writes for analytics with no custom pipelines needed.",
    },
    {
      title: "Testing Database Changes",
      description:
        "Validate schema changes and new features in isolated environments before they reach production.",
    },
    {
      title: "Scaling Read-Heavy Apps",
      description:
        "Handle high query volume by distributing reads without changing your application architecture.",
    },
    {
      title: "Isolating Customers per Tenant",
      description:
        "Run separate database environments per tenant for independent scaling.",
    },
    {
      title: "Recovering and Debugging",
      description:
        "Restore past data states to investigate issues and understand how your system evolved over time.",
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
