import container from '../../../../../../../apps/cms/backend/dependency-injection';
import EnvironmentArranger from '../../../../../../shared/infrastructure/arranger/environmentArranger';
import CustomerMother from '../../../domain/customer.mother';
import CustomerCreditMother from '../../../domain/customerCredit.mother';
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

      expect(await repository.find(customer.id)).toStrictEqual(customer);
    });
  });

  describe('find', () => {
    it('should return an existing customer', async () => {
      expect.hasAssertions();

      const customer = CustomerMother.random();

      await repository.save(customer);

      expect(await repository.find(customer.id)).toStrictEqual(customer);
    });

    it("sould return null when customer doesn't exist", async () => {
      expect.hasAssertions();

      const customer = await repository.find(CustomerIdMother.random());

      expect(customer).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a customer if exists', async () => {
      expect.hasAssertions();

      const customer = CustomerMother.random();

      await repository.save(customer);

      await repository.delete(customer);

      expect(await repository.find(customer.id)).toBeNull();
    });

    it("should do nothing if customer doesn't exist", async () => {
      expect.hasAssertions();

      const customer = CustomerMother.random();

      await repository.delete(customer);

      expect(await repository.find(customer.id)).toBeNull();
    });
  });

  describe('search', () => {
    it('should return customers matching sort criteria desc order', async () => {
      expect.hasAssertions();

      const customers = [
          CustomerMother.random({ credit: CustomerCreditMother.create(5) }),
          CustomerMother.random({ credit: CustomerCreditMother.create(1.4) }),
          CustomerMother.random({ credit: CustomerCreditMother.create(2) })
        ],
        expected = [...customers].sort((c1, c2) => c2.credit.value - c1.credit.value);

      await Promise.all(customers.map(customer => repository.save(customer)));

      expect(await repository.search({ credit: 'desc' })).toStrictEqual(expected);
    });

    it('should return customers matching sort criteria asc order', async () => {
      expect.hasAssertions();

      const customers = [
          CustomerMother.random({ credit: CustomerCreditMother.create(5) }),
          CustomerMother.random({ credit: CustomerCreditMother.create(1.4) }),
          CustomerMother.random({ credit: CustomerCreditMother.create(2) })
        ],
        expected = [...customers].sort((c1, c2) => c1.credit.value - c2.credit.value);

      await Promise.all(customers.map(customer => repository.save(customer)));

      expect(await repository.search({ credit: 'asc' })).toStrictEqual(expected);
    });

    it('sould return an empty array when there are not any customer', async () => {
      expect.hasAssertions();

      const customers = await repository.search();

      expect(customers).toStrictEqual([]);
    });
  });
});
