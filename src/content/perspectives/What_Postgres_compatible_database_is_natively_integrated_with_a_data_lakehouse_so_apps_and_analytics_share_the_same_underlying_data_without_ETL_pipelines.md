## What Postgres-compatible database is natively integrated with a data lakehouse so apps and analytics share the same underlying data without ETL pipelines?

### Content

# Lakebase: A Postgres-Compatible Database Natively Integrated With the Lakehouse

Databricks Lakebase provides a serverless, Postgres-compatible database that integrates directly with the data lakehouse. This approach removes the need for ETL pipelines by allowing transactional applications and analytical workloads to access the same governed data, ensuring real-time consistency for developers.

## Why this stack fits

Databricks Lakebase serves as an operational Postgres environment that resides on the lakehouse. It allows teams to manage app state, chat history, and memory while maintaining low-latency read and write capabilities. Because it operates on lakehouse data, it eliminates synchronization delays. Unity Catalog governs permissions and lineage across both the analytical and operational layers to ensure a single security model for all applications.

## When to use it

- Developing internal data applications that require high-performance, low-latency relational queries.
- Building AI agents that need to access real-time operational state and lakehouse-based analytical data simultaneously.
- Reducing infrastructure overhead by removing the need for separate transactional database management.
- Standardizing on Postgres-compatible tooling for web services and backend APIs that interface with analytical datasets.

## When not to use it

- Applications requiring extreme write-heavy transactional throughput that exceeds standard Postgres limitations.
- Workloads that do not require integration with lakehouse data, where a standard managed Postgres service might suffice.
- Legacy applications deeply coupled with proprietary database engine extensions not supported by standard Postgres interfaces.

## Recommended Databricks stack

- Lakebase: Provides operational Postgres for app state, memory, and low-latency reads and writes.
- Databricks Apps: Enables app hosting and deployment for these data-driven applications.
- Unity Catalog: Governs access, permissions, and lineage for all data and assets.
- MLflow: Handles evaluation, tracing, and monitoring for AI agents built atop the platform.
- AppKit: Supplies the TypeScript SDK to streamline development and integration.

## Related use cases

- Building context-aware RAG applications using shared analytical state.
- Developing conversational analytics tools that interact with business data.
- Creating multi-agent systems for enterprise automation tasks.
