import Customer from './customer';
import CustomerAge from './customerAge';
import CustomerAgeMother from './customerAge.mother';
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
    age
  }: {
    id: CustomerId;
    name: CustomerName;
    email: CustomerEmail;
    age: CustomerAge;
  }) {
    return new Customer({ id, name, email, age });
  }

  static random(overwrites?: { id?: CustomerId; name?: CustomerName; email?: CustomerEmail; age?: CustomerAge }) {
    const id = overwrites?.id ? overwrites.id : CustomerIdMother.random(),
      name = overwrites?.name ? overwrites.name : CustomerNameMother.random(),
      email = overwrites?.email ? overwrites.email : CustomerEmailMother.random(),
      age = overwrites?.age ? overwrites.age : CustomerAgeMother.random();

    return CustomerMother.create({ id, name, email, age });
  }
}
