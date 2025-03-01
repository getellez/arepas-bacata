import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../interfaces/common.interface'
import { CategoriesDTO } from './categories.dto'

export class CategoriesMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  userValidator(req: Request, res: Response, next: NextFunction) {
    const payload = new CategoriesDTO()
    Object.assign(payload, req.body)
    validate(payload).then((errors) => {
      if (errors.length > 0) {
        return this.httpResponse.Error(res, `Validation Error: ${errors}`)
      }
      next()
    })
  }
}
