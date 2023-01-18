import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Controller, { CustomException } from '../controller';
import CustomerCreditAdder from '../../../../../contexts/cms/backend/customers/application/addCredit/customerCreditAdder';
import CustomerNotFound from '../../../../../contexts/cms/backend/customers/domain/customerNotFound';
import CustomerId from '../../../../../contexts/cms/backend/customers/domain/customerId';
import CustomerCredit from '../../../../../contexts/cms/backend/customers/domain/customerCredit';

export default class CustomerAddCreditController extends Controller {
  private readonly handler: CustomerCreditAdder;

  constructor(handler: CustomerCreditAdder) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [{ clazz: CustomerNotFound, statusCode: 404 }];
  }

  async _run(req: Request, res: Response): Promise<void> {
    const { id } = req.params,
      { creditToAdd } = req.body,
      customerId = new CustomerId(id),
      customerCreditToAdd = new CustomerCredit(creditToAdd);

    await this.handler.run(customerId, customerCreditToAdd);

    res.status(httpStatus.NO_CONTENT).send();
  }
}
