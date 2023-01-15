import CustomerRepositoryMock from '../../__mocks__/customerRepositoryMock';
import CustomerMother from '../../domain/customer.mother';
import CustomerIdMother from '../../domain/customerId.mother';
import CustomerNotFound from '../../domain/customerNotFound';
import CustomerFinder from './customerFinder';

describe('CustomerFinder', () => {
  it("should throw a CustomerNotFound exception when the customer doesn't exist", async () => {
    const repository = new CustomerRepositoryMock(),
      finder = new CustomerFinder(repository);

    repository.whenSearchThenReturn(null);

    await expect(finder.run(CustomerIdMother.random())).rejects.toThrow(CustomerNotFound);
  });

  it('should returns a customer', async () => {
    const repository = new CustomerRepositoryMock(),
      finder = new CustomerFinder(repository),
      customer = CustomerMother.random();

    repository.whenSearchThenReturn(customer);

    const response = await finder.run(customer.id);

    repository.assertSearchHasBeenCalledWith(customer.id);
    expect(response).toStrictEqual(customer);
  });
});
