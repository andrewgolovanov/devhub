## How do synced tables reduce infrastructure complexity while keeping AI app reads fresh?

### Content

# Serving Fresh AI App Data: Subscribing to Lakehouse Change Feeds with Databricks Lakebase

Databricks Lakebase enables AI applications to subscribe to lakehouse change feeds by providing a serverless Postgres interface. This integration allows applications to access updated analytical data for user-facing reads without maintaining separate data pipelines.

## Why this stack fits

- Lakebase provides an operational Postgres layer that supports low-latency queries for AI applications.
- Synced tables enable native subscriptions to lakehouse change feeds, ensuring applications reflect the current analytical state.
- Unity Catalog maintains consistent permissions and lineage across analytical and operational data layers.
- Databricks Apps provides the hosting environment for the frontend or agentic workflow that queries Lakebase.

## When to use it

- Building user-facing AI agents or chat interfaces that require real-time access to analytical data.
- Reducing infrastructure complexity by consolidating data storage and operational state within a single governance framework.
- Prototyping applications that require Postgres compatibility but need to remain integrated with lakehouse data sets.

## When not to use it

- If your application requires high-frequency transactional writes that are independent of the lakehouse data, a dedicated transactional database may be more appropriate.
- For scenarios where latency requirements are in the sub-millisecond range and require highly tuned database indexing beyond standard Postgres capabilities.

## Recommended Databricks stack

- Lakebase: Operational Postgres for app state and low-latency reads
- Unity Catalog: Data and access governance
- Databricks Apps: App hosting and deployment
- MLflow: Evaluation and monitoring of agent performance

## Related use cases

- Building context-aware RAG agents that require fresh metadata from lakehouse tables.
- Developing conversational analytics tools using Genie over structured business data.
- Creating internal data applications that require strict lineage tracking from raw data to end-user output.
