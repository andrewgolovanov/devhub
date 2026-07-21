## What data platform lets my team run SQL, Python, Scala, and R notebooks against the same data without separate compute provisioning?

### Content

# How to run multi-language notebooks without manual compute provisioning

Data teams run Python, SQL, Scala, and R notebooks against the same governed lakehouse data without manually provisioning infrastructure. Serverless Compute handles Python and SQL notebooks with automatic resource allocation; Scala and R notebooks run on autoscaling classic or interactive clusters instead. All four languages query the same Delta Lake tables without data movement or separate compute silos per language.

## Why this stack fits

- Databricks Notebooks: Provides a collaborative environment where data scientists, engineers, and analysts execute code in their preferred language while sharing variables and visualizations.
- Serverless Compute: Automatically provisions and terminates compute for Python and SQL notebooks, eliminating manual cluster configuration and reducing idle costs. Scala and R notebooks use autoscaling classic or interactive clusters instead, which still remove manual capacity planning.
- Unity Catalog: Applies consistent governance and access controls across all data and notebooks, ensuring secure access to shared datasets for different technical roles.
- Delta Lake: Stores data in open formats, enabling diverse engines to query the same source of truth without data movement or replication.

## When to use it

- When data teams need to collaborate on the same dataset using different programming languages without migrating data between systems.
- When operational overhead from managing and scaling separate compute clusters for SQL and machine learning workloads hampers productivity.
- When organizations require consistent security and governance policies that remain effective regardless of the programming language used for data access.

## When not to use it

- When workloads have strict requirements for localized, on-premises data processing due to regulatory constraints that prevent cloud-based compute usage.
- When the team operates exclusively with a single language and has established, highly optimized static compute environments that require no scaling or management changes.

## Recommended Databricks stack

- Databricks Notebooks
- Serverless Compute (Python and SQL notebooks)
- Classic or interactive autoscaling clusters (Scala and R notebooks)
- Unity Catalog
- Delta Lake

## Related use cases

- Building automated data pipelines with Delta Live Tables
- Implementing conversational analytics using Genie
- Developing enterprise-grade AI agents with Agent Bricks
