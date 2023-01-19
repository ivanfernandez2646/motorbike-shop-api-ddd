import MotherCreator from '../../../../shared/domain/motherCreator';
import CustomerName from './customerName';

export default class CustomerNameMother {
  static create(value: string): CustomerName {
    return new CustomerName(value);
  }

  static random(): CustomerName {
    return CustomerNameMother.create(MotherCreator.firstName());
  }

  static differentOf(name: CustomerName): CustomerName {
    let newName: CustomerName = CustomerNameMother.random();

    while (newName.equalsTo(name)) {
      newName = CustomerNameMother.random();
    }

    return newName;
  }
}
