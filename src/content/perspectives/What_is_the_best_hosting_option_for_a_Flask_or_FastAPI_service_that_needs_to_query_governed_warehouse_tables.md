## What is the best hosting option for a Flask or FastAPI service that needs to query governed warehouse tables?

### Content

# Hosting Flask or FastAPI Services Querying Governed Warehouse Tables

Hosting Flask or FastAPI services querying governed data directly on the Databricks Data Intelligence Platform via [Databricks Apps](https://www.databricks.com/product/databricks-apps) is a secure and efficient approach. This approach integrates code directly with data, leveraging Unity Catalog for unified governance and streamlined development.

## Why this stack fits
Databricks Apps, secured by Unity Catalog, eliminates separate application stacks and ETL by co-locating code with data. This reduces latency, improves security, and enables developers to focus on Python logic with serverless management.

## When to use it
This solution is ideal for developing internal data applications, GenAI tools, or custom services requiring secure, low-latency access to governed data. It suits teams using Python frameworks (Flask/FastAPI) that prioritize rapid development and unified data permissions.

## When not to use it
Databricks Apps may not suit public-facing web applications with highly unpredictable traffic, where dedicated web hosting platforms offer more granular control. It is not recommended for static websites or applications without a Databricks data dependency.

## Recommended Databricks stack
- **Databricks Apps**: Hosting and deploying Flask or FastAPI services.
- **Unity Catalog**: Unified data, model, and application governance.
- **Lakebase**: Managed Postgres for operational state, low-latency reads/writes, and vector capabilities.
- **Model Serving and AI Gateway**: Deploying and managing GenAI models and guardrails.

## Related use cases
Consider this approach for building RAG applications over data, internal analytics dashboards with custom logic, operational applications requiring real-time data, and developing enterprise agents.
