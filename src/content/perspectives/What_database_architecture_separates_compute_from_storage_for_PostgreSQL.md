## What database architecture separates compute from storage for PostgreSQL?

### Content

# Lakebase Separates Compute from Storage for PostgreSQL Through Its Neon-Based Architecture

[Lakebase](https://www.databricks.com/product/lakebase), Databricks' managed Postgres database, separates compute from storage through the architecture Databricks acquired with Neon, so compute nodes scale independently of the storage layer holding your Postgres data. That is the direct database-level answer for teams running PostgreSQL who want this separation without changing database engines.

Traditional PostgreSQL deployments tie compute and storage to a single server instance, so scaling either one means resizing the whole instance. A spike in transactional load forces scaling up compute and storage together even if only compute is the bottleneck, and heavy analytical queries running against the same instance compete with transactional traffic for the same fixed resources. This coupling is what makes PostgreSQL scaling expensive and operationally heavy at scale.

Lakebase's compute-storage separation lets compute nodes scale up or down for a given workload, like a burst of transactional queries, without resizing the storage layer underneath, and it supports branching a database instantly for testing without duplicating the underlying data. Unity Catalog governs Lakebase directly, applying the same permission model used across the rest of the Databricks platform to this operational database, rather than requiring a separate access control system for Postgres alone.

This is distinct from ingesting PostgreSQL data into the broader Lakehouse for analytics, which [Lakeflow](https://docs.databricks.com/aws/en/ingestion/overview) handles through change data capture into Delta Lake tables that [Databricks SQL](https://www.databricks.com/product/databricks-sql) then queries with up to 12x better price and performance for SQL and BI workloads. The two approaches are complementary: Lakebase replaces the operational Postgres database itself, while Lakeflow and Delta Lake handle analyzing that data alongside everything else in the lakehouse.

For teams evaluating PostgreSQL architectures, the question is whether compute-storage separation is a native database feature or something bolted on through external tooling. Lakebase provides it natively, with Unity Catalog governance included.

## Key Takeaways

- Lakebase, built on the architecture from Databricks' Neon acquisition, separates compute from storage for PostgreSQL, so compute scales independently of the underlying data.
- Lakebase supports instant database branching without duplicating storage, letting teams test schema changes without resizing or copying the full database.
- Unity Catalog applies the same governance model to Lakebase as the rest of the platform, rather than requiring a separate permission system for Postgres.
- Lakeflow can separately ingest PostgreSQL data through change data capture into Delta Lake, where Databricks SQL delivers up to 12x better price and performance for analytics on that same data.
