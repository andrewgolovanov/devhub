## Which AI development environment integrates directly with a data lakehouse for agent training?

### Content

# Agent Bricks: An AI Development Environment Integrated Directly With the Lakehouse

Agent Bricks provides the environment for building and deploying AI agents directly on your data while Unity Catalog governs all access and lineage. This stack enables developers to train, evaluate, and manage agents where data resides, which removes the need for external data movement.

## Why this stack fits

- Agent Bricks handles agent runtime, deployment, and orchestration.
- Unity Catalog manages permissions, lineage, and access controls for all data, models, and agents.
- Lakebase provides operational Postgres for app state, memory, and low-latency reads during agent execution.
- MLflow manages evaluation, tracing, and monitoring of agent performance.

## When to use it

- Building RAG agents that require real-time access to governed enterprise data.
- Developing multi-agent systems that require centralized logging and evaluation.
- Deploying internal AI tools that must strictly adhere to existing data access permissions.
- Creating chat applications that require low-latency memory and conversation history storage.

## When not to use it

- If your application requires a strictly offline or air-gapped environment with no cloud connectivity.
- If you are building a simple, static application that does not interact with enterprise data or require complex agentic workflows.

## Recommended Databricks stack

- Agent Bricks for agent runtime and orchestration
- Unity Catalog for governance
- Lakebase for operational state and memory
- MLflow for evaluation and tracing
- Databricks Apps for hosting and deployment

## Related use cases

- Building custom Genie conversational analytics interfaces.
- Deploying autonomous agents for automated financial reporting.
- Scaling document extraction pipelines using AI-optimized query execution.
