import { Nullable } from '../../../../../../shared/domain/nullable';
import { MongoRepository } from '../../../../../../shared/infrastructure/persistence/mongo/mongoRepository';
import { SortCriteria } from '../../../../../../shared/infrastructure/persistence/sortCriteria';
import Customer from '../../../domain/customer';
import CustomerId from '../../../domain/customerId';
import { CustomerRepository } from '../../../domain/customerRepository';

export default class MongoCustomerRepository extends MongoRepository<Customer> implements CustomerRepository {
  protected collectionName(): string {
    return 'Customers';
  }

  async save(customer: Customer): Promise<void> {
    return this.persist(customer.id.value, customer);
  }

  async find(id: CustomerId): Promise<Nullable<Customer>> {
    return this.byId(id.value, Customer.fromPrimitives);
  }

  async delete(customer: Customer): Promise<void> {
    return this.remove(customer.id.value);
  }

  async search(sort?: SortCriteria<Customer>): Promise<Customer[]> {
    return this.getAll(Customer.fromPrimitives, sort);
  }
}
