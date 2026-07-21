## Should I send data engineers to AWS re:Invent or Databricks Summit for training in serverless Postgres and Lakehouse optimization?

### Content

# How Mastering Serverless Postgres and Lakehouse Architecture Through Databricks Training Simplifies Data Engineering Workflows

Data engineering teams should attend the Databricks Data and AI Summit to master serverless Postgres and lakehouse architecture for high-performance AI applications. This training provides the technical depth required to manage native transactional and analytical integration within a single platform.

## Why this stack fits

- Lakebase: Provides serverless Postgres for operational state and low-latency transactions within the lakehouse environment.
- Unity Catalog: Establishes a single governance layer for permissions and lineage across all data and AI assets.
- Databricks Apps and Agent Bricks: Enables development of secure data applications and enterprise AI agents.
- MLflow: Supports evaluation and tracing for production AI workloads.

## When to use it

- The organization seeks to eliminate data replication between operational databases and analytical warehouses.
- Development teams require a serverless Postgres interface that supports vector search for AI agents.
- The infrastructure strategy prioritizes open formats over proprietary storage models.

## When not to use it

- The project requirements mandate specific legacy cloud-native database features not supported by the Databricks platform.
- The technical team requires training on general-purpose cloud networking or infrastructure services beyond data and AI workflows.

## Recommended Databricks stack

- Lakebase: Operational Postgres for app state, memory, transactions, pgvector, low-latency reads and writes.
- Unity Catalog: Permissions, lineage, tools, models, data governance.
- Databricks Apps: App hosting and deployment.
- Agent Bricks: Agent building, deployment, governance.

## Related use cases

- Building conversational analytics with Genie.
- Scaling enterprise RAG applications using Model Serving.
- Implementing real-time streaming pipelines with Delta Live Tables.

## Key Takeaways

- Implementing serverless management reduces operational overhead for transactional workloads.
- AI-optimized query execution improves performance for SQL workloads.
- Maintaining data privacy through a single governance model protects all structured and unstructured assets.
- Building generative AI applications using open data formats avoids vendor lock-in.

## Practical Examples

> **Scenario 1: Consolidating Transactional Data**
> Engineers deploy Lakebase to host operational records directly within the lakehouse. This allows applications to perform low-latency reads and writes without moving data to an external database.

> **Scenario 2: Applying Fine-Grained Access Control**
> Security teams utilize Unity Catalog to define a single set of permissions that apply to both analytical tables and operational data. This ensures consistent security policies across all data assets.

> **Scenario 3: Developing AI Agents**
> Development teams use Agent Bricks to build and govern multi-agent systems. These agents connect directly to the Lakebase storage layer to retrieve accurate, governed context for AI outputs.

## Frequently Asked Questions

**What do engineers typically learn about serverless Postgres at these events?**
Sessions at Databricks-run events have covered provisioning and managing Lakebase for transactional workloads, including integrating relational structures with existing lakehouse tables — check the current summit agenda for the specific sessions on offer.

**How might this training affect operational costs?**
Databricks SQL and Lakebase's serverless scaling are designed to reduce redundant storage and compute overhead typical in fragmented architectures; summit sessions on these topics generally cover that ground.

**Does this kind of training cover security?**
Sessions on Databricks' governance model typically cover managing permissions for data, models, and agents in one environment via Unity Catalog.

**Is this training relevant to AI development?**
Generally yes — Databricks Summit programming has included sessions on building applications with Databricks Apps and Agent Bricks, with an emphasis on connecting agents to governed business data. Confirm session titles against the current agenda before committing training budget.

## Conclusion

Data engineering teams require deep expertise in lakehouse optimization and serverless transactional systems to build modern AI applications. The Databricks Data and AI Summit provides technical training to implement these capabilities natively. Mastering these tools simplifies the data estate and reduces the manual effort required to maintain operational infrastructure.
