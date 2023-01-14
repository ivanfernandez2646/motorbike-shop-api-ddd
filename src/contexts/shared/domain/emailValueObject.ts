import InvalidArgumentError from './invalidArgumentError';
import StringValueObject from './stringValueObject';

export default abstract class EmailValueObject extends StringValueObject {
  constructor(value: string) {
    EmailValueObject.ensureIsValidEmail(value);

    super(value);
  }

  static ensureIsValidEmail(value: string) {
    if (
      !value ||
      !value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${value}>`);
    }
  }
}
