import MotherCreator from '../../../../shared/domain/motherCreator';
import CustomerCredit from './customerCredit';

export default class CustomerCreditMother {
  static create(value: number) {
    return new CustomerCredit(value);
  }

  static random() {
    return CustomerCreditMother.create(MotherCreator.zeroOrPositiveNumber());
  }
}
