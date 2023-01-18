import AggregateRoot from '../../../../shared/domain/aggregateRoot';
import CustomerAge from './customerAge';
import CustomerCredit from './customerCredit';
import CustomerEmail from './customerEmail';
import CustomerId from './customerId';
import CustomerName from './customerName';

// TODO: in a future it will be a prop "purchases" referenced to another module "purchases"

export type CustomerPrimitives = {
  id: string;
  name: string;
  email: string;
  age: number;
  credit: number;
};

export default class Customer extends AggregateRoot {
  readonly id: CustomerId;

  readonly name: CustomerName;

  readonly email: CustomerEmail;

  readonly age: CustomerAge;

  readonly credit: CustomerCredit;

  // TODO: in a future it will be okay other property (currency)
  // readonly price: CustomerCurrency;

  constructor({
    id,
    name,
    email,
    age,
    credit
  }: {
    id: CustomerId;
    name: CustomerName;
    email: CustomerEmail;
    age: CustomerAge;
    credit: CustomerCredit;
  }) {
    super();

    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.credit = credit;
  }

  static fromPrimitives(plainData: CustomerPrimitives): Customer {
    return new Customer({
      id: new CustomerId(plainData.id),
      name: new CustomerName(plainData.name),
      email: new CustomerEmail(plainData.email),
      age: new CustomerAge(plainData.age),
      credit: new CustomerCredit(plainData.credit)
    });
  }

  toPrimitives(): CustomerPrimitives {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      age: this.age.value,
      credit: this.credit.value
    };
  }
}
