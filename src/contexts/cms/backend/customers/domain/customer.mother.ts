import Customer, { CustomerCreateProps, CustomerPrimitives } from './customer';
import CustomerAge from './customerAge';
import CustomerAgeMother from './customerAge.mother';
import CustomerCredit from './customerCredit';
import CustomerCreditMother from './customerCredit.mother';
import CustomerEmail from './customerEmail';
import CustomerEmailMother from './customerEmail.mother';
import CustomerId from './customerId';
import CustomerIdMother from './customerId.mother';
import CustomerName from './customerName';
import CustomerNameMother from './customerName.mother';

export default class CustomerMother {
  static create({
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
    const a = new Customer({ id, name, email, age, credit });
    return a;
  }

  static random(overwrites?: {
    id?: CustomerId;
    name?: CustomerName;
    email?: CustomerEmail;
    age?: CustomerAge;
    credit?: CustomerCredit;
  }) {
    const id = overwrites?.id ? overwrites.id : CustomerIdMother.random(),
      name = overwrites?.name ? overwrites.name : CustomerNameMother.random(),
      email = overwrites?.email ? overwrites.email : CustomerEmailMother.random(),
      age = overwrites?.age ? overwrites.age : CustomerAgeMother.random(),
      credit = overwrites?.credit ? overwrites.credit : CustomerCreditMother.random();

    return CustomerMother.create({ id, name, email, age, credit });
  }

  static randomWithoutCredit(overwrites?: {
    id?: CustomerId;
    name?: CustomerName;
    email?: CustomerEmail;
    age?: CustomerAge;
  }) {
    const credit = CustomerCreditMother.create(0);

    return CustomerMother.random({ ...overwrites, credit });
  }

  static fromPrimitives(plainData: CustomerPrimitives) {
    return Customer.fromPrimitives(plainData);
  }

  static toCustomerCreatorProps(customer: Customer): CustomerCreateProps {
    return {
      id: customer.id.value,
      name: customer.name.value,
      age: customer.age.value,
      email: customer.email.value
    };
  }
}
