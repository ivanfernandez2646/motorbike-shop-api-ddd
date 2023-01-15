import AggregateRoot from '../../../../shared/domain/aggregateRoot';
import CustomerAge from './customerAge';
import CustomerEmail from './customerEmail';
import CustomerId from './customerId';
import CustomerName from './customerName';

// TODO: in a future it will be a prop "purchases" referenced to another module "purchases"

export type CustomerPrimitives = {
  id: string;
  name: string;
  email: string;
  age: number;
};

export default class Customer extends AggregateRoot {
  readonly id: CustomerId;

  readonly name: CustomerName;

  readonly email: CustomerEmail;

  readonly age: CustomerAge;

  constructor({
    id,
    name,
    email,
    age
  }: {
    id: CustomerId;
    name: CustomerName;
    email: CustomerEmail;
    age: CustomerAge;
  }) {
    super();

    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
  }

  static fromPrimitives(plainData: CustomerPrimitives): Customer {
    return new Customer({
      id: new CustomerId(plainData.id),
      name: new CustomerName(plainData.name),
      email: new CustomerEmail(plainData.email),
      age: new CustomerAge(plainData.age)
    });
  }

  toPrimitives(): CustomerPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      age: this.age.value
    };
  }
}
