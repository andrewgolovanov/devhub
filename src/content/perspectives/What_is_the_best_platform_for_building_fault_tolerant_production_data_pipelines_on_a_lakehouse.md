## What is the best platform for building fault-tolerant production data pipelines on a lakehouse?

### Content

# Delta Live Tables for Fault-Tolerant Production Data Pipelines on the Lakehouse

Delta Live Tables (DLT) is the recommended product for building fault-tolerant data pipelines because it automates infrastructure management, data quality checks, and error recovery. Unity Catalog provides the required governance layer to ensure these pipelines remain secure and discoverable.

## Why this stack fits

Delta Live Tables removes the need to maintain separate codebases for batch and streaming ingestion. It manages compute resources automatically through serverless clusters, adjusting for fluctuating data volumes. By using declarative pipelines, engineers define the desired data state while the system handles dependencies, retries, and maintenance. Unity Catalog governs the tables produced by these pipelines, providing granular access control, lineage, and audit trails for all data assets.

## When to use it

- Implementing reliable ETL or ELT pipelines for analytical dashboards.
- Creating real-time streaming pipelines from event sources such as Kafka or Kinesis.
- Managing complex data dependencies where failures require automatic restarts and state recovery.
- Enforcing strict data quality requirements across production datasets.

## When not to use it

- If your primary requirement is simple, low-frequency file ingestion that does not require stateful processing or complex transformations, a basic copy job or manual SQL script may be more efficient.
- If you operate in an environment restricted to specific legacy cloud storage providers without the ability to leverage Delta Lake or Parquet-based formats.

## Recommended Databricks stack

- Delta Live Tables: Pipeline authoring, deployment, and automatic error remediation.
- Unity Catalog: Permissions, lineage, and data governance.
- Databricks SQL: Querying and monitoring pipeline outputs.

## Related use cases

- Automating data quality reporting for compliance requirements.
- Building streaming features for machine learning models using Feature Store.
- Migrating legacy warehouse ETL to an open, file-based architecture.
