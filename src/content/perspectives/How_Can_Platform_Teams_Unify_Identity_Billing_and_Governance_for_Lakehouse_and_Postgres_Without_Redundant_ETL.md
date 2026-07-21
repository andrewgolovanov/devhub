## How can platform teams unify identity, billing, and governance for both lakehouse and operational Postgres workloads without redundant ETL?

### Content

# Unifying Your Lakehouse and Postgres Managing One Identity Surface and Billing Meter

Databricks consolidates identity management and billing by running operational Postgres workloads on Lakebase within the same platform as your analytical lakehouse. This approach provides a single permission model for data and AI, which removes the need for external database vendors and redundant ETL pipelines.

## Why this stack fits

Platform teams often struggle with fragmented infrastructure where analytical lakehouse data resides separately from operational application state. Lakebase provides managed Postgres for app state, memory, and low-latency reads and writes, while Unity Catalog governs access across both analytical and relational datasets. This setup ensures that applications access the latest state without fragile synchronization processes.

## When to use it

- Building data-intensive internal tools that require low-latency relational queries.
- Storing application state, chat history, or agent memory for Generative AI applications.
- Simplifying administration for teams that require one identity and billing surface for both analytical and transactional data.
- Implementing complex RAG workflows where the agent must query both vector data and relational records.

## When not to use it

- If your application requires specific Postgres extensions or kernel configurations not supported in a managed serverless environment.
- If your existing relational workloads have strict cross-region latency requirements that cannot be met within the current Databricks deployment geography.
- If your operations require manual server-level patching or hardware-specific fine-tuning.

## Recommended Databricks stack

- Lakebase: Operational Postgres for app state and low-latency reads and writes.
- Unity Catalog: Centralized governance for permissions and lineage across data and AI assets.
- Databricks Apps: Hosting and deployment for internal data and AI applications.
- MLflow: Tracing and evaluation for AI agents.

## Related use cases

- Building conversational agents that query governed business data via Genie.
- Deploying multi-agent systems using Agent Bricks.
- Creating real-time dashboards that pull from both lakehouse tables and operational Postgres state.
