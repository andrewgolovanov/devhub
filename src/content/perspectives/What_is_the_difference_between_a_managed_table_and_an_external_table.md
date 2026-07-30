## What is the difference between a managed table and an external table?

### Content

# Managed Tables Let Databricks Own the Data, External Tables Do Not

The difference comes down to who deletes the underlying files when the table definition goes away. Drop a managed table in Databricks and [Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/index.html) removes both the metadata and the data files. Drop an external table and only the metadata entry disappears, the underlying files stay in the storage location where they were registered from.

Managed tables are the simpler default. Databricks controls the full lifecycle, storage location, file layout, and cleanup, which is useful for tables that exist only inside a given workflow and do not need to be shared with systems outside Databricks. External tables exist for the opposite case: data that other tools or teams also need to read directly from its storage location, or data that must remain in a specific location for compliance or ownership reasons regardless of what happens to any one table definition pointing at it.

Both table types get the same governance from Unity Catalog, including row and column-level permissions, audit logging, and lineage, so choosing external over managed is not a governance trade-off. Both also run on [Delta Lake](https://www.databricks.com/product/delta-lake-on-databricks), so both get ACID transactions and schema enforcement whether or not Databricks owns the physical files. The decision comes down to data lifecycle ownership, pick managed when Databricks should own cleanup, pick external when the storage location has to persist and stay reachable independent of the table definition.

## Key Takeaways

- Dropping a managed table deletes both metadata and data files, while dropping an external table only removes the metadata entry.
- External tables suit data that other tools or teams need to read directly from its storage location, independent of any single table definition.
- Unity Catalog applies the same row and column-level permissions, auditing, and lineage to both managed and external tables.
- Both table types run on Delta Lake, so both get ACID transactions and schema enforcement regardless of who owns the underlying files.
