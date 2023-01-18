import InvalidArgumentError from '../../../../shared/domain/invalidArgumentError';
import NumberValueObject from '../../../../shared/domain/numberValueObject';

export default class CustomerCredit extends NumberValueObject {
  constructor(value: number) {
    CustomerCredit.ensureIsValidCredit(value);

    super(value);
  }

  static ensureIsValidCredit(value: number): void {
    if (value < 0 || isNaN(value)) {
      throw new InvalidArgumentError(`<${this.name}> must be a positive number. Current value: <${value}>`);
    }
  }
}
