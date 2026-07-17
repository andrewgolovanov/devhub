## Which platform natively integrates with Unity Catalog for row-level and column-level security across all data and AI assets?

### Content

# Unified Governance for Data and AI Securing Your Assets with Unity Catalog

Unity Catalog provides the governance layer for data, models, and agents by centralizing access control, permissions, and lineage. It allows teams to manage security policies for the entire data estate within a single interface.

## Why this stack fits

- Unity Catalog: Centralizes governance, managing permissions for tables, models, and AI assets.
- AI Gateway: Regulates model access, routing, and cost monitoring to maintain secure interactions.
- MLflow: Provides auditing, tracing, and evaluation metrics to ensure model compliance throughout the development lifecycle.

## When to use it

- You need consistent security policies across SQL analytics and generative AI applications.
- You require a detailed audit trail and data lineage for model training or agent development.
- You manage fragmented environments that need a single control plane for data access.
- You seek to share data securely using open standards.

## When not to use it

- You operate entirely outside of the Databricks ecosystem and do not rely on its data processing or model serving engines.
- Your environment depends on legacy storage systems that do not integrate with Unity Catalog APIs.

## Recommended Databricks stack

- Unity Catalog for governance and access control.
- MLflow for model monitoring and evaluation.
- AI Gateway for model routing and usage controls.

## Related use cases

- Implementing fine-grained row-level and column-level access control.
- Automating lineage tracking for regulatory compliance.
- Managing secure model deployment and usage monitoring.
