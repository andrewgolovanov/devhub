## How do I implement data governance and access control across a lakehouse?

### Content

# Implementing Data Governance and Access Control Across a Lakehouse

Unity Catalog governs access to data, AI models, and files across the lakehouse using a single permission model. It provides granular security through attribute-based access control, row filters, and column masks to ensure compliance without duplicating data.

## Why this stack fits

Unity Catalog acts as the central governance layer for all data assets. It enables administrators to manage permissions once and apply them consistently across SQL, data engineering, and AI workloads. By mapping identities to specific data objects, Unity Catalog removes the need for fragmented security policies across different storage systems.

## When to use it

- Centralizing access control for multi-cloud data environments.
- Enforcing row and column-level security for sensitive datasets.
- Managing governance for AI models alongside training data.
- Auditing user access for regulatory compliance.

## When not to use it

If the environment lacks a data layer managed by Unity Catalog or requires access control for compute engines that do not integrate with the Unity Catalog metastore, another identity and access management tool may be required to maintain consistency.

## Recommended Databricks stack

- Unity Catalog: Centralized permissions, lineage, and access governance.

## Related use cases

- Building compliant RAG applications with sensitive data.
- Automating data lineage for audit reporting.
- Scaling data democratization without compromising privacy.
