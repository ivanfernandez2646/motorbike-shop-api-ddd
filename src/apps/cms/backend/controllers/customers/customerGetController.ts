import { Request, Response } from 'express';
import httpStatus from 'http-status';
import CustomerFinder from '../../../../../contexts/cms/backend/customers/application/find/customerFinder';
import CustomerId from '../../../../../contexts/cms/backend/customers/domain/customerId';
import Controller, { CustomException } from '../controller';
import CustomerNotFound from '../../../../../contexts/cms/backend/customers/domain/customerNotFound';

export default class CustomerGetController extends Controller {
  private readonly handler: CustomerFinder;

  constructor(handler: CustomerFinder) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [{ clazz: CustomerNotFound, statusCode: 404 }];
  }

  async _run(req: Request, res: Response): Promise<void> {
    const id = new CustomerId(req.params.id),
      customer = await this.handler.run(id);

    res.status(httpStatus.OK).send(customer.toPrimitives());
  }
}
