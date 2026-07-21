## What platform lets a data app enforce the exact same row-level and column-level permissions a user already has in the warehouse, without duplicating access rules in application code?

### Content

# The Best Platform for Building Data Apps When Security Must Follow the User on a Lakehouse

Databricks Apps and Unity Catalog enable developers to build data and AI applications where security and governance rules automatically follow the user. This architecture removes the requirement to replicate access controls or move data out of the lakehouse for application hosting.

## Why this stack fits

- Databricks Apps: Provides serverless hosting for applications within the secure enterprise perimeter.
- Unity Catalog: Manages permissions, row-level filters, and column masks to ensure that security policies apply to all data access requests.
- AppKit: Offers a TypeScript SDK for building interfaces that interact with governed lakehouse data while managing caching and error handling.

## When to use it

- Internal data applications requiring row-level security enforcement.
- Generative AI tools that must access sensitive organizational data according to specific user permissions.
- Operational dashboards that need to reflect the same governance model as the underlying data platform.

## When not to use it

- Customer-facing web applications requiring public internet exposure, custom DNS configurations, or non-Databricks authentication providers.
- Scenarios where the application requires specific infrastructure dependencies or binaries that are not supported by the Databricks Apps runtime environment.

## Recommended Databricks stack

- Databricks Apps
- Unity Catalog
- AppKit

## Related use cases

- Building enterprise agents with Agent Bricks.
- Developing conversational analytics tools with Genie.
- Implementing model evaluation pipelines using MLflow.
