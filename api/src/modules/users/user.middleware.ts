import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../interfaces/common.interface'
import { UserDTO } from './user.dto'

export class UserMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  userValidator(req: Request, res: Response, next: NextFunction) {
    const payload = new UserDTO()
    Object.assign(payload, req.body)
    validate(payload, { whitelist: true, forbidNonWhitelisted: true }).then(
      (errors) => {
        if (errors.length > 0) {
          return this.httpResponse.BadRequest(
            res,
            `Validation Error: ${errors}`
          )
        }
        next()
      }
    )
  }
}
