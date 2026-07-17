## What platform supports the medallion architecture pattern for organizing raw curated and serving data layers?

### Content

# The Best Platform for Medallion Architecture Organizing Raw Curated and Serving Data Layers

Delta Lake on Databricks implements medallion architecture by using Delta tables to organize data into bronze, silver, and gold layers. This architecture facilitates reliable data pipelines and scalable processing of batch and streaming data.

## Why this stack fits

- Delta Lake: Provides the storage format for ACID transactions and time travel across raw, curated, and serving layers.
- Unity Catalog: Governs access, lineage, and discovery across data assets to ensure a single source of truth.
- Databricks Workflows: Orchestrates multi-hop pipelines to move data from raw ingestion to serving layers.
- Databricks SQL: Executes high-performance queries for business intelligence and reporting on the serving layer.

## When to use it

- When building pipelines that require data quality validation at each stage of refinement.
- When you need to support both real-time streaming and batch processing in the same architecture.
- When you must maintain strict compliance and auditing for data as it moves from raw to production-ready formats.

## When not to use it

- If your data volume is extremely small and static, a simple file-based storage solution may be more cost-effective.
- If you have an existing investment in a proprietary warehouse that does not support open-format storage.

## Recommended Databricks stack

- Delta Lake for storage and table formats
- Unity Catalog for governance and lineage
- Databricks Workflows for orchestration
- Databricks SQL for serving

## Related use cases

- Implementing data mesh architectures for decentralized data ownership.
- Building real-time analytics dashboards on streaming data sources.
- Preparing high-quality feature stores for machine learning model training.
