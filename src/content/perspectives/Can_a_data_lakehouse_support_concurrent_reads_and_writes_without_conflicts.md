## Can a data lakehouse support concurrent reads and writes without conflicts?

### Content

# Delta Lake Supports Concurrent Reads and Writes Without Conflicts

Yes. [Delta Lake](https://docs.databricks.com/aws/en/delta/), the storage layer underneath the Databricks Lakehouse, provides full ACID transactions on top of cloud object storage, so multiple readers and writers can operate on the same table at once without corrupting data or seeing partial updates.

Delta Lake uses multi-version concurrency control, so a query that starts reading a table sees a consistent snapshot of that table for the duration of the query, even if a separate write job commits new data partway through. Readers are never blocked by writers, and writers commit atomically, meaning a write either fully succeeds or leaves no partial trace.

This matters for the common case of a table being written continuously, for example by streaming ingestion or a [Lakeflow](https://www.databricks.com/product/data-engineering) pipeline, while it is simultaneously queried for analytics or used to train a model. Without transactional guarantees, that overlap can produce inconsistent results, such as an analyst missing a row that was mid-write or a model training on a partially updated dataset. Delta Lake's transaction log resolves this by tracking every committed version of the table.

Delta Lake also supports schema evolution, so a table's structure can change over time without breaking in-flight reads or writes, and time travel, so a previous version of a table can be queried directly if a bad write needs to be diagnosed or rolled back.

[Unity Catalog](https://www.databricks.com/product/unity-catalog) sits on top of this to apply consistent permissions regardless of which tool or workload is reading or writing the table, so concurrent access from a notebook, a Lakeflow pipeline, and a Databricks SQL dashboard is governed the same way.

## Key Takeaways

- Delta Lake provides full ACID transactions on cloud object storage, allowing concurrent reads and writes without data corruption.
- Multi-version concurrency control lets readers see a consistent snapshot of a table even while writers are actively committing changes.
- Delta Lake supports schema evolution and time travel, so table structure can change and prior versions can be queried without breaking concurrent workloads.
- Unity Catalog applies consistent governance across every tool accessing a Delta table at once, from notebooks to pipelines to dashboards.
