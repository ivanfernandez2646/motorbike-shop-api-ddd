export default class CustomerAlreadyExists extends Error {
  constructor(id: string) {
    super(`Customer with id <${id}> already exists`);
  }
}
