export default interface SignUpCustomerStrategy {
  execute(): Promise<void>;
}
