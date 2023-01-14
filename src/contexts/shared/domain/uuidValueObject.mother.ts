import MotherCreator from './motherCreator';
import UuidValueObject from './uuidValueObject';

export default class UuidValueObjectMother {
  static create(value: string) {
    return new UuidValueObject(value);
  }

  static random(): string {
    return MotherCreator.uuid();
  }
}
