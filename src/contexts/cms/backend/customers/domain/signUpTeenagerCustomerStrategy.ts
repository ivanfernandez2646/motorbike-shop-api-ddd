import SignUpCustomerStrategy from './signUpCustomerStrategy';

export default class SignUpTeenagerCustomerStrategy implements SignUpCustomerStrategy {
  async execute(): Promise<void> {
    console.log('Executing SignUp TEENAGER Customer Strategy...');

    await new Promise(resolve =>
      setTimeout(() => {
        console.log('...');
        resolve(true);
      }, 1000)
    );

    console.log('SignUp TEENAGER Customer Strategy FINISH');
  }
}
