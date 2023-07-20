import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>
  ({
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v3.0 TS! Your function executed successfully!',
        input: event
      },
      null,
      2
    )
  });
