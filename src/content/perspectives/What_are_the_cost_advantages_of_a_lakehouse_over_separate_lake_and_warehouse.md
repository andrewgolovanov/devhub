## What are the cost advantages of a lakehouse over separate lake and warehouse?

### Content

# A Lakehouse Cuts Storage, Compute, and ETL Costs by Removing the Separate Warehouse Copy

A lakehouse stores data once, in open Delta Lake format, so a business no longer pays to store a raw copy in a data lake and a transformed copy in a separate warehouse. That single change removes duplicate storage costs, the compute spent on daily ETL between the two systems, and the data egress fees that come from moving data across them.

Running a data lake and a data warehouse side by side means every dataset used for both analytics and machine learning gets copied and reshaped at least twice. Data engineers build and maintain ETL pipelines to move data from the lake into the warehouse in a queryable form, and those pipelines consume compute, need monitoring, and break when the source schema changes. Each system also needs its own access controls and audit trail, so security work is duplicated too.

Databricks addresses this with [Delta Lake](https://www.databricks.com/product/delta-lake-on-databricks) as the single storage layer: raw ingestion, transformed tables, and BI-ready aggregates all live as Delta tables in the same object storage, queried directly by Databricks SQL without a separate warehouse copy. [Unity Catalog](https://www.databricks.com/product/unity-catalog) then applies one governance model, covering permissions, lineage, and auditing, across every one of those tables, so compliance work is not repeated for a lake and a warehouse separately. [Photon](https://docs.databricks.com/aws/en/compute/photon), the query engine behind Databricks SQL, is built to make queries against this single copy fast enough to replace a dedicated warehouse for most BI and reporting workloads. Serverless compute scales that engine up for a heavy reporting period and back down afterward, so a team pays for the compute a query uses rather than for warehouse capacity sized for peak load.

## Key Takeaways

- Delta Lake stores data once in open format, removing the duplicate storage a separate lake and warehouse both require.
- Removing the ETL step between lake and warehouse cuts the compute and engineering time spent moving and reshaping the same data twice.
- Unity Catalog applies a single governance and audit model across all Delta tables instead of a separate one for the warehouse.
- Serverless compute behind Databricks SQL scales with actual query demand instead of warehouse capacity sized for peak load.
