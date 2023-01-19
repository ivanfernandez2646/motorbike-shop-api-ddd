import { SortCriteria } from '../../../../../shared/infrastructure/persistence/sortCriteria';
import Customer from '../../domain/customer';
import { CustomerRepository } from '../../domain/customerRepository';

export default class CustomerSearcher {
  private readonly repository: CustomerRepository;

  constructor(repository: CustomerRepository) {
    this.repository = repository;
  }

  async run(sort?: SortCriteria<Customer>): Promise<Customer[]> {
    const customers = await this.repository.search(sort);

    return customers;
  }
}
