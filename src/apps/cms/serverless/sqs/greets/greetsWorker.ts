import { SQSEvent } from 'aws-lambda';

export const handler = async (event: SQSEvent): Promise<void> => {
  // SQS may invoke with multiple messages
  for (const message of event.Records) {
    const bodyData = JSON.parse(message.body);
    console.log(bodyData);
  }
};
