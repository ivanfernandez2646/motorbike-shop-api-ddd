import container from '../../../../../../../apps/cms/backend/dependency-injection';
import EnvironmentArranger from '../../../../../../shared/infrastructure/arranger/environmentArranger';
import CustomerMother from '../../../domain/customer.mother';
import CustomerIdMother from '../../../domain/customerId.mother';
import MongoCustomerRepository from './mongoCustomerRepository';

const repository: MongoCustomerRepository = container.get('Apps.cms.contexts.customers.CustomerRepository'),
  environmentArrager: Promise<EnvironmentArranger> = container.get('Apps.cms.contexts.shared.EnvironmentArranger');

describe('MongoCustomerRepository', () => {
  beforeEach(async () => {
    await (await environmentArrager).arrange();
  });

  afterAll(async () => {
    await (await environmentArrager).close();
  });

  describe('save', () => {
    it('should save a new customer', async () => {
      expect.hasAssertions();

      const customer = CustomerMother.random();

      await repository.save(customer);

      expect(await repository.search(customer.id)).toStrictEqual(customer);
    });
  });

  describe('search', () => {
    it('should return an existing customer', async () => {
      expect.hasAssertions();

      const customer = CustomerMother.random();

      await repository.save(customer);

      expect(await repository.search(customer.id)).toStrictEqual(customer);
    });

    it("sould return null when customer doesn't exist", async () => {
      expect.hasAssertions();

      const customer = await repository.search(CustomerIdMother.random());

      expect(customer).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a customer if exists', async () => {
      expect.hasAssertions();

      const customer = CustomerMother.random();

      await repository.save(customer);

      await repository.delete(customer);

      expect(await repository.search(customer.id)).toBeNull();
    });

    it("should do nothing if customer doesn't exist", async () => {
      expect.hasAssertions();

      const customer = CustomerMother.random();

      await repository.delete(customer);

      expect(await repository.search(customer.id)).toBeNull();
    });
  });
});
