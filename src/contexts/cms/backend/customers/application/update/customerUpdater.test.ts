import CustomerRepositoryMock from '../../__mocks__/customerRepositoryMock';
import CustomerMother from '../../domain/customer.mother';
import CustomerIdMother from '../../domain/customerId.mother';
import CustomerNameMother from '../../domain/customerName.mother';
import CustomerNotFound from '../../domain/customerNotFound';
import CustomerFinder from '../find/customerFinder';
import CustomerUpdater from './customerUpdater';

describe('CustomerUpdater', () => {
  it("should throw a CustomerNotFound exception when the customer doesn't exist", async () => {
    const repository = new CustomerRepositoryMock(),
      finder = new CustomerFinder(repository),
      updater = new CustomerUpdater(finder, repository);

    repository.whenSearchThenReturn(null);

    await expect(updater.run(CustomerIdMother.random(), {})).rejects.toThrow(CustomerNotFound);
  });

  it('should not update a customer when each one of updatable props are the same that are stored', async () => {
    const repository = new CustomerRepositoryMock(),
      finder = new CustomerFinder(repository),
      updater = new CustomerUpdater(finder, repository),
      customer = CustomerMother.random();

    repository.whenSearchThenReturn(customer);

    await updater.run(customer.id, { name: customer.name.value, email: customer.email.value });

    repository.assertNothingUpdate();
  });

  it('should not update a customer when updatable props object is undefined', async () => {
    const repository = new CustomerRepositoryMock(),
      finder = new CustomerFinder(repository),
      updater = new CustomerUpdater(finder, repository),
      customer = CustomerMother.random();

    repository.whenSearchThenReturn(customer);

    await updater.run(customer.id);

    repository.assertNothingUpdate();
  });

  it('should update a customer', async () => {
    const repository = new CustomerRepositoryMock(),
      finder = new CustomerFinder(repository),
      updater = new CustomerUpdater(finder, repository),
      customer = CustomerMother.random(),
      newName = CustomerNameMother.differentOf(customer.name);

    repository.whenSearchThenReturn(customer);

    await updater.run(customer.id, { name: newName.value });

    repository.assertSaveHasBeenCalledWith(CustomerMother.create(customer));
  });
});
