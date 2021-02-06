import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export async function list() {
  console.log("in list");

  return dynamoDb
    .scan({
      TableName: process.env.TABLE_NAME,
    })
    .promise()
    .then((result) => {
      console.log("result", result);

      return {
        statusCode: 200,
        body: JSON.stringify({
          birds: result.Items,
        }),
      };
    });
}
