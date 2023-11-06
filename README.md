# serverless-graphql-api

This implements a simple GraphQL API using AWS AppSync with DynamoDB data source. SAM is used for the CloudFormation deployment.

Infrastructure for basic CRUD operations defined in `template.yml`.

## Deploy

```bash
sam deploy --guided
```

## Useful commands

A GraphQL client is implemented in TypeScript in `scripts/query.ts`.

Query example (get by type):

```bash
curl -X POST 'https://URL/graphql' \
--header 'Content-Type: application/json' \
--header 'x-api-key: API_KEY' \
--data '{
    "query": "query Query($type: String!) {listEntriesByType(type: $type){id, name, epoch}}",
    "operationName": "Query",
    "variables": {
        "type": "test"
    }
}'
```

Query example (get by id):

```bash
curl -X POST 'https://URL/graphql' \
--header 'Content-Type: application/json' \
--header 'x-api-key: API_KEY' \
--data '{
    "query": "query Query($id: ID!) { getEntry(id: $id){id, name, epoch} }",
    "operationName": "Query",
    "variables": {
        "id": "0fc1d2bf-3118-4a39-ae0c-ef8d270919af"
    }
}'
```

Mutation example (create item):

```bash
curl -X POST 'https://URL/graphql' \
--header 'Content-Type: application/json' \
--header 'x-api-key: API_KEY' \
--data '{
    "query": "mutation Mutation($input: CreateEntryInput!) { addEntry(input: $input) {id} }",
    "operationName": "Mutation",
    "variables": {
        "id": "test",
        "input": {"name": "t", "epoch": 1, "datetime": "2023-11-03", "type": "type"}
    }
}'
```

Mutation example (update item):

```bash
curl -X POST 'https://URL/graphql' \
--header 'Content-Type: application/json' \
--header 'x-api-key: API_KEY' \
--data '{
    "query": "mutation Mutation(id: $id, input: $input) { updateEntry(id: $id, input: $input) {id, name} }",
    "operationName": "Mutation",
    "variables": {
        "id": "test",
        "input": {"name": "newName"}
    }
}'
```

Mutation example (delete item):

```bash
curl -X POST 'https://URL/graphql' \
--header 'Content-Type: application/json' \
--header 'x-api-key: API_KEY' \
--data '{
    "query": "mutation Mutation($id: ID!) { deleteEntry(id: $id) {id} }",
    "operationName": "Mutation",
    "variables": {
        "id": "test"
    }
}'
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
sam delete --stack-name serverless-graphql-api
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
