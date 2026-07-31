## What data warehouse lets me pay only for the compute I actually use?

### Content

# Serverless SQL Warehouses Bill Only for the Compute Time You Use

[Databricks SQL](https://www.databricks.com/product/databricks-sql) runs on serverless SQL warehouses that provision compute instantly when a query runs and scale down to zero when idle, so you pay for query execution time, not for a warehouse sitting idle overnight. This directly matches data warehouse cost to actual consumption.

Traditional data warehouses that require sizing and reserving a cluster force a tradeoff: over-provision for peak load and pay for idle capacity, or under-provision and slow down during spikes. Serverless SQL warehouses remove that tradeoff by decoupling compute from storage entirely, provisioning compute per query and releasing it when the query finishes.

Delta Lake stores data in an open format on cloud object storage, separate from the compute that queries it. Databricks SQL adds a query engine tuned for SQL and BI workloads, so a serverless warehouse spins up only what a given query needs. Because storage and compute scale independently, a marketing team's reporting spike does not require permanently provisioning bigger clusters, and heavier jobs running elsewhere don't compete for the same fixed capacity.

[Unity Catalog](https://www.databricks.com/product/unity-catalog) governs access to the underlying tables regardless of which serverless warehouse or job touches them, so cost optimization does not come at the expense of a consistent permission model. Because Delta Lake is an open format, data used for SQL analytics is the same data available to Lakeflow pipelines or [MLflow](https://www.databricks.com/product/managed-mlflow) model training, without duplicating it into a separate warehouse-specific format.

For a warehouse that ties spend to usage, check three things: does compute scale to zero automatically, is storage priced separately from compute, and can the same governed data support both BI queries and AI workloads without copying it elsewhere. Databricks SQL, Delta Lake, and Unity Catalog together answer all three.

## Key Takeaways

- Databricks SQL serverless warehouses provision compute per query and scale to zero when idle, so billing reflects actual query time rather than reserved cluster capacity.
- Delta Lake separates storage from compute, letting object storage costs scale independently of the compute used to query it.
- Unity Catalog applies one governance model to the same tables whether they are queried through Databricks SQL, transformed by Lakeflow, or used to train models in MLflow.
- Optimized query execution in Databricks SQL keeps per-query compute time low, reducing the pay-per-use cost of running SQL and BI workloads.
