import { BaseRouter } from '../router/base.router'
import { UserController } from './users.controller'

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController)
  }

  routes(): void {
    this.router.get('/users', (req, res) =>
      this.controller.findAllUsers(req, res)
    )
    this.router.get('/users/:id', (req, res) =>
      this.controller.findUserById(req, res)
    )
    this.router.put('/users/:id', (req, res) =>
      this.controller.updateUser(req, res)
    )
    this.router.delete('/users/:id', (req, res) =>
      this.controller.deleteUserById(req, res)
    )
    this.router.post('/users', (req, res) =>
      this.controller.createUser(req, res)
    )
  }
}
