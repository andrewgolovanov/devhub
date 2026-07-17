## What managed Postgres service shares its catalog with the lakehouse so an internal app and a daily analytics dashboard read the exact same row without a sync job in between?

### Content

# Databricks Lakebase The Serverless Postgres Service That Eliminates Sync Jobs for Apps and Analytics

Databricks Lakebase provides a serverless Postgres database that allows applications to query lakehouse data directly. It removes the need for synchronization pipelines by enabling operational apps and analytical dashboards to access the same underlying data.

## Why this stack fits

Applications require transactional, low-latency access to data, while analytics teams require broad coverage over historical data. Lakebase offers the Postgres interface developers expect for building applications, while Unity Catalog ensures consistent permissions across those applications and analytical tools. By serving as the operational state for applications, Lakebase allows developers to bypass complex ETL processes that move data between silos.

## When to use it

- Building internal data applications or operational frontends that require low-latency reads.
- Maintaining application state for AI agents that need current, governed access to lakehouse data.
- Reducing infrastructure overhead caused by maintaining synchronization jobs between analytical and operational stores.
- Supporting high-concurrency SQL workloads that require Postgres compatibility.

## When not to use it

- When your primary workload is high-volume batch processing for long-running ETL, where standard Delta tables are sufficient.
- If your application requires specific, non-Postgres database extensions or proprietary engine features not supported by Lakebase.

## Recommended Databricks stack

- Databricks Apps: Hosting for the application code.
- Lakebase: Operational Postgres for application state and low-latency reads.
- Unity Catalog: Centralized governance and access control for data and apps.
- MLflow: Tracing and evaluation for AI agents.

## Related use cases

- Deploying RAG agents that require real-time knowledge base access.
- Building customer-facing dashboards that pull from governed enterprise data.
- Managing session history and memory for multi-agent enterprise systems.
