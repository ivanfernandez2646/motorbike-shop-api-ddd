import { CustomerUpdatableProps } from '../../domain/customer';
import CustomerId from '../../domain/customerId';
import { CustomerRepository } from '../../domain/customerRepository';
import CustomerFinder from '../find/customerFinder';

export default class CustomerUpdater {
  private readonly finder: CustomerFinder;

  private readonly repository: CustomerRepository;

  constructor(finder: CustomerFinder, repository: CustomerRepository) {
    this.finder = finder;
    this.repository = repository;
  }

  async run(id: CustomerId, newProps?: CustomerUpdatableProps): Promise<void> {
    const customer = await this.finder.run(id),
      isUpdate = customer.update({ ...newProps });

    if (isUpdate) {
      await this.repository.save(customer);
    }
  }
}
