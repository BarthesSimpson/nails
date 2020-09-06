1. Finish sample project
2. Write introspection script that loads each model class and automatically detects its relationships. This should then auto-generate a schema.
3. Need to wrap the decorators so that when you import nails you get a singleton that contains the config maps and which auto-scans the models as soon as it is constructed. Or basically index.ts in a project can call nails.init() or whatever, and it will do the stuff. Do I need a static tool too?
2. Figure out a nice way to run a dockerized DynamoDB local instance to faciliate immediate local development. Can also investigate alternatives like RocksDB that might allow for a similar "object store" approach.
3. It should also be able to infer the models from the schema. Kind of like xo but for NoSQL. Then in the absence of a local cache we can load the previous schema and check the diffs with the current explicitly defined schema. 
4. Think about schema "migrations". Within a model it shouldn't matter since we're using NoSQL. But the records for the synthetic join tables will need to be updated if models change.
5. For @searchable, let's start with a simple index, but maybe we can add a parameter to the annotation that makes it an elastic index...
6. Custom TSLint rules to block things like multiple primary keys defined on a model
7. Can I handle properties and constructors in a more ergonomic way?