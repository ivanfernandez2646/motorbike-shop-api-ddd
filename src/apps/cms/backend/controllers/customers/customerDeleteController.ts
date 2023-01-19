import { Request, Response } from 'express';
import httpStatus from 'http-status';
import CustomerDeleter from '../../../../../contexts/cms/backend/customers/application/delete/customerDeleter';
import CustomerNotFound from '../../../../../contexts/cms/backend/customers/domain/customerNotFound';
import Controller, { CustomException } from '../controller';
import CustomerId from '../../../../../contexts/cms/backend/customers/domain/customerId';

export default class CustomerDeleteController extends Controller {
  private readonly handler: CustomerDeleter;

  constructor(handler: CustomerDeleter) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [{ clazz: CustomerNotFound, statusCode: httpStatus.NOT_FOUND }];
  }

  async _run(req: Request, res: Response): Promise<void> {
    const id = new CustomerId(req.params.id);

    await this.handler.run(id);

    res.status(httpStatus.OK).send();
  }
}
