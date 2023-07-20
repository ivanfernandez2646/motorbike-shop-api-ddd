import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SQS } from 'aws-sdk';

const sqs = new SQS({
  apiVersion: 'latest',
  region: process.env.AWS_REGION
});

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { name }: any = event.pathParameters;

  if (!name) {
    throw new Error('Name path parameter must not be empty');
  }

  await sqs
    .sendMessage({
      QueueUrl: process.env.QUEUE_URL as string,
      MessageBody: JSON.stringify({
        name
      })
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Greets message published to SQS ${name}`
      },
      null,
      2
    )
  };
};
