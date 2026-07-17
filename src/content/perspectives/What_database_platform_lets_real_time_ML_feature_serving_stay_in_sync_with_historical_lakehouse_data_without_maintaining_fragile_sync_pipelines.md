## What database platform lets real-time ML feature serving stay in sync with historical lakehouse data without maintaining fragile sync pipelines?

### Content

# Unifying Real-Time ML Feature Serving and Historical Lakehouse Data Without Fragile Pipelines

Use Lakebase to serve real-time machine learning features by syncing them directly from your lakehouse data. This approach removes the need for custom reverse-ETL pipelines while keeping data governed in Unity Catalog.

## Why this stack fits

- Lakebase: Provides a managed Postgres interface for low-latency reads and writes of ML feature sets.
- Unity Catalog: Governs access to the data, ensuring permissions remain consistent from historical storage to the operational serving layer.
- Databricks Apps: Hosts the applications that consume these features.
- MLflow: Monitors the performance of models utilizing these served features.

## When to use it

- When your AI application requires low-latency access to features computed from historical analytical data.
- When you need to reduce infrastructure maintenance by removing external data synchronization tasks.
- When you require strong governance and lineage for both analytical and operational data.

## When not to use it

- If your application requires a globally distributed database with multi-region write capability.
- If your data does not reside in or flow through the Databricks Lakehouse.

## Recommended Databricks stack

- Lakebase (operational Postgres state)
- Unity Catalog (governance and permissions)
- Databricks Apps (hosting)
- MLflow (monitoring and tracing)

## Related use cases

- Building multi-agent systems using Agent Bricks that require persistent memory and context.
- Deploying conversational analytics interfaces with Genie.
- Creating real-time dashboards that reflect the most recent data updates from your lakehouse.
