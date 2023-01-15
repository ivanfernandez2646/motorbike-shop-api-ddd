import Customer from '../domain/customer';
import { CustomerRepository } from '../domain/customerRepository';
import CustomerId from '../domain/customerId';
import { Nullable } from '../../../../shared/domain/nullable';

export default class CustomerRepositoryMock implements CustomerRepository {
  private mockSave = jest.fn();

  private mockSearch = jest.fn();

  private mockDelete = jest.fn();

  async save(customer: Customer): Promise<void> {
    this.mockSave(customer);
  }

  assertSaveHasBeenCalledWith(customer: Customer): void {
    const { mock } = this.mockSave,
      lastSavedCustomer = mock.calls[mock.calls.length - 1][0] as Customer,
      expectedBody = customer.toPrimitives(),
      lastSavedCustomerBody = lastSavedCustomer.toPrimitives();

    expect(lastSavedCustomer).toBeInstanceOf(Customer);
    expect(expectedBody).toStrictEqual(lastSavedCustomerBody);
  }

  assertNothingUpdate(): void {
    expect(this.mockSave).not.toHaveBeenCalled();
  }

  async search(id: CustomerId): Promise<Nullable<Customer>> {
    return this.mockSearch(id);
  }

  whenSearchThenReturn(customer: Nullable<Customer>): void {
    this.mockSearch.mockReturnValue(customer);
  }

  assertSearchHasBeenCalledWith(id: CustomerId): void {
    expect(this.mockSearch).toHaveBeenLastCalledWith(id);
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
}
