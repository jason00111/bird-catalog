import { DynamoDB } from "aws-sdk";
import { Bird } from "../../common/types";

const dynamoDb = new DynamoDB.DocumentClient();

export async function update(event) {
  console.log("in update");

  const updatedItem = JSON.parse(event.body) as Bird;

  return dynamoDb
    .update({
      TableName: process.env.TABLE_NAME,
      Key: {
        id: event.pathParameters.id,
      },
      UpdateExpression: "set tags = :tags, img = :img",
      ExpressionAttributeValues: {
        ":img": updatedItem.img,
        ":tags": updatedItem.tags,
      },
    })
    .promise()
    .then((result) => {
      console.log("result", result);

      return {
        statusCode: 200,
        body: JSON.stringify({
          bird: result.Attributes,
        }),
      };
    });
}
