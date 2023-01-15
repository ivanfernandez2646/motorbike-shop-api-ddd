import convictConfig from '../../../../../../../apps/cms/backend/config/config';
import { MongoConfig } from '../../../../../../shared/infrastructure/persistence/mongo/mongoClientFactory';

export default class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return convictConfig.get('mongo');
  }
}
