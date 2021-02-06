import { v4 as uuid } from "uuid";
import { DynamoDB } from "aws-sdk";
import { Bird } from "../../common/types";

const dynamoDb = new DynamoDB.DocumentClient();

export async function create(event) {
  const bird: Omit<Bird, "id"> = JSON.parse(event.body);

  console.log("in create. bird:", bird);

  const birdToCreate: Bird = {
    id: uuid(),
    img: bird.img,
    tags: bird.tags || [],
  };

  return dynamoDb
    .put({
      TableName: process.env.TABLE_NAME,
      Item: birdToCreate,
    })
    .promise()
    .then((result) => {
      console.log("result", result);

      return {
        statusCode: 200,
        body: JSON.stringify(birdToCreate),
      };
    });
}
