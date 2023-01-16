import InvalidArgumentError from './invalidArgumentError';
import StringValueObject from './stringValueObject';

export default abstract class StringRequiredValueObject extends StringValueObject {
  constructor(value: string) {
    StringRequiredValueObject.ensureIsValidString(value);

    super(value);
  }

  static ensureIsValidString(value: string): void {
    if (!value || value.trim() === '') {
      throw new InvalidArgumentError(`<${this.name}> does not allow the value <${value}>`);
    }
  }
}
