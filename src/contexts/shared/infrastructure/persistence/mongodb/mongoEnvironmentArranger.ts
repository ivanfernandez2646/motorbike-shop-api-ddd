import { MongoClient } from 'mongodb';
import EnvironmentArranger from '../../arranger/environmentArranger';

export default class MongoEnvironmentArranger extends EnvironmentArranger {
  private _client: MongoClient;

  constructor(client: MongoClient) {
    super();

    this._client = client;
  }

  async arrange(): Promise<void> {
    await this.cleanDatabase();
  }

  private async cleanDatabase() {
    const client = this.client(),
      collections = await client.db().collections();

    await Promise.all(collections.map(collection => client.db().dropCollection(collection.collectionName)));
  }

  close(): Promise<void> {
    return this.client().close();
  }

  private client(): MongoClient {
    return this._client;
  }
}
