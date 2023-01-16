import { defineFeature, loadFeature } from 'jest-cucumber';
import { CmsBackendApp } from '../../../../../../src/apps/cms/backend/CmsBackendApp';
import { thenTheResponseShouldBe, thenTheResponseStatusCodeIs, whenISendAGetRequest } from '../../shared/controller';
import givenThereAreCustomers from '../../shared/customerRepository';
import container from '../../config';

const feature = loadFeature('tests/apps/cms/backend/features/customers/get-customer.feature'),
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

  test('When a customer exists', ({ given, when, then }) => {
    givenThereAreCustomers(given);
    whenISendAGetRequest(when);

    thenTheResponseStatusCodeIs(then);
    thenTheResponseShouldBe(then);
  });

  test("When a customer doesn't exist", ({ when, then }) => {
    whenISendAGetRequest(when);

    thenTheResponseStatusCodeIs(then);
    thenTheResponseShouldBe(then);
  });
});
