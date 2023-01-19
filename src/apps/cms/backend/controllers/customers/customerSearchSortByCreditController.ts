import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Controller, { CustomException } from '../controller';
import CustomerSearcher from '../../../../../contexts/cms/backend/customers/application/search/customerSearcher';
import InvalidArgumentError from '../../../../../contexts/shared/domain/invalidArgumentError';
import { SortType } from '../../../../../contexts/shared/infrastructure/persistence/sortType';

export default class CustomerSearchSortByCreditController extends Controller {
  private readonly handler: CustomerSearcher;

  constructor(handler: CustomerSearcher) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [{ clazz: InvalidArgumentError, statusCode: httpStatus.BAD_REQUEST }];
  }

  async _run(req: Request, res: Response): Promise<void> {
    const { sort } = req.query;

    if (!Object.values(SortType).includes(sort as SortType)) {
      throw new InvalidArgumentError(
        `invalid "sort" query param <${sort}>. Valid values: ${Object.values(SortType).join(',')}`
      );
    }

    const customers = await this.handler.run({ credit: sort as SortType });

    res.status(httpStatus.OK).send(customers.map(c => c.toPrimitives()));
  }
}
