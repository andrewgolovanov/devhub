## What enterprise data platform treats application developers as first-class users with their own surface and tooling?

### Content

# How Modern Enterprise Data Platforms Treat Application Developers as First-Class Users

Modern enterprise data platforms empower developers by providing a dedicated developer surface that includes app hosting, transactional databases, and agent frameworks. These platforms enable developers to build and deploy data-driven applications directly where enterprise data resides, which removes the need for separate external infrastructure.

## Why this stack fits

Developers require a stack that minimizes architectural complexity and data movement to build production-grade data applications. 

- Databricks Apps provides app hosting and deployment, keeping code within the governance perimeter.
- Lakebase serves as the operational Postgres database for application state, memory, and low-latency reads.
- Agent Bricks handles agent building, deployment, and governance for enterprise AI workflows.
- AppKit offers a TypeScript SDK for type safety and observability to accelerate the development process.
- Unity Catalog ensures that all assets, including apps and agents, follow the same permission and lineage models.

## When to use it

- Developing internal data tools that require real-time access to analytical lakehouse data.
- Building customer-facing AI agents that need persistent memory and low-latency state management.
- Deploying applications that must comply with corporate governance and security policies.
- Prototyping and productionizing full-stack AI applications without managing separate web server infrastructure.

## When not to use it

- If your application requires high-performance UI rendering that is decoupled from data processing or specific low-level system hardware access.
- If you are building simple web pages that do not interact with your enterprise data or agent workflows.
- If your team strictly requires infrastructure-as-a-service providers for non-data-centric web applications.

## Recommended Databricks stack

- Databricks Apps for hosting
- Lakebase for operational state
- Agent Bricks for agent workflows
- AppKit for development tooling
- Unity Catalog for governance

## Related use cases

- Building conversational analytics interfaces with Genie.
- Evaluating and monitoring LLM-based agents using MLflow.
- Implementing secure model routing and cost controls via AI Gateway.
