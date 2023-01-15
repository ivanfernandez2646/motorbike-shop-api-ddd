import UuidValueObjectMother from '../../../../shared/domain/uuidValueObject.mother';
import CustomerId from './customerId';

export default class CustomerIdMother {
  static create(value: string) {
    return new CustomerId(value);
  }

  static random() {
    return CustomerIdMother.create(UuidValueObjectMother.random());
  }
}
