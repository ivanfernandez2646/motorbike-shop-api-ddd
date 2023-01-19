import CustomerRepositoryMock from '../../__mocks__/customerRepositoryMock';
import CustomerMother from '../../domain/customer.mother';
import CustomerIdMother from '../../domain/customerId.mother';
import CustomerNotFound from '../../domain/customerNotFound';
import CustomerFinder from '../find/customerFinder';
import CustomerDeleter from './customerDeleter';

describe('CustomerDeleter', () => {
  it("should throw a CustomerNotFound exception when the customer doesn't exist", async () => {
    const repository = new CustomerRepositoryMock(),
      finder = new CustomerFinder(repository),
      deleter = new CustomerDeleter(finder, repository);

    repository.whenFindThenReturn(null);

    await expect(deleter.run(CustomerIdMother.random())).rejects.toThrow(CustomerNotFound);

    repository.assertNotingDelete();
  });

  it('should delete a customer', async () => {
    const repository = new CustomerRepositoryMock(),
      finder = new CustomerFinder(repository),
      deleter = new CustomerDeleter(finder, repository),
      customer = CustomerMother.random();

    repository.whenFindThenReturn(customer);

    await deleter.run(customer.id);

    repository.assertDeleteHasBeenCalledWith(customer);
  });
});
