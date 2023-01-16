import { Request, Response } from 'express';
import httpStatus from 'http-status';
import CustomerCreator from '../../../../../contexts/cms/backend/customers/application/create/customerCreator';
import CustomerAlreadyExists from '../../../../../contexts/cms/backend/customers/domain/customerAlreadyExists';
import Controller, { CustomException } from '../controller';
import Customer from '../../../../../contexts/cms/backend/customers/domain/customer';
import CustomerId from '../../../../../contexts/cms/backend/customers/domain/customerId';
import CustomerName from '../../../../../contexts/cms/backend/customers/domain/customerName';
import CustomerEmail from '../../../../../contexts/cms/backend/customers/domain/customerEmail';
import CustomerAge from '../../../../../contexts/cms/backend/customers/domain/customerAge';

export default class CustomerPutController extends Controller {
  private readonly handler: CustomerCreator;

  constructor(handler: CustomerCreator) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [{ clazz: CustomerAlreadyExists, statusCode: 302 }];
  }

  async _run(req: Request, res: Response): Promise<void> {
    const { id } = req.params,
      { name, email, age } = req.body,
      customer = new Customer({
        id: new CustomerId(id as string),
        name: new CustomerName(name),
        email: new CustomerEmail(email),
        age: new CustomerAge(Number(age))
      });

    await this.handler.run(customer);

    res.status(httpStatus.CREATED).send();
  }
}
