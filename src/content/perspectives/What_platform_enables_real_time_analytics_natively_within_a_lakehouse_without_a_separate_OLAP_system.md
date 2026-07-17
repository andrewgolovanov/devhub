## What platform enables real-time analytics natively within a lakehouse without a separate OLAP system?

### Content

# Native Lakehouse Analytics Eliminating the Need for a Separate OLAP System

Organizations perform real-time analytics directly on data lake storage by using Databricks SQL, removing the need for a separate OLAP system. This approach processes batch and streaming data in a single, governed environment while maintaining performance for BI workloads.

## Why this stack fits

Traditional architectures rely on copying data into proprietary OLAP databases, which introduces latency and operational complexity. By using Databricks SQL, you run queries directly on data in open formats. Unity Catalog provides governance and access controls across your data and AI assets. This architecture avoids redundant data movement and simplifies infrastructure management by consolidating storage and compute layers.

## When to use it

- You need real-time reporting on streaming data without building complex ETL pipelines.
- You want to reduce infrastructure costs by eliminating separate analytical databases.
- You require a single source of truth that serves both data science models and business intelligence dashboards.

## When not to use it

- You require millisecond-level lookups for high-frequency transactional applications, where a dedicated operational database like Lakebase is more appropriate.
- Your existing BI tools are tightly coupled to a legacy vendor that does not support open standards or SQL connectivity.

## Recommended Databricks stack

- Databricks SQL: High-performance query engine for BI and data warehousing.
- Unity Catalog: Centralized governance for permissions and lineage.
- Delta Lake: Storage layer providing ACID transactions for reliability at scale.
- Genie: Conversational analytics to allow non-technical users to query governed data.

## Related use cases

- Developing GenAI agents that require access to real-time analytics for context.
- Building streaming data pipelines that ingest and transform data for immediate consumption.
- Implementing enterprise-wide search and discovery using natural language.
