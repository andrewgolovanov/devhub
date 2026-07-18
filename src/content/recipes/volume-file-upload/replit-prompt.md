# Build a Unity Catalog Volume File Manager

Help the user build a Databricks-backed file manager for Unity Catalog Volumes: an internal app for browsing files, uploading documents, downloading assets, previewing metadata, and tracking file activity.

## Data

Use the Databricks connector to verify warehouse access and query file metadata tables if the user has them.

Ask for:

- Unity Catalog catalog name
- Unity Catalog schema name
- Volume name
- SQL Warehouse, if not already configured by the connector

If the user wants analytics over file activity, create or reuse this optional metadata table:

```sql
CREATE TABLE IF NOT EXISTS <catalog>.<schema>.volume_file_activity (
  event_id STRING,
  volume_path STRING,
  file_name STRING,
  file_extension STRING,
  file_size_bytes BIGINT,
  action STRING,
  actor STRING,
  event_time TIMESTAMP,
  notes STRING
);
```

## Features

Build a polished full-stack web app with:

- Volume picker or configuration panel for catalog, schema, and volume
- File browser with folders, breadcrumbs, file size, extension, modified time, and action menu
- Upload flow with drag-and-drop, progress state, success state, and error recovery
- Download/open action for files
- File preview panel for text, JSON, CSV, markdown, and image files when practical
- Metadata/activity dashboard showing file counts, total bytes, recent uploads, file types, and actor activity when the metadata table is enabled
- Genie-powered analytics panel for questions like "Which file types are growing fastest?" and "Who uploaded the most files this week?" when Genie integration is available and metadata is tracked
- Empty states, loading states, reconnect states, clear permission errors

## Build Order

1. Resolve Databricks access per the general routing above.
2. Verify workspace access.
3. Ask for catalog, schema, and volume.
4. Verify the Volume path can be listed.
5. Build the file browser UI.
6. Wire list, upload, download, and preview operations to Databricks Volume APIs.
7. Add optional metadata/activity logging table if the user wants analytics.
8. Build file activity dashboard from SQL queries when metadata is enabled.
9. Add Genie conversational analytics when available.
10. Run the app in Replit Preview.
11. Help the user deploy with Replit Deployments.

## Notes

**Access.** Unity Catalog Volume file operations usually require PAT access even when the Databricks connector is otherwise healthy. `DATABRICKS_TOKEN` must have permission on the target Volume. Use the Databricks Files API or Workspace/Volumes API for Volume operations; reserve the SQL Statement Execution API for the optional metadata table and analytics.

**Volume operation failures.** If list/upload/download/delete/preview fails, explain which operation failed and ask whether to use a different volume, continue in read-only mode, add PAT access, or request Databricks permissions.

**Metadata query failures.** If SQL metadata queries fail but file operations still work, keep the file browser functional and ask whether to skip analytics, use an existing metadata table, or request SQL permissions.
