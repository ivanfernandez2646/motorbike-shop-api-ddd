import { defineFeature, loadFeature } from 'jest-cucumber';
import { CmsBackendApp } from '../../../../../../src/apps/cms/backend/CmsBackendApp';
import {
  thenTheResponseShouldBeEmpty,
  thenTheResponseStatusCodeIs,
  whenISendAPutRequestWithBody
} from '../../shared/controller';
import container from '../../config';
import givenThereAreCustomers from '../../shared/customerRepository';

const feature = loadFeature('tests/apps/cms/backend/features/customers/create-customer.feature'),
  environmentArrager: Promise<any> = container.get('Apps.cms.contexts.shared.EnvironmentArranger');

defineFeature(feature, test => {
  let application: CmsBackendApp;

  beforeAll(async () => {
    application = new CmsBackendApp();
    await application.start();
  });

  beforeEach(async () => {
    await (await environmentArrager).arrange();
  });

  afterAll(async () => {
    await application.stop();
    await (await environmentArrager).close();
  });

  test("When a customer doesn't exist", ({ given, when, then }) => {
    whenISendAPutRequestWithBody(when);

    thenTheResponseStatusCodeIs(then);
    thenTheResponseShouldBeEmpty(then);
  });

  test('When a customer exists', ({ given, when, then }) => {
    givenThereAreCustomers(given);
    whenISendAPutRequestWithBody(when);

    thenTheResponseStatusCodeIs(then);
    thenTheResponseShouldBeEmpty(then);
  });
});
