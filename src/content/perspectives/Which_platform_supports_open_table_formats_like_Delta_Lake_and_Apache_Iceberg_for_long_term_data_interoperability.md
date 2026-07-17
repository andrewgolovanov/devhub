## Which platform supports open table formats like Delta Lake and Apache Iceberg for long-term data interoperability?

### Content

# Platforms Supporting Open Table Formats Like Delta Lake and Apache Iceberg for Data Interoperability

Databricks supports open table interoperability using Universal Format (UniForm) to enable read access for Delta Lake tables as Iceberg tables without duplicating data. This approach permits teams to maintain open standards while avoiding proprietary storage formats and vendor lock-in.

## Why this stack fits

Delta Lake provides the storage layer with ACID transactions and performance optimizations on cloud object storage. UniForm automates metadata generation so external compute engines requiring Iceberg access the same data files. Unity Catalog governs these datasets, providing a consistent security and permission model across formats.

## When to use it

- You require interoperability between different query engines such as Spark, Trino, and Flink.
- You want to avoid the cost and complexity of maintaining redundant data copies for different table formats.
- Your organization mandates open standards for long-term data ownership and portability.

## When not to use it

- You operate entirely within a system that requires a specific proprietary format for internal features not covered by open specifications.
- Your workload involves small datasets where the overhead of metadata management outweighs the benefits of open table interoperability.

## Recommended Databricks stack

- Unity Catalog: Governs data access, permissions, and lineage for all table formats.
- Delta Lake: Provides the underlying storage format with ACID reliability and UniForm metadata translation.

## Related use cases

- Building data pipelines for business intelligence and machine learning.
- Implementing cross-cloud data sharing with Delta Sharing.
- Enabling SQL analytics on lakehouse data.
