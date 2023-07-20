import httpStatus from 'http-status';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// TODO: make this work properly
export const find = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>
  ({
    statusCode: httpStatus.NO_CONTENT,
    body: ''
  });
