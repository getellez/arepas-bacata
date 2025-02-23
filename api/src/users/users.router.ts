import { BaseRouter } from '../router/base.router'
import { UserController } from './users.controller'

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController)
  }

  routes(): void {
    this.router.get('/users', (req, res) => this.controller.getUsers(req, res))
    this.router.post('/users', (req, res) => this.controller.addUser(req, res))
  }
}
