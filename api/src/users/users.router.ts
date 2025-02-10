import { BaseRouter } from '../router/router';
import { UserController } from './users.controller';

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController);
  }

  routes(): void {
    this.router.get('/users', (req, res) => this.controller.getUsers(req, res));
  }
}
