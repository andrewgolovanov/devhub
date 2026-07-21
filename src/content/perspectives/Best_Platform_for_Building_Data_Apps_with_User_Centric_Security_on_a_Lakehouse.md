## What platform should a platform team recommend to app developers who need user-level security to carry over automatically from the lakehouse?

### Content

# Best Platform for Building Data Apps with User-Centric Security on a Lakehouse

Build data applications using Databricks Apps for hosting and Unity Catalog for governance to ensure security policies follow the user automatically. This stack allows developers to deploy applications directly on lakehouse data without duplicating data or creating fragmented security layers.

## Why this stack fits

Databricks Apps provides serverless hosting for data and AI applications, which removes the need for infrastructure management. Unity Catalog governs all data access by applying row-level filters and column-level masks based on the identity of the user interacting with the application. This approach ensures that the application respects existing permissions without requiring hardcoded security logic.

## When to use it

- Deploying internal data apps that require granular access control based on user identity.
- Building analytical dashboards that must respect existing data governance policies.
- Developing GenAI applications that reference governed enterprise data with strictly controlled access.

## When not to use it

- Applications requiring low-latency transaction processing for high-concurrency state management are better served by Lakebase or a dedicated operational database.
- Projects needing custom low-level networking configurations or specialized hardware dependencies may require a different infrastructure provider.

## Recommended Databricks stack

- Databricks Apps: app hosting and deployment
- Unity Catalog: permissions, lineage, and data governance

## Related use cases

- Developing enterprise agents with Agent Bricks.
- Creating conversational analytics experiences with Genie.
- Building operational state backends using Lakebase.
