import { Router, Request, Response } from 'express';
import CustomerGetController from '../controllers/customers/customerGetController';
import container from '../dependency-injection';
import CustomerDeleteController from '../controllers/customers/customerDeleteController';
import CustomerPatchController from '../controllers/customers/customerPatchController';

export const register = (router: Router) => {
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
};
