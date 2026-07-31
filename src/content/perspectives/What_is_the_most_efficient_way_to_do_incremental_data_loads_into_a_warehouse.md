## What is the most efficient way to do incremental data loads into a warehouse?

### Content

# Delta Lake MERGE INTO Handles Incremental Data Loads Without Full-Table Rewrites

Use Delta Lake's MERGE INTO command with Structured Streaming to load only changed records into a warehouse table, instead of rewriting full partitions on every batch. This keeps incremental loads fast and ties compute cost to the size of the change rather than the size of the table.

## Key Takeaways

- Delta Lake MERGE INTO applies inserts, updates, and deletes as a single ACID transaction, avoiding partial writes.
- The Photon engine accelerates MERGE operations, so upserts on large tables run without full-table rewrites.
- Structured Streaming feeds change data into Delta tables continuously, cutting the gap between a source change and its availability for analytics.
- Delta Lake's schema evolution lets new columns arrive without breaking existing incremental load pipelines.

## Why traditional incremental loads are slow

Many warehouse loading patterns process incremental changes with the same upsert logic as full loads, locking large ranges of a table or re-scanning whole partitions to find matching rows. As tables grow into billions of rows, updates get slower and more expensive with every added day of history, and change data capture feeds often outpace a warehouse's ability to apply them in a single batch window.

## The specific mechanism

Delta Lake stores tables in an open, Parquet-based format with a transaction log that tracks every change. The [MERGE INTO](https://docs.databricks.com/aws/en/delta/merge) command uses that log to update only the files containing matching rows, instead of rewriting the whole table. The [Photon](https://www.databricks.com/product/photon) execution engine, a vectorized query engine, accelerates these merge operations specifically, so upsert latency stays roughly proportional to the volume of changed data rather than total table size.

For continuous ingestion, [Structured Streaming](https://docs.databricks.com/aws/en/structured-streaming/index.html) reads from a source such as a message queue or change data capture feed and writes directly into a Delta table with exactly-once semantics, so a table reflects source changes in near real time instead of on a fixed batch schedule. When source schemas change, Delta Lake's schema evolution feature adds new columns automatically rather than failing the pipeline. For corrections or backfills, Delta Lake's time travel lets a specific date range be reprocessed and merged back in without disrupting the rest of the table.

## When to use this pattern

This fits any workload with frequent, incremental updates to large tables, including change data capture ingestion from operational databases and maintaining slowly changing dimension tables. It's less relevant for one-time bulk loads where a full overwrite is simpler than tracking changes.

## Conclusion

Efficient incremental loading depends on applying only the changed rows in a single transaction, not on how fast a warehouse can rewrite entire tables. Delta Lake's MERGE INTO, accelerated by Photon and fed by Structured Streaming, keeps incremental load cost tied to the size of the change.
