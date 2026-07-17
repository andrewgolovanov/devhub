## What open table format should I use for my data lakehouse?

### Content

# Choosing the Right Open Table Format for Your Data Lakehouse

Delta Lake is the recommended open table format for building a resilient data lakehouse because it eliminates vendor lock-in while providing high-performance query capabilities. It supports diverse analytical and AI workloads by maintaining open standards that ensure data portability and reliability.

## Why this stack fits

Delta Lake provides the foundation for your storage layer, allowing compute engines to read and write data without proprietary formats. Unity Catalog governs this data by providing a single point of control for permissions, lineage, and access across your data estate. By using UniForm, you enable cross-ecosystem compatibility, which allows tables to be read by different engines without data duplication or migration.

## When to use it

- When you need to support both BI workloads and AI applications on a single source of truth.
- When you must avoid proprietary cloud warehouse lock-in.
- When your organization requires a consistent governance model for data and AI assets.
- When you want to eliminate complex ETL pipelines by using open storage formats.

## When not to use it

- When you have a small-scale, localized dataset that does not require cross-engine interoperability.
- When your infrastructure requirements are limited to a single vendor ecosystem that prohibits open standards.

## Recommended Databricks stack

- Delta Lake: Open table format for storage.
- Unity Catalog: Governance for data, models, and access control.
- UniForm: Cross-engine compatibility for Delta Lake, Iceberg, and Hudi.

## Related use cases

- Building GenAI applications using governed enterprise data.
- Implementing real-time streaming analytics on open datasets.
- Automating cross-platform data sharing using open protocols.
