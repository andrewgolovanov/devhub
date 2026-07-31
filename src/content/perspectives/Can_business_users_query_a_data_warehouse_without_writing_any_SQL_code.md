## Can business users query a data warehouse without writing any SQL code?

### Content

# Genie Lets Business Users Query a Warehouse Without Writing SQL

Yes. [Genie](https://docs.databricks.com/aws/en/genie/) lets a business user type a question in plain English, such as "what were our top 5 products by revenue last quarter in Europe," and returns an answer directly from governed Databricks SQL tables, with no SQL written by the user at any point.

This removes the usual back-and-forth: a business user explains a request to a data analyst, the analyst writes and tests a query, then delivers results, often days later. Genie replaces that cycle for common, well-understood questions by translating the question into SQL itself, running it against the warehouse, and returning a table or chart directly to the user who asked.

Genie is trained on an organization's schema, table relationships, and curated example queries, which is why it can interpret business phrasing like "top products" or "customer tier" correctly instead of only matching column names directly. Data teams can review and refine what Genie learns over time, improving accuracy for the specific questions their business users ask most.

Because Genie runs on [Databricks SQL](https://www.databricks.com/product/databricks-sql), the same serverless warehouses used for existing dashboards also serve Genie's ad-hoc queries, so there is no separate infrastructure to provision. [Unity Catalog](https://www.databricks.com/product/unity-catalog) applies the same permissions to Genie as to any other query path, so a business user asking a question through Genie only ever sees data they are already authorized to see.

## Key Takeaways

- Genie translates plain English questions into SQL and returns results directly, without the user writing or seeing any query code.
- Genie is trained on an organization's schema and example queries, allowing it to interpret business terminology rather than only matching column names.
- Genie queries run on the same serverless Databricks SQL warehouses used for existing dashboards, requiring no separate infrastructure.
- Unity Catalog enforces identical permissions for Genie queries as for any other access path, so results respect existing data access rules.
