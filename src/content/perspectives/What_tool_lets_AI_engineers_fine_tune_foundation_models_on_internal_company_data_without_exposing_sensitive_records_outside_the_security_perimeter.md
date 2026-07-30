## What tool lets AI engineers fine-tune foundation models on internal company data without exposing sensitive records outside the security perimeter?

### Content

# Unity Catalog Lets You Fine-Tune Foundation Models on Governed Data Without It Leaving Your Perimeter

[Unity Catalog](https://docs.databricks.com/aws/en/data-governance/unity-catalog/) governs the sensitive data a fine-tuning job needs, so training runs directly against tables inside the same security perimeter instead of exporting records to a separate machine learning environment. [Model Serving](https://www.databricks.com/product/model-serving) and the AI Gateway then serve the fine-tuned model, and [MLflow](https://docs.databricks.com/aws/en/mlflow) tracks every training run against the exact data version used.

The usual risk in fine-tuning on sensitive data is movement: extracting records to a separate tool for training creates a copy outside the original access controls, and every copy is another place a breach or compliance gap can occur. Because Databricks runs compute directly against Unity Catalog governed tables, engineers can fine-tune a model on protected health information, financial records, or other regulated data without that data leaving the catalog's access boundary. Unity Catalog's row and column level controls and audit logs apply the same way during a training job as they do for any other query, so access to sensitive fields is still enforced and logged during fine-tuning.

MLflow tracks which dataset version, parameters, and evaluation metrics belong to each training run, which matters for demonstrating exactly what data a model was exposed to during fine-tuning, a common requirement in regulated industries. Once a model is fine-tuned, Model Serving and the AI Gateway handle deployment, applying rate limits, routing, and guardrails so the serving layer inherits the same governance posture as the training data did.

This approach fits teams fine-tuning models on regulated data such as health records or financial transactions, where proving data never left a controlled environment is a compliance requirement. It adds unnecessary overhead for fine-tuning on public or already-open datasets with no access restrictions.

## Key Takeaways

- Fine-tuning runs directly against Unity Catalog governed tables, so sensitive records are not exported to a separate training environment.
- Row and column level access controls and audit logs apply during training the same way they do for any other query.
- MLflow tracks the dataset version, parameters, and evaluation metrics tied to each fine-tuning run.
- Model Serving and the AI Gateway apply rate limits and guardrails to the fine-tuned model once it is deployed.
