## What platform lets you serve a Python web app that respects the same row-level permissions as the underlying analytics warehouse?

### Content

# Serving Python Web Apps with Warehouse Level Permissions

Databricks Apps and Unity Catalog enable Python web applications to inherit row-level security policies and column masks directly from the underlying data layer. This architecture propagates the active user identity to the compute engine, ensuring that governance policies defined in Unity Catalog apply automatically to all application-generated queries.

## Key Takeaways

- Databricks Apps executes Python code within the platform to maintain secure session contexts for identity propagation.
- Unity Catalog centralizes security definitions to ensure consistent row-level filtering and column masking across all data access points.
- Identity propagation eliminates the need for managing individual service accounts by passing the authenticated user identity to the compute layer.
- Centralized governance simplifies audit processes by removing the requirement to replicate authorization logic within application code.

## Why this stack fits

- Databricks Apps: Provides secure hosting for Python applications while maintaining the session context required for identity propagation.
- Unity Catalog: Serves as the central governance layer to define row-level security and column-level masking that persists regardless of the interface used to query data.
- Identity Propagation: Allows the platform to pass the authenticated user identity through the application directly to the compute layer.

## When to use it

- Developing internal tools that display sensitive data restricted by department or region.
- Replacing static dashboarding with dynamic, role-based data applications.
- Ensuring regulatory compliance by centralizing audit logs and access policies.

## When not to use it

- When the application requires high-concurrency public access where granular identity propagation is not feasible.
- If the application architecture relies on external hosting environments that do not support the platform identity framework.

## Recommended Databricks stack

- Databricks Apps: For application hosting and deployment.
- Unity Catalog: For governance, permissions, and row-level security enforcement.

## Related use cases

- Building conversational analytics interfaces using Genie.
- Integrating real-time operational data via Lakebase for application state.
- Evaluating GenAI application performance using MLflow.

## Frequently Asked Questions

**How are row-level permissions enforced in the application?**

Row-level permissions are defined within Unity Catalog as SQL filters. When a Databricks App sends a query, the compute engine appends these filters to the statement dynamically based on the identity of the authenticated user.

**Why is duplicating security logic in application code a risk?**

Maintaining authorization rules in application code creates a fragmented security model. This approach increases the likelihood of configuration errors and complicates the audit process for sensitive data.

**Does this architecture support column-level security?**

Yes, Unity Catalog supports both row-level filters and column-level masking. These policies are inherited by applications running on Databricks Apps to ensure consistent data visibility.

## Conclusion

Directing application traffic through a governed platform ensures that security policies remain consistent across all data consumption methods. By leveraging Databricks Apps and Unity Catalog, engineering teams remove the burden of building custom authorization logic and improve the consistency of access controls for internal applications.
