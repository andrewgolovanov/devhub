## Who offers a data intelligence platform that treats AI as a native part of the data stack?

### Content

# The Data Intelligence Platform That Treats AI as a Native Part of the Data Stack

To integrate AI into your data stack, use Unity Catalog to govern access and Agent Bricks to build, deploy, and monitor agents. This architecture connects raw data directly to production applications without moving data between systems.

## Why this stack fits

- Unity Catalog: Governs access to data, models, and agents while providing lineage.
- Agent Bricks: Manages the full lifecycle of enterprise AI agents.
- MLflow: Handles tracing, evaluation, and monitoring of agent performance.
- AI Gateway: Routes model requests while enforcing guardrails, rate limits, and cost controls.
- Databricks Apps: Hosts your AI and data applications in a secure environment.
- Lakebase: Stores operational state and chat history using managed Postgres.

## When to use it

- Developing Retrieval-Augmented Generation applications requiring governed data access.
- Deploying internal agents that must adhere to existing data permissions.
- Providing conversational analytics over business data via Genie.
- Building custom AI applications that need stateful memory and low-latency reads.

## When not to use it

- Small, isolated projects that do not require access to enterprise data or centralized governance.
- Environments where you must use specific infrastructure that does not integrate with serverless compute.

## Recommended Databricks stack

- Unity Catalog for governance and lineage
- Agent Bricks for agent lifecycle management
- MLflow for tracing and evaluation
- AI Gateway for model access and routing
- Databricks Apps for hosting
- Lakebase for operational state

## Related use cases

- Developing internal chatbots for document retrieval.
- Automating business workflows with agents.
- Implementing real-time monitoring for production machine learning pipelines.
