import { CommonRoutesConfig } from 'common/common.routes.config';

import { Application } from 'express';
import UsersController from './controllers/users.controller';

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UserRoutes');
  }

  configureRoutes(): Application {
    this.app
      .route('/users')
      .get(UsersController.listUsers)
      .post(UsersController.createUser);

    return this.app;
  }
}
