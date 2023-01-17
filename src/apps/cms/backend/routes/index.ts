import { Router } from 'express';
import glob from 'glob';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export function registerRoutes(router: Router) {
  const routes = glob.sync(__dirname + '/**/*.route.*');
  routes.map(route => register(route, router));
}

function register(routePath: string, router: Router) {
  const route = require(routePath);
  route.register(router);
  registerSwagger(router);
}

function registerSwagger(router: Router) {
  const swaggerDocument = YAML.load(path.join(__dirname, '../../../../..', '/docs', 'openapi.yml'));
  router.use('/', swaggerUi.serve);
  router.get('/', swaggerUi.setup(swaggerDocument));
}
