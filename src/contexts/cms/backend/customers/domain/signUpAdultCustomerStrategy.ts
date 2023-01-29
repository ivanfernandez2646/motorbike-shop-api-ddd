import SignUpCustomerStrategy from './signUpCustomerStrategy';

export default class SignUpAdultCustomerStrategy implements SignUpCustomerStrategy {
  async execute(): Promise<void> {
    console.log('Executing SignUp ADULT Customer Strategy...');

    await new Promise(resolve =>
      setTimeout(() => {
        console.log('...');
        resolve(true);
      }, 1000)
    );

    console.log('SignUp ADULT Customer Strategy FINISH');
  }
}
