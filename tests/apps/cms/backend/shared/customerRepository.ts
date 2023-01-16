import { DefineStepFunction } from 'jest-cucumber';
import container from '../config';
import { CustomerRepository } from '../../../../../src/contexts/cms/backend/customers/domain/customerRepository';
import CustomerMother from '../../../../../src/contexts/cms/backend/customers/domain/customer.mother';
import CustomerAgeMother from '../../../../../src/contexts/cms/backend/customers/domain/customerAge.mother';

const repository: CustomerRepository = container.get('Apps.cms.contexts.customers.CustomerRepository');

const givenThereAreCustomers = (given: DefineStepFunction) => {
  given(/There are customers:/, async (customers: Array<{ id: string; name: string; email: string; age: string }>) => {
    await Promise.all(
      customers.map(c =>
        repository.save(
          CustomerMother.fromPrimitives({
            ...c,
            age: c.age && !isNaN(Number(c.age)) ? Number(c.age) : CustomerAgeMother.random().value
          })
        )
      )
    );
  });
};

export default givenThereAreCustomers;
