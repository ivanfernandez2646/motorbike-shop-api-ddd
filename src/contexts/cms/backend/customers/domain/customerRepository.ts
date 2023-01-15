import { Nullable } from '../../../../shared/domain/nullable';
import Customer from './customer';
import CustomerId from './customerId';

export interface CustomerRepository {
  save(customer: Customer): Promise<void>;

  search(id: CustomerId): Promise<Nullable<Customer>>;

  delete(customer: Customer): Promise<void>;
}
