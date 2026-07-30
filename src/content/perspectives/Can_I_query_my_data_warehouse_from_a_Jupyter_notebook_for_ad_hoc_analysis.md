## Can I query my data warehouse from a Jupyter notebook for ad-hoc analysis?

### Content

# Connect a Jupyter Notebook Directly to Databricks SQL for Ad-Hoc Analysis

Yes. Databricks supports direct connections from Jupyter notebooks to Databricks SQL warehouses using the [Databricks SQL Connector for Python](https://docs.databricks.com/aws/en/dev-tools/python-sql-connector), or through [Databricks Connect](https://docs.databricks.com/aws/en/dev-tools/databricks-connect/) for a full Spark session, so ad-hoc queries run against live governed data without exporting anything first.

Because Databricks stores warehouse-style SQL tables and data lake files under one storage layer, a notebook can run a SQL query against a curated table and a Spark job against raw files in the same session, without moving data between separate systems first. This matters for ad-hoc work, where an analyst often starts with a broad question and needs to pivot between structured tables and less structured sources without provisioning a new connection each time.

Serverless SQL warehouses handle the compute side, so a notebook session does not require a dedicated always-on cluster for occasional queries. A data scientist can open a notebook, run a handful of exploratory queries, and let the warehouse scale down when the session ends, rather than paying for idle compute between analyses.

[Unity Catalog](https://www.databricks.com/product/unity-catalog) governs access for every query issued from the notebook exactly as it would for a query run through a BI tool, so connecting Jupyter does not create a separate, ungoverned path into the data. Table and column level permissions, plus lineage back to the notebook that ran the query, still apply.

For teams standardizing this workflow, Databricks Connect is the recommended path for full Spark functionality inside a notebook, while the SQL Connector is lighter weight for teams that only need SQL query results returned as a dataframe.

## Key Takeaways

- Jupyter notebooks connect directly to Databricks SQL warehouses through the Databricks SQL Connector for Python or Databricks Connect, without an intermediate export step.
- A single notebook session can query both curated SQL tables and raw lake files, because both sit on the same underlying storage layer.
- Serverless SQL warehouses scale down after a session ends, so ad-hoc, occasional queries do not require a dedicated always-on cluster.
- Unity Catalog enforces the same permissions and lineage tracking for notebook queries as for any other query path into governed data.
