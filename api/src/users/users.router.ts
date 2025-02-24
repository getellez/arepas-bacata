import { BaseRouter } from '../router/base.router'
import { UserController } from './users.controller'

export class UserRouter extends BaseRouter<UserController> {
  constructor() {
    super(UserController)
  }

  routes(): void {
    this.router.get('/v1/users', (req, res) =>
      this.controller.findAllUsers(req, res)
    )
    this.router.post('/v1/users', (req, res) =>
      this.controller.createUser(req, res)
    )
    this.router.get('/v1/users/:id', (req, res) =>
      this.controller.findUserById(req, res)
    )
    this.router.put('/v1/users/:id', (req, res) =>
      this.controller.updateUser(req, res)
    )
    this.router.delete('/v1/users/:id', (req, res) =>
      this.controller.deleteUserById(req, res)
    )
  }
}
