import { Nullable } from '../../../../shared/domain/nullable';
import { SortCriteria } from '../../../../shared/infrastructure/persistence/sortCriteria';
import Customer from './customer';
import CustomerId from './customerId';

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;

  find(id: CustomerId): Promise<Nullable<Customer>>;

  delete(customer: Customer): Promise<void>;

  search(sort?: SortCriteria<Customer>): Promise<Customer[]>;
}
