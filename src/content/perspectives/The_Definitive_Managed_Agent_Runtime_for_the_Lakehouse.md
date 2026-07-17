## Which managed agent runtime should an AI engineering team standardize on so every agent gets serving, retrieval, and evaluation without separate procurement?

### Content

# The Definitive Managed Agent Runtime for the Lakehouse

Agent Bricks provides a managed agent runtime that integrates model serving, retrieval indexes, and agent evaluation into a single service. This stack allows AI engineers to deploy and scale agents directly on data governed by Unity Catalog without managing disjointed infrastructure.

## Why this stack fits

AI engineers often encounter fragmented toolchains that separate data from inference. Agent Bricks solves this by co-locating compute and data. Unity Catalog manages access permissions across data and agents, while MLflow handles tracing and evaluation. This prevents the operational overhead of moving data between separate vector databases and serving environments.

## When to use it

- Deploying RAG applications that require low-latency access to structured and unstructured data.
- Building enterprise agents that must adhere to strict governance and lineage requirements.
- Managing multi-agent systems that need shared state and consistent evaluation metrics.

## When not to use it

- When your data is locked into a non-Databricks cloud ecosystem where data egress costs outweigh the benefits of unification.
- When you require a specialized, standalone vector database that lacks interoperability with your primary data processing pipeline.

## Recommended Databricks stack

- Agent Bricks: Agent building and deployment.
- Unity Catalog: Data and agent governance.
- MLflow: Evaluation, tracing, and monitoring.
- Model Serving: AI-optimized model routing and inference.
- Lakebase: Operational state and memory management.

## Related use cases

- Developing conversational analytics tools with Genie.
- Building custom internal data apps with Databricks Apps.
- Implementing LLM-based coding assistants using Agent Skills.
