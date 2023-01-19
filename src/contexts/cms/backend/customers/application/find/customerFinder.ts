import Customer from '../../domain/customer';
import CustomerId from '../../domain/customerId';
import CustomerNotFound from '../../domain/customerNotFound';
import { CustomerRepository } from '../../domain/customerRepository';

export default class CustomerFinder {
  private readonly repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async run(id: CustomerId): Promise<Customer> {
    const customer = await this.repository.find(id);

    if (!customer) {
      throw new CustomerNotFound(id.value);
    }

    return customer;
  }
}
