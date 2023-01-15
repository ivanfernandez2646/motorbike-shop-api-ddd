import MotherCreator from '../../../../shared/domain/motherCreator';
import CustomerAge from './customerAge';

export default class CustomerAgeMother {
  static create(value: number) {
    return new CustomerAge(value);
  }

  static random() {
    return CustomerAgeMother.create(MotherCreator.positiveNumber(99));
  }
}
