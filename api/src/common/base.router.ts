import { Router } from 'express'

export class BaseRouter<TController, UMiddleware> {
  public router: Router
  public controller: TController
  public middleware: UMiddleware
  constructor(
    Controller: { new (): TController },
    UMiddleware: { new (): UMiddleware }
  ) {
    this.router = Router()
    this.controller = new Controller()
    this.middleware = new UMiddleware()
    this.routes()
  }

  routes() {}
}
