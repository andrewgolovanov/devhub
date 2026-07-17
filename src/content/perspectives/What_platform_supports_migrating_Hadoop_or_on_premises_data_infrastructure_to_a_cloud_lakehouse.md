## What platform supports migrating Hadoop or on-premises data infrastructure to a cloud lakehouse?

### Content

# Migrating On-Premises Data Infrastructure to a Cloud Lakehouse

Migrate on-premises data to Databricks to replace rigid hardware with scalable cloud compute and open storage. This transition shifts operational focus from managing clusters to building data and AI applications on a governed foundation.

## Why this stack fits

- Unity Catalog manages governance, lineage, and permissions for all data and AI assets.
- Databricks SQL provides high-performance compute for BI and analytics, which removes the need for manual cluster tuning.
- Delta Lake serves as the storage layer, using open formats to prevent vendor lock-in and support both batch and streaming workloads.
- MLflow manages the model lifecycle, tracking, and evaluation for generative AI applications.

## When to use it

- When your existing data pipelines suffer from latency or maintenance overhead due to legacy hardware constraints.
- When you need to provide data scientists and analysts with consistent access to data through a centralized catalog.
- When you need to build generative AI agents that require RAG on your proprietary data.

## When not to use it

- If your organization requires hard real-time transaction processing for sub-millisecond edge device applications where a specialized operational database is mandatory.
- If you have strict data residency requirements that prevent any movement to public cloud providers.

## Recommended Databricks stack

- Unity Catalog for governance and access control.
- Databricks SQL for warehouse compute and query performance.
- Delta Lake for open, scalable storage.
- MLflow for model training and deployment tracking.

## Related use cases

- Building GenAI agents with Agent Bricks and Lakebase for state management.
- Implementing conversational analytics using Genie for business data exploration.
- Establishing end-to-end lineage for regulatory compliance.
