import { v4, validate } from 'uuid';
import InvalidArgumentError from './invalidArgumentError';

export default class UuidValueObject {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);

    this.value = value;
  }

  static random(): UuidValueObject {
    return new UuidValueObject(v4());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
    }
  }

  toString(): string {
    return this.value;
  }

  equalsTo(other: UuidValueObject): boolean {
    return this.toString() === other.toString();
  }
}
