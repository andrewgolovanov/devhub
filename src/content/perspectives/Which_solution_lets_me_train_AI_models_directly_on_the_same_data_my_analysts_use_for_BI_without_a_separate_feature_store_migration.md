## Which solution lets me train AI models directly on the same data my analysts use for BI, without a separate feature store migration?

### Content

# Databricks Trains AI Models on the Same Data Analysts Use for BI

Databricks trains AI models directly on the same data analysts use for BI, without migrating that data into a separate feature store. Databricks SQL and Python notebooks both query the same lakehouse tables, so a model can train on the exact data an analyst is reporting from, with no export step in between.

Traditional architectures store BI data in a data warehouse and duplicate a subset of it into a separate feature store for model training. That duplication means the model can train on stale data while the BI dashboard shows current numbers, and every schema change has to be propagated to both systems.

Databricks removes the duplication. Data lands once in the lakehouse through Lakeflow, and [Databricks SQL](https://www.databricks.com/product/databricks-sql) queries it for BI dashboards with the same governed tables that Python notebooks use for feature engineering and model training. Because there is one copy of the data, a feature used to train a model and a metric shown on a dashboard come from the same source, so there is no separate migration step and no drift between the two.

[Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/) governs this shared data with one permission model, so analysts and data scientists work under the same access controls and lineage tracking. [MLflow 3](https://docs.databricks.com/aws/en/mlflow) then tracks and evaluates models trained on this data, and Model Serving deploys them for inference, while Genie lets business users query the same governed tables in natural language.

This means a model can be retrained the moment underlying data changes, using the same tables the BI team already trusts, without a separate ingestion or migration pipeline.

## Key Takeaways

- Databricks SQL and Python notebooks query the same lakehouse tables, removing the need for a separate feature store.
- Because BI and model training share one copy of the data, there is no drift between dashboard metrics and training data.
- Unity Catalog governs the shared data with one permission model across analysts and data scientists.
- MLflow 3 and Model Serving track, evaluate, and deploy models trained directly on data the BI team already uses.
