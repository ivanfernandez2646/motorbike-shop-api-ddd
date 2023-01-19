import { defineFeature, loadFeature } from 'jest-cucumber';
import { CmsBackendApp } from '../../../../../../src/apps/cms/backend/CmsBackendApp';
import {
  thenTheResponseShouldBe,
  thenTheResponseShouldBeEmpty,
  thenTheResponseStatusCodeIs,
  whenISendAGetRequest
} from '../../shared/controller';
import container from '../../config';
import givenThereAreCustomers from '../../shared/customerRepository';

const feature = loadFeature('tests/apps/cms/backend/features/customers/search-sort-by-credit-customer.feature'),
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

  test('When parameter sort has an invalid value', ({ when, then }) => {
    whenISendAGetRequest(when);

    thenTheResponseStatusCodeIs(then);
    thenTheResponseShouldBeEmpty(then);
  });

  test('When there are not any customer', ({ when, then }) => {
    whenISendAGetRequest(when);

    thenTheResponseStatusCodeIs(then);
    thenTheResponseShouldBe(then);
  });

  test('When there are customers and sort is ascendent', ({ given, when, then }) => {
    givenThereAreCustomers(given);
    whenISendAGetRequest(when);

    thenTheResponseStatusCodeIs(then);
    thenTheResponseShouldBe(then);
  });

  test('When there are customers and sort is descendent', ({ given, when, then }) => {
    givenThereAreCustomers(given);
    whenISendAGetRequest(when);

    thenTheResponseStatusCodeIs(then);
    thenTheResponseShouldBe(then);
  });
});
