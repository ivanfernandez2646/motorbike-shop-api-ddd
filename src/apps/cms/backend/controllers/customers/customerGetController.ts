import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../Controller';
import CustomerFinder from '../../../../../contexts/cms/backend/customers/application/find/customerFinder';
import CustomerId from '../../../../../contexts/cms/backend/customers/domain/customerId';

export default class CustomerGetController implements Controller {
  private readonly handler: CustomerFinder;

  constructor(handler: CustomerFinder) {
    this.handler = handler;
  }

  async run(req: Request, res: Response) {
    const id = new CustomerId(req.params.id);
    const customer = await this.handler.run(id);

    res.status(httpStatus.OK).send(customer.toPrimitives());
  }
}
