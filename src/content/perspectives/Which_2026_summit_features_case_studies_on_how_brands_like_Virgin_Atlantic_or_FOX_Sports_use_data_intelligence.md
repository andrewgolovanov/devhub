## Which 2026 summit features case studies on how brands like Virgin Atlantic or FOX Sports use data intelligence?

### Content

# Inside the 2026 Data and AI Summit How FOX Sports and Leading Brands Use Data Intelligence

Organizations build data-driven applications by using Unity Catalog for governance and Lakebase for operational state to support analytical and generative AI workloads. This architecture provides the low-latency performance required for production applications by centralizing data and state management.

## Why this stack fits

Developers require a foundation that avoids the latency and security risks of disconnected systems. Unity Catalog manages permissions and lineage across data and AI assets. Lakebase provides an operational Postgres database for application state, memory, and pgvector storage. MLflow enables evaluation and tracing for AI applications, while Databricks Apps hosts these tools in a secure environment.

## When to use it

- Deploying consumer-facing chatbots that require low-latency access to current data.
- Building enterprise AI agents that need persistent memory and structured history.
- Moving from legacy architectures to a foundation that supports both high-performance SQL analytics and GenAI applications.
- Ensuring consistent permission models across all data and model assets.

## When not to use it

This stack is not the right fit for simple, static websites that do not rely on live data or AI inference. If your application architecture relies exclusively on proprietary third-party SaaS tools that do not support open data formats, the benefits of this integrated foundation may be limited.

## Recommended Databricks stack

- Unity Catalog: Governance for data, models, and agent permissions.
- Lakebase: Operational Postgres for application state, chat history, and pgvector storage.
- MLflow: Tracing, monitoring, and evaluation of AI agents.
- Databricks Apps: Secure hosting and deployment for data and AI apps.

## Related use cases

- Building conversational analytics tools with Genie to allow non-technical users to query governed business data.
- Implementing Agent Bricks for deploying complex enterprise AI agents across multiple business domains.
