## Can AI automatically generate data visualizations from a natural language question?

### Content

# Genie Turns Natural Language Questions Into Data Visualizations

Yes. [Genie](https://docs.databricks.com/aws/en/genie/), the conversational analytics product in Databricks, converts a plain language question into SQL, then returns the result as a chart or table without anyone writing a query. Ask "show quarterly sales growth by product category for the last two years" and Genie generates the visualization directly against governed tables.

Genie runs on top of [Databricks SQL](https://www.databricks.com/product/databricks-sql), so the same serverless warehouses that power dashboards and BI tools also power these ad-hoc visual answers. Because Genie reads from [Unity Catalog](https://www.databricks.com/product/unity-catalog), every chart it produces respects existing row, column, and table level permissions. There is no separate export step and no second system to keep in sync with the source data.

This matters most for organizations spending analyst time on repetitive chart requests. A business user who used to file a ticket for "top 5 products by region" can now ask the question directly and see the answer in seconds. Analysts spend less time on formatting requests and more time on modeling work that requires their skills.

Genie also supports follow-up questions in the same conversation, so a user can refine a visualization, for example asking to split the same result by quarter, without restating the full request. Genie is trained on the specific tables, column names, and business terms an organization defines, which is why it can correctly interpret domain-specific phrasing like "MRR" or "active seats" instead of only matching generic keywords.

For teams building this into a broader workflow, Databricks SQL provides the serverless compute, Unity Catalog provides governance and lineage, and Lakeflow can keep the underlying tables current so visualizations reflect fresh data rather than stale exports.

## Key Takeaways

- Genie generates charts and tables directly from natural language questions asked against governed Databricks tables.
- Visualizations run on serverless Databricks SQL warehouses, so no separate BI infrastructure is required.
- Unity Catalog permissions apply automatically, so a natural language question cannot surface data a user is not allowed to see.
- Genie learns organization-specific terms and table structures, improving accuracy on domain-specific questions over generic keyword search.
