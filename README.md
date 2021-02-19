# bird-catalog

Full stack app to view, label, and upload pictures of birds.
More generally, it could be used for pictures of anything.  

## Inspiration

I would like to know the names of the different types of birds I see.
This app allows me to put all my photos in one place and label each photo.
In the process, I learn about the birds and end up with an album for reference
or to share with others. 

## Technology

- Serverless Framework - Used as a wrapper around AWS CloudFormation.
  It sets up the following AWS cloud services:
  - API Gateway which serves a REST API allowing access and modification of the images and labels
  - Lambda servers running Node.js on the back-end of the API
  - S3 bucket to hold the images
  - DynamoDB database which tracks all the images and labels
  - IAM roles to allow the various services to communicate
  - Log groups to monitor and debug the lambda servers using CloudWatch
  - CloudFront distribution serving the front-end
  - S3 bucket holding the front-end files
- TypeScript
- Node.js
- React
- Material UI for prebuilt React components
