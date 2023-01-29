import Customer from '../domain/customer';
import { CustomerRepository } from '../domain/customerRepository';
import CustomerId from '../domain/customerId';
import { Nullable } from '../../../../shared/domain/nullable';
import { SortCriteria } from '../../../../shared/infrastructure/persistence/sortCriteria';
import SignUpAdultCustomerStrategy from '../domain/signUpAdultCustomerStrategy';
import SignUpTeenagerCustomerStrategy from '../domain/signUpTeenagerCustomerStrategy';

export default class CustomerRepositoryMock implements CustomerRepository {
  private mockSave = jest.fn();

  private mockFind = jest.fn();

  private mockDelete = jest.fn();

  private mockSearch = jest.fn();

  async save(customer: Customer): Promise<void> {
    this.mockSave(customer);
  }

  assertSaveHasBeenCalledWith(customer: Customer): void {
    const { mock } = this.mockSave,
      lastSavedCustomer = mock.calls[mock.calls.length - 1][0] as Customer,
      expectedBody = customer.toPrimitives(),
      lastSavedCustomerBody = lastSavedCustomer.toPrimitives();

    expect(lastSavedCustomer).toBeInstanceOf(Customer);
    expect(lastSavedCustomer.signUpStrategy).toBeInstanceOf(
      lastSavedCustomer.age.value >= 18 ? SignUpAdultCustomerStrategy : SignUpTeenagerCustomerStrategy
    );
    expect(expectedBody).toStrictEqual(lastSavedCustomerBody);
  }

  assertNothingUpdate(): void {
    expect(this.mockSave).not.toHaveBeenCalled();
  }

  async find(id: CustomerId): Promise<Nullable<Customer>> {
    return this.mockFind(id);
  }

  whenFindThenReturn(customer: Nullable<Customer>): void {
    this.mockFind.mockReturnValue(customer);
  }

  assertFindHasBeenCalledWith(id: CustomerId): void {
    expect(this.mockFind).toHaveBeenLastCalledWith(id);
  }

  async delete(customer: Customer): Promise<void> {
    this.mockDelete(customer);
  }

  assertDeleteHasBeenCalledWith(customer: Customer): void {
    expect(this.mockDelete).toHaveBeenLastCalledWith(customer);
  }

  assertNotingDelete(): void {
    expect(this.mockDelete).not.toHaveBeenCalled();
  }

  async search(sort?: SortCriteria<Customer>): Promise<Customer[]> {
    return this.mockSearch(sort);
  }

  whenSearchThenReturn(customers: Customer[]): void {
    this.mockSearch.mockReturnValue(customers);
  }

  assertSearchHasBeenCalledWith(sort?: SortCriteria<Customer>): void {
    expect(this.mockSearch).toHaveBeenLastCalledWith(sort);
  }
}
