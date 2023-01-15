import CustomerId from '../../domain/customerId';
import { CustomerRepository } from '../../domain/customerRepository';
import CustomerFinder from '../find/customerFinder';

export default class CustomerDeleter {
  private readonly finder: CustomerFinder;

  private readonly repository: CustomerRepository;

  constructor(finder: CustomerFinder, repository: CustomerRepository) {
    this.finder = finder;
    this.repository = repository;
  }

  async run(id: CustomerId): Promise<void> {
    const customer = await this.finder.run(id);

    await this.repository.delete(customer);
  }
}
