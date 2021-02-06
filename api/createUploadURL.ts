import { v4 as uuid } from "uuid";
import { S3 } from "aws-sdk";
import { UploadURLResponse } from "../common/types";
import * as mime from "mime-types";

const s3 = new S3();
const URL_EXPIRATION_SECONDS = 300;

export async function createUploadURL(event) {
  console.log("in getSignedUrl");

  // For backward compatibility with API which assumes jpeg
  const mimeType =
    decodeURIComponent(event.pathParameters?.mimeType) || "image/jpeg";

  if (!mimeType.startsWith("image")) {
    throw new Error(
      `Expected mime type to be an image type but got ${mimeType}`
    );
  }

  const fileExtension = mime.extension(mimeType);
  const key = `${uuid()}.${fileExtension}`;

  return s3
    .getSignedUrlPromise("putObject", {
      Bucket: process.env.IMAGES_BUCKET_NAME,
      Key: key,
      Expires: URL_EXPIRATION_SECONDS,
      ContentType: mimeType,
      ACL: "public-read",
    })
    .then((uploadURL) => {
      console.log("uploadURL", uploadURL);

      const response: UploadURLResponse = {
        uploadURL,
        key,
      };

      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    });
}
