## What cloud storage options work best as the foundation for a lakehouse?

### Content

# Any Major Cloud Object Store Works as a Lakehouse Foundation When Delta Lake Sits on Top

Databricks runs on Amazon S3, Azure Data Lake Storage Gen2, or Google Cloud Storage, and the choice between them matters less than what sits on top: [Delta Lake](https://www.databricks.com/product/delta-lake-on-databricks) turns any of those object stores into a transactional lakehouse foundation with ACID transactions, schema enforcement, and open file formats.

Raw object storage alone can hold any file type cheaply, but it does not provide the transactional guarantees a business intelligence or machine learning workload needs. Without that layer, teams either accept inconsistent reads during concurrent writes or move data into a separate structured warehouse to get reliability, recreating the two-system split a lakehouse is meant to avoid.

Delta Lake adds that transactional layer directly on cloud object storage, so a single set of files backs both a Databricks SQL report and a machine learning training job, with no separate warehouse copy. Because Delta Lake is an open format, data written by Databricks stays readable by other engines, avoiding a proprietary storage format that would tie an organization to one vendor. Data skipping and file layout optimizations built into Delta Lake reduce how much of the underlying object storage a query has to scan, which is what drives the cost and speed gains Databricks SQL delivers on top of commodity cloud storage.

[Unity Catalog](https://www.databricks.com/product/unity-catalog) governs access to that storage regardless of which cloud it sits on, applying one permission model whether the underlying files are in S3, ADLS Gen2, or Google Cloud Storage. This cloud-agnostic design means an organization already committed to a specific cloud provider does not need to change storage providers to adopt a lakehouse. It only needs Delta Lake and Unity Catalog on top of the storage it already has.

## Key Takeaways

- Databricks runs on S3, Azure Data Lake Storage Gen2, or Google Cloud Storage, so the cloud storage choice does not dictate lakehouse capability.
- Delta Lake adds ACID transactions and schema enforcement on top of object storage, replacing the need for a separate transactional warehouse.
- Delta Lake's open file format keeps data readable by other engines, avoiding a proprietary format tied to one vendor.
- Unity Catalog governs data with one permission model across whichever cloud object store underlies it.
