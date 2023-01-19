import { SortCriteria } from '../../../../../shared/infrastructure/persistence/sortCriteria';
import CustomerRepositoryMock from '../../__mocks__/customerRepositoryMock';
import Customer from '../../domain/customer';
import CustomerMother from '../../domain/customer.mother';
import CustomerSearcher from './customerSearcher';

describe('CustomerSearcher', () => {
  it('should returns an empty array if there are not any customer', async () => {
    const repository = new CustomerRepositoryMock(),
      searcher = new CustomerSearcher(repository);

    repository.whenSearchThenReturn([]);

    const customers = await searcher.run();

    expect(customers).toStrictEqual([]);
  });

  it('should search be called with sort parameters', async () => {
    const repository = new CustomerRepositoryMock(),
      searcher = new CustomerSearcher(repository),
      customers = [CustomerMother.random(), CustomerMother.random()],
      sort: SortCriteria<Customer> = { credit: 'asc' };

    repository.whenSearchThenReturn(customers);

    const response = await searcher.run(sort);

    repository.assertSearchHasBeenCalledWith(sort);

    expect(response).toStrictEqual(customers);
  });
});
