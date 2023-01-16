import request from 'supertest';
import { DefineStepFunction } from 'jest-cucumber';

const serverUrl = 'http://localhost:5000';

let _request: request.Test, _response: request.Response;

export const whenISendAGetRequest = (when: DefineStepFunction) => {
    when(/I send a GET request to "(.+)"/, async (path: string) => {
      _request = request(serverUrl).get(path);
      _response = await _request.send();
    });
  },
  whenISendADeleteRequest = (when: DefineStepFunction) => {
    when(/I send a DELETE request to "(.+)"/, async (path: string) => {
      _request = request(serverUrl).delete(path);
      _response = await _request.send();
    });
  },
  whenISendAPutRequestWithBody = (when: DefineStepFunction) => {
    when(/I send a PUT request to "(.+)" with body:/, async (path: string, body: string) => {
      _request = request(serverUrl).put(path);
      _response = await _request.send(JSON.parse(body));
    });
  },
  whenISendAPatchRequestWithBody = (when: DefineStepFunction) => {
    when(/I send a PATCH request to "(.+)" with body:/, async (path: string, body: string) => {
      _request = request(serverUrl).patch(path);
      _response = await _request.send(JSON.parse(body));
    });
  },
  thenTheResponseStatusCodeIs = (then: DefineStepFunction) => {
    then(/The response status code should be (\d+)/, async (status: string) => {
      expect(_response.statusCode).toBe(parseInt(status));
    });
  },
  thenTheResponseShouldBeEmpty = (then: DefineStepFunction) => {
    then(/The response should be empty/, () => {
      expect(_response.body).toMatchObject({});
    });
  },
  thenTheResponseShouldBe = (then: DefineStepFunction) => {
    then(/The response should be:/, (body: string) => {
      expect(_response.body).toStrictEqual(JSON.parse(body));
    });
  };
