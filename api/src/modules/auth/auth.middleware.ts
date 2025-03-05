import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { HttpResponse } from '../../interfaces/common.interface'

export class AuthMiddleware {
  constructor(private readonly httpResponse = new HttpResponse()) {}

  passAuth(type: string) {
    return passport.authenticate(type, { session: false, failureMessage: true })
  }

  async checkAdminRole(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      this.httpResponse.Unauthorized(res, 'Unauthorized')
      return
    }
    next()
  }
}
