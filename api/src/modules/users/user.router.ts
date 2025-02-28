import { BaseRouter } from '../../common/base.router'
import { UserController } from './user.controller'
import { UserMiddleware } from './user.middleware'

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware)
  }

  routes(): void {
    this.router.get('/v1/users', (req, res) =>
      this.controller.findAllUsers(req, res)
    )
    this.router.post(
      '/v1/users',
      (req, res, next) => this.middleware.userValidator(req, res, next),
      (req, res) => this.controller.createUser(req, res)
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
