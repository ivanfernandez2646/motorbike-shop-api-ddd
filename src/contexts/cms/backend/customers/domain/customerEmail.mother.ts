import MotherCreator from '../../../../shared/domain/motherCreator';
import CustomerEmail from './customerEmail';

export default class CustomerEmailMother {
  static create(value: string) {
    return new CustomerEmail(value);
  }

  static random() {
    return CustomerEmailMother.create(MotherCreator.email());
  }
}
