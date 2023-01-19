export type SortCriteria<T> = Partial<{
  [P in keyof T as Exclude<P, T[P] extends Function ? P : never>]: 'desc' | 'asc';
}>;
