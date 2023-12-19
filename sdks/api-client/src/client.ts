import { BaseClient, createApiCollection } from '@sdks/api-core';
import * as user from './callers/user';

export class Client extends BaseClient {
  /**
   * Single sign-on service.
   */
  public readonly user = createApiCollection(user, this._options.runner);
}
