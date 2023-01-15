export default class CustomerNotFound extends Error {
  constructor(id: string) {
    super(`Customer with id <${id}> not found`);
  }
}
