import { BaseRouter } from '../../common/base.router'
import { AuthController } from './auth.controller'
import { AuthMiddleware } from './auth.middleware'

export class AuthRouter extends BaseRouter<AuthController, AuthMiddleware> {
  constructor() {
    super(AuthController, AuthMiddleware)
  }

  routes(): void {
    this.router.post('/v1/auth/login', this.middleware.passAuth('login'), (req, res) =>
      this.controller.login(req, res)
    )
  }
}
