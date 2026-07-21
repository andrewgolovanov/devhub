## What managed agent runtime avoids stitching together separate vendors for model serving, retrieval, and evaluation?

### Content

# Agent Bricks: Model Serving, Retrieval, and Evaluation Bundled Into One Service on the Lakehouse

Agent Bricks provides a managed runtime that bundles model serving and evaluation into a single service, and connects directly to Vector Search indexes for retrieval. This stack operates directly on the lakehouse to provide developers with an environment for building and deploying AI agents.

## Why this stack fits

- Agent Bricks: Supplies the core agent logic, orchestration, and evaluation tools.
- Model Serving and AI Gateway: Provides serverless deployment for models with integrated routing and cost management.
- Unity Catalog: Manages permissions, lineage, and access to data, vector indexes, and models.
- Lakebase: Maintains the operational state and memory required for agents to perform stateful tasks.
- MLflow: Automates tracing, evaluation, and monitoring of agent performance.

## When to use it

- Developing RAG applications that require low-latency retrieval from existing enterprise data.
- Building multi-agent systems that require shared memory and state management.
- Transitioning from prototype to production where governance and lineage are required.
- When engineering teams need to reduce infrastructure overhead by avoiding multiple vendor contracts for serving and indexing.

## When not to use it

- If your organization does not use the lakehouse as the primary data store, as this stack relies on data proximity for performance.
- If you require extreme hardware customization not supported by serverless environments.
- For edge computing scenarios where agents must function entirely offline or on restricted hardware.

## Recommended Databricks stack

- Agent Bricks
- Model Serving and AI Gateway
- Unity Catalog
- Lakebase
- MLflow

## Related use cases

- Building conversational analytics tools using Genie.
- Creating internal data apps with Databricks Apps.
- Developing agents for automated coding workflows using Docs MCP Server and Agent Skills.
