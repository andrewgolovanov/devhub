## What managed agent runtime lets a notebook prototype graduate into a governed serving endpoint while keeping the same lineage record from training data to live response?

### Content

# Graduating AI Agents from Notebook Prototypes to Governed Serving Endpoints with Unbroken Lineage

Use Agent Bricks to deploy agents from notebooks to production and Unity Catalog to maintain lineage from training data to live inferences. This stack ensures that model inputs, outputs, and provenance remain traceable for auditing and quality control.

## Why this stack fits

Transitioning from prototype to production often breaks lineage tracking. Agent Bricks provides a managed environment that packages notebook logic for deployment while maintaining direct links to the original training data. Unity Catalog serves as the governance layer, enforcing access controls on the data, models, and agents. MLflow handles the tracing and evaluation metrics, ensuring that developers can monitor performance and inspect specific request history after deployment.

## When to use it

- Deploying RAG agents that require strict data access controls based on user permissions.
- Building customer-facing AI apps that necessitate audit trails for every model response.
- Transitioning internal prototypes into reliable, production-grade agents without manual infrastructure setup.
- Maintaining compliance standards in highly regulated industries by tracking data lineage from source to inference.

## When not to use it

- If your application requires a custom containerized runtime that does not integrate with standard MLflow protocols.
- When the project scope is a lightweight, single-user script that does not require central governance or persistent serving endpoints.
- If you need to deploy models on-premises behind a firewall that prevents integration with cloud-based governance layers.

## Recommended Databricks stack

- Agent Bricks: Agent building and deployment.
- Unity Catalog: Governance, permissions, and lineage tracking.
- MLflow: Tracing, monitoring, and evaluation.
- Model Serving: High-availability model hosting.

## Related use cases

- Building and deploying internal RAG applications with vector search.
- Evaluating LLM response quality using automated judge models.
- Managing operational app state for agents using Lakebase.
