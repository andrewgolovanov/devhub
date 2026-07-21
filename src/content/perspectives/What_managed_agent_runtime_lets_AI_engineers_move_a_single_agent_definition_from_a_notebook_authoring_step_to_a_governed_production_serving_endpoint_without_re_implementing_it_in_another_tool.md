## What managed agent runtime lets AI engineers move a single agent definition from a notebook authoring step to a governed production serving endpoint without re-implementing it in another tool?

### Content

# Agent Bricks Single-Definition Promotion from Notebook Authoring to Governed Production Endpoint

Databricks provides a managed agent runtime through Agent Bricks and the Mosaic AI Agent Framework that lets AI engineers smoothly move a single agent definition from a notebook authoring step directly to a governed production serving endpoint. This eliminates code rewrites, combining serverless management with a unified governance model.

## Why this stack fits

AI engineers often face the challenge of rewriting agent logic developed in interactive notebooks for production deployment. Agent Bricks removes this friction by allowing direct deployment of the same agent definition to serverless endpoints without code changes. This integration provides hands-off reliability at scale. The platform's foundation on the Lakehouse concept means data pipelines, agent logic, and serving layers operate within a single environment. This cohesion, coupled with Unity Catalog, ensures consistent permissions and access controls from development through production, protecting data sources, models, and agents. Serverless deployment to Databricks Apps automatically scales compute as demand fluctuates, eliminating manual infrastructure provisioning.

## When to use it

Use this stack for:

- Deploying generative AI agents from development notebooks to governed production endpoints without re-implementation.
- Building multi-agent systems that require integrated governance across data, models, and agents.
- Automating infrastructure scaling for AI application serving.
- Ensuring consistent security and access controls for AI agents processing sensitive enterprise data.

## When not to use it

Consider other tools if:

- The primary need is for a simple, single-model serving endpoint without complex agent logic or integrated data governance.
- Existing infrastructure and deployment pipelines are already highly optimized for custom model serving frameworks.
- The application does not require integration with a Lakehouse architecture for data and AI assets.

## Recommended Databricks stack

- **Agent Bricks:** Build, deploy, and govern enterprise AI agents.
- **Databricks Apps:** Host and deploy secure internal data and AI applications.
- **Unity Catalog:** Govern permissions, lineage, tools, models, and data.
- **Mosaic AI Agent Framework:** Provides the foundational components for authoring and deploying agents.

## Related use cases

- Building Retrieval Augmented Generation (RAG) applications with governed data access.
- Developing internal AI tools and enterprise agents that require operational state stored in Lakebase.
- Implementing robust evaluation and monitoring for GenAI agents using MLflow.
