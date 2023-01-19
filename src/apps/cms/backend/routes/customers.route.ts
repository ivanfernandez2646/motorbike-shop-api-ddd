import { Router, Request, Response } from 'express';
import CustomerGetController from '../controllers/customers/customerGetController';
import container from '../dependency-injection';
import CustomerDeleteController from '../controllers/customers/customerDeleteController';
import CustomerPatchController from '../controllers/customers/customerPatchController';
import CustomerAddCreditController from '../controllers/customers/customerAddCreditController';
import CustomerSearchSortByCreditController from '../controllers/customers/customerSearchSortByCreditController';

export const register = (router: Router) => {
  const customerSearchSortByCreditController: CustomerSearchSortByCreditController = container.get(
    'Apps.cms.controllers.customerSearchSortByCreditController'
  );
  router.get('/customer/list', (req: Request, res: Response) => customerSearchSortByCreditController.run(req, res));

  const customerGetController: CustomerGetController = container.get('Apps.cms.controllers.customerGetController');
  router.get('/customer/:id', (req: Request, res: Response) => customerGetController.run(req, res));

  const customerPutController: CustomerGetController = container.get('Apps.cms.controllers.customerPutController');
  router.put('/customer/:id', (req: Request, res: Response) => customerPutController.run(req, res));

  const customerDeleteController: CustomerDeleteController = container.get(
    'Apps.cms.controllers.customerDeleteController'
  );
  router.delete('/customer/:id', (req: Request, res: Response) => customerDeleteController.run(req, res));

  const customerPatchController: CustomerPatchController = container.get(
    'Apps.cms.controllers.customerPatchController'
  );
  router.patch('/customer/:id', (req: Request, res: Response) => customerPatchController.run(req, res));

  const customerAddCreditController: CustomerAddCreditController = container.get(
    'Apps.cms.controllers.customerAddCreditController'
  );
  router.patch('/customer/addCredit/:id', (req: Request, res: Response) => customerAddCreditController.run(req, res));
};
