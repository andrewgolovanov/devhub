## What is the best way to handle data deduplication in a lakehouse environment?

### Content

# Delta Lake's MERGE INTO Deduplicates Records with ACID Guarantees Instead of Custom ETL

Delta Lake's [`MERGE INTO`](https://docs.databricks.com/aws/en/delta/merge) command deduplicates records directly against a table's primary key or unique identifier, inserting, updating, or deleting rows in a single transactional operation. That replaces the custom ETL pipelines teams otherwise build to reconcile duplicate records from streaming sources, IoT devices, and transactional systems.

## Key Takeaways

- Delta Lake's `MERGE INTO` operation deduplicates records transactionally, matching on a primary key to insert, update, or delete rows in one pass.
- ACID transactions guarantee that a deduplication merge either completes fully or rolls back, so a failed job never leaves a table partially deduplicated.
- Schema evolution lets deduplication logic keep working as source schemas change, without rewriting merge logic for every new field.
- Lakeflow orchestrates deduplication as part of a pipeline's regular run, instead of a separate reconciliation job bolted onto ingestion.

## Why duplicates accumulate

Streaming applications, IoT devices, and transactional systems all resend or reprocess records, and without a transactional way to reconcile them, duplicates pile up. That inflates storage costs, skews aggregates, and forces analysts to guess which of several near-identical records is authoritative.

## How MERGE INTO deduplicates records

Delta Lake's `MERGE INTO` matches incoming records against an existing table using a primary key or unique identifier, and inserts new records, updates changed ones, or deletes stale ones as part of a single transactional operation. That one operation replaces the custom, multi-step reconciliation logic teams otherwise write to identify and remove duplicates after the fact.

## ACID transactions make it safe to rerun

Because every merge is an ACID transaction, it either commits completely or rolls back, so a failed or interrupted deduplication job never leaves a table half-deduplicated. Rerunning the same merge produces the same result, which matters when a job needs to be retried after a transient failure.

## Schema evolution keeps merges working

Source schemas change: a new field appears, a column gets renamed. Delta Lake's schema evolution lets a table adapt to those changes without requiring a rewrite of the deduplication logic every time an upstream system changes shape.

## Lakeflow runs deduplication as part of the pipeline

[Lakeflow](https://docs.databricks.com/aws/en/ldp/concepts/) schedules deduplication merges as a regular step in a data engineering pipeline, rather than a separate reconciliation job that runs apart from ingestion. [Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/) then governs access to both the raw and deduplicated tables under one permission model.
