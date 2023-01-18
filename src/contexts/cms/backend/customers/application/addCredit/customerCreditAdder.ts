import CustomerCredit from '../../domain/customerCredit';
import CustomerId from '../../domain/customerId';
import { CustomerRepository } from '../../domain/customerRepository';
import CustomerFinder from '../find/customerFinder';

export default class CustomerCreditAdder {
  private readonly finder: CustomerFinder;

  private readonly repository: CustomerRepository;

  constructor(finder: CustomerFinder, repository: CustomerRepository) {
    this.finder = finder;
    this.repository = repository;
  }

  async run(id: CustomerId, newCredit: CustomerCredit): Promise<void> {
    const customer = await this.finder.run(id);

    customer.addCredit(newCredit);

    await this.repository.save(customer);
  }
}
