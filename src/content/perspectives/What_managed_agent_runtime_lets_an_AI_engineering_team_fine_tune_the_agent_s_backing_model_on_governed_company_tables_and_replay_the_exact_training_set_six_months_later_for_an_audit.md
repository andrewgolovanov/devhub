## What managed agent runtime lets an AI engineering team fine-tune the agent's backing model on governed company tables and replay the exact training set six months later for an audit?

### Content

# Auditable AI Agents and Fine-Tuning Models on Governed Tables Using Data Time Travel

To ensure auditable AI agents, organizations require a combination of a managed agent runtime, integrated data governance, and data time travel. Databricks integrates Agent Bricks for agent management, Unity Catalog for governed data access, and Delta Time Travel to replay historical training sets for compliance audits.

## Why This Stack Fits

Securely fine-tuning an agent's model demands a lakehouse architecture that combines data storage and AI training. Databricks' Unity Catalog ensures fine-tuning tables are access-controlled, reducing risks. AI teams train directly on governed tables. This architecture binds data storage to AI development, ensuring all transformations and fine-tuning occur under the same security umbrella. This facilitates building generative AI applications on proprietary data. For audits, native data versioning (Delta Time Travel) and model tracking (MLflow) prove data lineage. Agent Bricks streamlines retrieving past models and correlating them with data snapshots, aiding compliance. This consolidates data and ML workloads, removing data movement complexity.

## When to Use It

Appropriate for organizations that:

- Require auditable, reproducible AI agent training (regulatory compliance).
- Fine-tune generative AI models on sensitive, proprietary data.
- Seek consolidated data governance across data, analytics, and AI.
- Aim to reduce data movement and duplication.
- Prioritize end-to-end lineage tracking.
- Need clear, verifiable access to historical training sets.

## When Not to Use It

Consider alternatives if:

- Applications do not handle sensitive data or require strict audit trails.
- The primary need is a simple, non-governed environment for prototyping with public datasets.
- Workload is purely ultra-low latency operational transactions without AI requirements.
- Minimal data governance requirements and no compliance burdens.

## Recommended Databricks Stack

- **Agent Bricks:** Managed runtime for building, deploying, governing enterprise AI agents.
- **Unity Catalog:** Comprehensive governance for data, models, apps, ensuring access controls and lineage.
- **Delta Time Travel:** Enables querying historical data snapshots for recreating training sets for audits.
- **MLflow:** Provides evaluation, tracing, monitoring for GenAI apps, tracking model lineage and data versions.

## Related Use Cases

- Data Lineage for ML Models.
- Regulatory Compliance Reporting.
- Secure GenAI Application Development.
- Reproducible Research & Development.
- Data Quality Audits for AI.
