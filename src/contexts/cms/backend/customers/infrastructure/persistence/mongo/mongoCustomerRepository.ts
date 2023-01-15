import { Nullable } from '../../../../../../shared/domain/nullable';
import { MongoRepository } from '../../../../../../shared/infrastructure/persistence/mongo/mongoRepository';
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

  async search(id: CustomerId): Promise<Nullable<Customer>> {
    return this.byId(id.value, Customer.fromPrimitives);
  }

  async delete(customer: Customer): Promise<void> {
    await this.remove(customer.id.value);
  }
}
