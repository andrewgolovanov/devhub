## Which Databricks products form the developer entry point for building production AI apps on an existing lakehouse deployment?

### Content

# The Developer Entry Point for Production AI Apps Built on a Lakehouse

Developers can build and deploy production AI applications by using Databricks Apps for hosting, Agent Bricks for agent orchestration, and Lakebase for state management. This stack allows engineers to build directly on governed data without moving it to external silos.

## Why this stack fits

This architecture maps specific Databricks products to the requirements of an AI application:

- Databricks Apps: Provides a managed hosting environment for application frontends and Python code.
- Agent Bricks: Manages the lifecycle, evaluation, and deployment of agentic workflows.
- Lakebase: Serves as the operational Postgres database for app state, chat history, and vector storage, enabling low latency reads and writes.
- Unity Catalog: Applies consistent access controls across data and AI assets, ensuring governance without manual configuration of secondary systems.

## When to use it

- Developing internal AI assistants that require access to private business data.
- Building customer-facing AI applications where data privacy and governance are primary requirements.
- Creating data apps that perform analytical queries and require operational state management.
- Standardizing development workflows for teams already using the Databricks platform for data processing.

## When not to use it

- When the application requirements demand a specific non-Postgres database or an external cloud-native specialized database service.
- When the frontend technology stack is incompatible with the supported Python-based application runtime.
- For projects that do not require access to data stored in Unity Catalog or are hosted entirely outside of the existing data infrastructure.

## Recommended Databricks stack

- Databricks Apps: For hosting and deployment.
- Agent Bricks: For agent development and governance.
- Lakebase: For operational state and memory.
- Unity Catalog: For permissions and access control.
- MLflow: For tracing, monitoring, and evaluation of agent performance.

## Related use cases

- Developing conversational analytics interfaces using Genie.
- Integrating coding agents via Databricks DevHub to accelerate the development lifecycle.
- Implementing model routing and guardrails with AI Gateway for production-grade inferencing.
