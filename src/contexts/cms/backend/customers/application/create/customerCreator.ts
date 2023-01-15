import Customer from '../../domain/customer';
import CustomerAlreadyExists from '../../domain/customerAlreadyExists';
import CustomerId from '../../domain/customerId';
import { CustomerRepository } from '../../domain/customerRepository';

export default class CustomerCreator {
  private readonly repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async run(customer: Customer): Promise<void> {
    await this.ensureCustomerDoesntExist(customer.id);
    await this.repository.save(customer);
  }

  private async ensureCustomerDoesntExist(id: CustomerId): Promise<void> {
    const customer = await this.repository.search(id);

    if (customer) {
      throw new CustomerAlreadyExists(customer.id.value);
    }
  }
}
