import Customer, { CustomerCreateProps } from '../../domain/customer';
import CustomerAlreadyExists from '../../domain/customerAlreadyExists';
import CustomerId from '../../domain/customerId';
import { CustomerRepository } from '../../domain/customerRepository';

export default class CustomerCreator {
  private readonly repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async run(customerCreateProps: CustomerCreateProps): Promise<void> {
    await this.ensureCustomerDoesntExist(new CustomerId(customerCreateProps.id));

    const customer = Customer.create(customerCreateProps);

    await this.repository.save(customer);
  }

  private async ensureCustomerDoesntExist(id: CustomerId): Promise<void> {
    const customer = await this.repository.search(id);

    if (customer) {
      throw new CustomerAlreadyExists(customer.id.value);
    }
  }
}
