import { Router, Request, Response } from 'express';
import CustomerGetController from '../controllers/customers/customerGetController';
import container from '../dependency-injection';

export const register = (router: Router) => {
  const controller: CustomerGetController = container.get('Apps.cms.controllers.customerGetController');
  router.get('/customer/:id', (req: Request, res: Response) => controller.run(req, res));
};
