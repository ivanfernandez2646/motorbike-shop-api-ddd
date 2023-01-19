import { Request, Response } from 'express';
import httpStatus from 'http-status';
import CustomerCreator from '../../../../../contexts/cms/backend/customers/application/create/customerCreator';
import CustomerAlreadyExists from '../../../../../contexts/cms/backend/customers/domain/customerAlreadyExists';
import Controller, { CustomException } from '../controller';
import { CustomerCreateProps } from '../../../../../contexts/cms/backend/customers/domain/customer';

export default class CustomerPutController extends Controller {
  private readonly handler: CustomerCreator;

  constructor(handler: CustomerCreator) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [{ clazz: CustomerAlreadyExists, statusCode: httpStatus.FOUND }];
  }

  async _run(req: Request, res: Response): Promise<void> {
    const { id } = req.params,
      { name, email, age } = req.body,
      customerCreateProps: CustomerCreateProps = {
        id: id as string,
        name: name as string,
        email: email as string,
        age: Number(age)
      };

    await this.handler.run(customerCreateProps);

    res.status(httpStatus.CREATED).send();
  }
}
