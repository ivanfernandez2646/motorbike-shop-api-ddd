import MotherCreator from '../../../../shared/domain/motherCreator';
import CustomerName from './customerName';

export default class CustomerNameMother {
  static create(value: string): CustomerName {
    return new CustomerName(value);
  }

  static random(): CustomerName {
    return CustomerNameMother.create(MotherCreator.firstName());
  }
}
