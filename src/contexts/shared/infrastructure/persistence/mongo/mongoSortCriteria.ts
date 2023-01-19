import { SortCriteria } from '../sortCriteria';

// in this case is not necessary to implement an adapter. If we change the infrastructure
// to MariaDB for example, we need to implement a criteria adapter to handle sort.
export type MongoSortCriteria<T> = SortCriteria<T>;
