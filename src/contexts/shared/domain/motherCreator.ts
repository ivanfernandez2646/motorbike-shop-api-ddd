import faker from 'faker';

export default class MotherCreator {
  static uuid(): string {
    return faker.datatype.uuid();
  }

  static firstName(): string {
    return faker.name.firstName();
  }

  static email(): string {
    return faker.internet.email();
  }

  static positiveNumber(max?: number): number {
    return faker.datatype.number({ min: 1, max });
  }

  static zeroOrPositiveNumber(max?: number): number {
    return faker.datatype.number({ min: 0, max });
  }
}
