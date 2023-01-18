import CustomerRepositoryMock from '../../__mocks__/customerRepositoryMock';
import CustomerMother from '../../domain/customer.mother';
import CustomerCreditMother from '../../domain/customerCredit.mother';
import CustomerIdMother from '../../domain/customerId.mother';
import CustomerNotFound from '../../domain/customerNotFound';
import CustomerFinder from '../find/customerFinder';
import CustomerCreditAdder from './customerCreditAdder';

describe('CustomerCreditAdder', () => {
  it("should throw a CustomerNotFound exception when the customer doesn't exist", async () => {
    const repository = new CustomerRepositoryMock(),
      finder = new CustomerFinder(repository),
      creditAdder = new CustomerCreditAdder(finder, repository);

    repository.whenSearchThenReturn(null);

    await expect(creditAdder.run(CustomerIdMother.random(), CustomerCreditMother.random())).rejects.toThrow(
      CustomerNotFound
    );
  });

  it('should add credit to a customer', async () => {
    const repository = new CustomerRepositoryMock(),
      finder = new CustomerFinder(repository),
      creditAdder = new CustomerCreditAdder(finder, repository),
      customer = CustomerMother.random(),
      oldCredit = CustomerCreditMother.create(customer.credit.value),
      newCredit = CustomerCreditMother.random();

    repository.whenSearchThenReturn(customer);

    await creditAdder.run(customer.id, newCredit);

    repository.assertSaveHasBeenCalledWith(
      CustomerMother.create({
        ...customer,
        name: customer.name,
        email: customer.email,
        credit: oldCredit.addAmount(newCredit)
      })
    );
  });
});
