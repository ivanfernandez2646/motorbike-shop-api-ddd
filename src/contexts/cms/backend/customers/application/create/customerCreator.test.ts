import CustomerRepositoryMock from '../../__mocks__/customerRepositoryMock';
import CustomerMother from '../../domain/customer.mother';
import CustomerAlreadyExists from '../../domain/customerAlreadyExists';
import CustomerCreator from './customerCreator';

describe('CustomerCreator', () => {
  it('should throw a CustomerAlreadyExists exception when the customer already exists', async () => {
    const repository = new CustomerRepositoryMock(),
      creator = new CustomerCreator(repository),
      customer = CustomerMother.random();

    repository.whenSearchThenReturn(customer);

    await expect(creator.run(customer)).rejects.toThrow(CustomerAlreadyExists);
  });

  it('should create a customer', async () => {
    const repository = new CustomerRepositoryMock(),
      creator = new CustomerCreator(repository),
      customer = CustomerMother.random();

    repository.whenSearchThenReturn(null);

    await creator.run(customer);

    repository.assertSaveHasBeenCalledWith(customer);
  });
});
