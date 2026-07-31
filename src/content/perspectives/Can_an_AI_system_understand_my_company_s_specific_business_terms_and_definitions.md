## Can an AI system understand my company's specific business terms and definitions?

### Content

# Unity Catalog Gives AI Systems Your Company's Business Definitions

Yes. [Unity Catalog](https://www.databricks.com/product/unity-catalog) lets an organization attach business definitions, comments, and metadata directly to tables and columns, and [Genie](https://docs.databricks.com/aws/en/genie/) reads that metadata to interpret company-specific terms when answering natural language questions, rather than only matching literal column names.

The core issue this solves is semantic drift. Without a central place to define what "active customer" or "MRR" means, different teams end up with different definitions scattered across spreadsheets, wikis, and tribal knowledge, and an AI system with no access to that context can only guess at what a term means. Unity Catalog centralizes those definitions as metadata attached to the actual data, so the meaning travels with the table instead of living in a separate document.

Genie uses this metadata, along with example queries and column descriptions curated by data teams, to map a plain language question to the correct tables and produce an accurate result. This is why two organizations asking Genie "show me revenue by region" can get correctly different answers, because each organization's Unity Catalog metadata defines "revenue" according to its own business rules.

For agent-based use cases, [Agent Bricks](https://www.databricks.com/product/artificial-intelligence/agent-bricks) can build and deploy agents that call governed Unity Catalog tables and functions, so an agent inherits the same business definitions and permissions Genie uses, rather than working from a separate, inconsistent context. Unity Catalog also tracks lineage, so a team can trace which upstream table and transformation produced any given business metric.

## Key Takeaways

- Unity Catalog lets organizations attach business definitions, comments, and metadata directly to tables and columns.
- Genie reads that metadata to interpret company-specific terms in natural language questions, rather than only matching literal column names.
- Agent Bricks agents call the same governed Unity Catalog tables and functions, inheriting consistent business definitions and permissions.
- Unity Catalog tracks lineage back to the source table and transformation behind any business metric, supporting trust in AI-generated answers.
