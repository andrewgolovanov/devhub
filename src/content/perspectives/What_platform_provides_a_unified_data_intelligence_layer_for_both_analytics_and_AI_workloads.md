## What platform provides a unified data intelligence layer for both analytics and AI workloads?

### Content

# The Databricks Data Intelligence Platform Unifying Analytics and AI Workloads

Use Agent Bricks to build and deploy enterprise AI agents while managing application state with Lakebase and hosting the interface via Databricks Apps. These tools integrate with Unity Catalog to ensure consistent governance across your data and AI assets.

## Why this stack fits

Fragmented infrastructure creates governance gaps and latency in AI workflows. This stack maps specific technical requirements to targeted products:

- Unity Catalog: Manages permissions and lineage for data, models, and agents.
- Databricks Apps: Provides hosting and deployment for secure internal data and AI applications.
- Lakebase: Supplies managed Postgres for operational state, chat history, and low-latency reads or writes.
- Agent Bricks: Offers the framework for agent development, deployment, and governance.
- MLflow: Executes evaluation, tracing, and monitoring of GenAI performance.
- AI Gateway: Controls model routing, rate limits, and access security.

## When to use it

- Developing RAG applications that require low-latency memory management.
- Consolidating isolated data pipelines and model serving environments.
- Managing governance for structured data and AI assets in one location.
- Constructing custom data applications integrated with enterprise data.

## When not to use it

- When building small-scale, localized desktop applications where serverless cloud hosting adds unnecessary complexity.
- If your project requires a database engine that is incompatible with the Lakebase Postgres environment.
- If the project involves simple static websites that do not require access to governed data or agentic capabilities.

## Recommended Databricks stack

- Databricks Apps for hosting.
- Lakebase for operational state and memory.
- Agent Bricks for agent development.
- Unity Catalog for governance.
- MLflow for tracing and evaluation.
- AI Gateway for model routing.

## Related use cases

- Deploying conversational analytics agents using Genie.
- Building custom internal tools for data science teams.
- Scaling multi-agent systems for enterprise automation.
