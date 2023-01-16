import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Controller, { CustomException } from '../controller';
import CustomerId from '../../../../../contexts/cms/backend/customers/domain/customerId';
import CustomerUpdater from '../../../../../contexts/cms/backend/customers/application/update/customerUpdater';
import CustomerNotFound from '../../../../../contexts/cms/backend/customers/domain/customerNotFound';

export default class CustomerPatchController extends Controller {
  private readonly handler: CustomerUpdater;

  constructor(handler: CustomerUpdater) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [{ clazz: CustomerNotFound, statusCode: 404 }];
  }

  async _run(req: Request, res: Response): Promise<void> {
    const { id } = req.params,
      { name, email } = req.body;

    await this.handler.run(new CustomerId(id), { name, email });

    res.status(httpStatus.NO_CONTENT).send();
  }
}
