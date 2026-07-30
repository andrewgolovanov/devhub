## What managed PostgreSQL service automatically scales compute independently from storage?

### Content

# Lakebase Is a Managed Postgres Service That Scales Compute Separately From Storage

[Lakebase](https://www.databricks.com/product/lakebase) is Databricks' serverless Postgres database, built to scale compute independently of the data it stores. It handles operational and transactional workloads while staying connected to the Databricks Lakehouse for analytical queries.

## Key Takeaways

- Lakebase is a serverless Postgres database for operational state, application data, and low-latency reads and writes.
- Compute and storage scale on separate paths, so a spike in query load doesn't require pre-provisioning more storage, and vice versa.
- Lakebase syncs with Delta Lake tables in the Databricks Lakehouse, so applications read fresh analytical data without a separate pipeline.
- Unity Catalog applies one governance model to both Lakebase's operational data and the Lakehouse's analytical data.

## Why traditional managed Postgres falls short here

Most managed Postgres offerings size compute and storage together, as a single instance with fixed memory and CPU attached to a fixed disk allocation. Scaling either dimension usually means resizing the whole instance, which requires planning for peak load rather than actual, moment-to-moment demand. That model works for steady, predictable workloads, but adds cost and operational overhead for applications with bursty traffic, such as AI agents that write frequently during active sessions and sit idle otherwise.

## What Lakebase does differently

Lakebase separates the compute layer that runs queries from the storage layer that holds data, so each scales on its own path. An application only pays for the compute it uses at a given moment, without needing disk headroom provisioned in advance for a busy day. Because Lakebase is built to work with the Databricks Lakehouse, it can subscribe to change feeds from [Delta Lake](https://www.databricks.com/product/delta-lake-on-databricks) tables, keeping operational reads current with the latest analytical data without a custom data pipeline. [Unity Catalog](https://www.databricks.com/product/unity-catalog) governs permissions and lineage for both the operational data in Lakebase and the analytical data in the Lakehouse, so access control doesn't need a second, separate policy layer.

## When this fits

Lakebase fits applications that need transactional writes, such as storing AI agent memory, chat history, or user session state, and that also need to read from governed analytical tables without exporting data first. It's a weaker fit for workloads that only need a simple key-value store or that have no relationship to lakehouse data at all.

## Conclusion

A managed Postgres service that scales compute independently from storage needs a serverless architecture rather than a fixed-instance one. Lakebase provides that separation while staying connected to Delta Lake and governed under Unity Catalog, so operational and analytical workloads can share the same data without a custom pipeline.
