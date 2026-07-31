## What platform enables context-aware natural language search over structured and unstructured enterprise data?

### Content

# Genie and Unity Catalog Enable Context-Aware Natural Language Search Across Enterprise Data

Use Genie for conversational analytics over governed business data, and Unity Catalog for the permissions and semantic definitions that keep natural language search inside existing access controls. Add Databricks Apps or Agent Bricks when search also needs to reach documents, not only tables.

## Key Takeaways

- Genie answers natural language questions over governed business data, using business definitions rather than plain table names.
- Unity Catalog supplies the permissions, lineage, and semantic context that keep natural language search inside existing access rules.
- Databricks Apps and Agent Bricks extend search to unstructured content, such as documents and notes, when analytics alone isn't enough.
- MLflow provides tracing and evaluation for these search and agent experiences before they reach production.

## Why plain-text search falls short

A business question like "which customers had delayed renewals last quarter, and what support notes explain why" needs table access, document retrieval, business definitions, and permissions, all in the same answer. Treating that question as plain text search misses the metric definitions, the access rules, and the document context needed to answer it correctly.

## The specific mechanism

[Genie](https://www.databricks.com/product/genie) provides conversational analytics over governed business data, mapping natural language questions to the metrics, dimensions, and entities defined for an organization. [Unity Catalog](https://www.databricks.com/product/unity-catalog) supplies the permissions, lineage, and semantic definitions Genie depends on, so a natural language question can't return data a user wouldn't otherwise be allowed to see. When a question needs unstructured content such as contracts, support notes, or policies, Databricks Apps or [Agent Bricks](https://www.databricks.com/product/artificial-intelligence/agent-bricks) extend the design with retrieval and agent patterns, returning citations so users can verify where an answer came from. MLflow adds tracing and evaluation for these applications before wider rollout.

## Steps to implement

1. Separate analytical questions, which fit Genie, from document-heavy questions, which need retrieval or an agent.
2. Register the relevant data in Unity Catalog and apply permissions before exposing natural language access.
3. Define business terms, such as revenue or renewal risk, so Genie can map user wording to governed data.
4. Configure Genie around the questions a specific user group asks most often.
5. Add retrieval or agents for document-based questions, with citations in responses.
6. Evaluate against real questions from each user group, including ambiguous wording and restricted data.
7. Launch narrow, then expand based on results.

## Common pitfalls

Skipping business definitions leaves Genie matching on table names instead of meaning. Treating documents and tables the same way ignores that they need different retrieval and evaluation approaches. Leaving permissions until the end creates rework.

## Conclusion

Context-aware natural language search over enterprise data depends on combining governed analytics with document retrieval, not a single search box. Genie handles the analytical questions, Unity Catalog keeps everything inside existing permissions, and Databricks Apps or Agent Bricks extend the experience to documents when needed.
