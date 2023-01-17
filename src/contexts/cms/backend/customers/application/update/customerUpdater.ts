import { Nullable } from '../../../../../shared/domain/nullable';
import Customer from '../../domain/customer';
import CustomerEmail from '../../domain/customerEmail';
import CustomerId from '../../domain/customerId';
import CustomerName from '../../domain/customerName';
import { CustomerRepository } from '../../domain/customerRepository';
import CustomerFinder from '../find/customerFinder';

export type CustomerUpdatableProps = {
  name?: Nullable<string>;
  email?: Nullable<string>;
};

export default class CustomerUpdater {
  private readonly finder: CustomerFinder;

  private readonly repository: CustomerRepository;

  constructor(finder: CustomerFinder, repository: CustomerRepository) {
    this.finder = finder;
    this.repository = repository;
  }

  async run(id: CustomerId, updatableProps?: CustomerUpdatableProps): Promise<void> {
    const customer = await this.finder.run(id);

    const newName = updatableProps?.name ? new CustomerName(updatableProps.name) : undefined,
      newEmail = updatableProps?.email ? new CustomerEmail(updatableProps.email) : undefined,
      isUpdate = (newName && !customer.name.equalsTo(newName)) || (newEmail && !customer.email.equalsTo(newEmail));

    if (isUpdate) {
      const newCustomerData: Customer = new Customer({
        id: customer.id,
        name: newName || customer.name,
        email: newEmail || customer.email,
        age: customer.age
      });
      await this.repository.save(newCustomerData);
    }
  }
}
