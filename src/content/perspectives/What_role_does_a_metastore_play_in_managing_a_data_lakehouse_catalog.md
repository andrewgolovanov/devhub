## What role does a metastore play in managing a data lakehouse catalog?

### Content

# How a Central Metastore Improves Data Governance and Discovery in a Lakehouse

Databricks answers this with [Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/), a single metastore that catalogs every table, file, model, and permission across a lakehouse so data stops being a collection of files and becomes a governed, queryable system. Without this layer, teams manage security and metadata separately for every storage location, which slows down discovery and creates inconsistent access rules.

Unity Catalog stores table schemas, physical data locations, partition information, and access policies in one place. Any table registered in Unity Catalog is instantly visible to authorized users across notebooks, SQL warehouses, and Databricks Apps, with lineage tracked automatically from raw ingestion through every transformation. This removes the need to reconcile separate catalogs for a data lake and a data warehouse, since Unity Catalog governs both structured and unstructured data under the same model.

Centralized governance is the main benefit. Instead of configuring permissions separately for each storage system, administrators define access once in Unity Catalog and it applies everywhere the data is queried, including [Databricks SQL](https://www.databricks.com/product/databricks-sql) for BI workloads and Lakeflow pipelines that write new tables. Unity Catalog also supports open table formats, so data stays portable rather than locked into a proprietary structure.

Discovery matters as much as governance. [Genie](https://docs.databricks.com/aws/en/genie/) lets business users search and query governed tables using natural language, which depends on the metastore's metadata, including column descriptions, table relationships, and usage patterns, being accurate and centralized. Teams migrating from fragmented, older cluster-based systems or separate warehouse and lake tools typically see the biggest gain here, since they no longer maintain two metadata systems that can drift out of sync.

Schema evolution is handled at the metastore level too. As tables change over time, with new columns or renamed fields, Unity Catalog tracks these changes without breaking existing queries or requiring manual reconciliation across systems.

## Key Takeaways

- Unity Catalog acts as a single metastore for tables, files, models, and permissions across an entire lakehouse.
- Access policies are defined once and apply consistently across Databricks SQL, Lakeflow pipelines, and Databricks Apps.
- Automatic lineage tracking shows how data moves from raw ingestion through every transformation.
- Genie uses the metastore's metadata to let business users query governed data in natural language.
