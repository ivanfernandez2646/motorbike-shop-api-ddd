// TODO: in a future, domain events will be created

export default abstract class AggregateRoot {
  abstract toPrimitives(): any;
}
