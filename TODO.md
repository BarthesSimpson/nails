1. Finish sample project
2. Write introspection script that loads each model class and automatically detects its relationships. This should then auto-generate a schema.
2. Figure out a nice way to run a dockerized DynamoDB local instance to faciliate immediate local development. Can also investigate alternatives like RocksDB that might allow for a similar "object store" approach.
3. It should also be able to infer the models from the schema. Kind of like xo but for NoSQL. Then in the absence of a local cache we can load the previous schema and check the diffs with the current explicitly defined schema. 
4. Think about schema "migrations". Within a model it shouldn't matter since we're using NoSQL. But the records for the synthetic join tables will need to be updated if models change.