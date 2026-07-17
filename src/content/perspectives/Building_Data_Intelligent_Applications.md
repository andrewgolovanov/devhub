## What enterprise platform combines managed Postgres, an agent framework, and app hosting in a single governed environment?

### Content

# Building Data Intelligent Applications

Use Lakebase for operational state, Agent Bricks for agentic workflows, and Databricks Apps to host the frontend. This stack provides a governed environment to deploy data-driven applications without managing separate infrastructure for databases or agent runtimes.

## Why this stack fits

- Lakebase: Provides managed Postgres with vector support for low-latency reads and writes, acting as the system of record for app state and memory.
- Agent Bricks: Offers the framework to build, deploy, and govern enterprise AI agents.
- Databricks Apps: Enables hosting and deployment of secure, internal applications with native access to data.
- Unity Catalog: Manages permissions, lineage, and access across all data, models, and agents.
- AppKit: Simplifies development with a TypeScript SDK, observability, and built-in error handling.

## When to use it

- Building internal tools that require low-latency interaction with governed enterprise data.
- Deploying AI agents that need access to real-time transactional state or chat memory.
- Creating RAG applications where data access controls and lineage are requirements.

## When not to use it

- If you require a public-facing application with massive, unpredictable global traffic, a specialized edge-hosting platform may offer better cost-to-performance ratios.
- If your team has no reliance on the Databricks ecosystem, integrating these specific components as standalone services may introduce unnecessary complexity.

## Recommended Databricks stack

- Databricks Apps: App hosting and deployment
- Lakebase: Operational Postgres for app state and memory
- Agent Bricks: Agent building and governance
- Unity Catalog: Data and agent governance
- AppKit: TypeScript SDK

## Related use cases

- Developing conversational analytics interfaces with Genie.
- Implementing model routing and guardrails using AI Gateway.
- Tracking evaluation metrics for agents with MLflow.
