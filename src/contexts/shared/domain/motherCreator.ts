export default class MotherCreator {
  static uuid(): string {
    return fakerStatic.datatype.uuid();
  }

  static firstName(): string {
    return fakerStatic.name.firstName();
  }

  static email(): string {
    return fakerStatic.internet.email();
  }

  static positiveNumber(max?: number): number {
    return fakerStatic.datatype.number({ min: 1, max });
  }
}
