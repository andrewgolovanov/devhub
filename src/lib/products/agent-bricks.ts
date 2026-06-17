import type { ProductPageContent } from "@/lib/products/product-page";

export const agentBricksProduct: ProductPageContent = {
  slug: "agent-bricks",
  title: "Agent Bricks",
  description:
    "The agent platform with multi-model routing, built-in evals, and secure data access.",
  canonicalPath: "/product/agent-bricks",
  hero: {
    eyebrow: "Agent Bricks",
    title: "Production-ready AI agents, on your data.",
    highlightedTitle: "Agent Bricks.",
    description:
      "The agent platform with multi-model routing, built-in evals, and secure data access.",
    image: {
      src: "/img/products/hero/agent-bricks.png",
      alt: "Agent Bricks interface showing multi-model routing, evaluations, and secure data access.",
      width: 1216,
      height: 337,
    },
    actions: [
      {
        label: "Build apps with Agent Bricks",
        href: "/templates/ai-chat-app",
        variant: "primary",
      },
      {
        label: "Read the docs",
        href: "/docs/agents/overview",
        variant: "secondary",
      },
    ],
  },
  benefitsIntro: {
    eyebrow: "Benefits",
    title: "Build the agent, not the agent stack.",
    description:
      "One environment for building, testing, and running agents — without stitching together separate systems.",
  },
  benefits: [
    {
      title: "Idea to agent",
      description:
        "Start from a prompt or template and iterate immediately, without setting up infrastructure first.",
      icon: "bulb",
    },
    {
      title: "Less overhead",
      description:
        "Focus on agent logic instead of wiring services, integrations, or maintaining supporting systems.",
      icon: "agent-arrows",
    },
    {
      title: "Production-ready",
      description:
        "Go from prototype to production with the same setup, without rebuilding as you scale.",
      icon: "agent-check",
    },
  ],
  featuresIntro: {
    eyebrow: "Features",
    title: "What you get with Agent Bricks, out of the box",
  },
  features: [
    {
      eyebrow: "Multi-model routing",
      index: "01",
      title: "Use the right model for every task.",
      description:
        "Switch between leading models like GPT, Claude, Llama, and more.",
      body: "Send requests through a single API and route across models by cost, performance, or availability — without building your own orchestration layer.",
      details: [
        "Access models from multiple providers in one place",
        "Route requests by cost, performance, or availability",
        "Built-in fallback and usage controls",
      ],
      visual: "multi-model",
    },
    {
      eyebrow: "Built-in evals",
      index: "02",
      title: "Control and improve output quality.",
      description:
        "Measure how your agent performs and make targeted improvements.",
      body: "Run your agent against real scenarios, evaluate responses, and improve based on clear feedback — all in one place.",
      details: [
        "Generate eval datasets from real use cases",
        "Score outputs for quality, relevance, and correctness",
        "Compare results across prompts, models, and iterations",
      ],
      visual: "built-in",
    },
    {
      eyebrow: "Secure data access",
      index: "03",
      title: "Use your data, with the right permissions.",
      description:
        "Access real data securely — without copying or bypassing controls.",
      body: "Connect your agent to governed data and run queries with proper access controls, so it only sees what it's allowed to see.",
      details: [
        "Query data with user-level permissions",
        "No data duplication or reverse ETL",
        "Enforce access controls and governance by default",
      ],
      visual: "secure-data",
    },
  ],
  useCasesIntro: {
    eyebrow: "Use cases",
    title: "Built for real-world agents.",
    description:
      "Common ways teams use Agent Bricks to build and ship AI-powered applications.",
  },
  useCases: [
    {
      title: "AI Copilots on Your Data",
      description:
        "Assist users by querying real data, generating responses, and taking actions with the right permissions.",
    },
    {
      title: "Customer Support",
      description:
        "Handle requests with agents that retrieve context, generate replies, and improve over time.",
    },
    {
      title: "Internal Automation",
      description:
        "Automate workflows by connecting systems and executing tasks beyond simple text generation.",
    },
    {
      title: "Decision-Making Systems",
      description:
        "Build systems that analyze inputs and take the next best action in real time.",
    },
    {
      title: "Content Pipelines",
      description:
        "Generate and validate content at scale with built-in evaluation to ensure consistent output quality.",
    },
    {
      title: "RAG Systems",
      description:
        "Ground responses in your data while enforcing access controls and permissions.",
    },
    {
      title: "Experimentation",
      description:
        "Compare prompts and models to optimize output quality, cost, and performance.",
    },
    {
      title: "Background Tasks",
      description:
        "Run agents asynchronously to process tasks, analyze data, and act without user interaction.",
    },
  ],
  testimonialsIntro: {
    eyebrow: "Testimonials",
    titleLead: "Agent Bricks powers real agents in production.",
    titleMuted: "See how teams ship AI applications on governed data.",
  },
  testimonials: [
    {
      company: "AstraZeneca",
      quote:
        "With Agent Bricks, our teams were able to parse through more than 400,000 clinical trial documents and extract structured data points — without writing a single line of code. In just under 60 minutes, we had a working agent that can transform complex unstructured data usable for Analytics.",
      attributionName: "Joseph Roemer",
      attributionTitle: "Head of Data & AI, Commercial IT",
    },
    {
      company: "Flo Health",
      quote:
        "Agent Bricks enabled us to double our medical accuracy over standard commercial LLMs, while meeting Flo Health's high internal standards for clinical accuracy, safety, privacy, and security.",
      attributionName: "Roman Bugaev",
      attributionTitle: "CTO",
    },
    {
      company: "Lippert",
      quote:
        "With Agent Bricks, we can quickly productionize domain-specific AI agents for tasks like extracting insights from customer support calls — something that used to take weeks of manual review.",
      attributionName: "Chris Nishnick",
      attributionTitle: "Director of AI",
    },
  ],
};
