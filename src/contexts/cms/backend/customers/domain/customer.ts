import AggregateRoot from '../../../../shared/domain/aggregateRoot';
import { Nullable } from '../../../../shared/domain/nullable';
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

export type CustomerCreateProps = {
  id: string;
  name: string;
  email: string;
  age: number;
};

export type CustomerUpdatableProps = {
  name?: Nullable<string>;
  email?: Nullable<string>;
};

export default class Customer extends AggregateRoot {
  readonly id: CustomerId;

  private _name: CustomerName;

  private _email: CustomerEmail;

  readonly age: CustomerAge;

  private _credit: CustomerCredit;

  // TODO: in a future it will be okay other property (currency)
  // readonly price: CustomerCurrency;

  public get name(): CustomerName {
    return new CustomerName(this._name.value);
  }

  public get email(): CustomerEmail {
    return new CustomerEmail(this._email.value);
  }

  public get credit(): CustomerCredit {
    return new CustomerCredit(this._credit.value);
  }

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
    this._name = name;
    this._email = email;
    this.age = age;
    this._credit = credit;
  }

  static create({ id, name, email, age }: CustomerCreateProps): Customer {
    const customer = new Customer({
      id: new CustomerId(id),
      name: new CustomerName(name),
      email: new CustomerEmail(email),
      age: new CustomerAge(Number(age)),
      credit: new CustomerCredit(0)
    });

    // TODO: in a future register domain event (customer.created)
    return customer;
  }

  update({ name, email }: CustomerUpdatableProps): boolean {
    const newName = name ? new CustomerName(name) : undefined,
      newEmail = email ? new CustomerEmail(email) : undefined,
      isNameToBeUpdated = newName && !this.name.equalsTo(newName),
      isEmailToBeUpdated = newEmail && !this.email.equalsTo(newEmail),
      isUpdate = isNameToBeUpdated || isEmailToBeUpdated;

    if (isNameToBeUpdated) {
      this._name = newName;
    }

    if (isEmailToBeUpdated) {
      this._email = newEmail;
    }

    if (isUpdate) {
      // TODO: in a future register domain event (customer.updated)
      return true;
    }

    return false;
  }

  addCredit(newCredit: CustomerCredit): void {
    this._credit = this.credit.addAmount(newCredit);

    // TODO: in a future register domain event (customer.creditAdded)
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
