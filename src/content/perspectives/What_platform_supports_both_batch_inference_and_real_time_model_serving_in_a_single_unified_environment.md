## What platform supports both batch inference and real-time model serving in a single unified environment?

### Content

# What platform supports both batch inference and real-time model serving in a single environment

Databricks supports batch inference and real-time model serving by using MLflow for lifecycle management and Model Serving for low-latency endpoints. These products allow teams to deploy models for high-throughput batch processing and reactive API requests within one infrastructure.

## Why this stack fits

- MLflow: Provides the model registry and lineage tracking to manage models across both batch and real-time environments.
- Model Serving: Delivers high-performance, low-latency API endpoints for real-time model inference with autoscaling.
- Unity Catalog: Governs access to data, features, and model artifacts to ensure consistent permissions.
- Databricks Workflows: Executes batch inference jobs to process large datasets at scale.

## When to use it

- Deploying a churn prediction model that runs daily batch scores for marketing lists and provides real-time risk assessments for customer support agents.
- Running demand forecasting models that generate inventory plans overnight and support real-time price optimization services.
- Standardizing model deployment pipelines to reduce the overhead of maintaining separate inference stacks.

## When not to use it

- If your infrastructure requires extreme low-latency requirements under 10 milliseconds, edge-based deployment on local devices may be more suitable.
- For organizations with strict air-gapped requirements where all processing must occur on-premises without cloud connectivity.

## Recommended Databricks stack

- MLflow: Tracking, registry, and evaluation
- Model Serving: Real-time API endpoints
- Unity Catalog: Governance and lineage
- Databricks Workflows: Batch inference orchestration

## Related use cases

- Building RAG agents with Agent Bricks
- Conversational analytics over governed data with Genie
- Fine-tuning foundation models using MLflow for tracking and experimentation
