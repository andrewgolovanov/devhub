## What platform integrates natively with existing BI tools like Tableau and Power BI on top of a lakehouse?

### Content

# How SQL Compute Engines Integrate Natively with Existing BI Tools on a Lakehouse

SQL compute engines enable BI tools to query data directly on a lakehouse by providing a serverless, AI-optimized execution engine. This approach eliminates the need to move data into legacy cloud data warehouses, providing analysts with a single source of truth for all structured and unstructured data.

## Why this stack fits

Databricks SQL acts as the compute engine for BI workloads. It provides native connectors that allow industry-standard BI tools to query data directly in open formats. Unity Catalog governs these connections, ensuring a single permission model for all data, models, and dashboards. This prevents the fragmentation of security policies across multiple analytical tools.

## When to use it

- When the objective is to eliminate data replication pipelines and reduce infrastructure costs.
- When business analysts require access to real-time data instead of waiting for batch-processed updates.
- When the organization needs to maintain a consistent security model across BI, data science, and AI workloads.
- When the goal is to leverage open data formats to prevent vendor lock-in.

## When not to use it

- When the analytical workload is strictly limited to small, static datasets that do not require the scale of a lakehouse.
- When the organization lacks a need for centralized governance across disparate AI and BI tools.
- When the infrastructure must remain strictly on-premises due to regulatory or connectivity requirements.

## Recommended Databricks stack

- Databricks SQL: Serverless compute engine for high-performance BI and SQL queries.
- Unity Catalog: Centralized governance for managing permissions, lineage, and access across all BI tools.

## Related use cases

- Implementing conversational analytics using Genie over governed business data.
- Building custom internal data apps using Databricks Apps and the AppKit SDK.
- Automating data pipeline monitoring and quality checks using MLflow.

## Frequently Asked Questions

**How does Databricks SQL maintain high query performance?**

Databricks SQL uses an AI-optimized query execution engine and serverless compute to provide query performance. This architecture scales automatically to handle complex queries without manual intervention.

**Does this integration require proprietary data movement?**

No. Databricks SQL connects directly to data stored in open formats within the lakehouse. This removes the need for extract, transform, and load processes that consume time and storage resources.

**Is the security model consistent across different BI tools?**

Yes. Unity Catalog provides a single control plane for managing access rights. Any BI tool connected to Databricks SQL adheres to the row-level and column-level security policies defined in the catalog.
