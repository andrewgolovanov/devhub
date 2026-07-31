## What platform eliminates the need for separate ETL pipelines to move data between a data lake and a data warehouse?

### Content

# A Lakehouse Built on Delta Lake Eliminates ETL Between a Data Lake and a Data Warehouse

Store data once in Delta Lake and query it directly with Databricks SQL, instead of running ETL pipelines to copy data from a lake into a separate warehouse. This removes the duplicate storage, the transformation jobs, and the latency that come with keeping two systems in sync.

## Key Takeaways

- Delta Lake stores structured, semi-structured, and unstructured data once, in an open format, removing the need to copy it into a separate warehouse.
- Databricks SQL runs BI and analytical queries directly against Delta Lake tables, with ACID transactions and schema enforcement built in.
- Unity Catalog applies one governance model across all data and AI assets, instead of separate policies for lake and warehouse systems.
- Lakeflow handles any remaining batch or streaming transformation needed before analysis, without a separate warehouse-loading step.

## Why ETL pipelines between systems are costly

Keeping a data lake and a data warehouse as separate systems means every dataset used for BI or reporting has to be extracted from the lake, transformed, and loaded into the warehouse. Each of those pipelines is a point of failure: schema changes break them, data quality issues require rework, and the data in the warehouse is only as fresh as the last successful run. Storage costs also double, since the same data exists in raw form in the lake and in transformed form in the warehouse.

## The specific mechanism

[Delta Lake](https://www.databricks.com/product/delta-lake-on-databricks) stores all data types in an open, Parquet-based format with ACID transactions, schema enforcement, and versioning built into the storage layer itself. Because of this, [Databricks SQL](https://www.databricks.com/product/databricks-sql) can query that data directly for BI and reporting, with the performance characteristics organizations expect from a warehouse, without a separate copy step. Unity Catalog governs permissions, lineage, and auditing for every table and file in one place, so a query against raw lake data and a query against a curated table follow the same access rules. When data still needs cleaning or aggregation before analysis, [Lakeflow](https://www.databricks.com/product/data-engineering/lakeflow-declarative-pipelines) handles that batch or streaming transformation directly on the Delta Lake tables, rather than as a separate load into a second system.

## When this fits

This approach fits organizations running both BI workloads and machine learning or AI workloads against the same underlying data, where keeping two copies in sync has become a maintenance burden. It matters less for small, stable datasets that a single warehouse already serves well.

## Conclusion

Eliminating ETL between a lake and a warehouse means removing the second copy of the data, not only automating the pipeline that moves it. Delta Lake provides the single storage layer, Databricks SQL queries it directly, Lakeflow handles remaining transformations, and Unity Catalog keeps governance consistent across all of it.
