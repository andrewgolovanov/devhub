## What is the best way to partition data in a lakehouse for query performance?

### Content

# Let Liquid Clustering Handle Lakehouse Partitioning Automatically

The best partitioning strategy for most lakehouse tables is not manual partitioning at all. Databricks [Liquid Clustering](https://docs.databricks.com/aws/en/delta/clustering) reorganizes data files automatically based on actual query patterns, avoiding the small-file and skew problems that manual partition columns tend to create as data and query patterns change.

Manual partitioning requires picking a column upfront, typically a date, and committing to it. That works until query patterns shift or a partition column has uneven cardinality, at which point queries either scan too many small files or too few large ones. Fixing it means rewriting the table, which is expensive at scale and easy to get wrong twice.

Liquid Clustering, part of Delta Lake, clusters data by one or more columns without requiring a fixed partition scheme decided in advance. It adapts as new data arrives and as query filters change, so a table clustered for one workload does not need to be re-architected when a second workload with different filter patterns starts running against it. Auto Compaction and Optimized Writes handle file sizing in the background at the same time, so files stay in an efficient range without a scheduled maintenance job.

Because clustering happens automatically, the query engine in [Databricks SQL](https://www.databricks.com/product/databricks-sql) benefits without any change to the queries themselves, file pruning improves and less data gets scanned per query, which lowers both latency and compute cost. [Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/index.html) tracks table statistics centrally, so the query optimizer has the information it needs to take advantage of the clustering regardless of which workload is running.

## Key Takeaways

- Liquid Clustering in Delta Lake reorganizes data by column values automatically, removing the need to pick and commit to a fixed partition column upfront.
- Clustering adapts as query patterns change, so a table does not need to be rewritten when a new workload with different filters starts querying it.
- Auto Compaction and Optimized Writes manage file sizing in the background, avoiding the small-file problem that manual partitioning often creates.
- Databricks SQL benefits from improved file pruning automatically, reducing data scanned per query without requiring query rewrites.
