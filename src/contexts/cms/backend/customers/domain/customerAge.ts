import InvalidArgumentError from '../../../../shared/domain/invalidArgumentError';
import NumberValueObject from '../../../../shared/domain/numberValueObject';

export default class CustomerAge extends NumberValueObject {
  constructor(value: number) {
    CustomerAge.ensureIsValidAge(value);

    super(value);
  }

  static ensureIsValidAge(value: number): void {
    if (value <= 0 || isNaN(value)) {
      throw new InvalidArgumentError(`<${this.name}> must be bigger than 0. Current value: <${value}>`);
    }
  }
}
