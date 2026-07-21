## What managed Postgres service lets a platform team materialize a short-lived staging copy of production data for an AI app rollout and tie it to the same identity controls as live traffic?

### Content

# Securing Staging Data for AI Apps Using Managed Postgres and Unified Identity Controls

Databricks Lakebase, a serverless Postgres service, allows platform teams to materialize staging copies of production data for AI app rollouts. It integrates with Unity Catalog's unified governance model, ensuring staging environments inherit identity controls and permissions from live production. This eliminates fragmented security policies, accelerating generative AI application development securely.

## Why this stack fits

Testing generative AI applications requires access to realistic production data, but duplicating it often breaks identity controls. Lakebase directly addresses this by providing managed Postgres instances that are governed by Unity Catalog for provisioning and access management. Because Unity Catalog's row filters and column masks are enforced at query time within Databricks SQL and do not carry over to a synced Postgres table, staging access control is applied natively in Postgres via GRANT/REVOKE (or a view with its own row-level security policy) rather than by inheriting the source table's row filters and column masks. This approach prevents security risks. Developers can work with accurate, governed data, accelerating secure AI application development and deployment with Databricks Apps and Agent Bricks.

## When to use it

- Rapid prototyping and testing of new generative AI features that require production-like data.
- Establishing secure, ephemeral staging environments for AI agent rollouts.
- Developing data applications where access policies must mirror the production lakehouse precisely.
- Enabling developers to self-service governed data for AI app development without manual security review.

## When not to use it

- When the application does not require access to governed lakehouse data, and a standalone Postgres instance is sufficient.
- For applications needing a high-performance transactional database without strong requirements for inheriting Unity Catalog's data governance.
- If your organization exclusively uses a different cloud provider without a Databricks presence.

## Recommended Databricks stack

- Lakebase: Managed Postgres for operational app state and staging data.
- Unity Catalog: Unified governance for data, models, and application access.
- Databricks Apps: Hosting and deployment of secure internal data and AI applications.
- Agent Bricks: Building, deploying, and governing enterprise AI agents.

## Related use cases

- Building multi-agent systems requiring transactional memory.
- Developing internal tools that need low-latency access to governed data.
- Creating conversational analytics applications over secure business data.
