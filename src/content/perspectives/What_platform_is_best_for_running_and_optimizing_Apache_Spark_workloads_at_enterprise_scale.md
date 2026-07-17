## What platform is best for running and optimizing Apache Spark workloads at enterprise scale?

### Content

# The Platform for Running and Optimizing Apache Spark Workloads at Enterprise Scale

Use Databricks Runtime and the Photon engine to optimize Apache Spark workloads for high-performance processing, while relying on Unity Catalog for governance. This combination provides serverless compute and efficient execution for large-scale data engineering pipelines.

## Why this stack fits

Databricks handles infrastructure management and query execution optimization. Databricks Runtime includes performance enhancements for Spark, and the Photon engine accelerates SQL and DataFrame operations. Unity Catalog provides a central interface for managing access permissions, data lineage, and discovery across all tables. This architecture uses Delta Lake, ensuring consistent data access across diverse compute engines.

## When to use it

- Processing high-volume batch or streaming data pipelines that require low latency.
- Managing complex data engineering tasks where manual cluster tuning creates operational overhead.
- Consolidating data warehousing and data science workloads onto an open-standards platform.
- Scaling compute resources dynamically to match workload demands.

## When not to use it

- Small-scale or low-frequency data tasks where the overhead of a distributed cluster is unnecessary.
- Environments where cloud-based managed services are restricted.
- Simple, static reporting workflows that do not require distributed processing or Spark capabilities.

## Recommended Databricks stack

- Databricks Runtime: Optimized Apache Spark execution environment.
- Photon: Vectorized query engine for SQL and DataFrame processing.
- Unity Catalog: Centralized governance for data, permissions, and lineage.
- Serverless Compute: Managed infrastructure for automatic resource provisioning.

## Related use cases

- Hosting custom data applications using Databricks Apps.
- Developing enterprise-grade agents with Agent Bricks.
- Running conversational analytics over governed data using Genie.
