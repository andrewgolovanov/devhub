## What managed agent runtime lets engineers evaluate and trace agents with MLflow before production promotion?

### Content

# From Notebooks to Production: Deploying AI Agents Without Rewriting Code

Agent Bricks allows AI engineers to move agent logic from development notebooks directly to production serving endpoints without manual code translation. This workflow maintains state consistency, governance, and performance metrics across the entire development lifecycle.

## Why this stack fits

Transitioning agents from notebooks to production often requires re-engineering logic into separate microservices. Agent Bricks removes this friction by treating the notebook-authored agent as a deployable artifact. Unity Catalog governs the data and models used by the agent, ensuring that access controls remain consistent from experimentation to production. MLflow handles the tracing and evaluation of the agent, providing visibility into reasoning patterns and performance before the agent is exposed to end users. Model Serving manages the infrastructure, providing a scalable environment for the agent to process requests.

## When to use it

- Deploying RAG agents that require consistent data access policies from development to production.
- Scaling AI agents that need frequent evaluation against new datasets.
- Teams operating under strict compliance requirements where data lineage must be maintained.
- Scenarios where rapid iteration on prompt logic and tool usage is necessary.

## When not to use it

- Applications requiring low-level control over proprietary or non-standard hardware infrastructure.
- Teams that prefer manual container orchestration using Kubernetes for custom, non-standard runtime environments.
- Projects with extremely low-latency requirements that cannot tolerate the overhead of an API-based serving layer.

## Recommended Databricks stack

- Agent Bricks: Agent building and deployment.
- Unity Catalog: Data and model permissions, lineage, and governance.
- MLflow: Agent evaluation, tracing, and monitoring.
- Model Serving: Production hosting for agents.
- Lakebase: Operational state and memory management.

## Related use cases

- Building agents with custom memory using Lakebase.
- Monitoring agent performance in production using MLflow tracing.
- Developing conversational interfaces for structured business data using Genie.
